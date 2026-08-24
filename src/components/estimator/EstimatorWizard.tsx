"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "@/i18n/useI18n";
import type { Locale } from "@/i18n/utils";
import { WIZARD_QUESTIONS } from "@/domain/estimator/questions";
import { isQuestionVisible } from "@/domain/estimator/conditionEngine";
import { ProjectRequirements, ProjectEstimate } from "@/domain/estimator/types";
import { normalizeWizardAnswers } from "@/domain/estimator/normalizer";
import { calculateProjectEstimate } from "@/domain/estimator/pricing/engine";
import { EstimatorProgressBar } from "./EstimatorProgressBar";
import { QuestionStep } from "./QuestionStep";
import { ContactGateStep, type ContactData } from "./ContactGateStep";
import { EstimateResult } from "./EstimateResult";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, ArrowRight, Lock, Loader2 } from "lucide-react";

interface EstimatorWizardProps {
  locale?: Locale;
}

export function EstimatorWizard({ locale = "en" }: EstimatorWizardProps) {
  const t = useTranslations("Estimator.steps", locale);

  const [answers, setAnswers] = useState<Record<string, unknown>>({
    service: "web",
  });
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isContactStep, setIsContactStep] = useState<boolean>(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const [estimateResult, setEstimateResult] = useState<{
    requirements: ProjectRequirements;
    estimate: ProjectEstimate;
    leadId: string;
    contact: ContactData;
  } | null>(null);

  // Filter visible questions dynamically based on progressive disclosure conditions
  const visibleQuestions = useMemo(() => {
    return WIZARD_QUESTIONS.filter((q) => isQuestionVisible(q.conditions, answers));
  }, [answers]);

  const totalStepsWithContact = visibleQuestions.length + 1;
  const currentStepForProgress = isContactStep
    ? visibleQuestions.length
    : currentStepIndex;

  const currentQuestion = visibleQuestions[currentStepIndex] || visibleQuestions[0];
  const isFirstStep = currentStepIndex === 0 && !isContactStep;
  const isLastQuestion = currentStepIndex === visibleQuestions.length - 1;

  const currentAnswer = answers[currentQuestion?.id];
  const isAnswerValid = () => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;
    if (currentQuestion.type === "multi_select") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    return currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== "";
  };

  const handleAnswerChange = (value: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!isAnswerValid()) return;

    if (isLastQuestion) {
      setIsContactStep(true);
    } else {
      setCurrentStepIndex((prev) => Math.min(prev + 1, visibleQuestions.length - 1));
    }
  };

  const handleBack = () => {
    if (isContactStep) {
      setIsContactStep(false);
    } else {
      setCurrentStepIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleContactSubmit = async (contact: ContactData) => {
    setIsSubmittingLead(true);
    setLeadError(null);

    // Compute robust domain estimate
    const localRequirements = normalizeWizardAnswers(answers);
    const localEstimate = calculateProjectEstimate(localRequirements);

    try {
      const res = await fetch("/api/estimator/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          answers,
          locale,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.estimate) {
        setEstimateResult({
          requirements: data.requirements || localRequirements,
          estimate: data.estimate || localEstimate,
          leadId: data.leadId || `lead_${Date.now()}`,
          contact,
        });
      } else {
        setEstimateResult({
          requirements: localRequirements,
          estimate: localEstimate,
          leadId: `lead_${Date.now()}`,
          contact,
        });
      }
    } catch (err) {
      console.warn("[Estimator] Lead API submission fallback to client calculator:", err);
      setEstimateResult({
        requirements: localRequirements,
        estimate: localEstimate,
        leadId: `lead_${Date.now()}`,
        contact,
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleRecalculate = () => {
    setEstimateResult(null);
    setIsContactStep(false);
    setCurrentStepIndex(0);
  };

  if (estimateResult) {
    return (
      <EstimateResult
        requirements={estimateResult.requirements}
        estimate={estimateResult.estimate}
        leadId={estimateResult.leadId}
        contact={estimateResult.contact}
        locale={locale}
        onRecalculate={handleRecalculate}
      />
    );
  }

  return (
    <Card className="p-6 sm:p-10 bg-warm-card border-warm-border shadow-warm">
      {/* Progress Bar */}
      <EstimatorProgressBar
        currentStep={currentStepForProgress}
        totalSteps={totalStepsWithContact}
        locale={locale}
      />

      {/* Contact Gate Step */}
      {isContactStep ? (
        <ContactGateStep
          onBack={handleBack}
          onSubmit={handleContactSubmit}
          isSubmitting={isSubmittingLead}
          error={leadError}
          locale={locale}
        />
      ) : (
        /* Regular Question Step */
        currentQuestion && (
          <div className="min-h-[300px] flex flex-col justify-between">
            <QuestionStep
              question={currentQuestion}
              value={currentAnswer}
              locale={locale}
              onChange={handleAnswerChange}
            />

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-4 mt-8 sm:mt-12 pt-6 border-t border-warm-border/60">
              <button
                type="button"
                onClick={handleBack}
                disabled={isFirstStep}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
                  isFirstStep
                    ? "opacity-0 pointer-events-none"
                    : "text-charcoal-muted hover:text-charcoal hover:bg-cream"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("back")}</span>
              </button>

              <Button
                type="button"
                onClick={handleNext}
                disabled={!isAnswerValid()}
                variant="primary"
                size="md"
                className="sm:px-8 sm:py-3.5"
                cursorText={isLastQuestion ? "GATE" : "NEXT"}
              >
                {isLastQuestion ? (
                  <>
                    <span>{t("almostDone")}</span>
                    <Lock className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>{t("next")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )
      )}
    </Card>
  );
}
