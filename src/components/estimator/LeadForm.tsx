"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "@/i18n/useI18n";
import { ProjectRequirements, ProjectEstimate } from "@/domain/estimator/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  PhoneCall,
  RotateCcw,
} from "lucide-react";

interface LeadFormProps {
  requirements: ProjectRequirements;
  estimate: ProjectEstimate;
  onReset: () => void;
}

export function LeadForm({ requirements, estimate, onReset }: LeadFormProps) {
  const locale = useLocale();
  const t = useTranslations("Estimator.leadForm", locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and work email.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/estimator/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: { name, email, company, phone },
          requirements,
          estimate,
          locale,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeadId(data.leadId);
        setIsSuccess(true);
      } else {
        setError(data.error || "Failed to submit estimate. Please try again.");
      }
    } catch (err) {
      setError("Network error submitting estimate. Please reach out to hello@altia.dev directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 sm:p-12 bg-charcoal text-ivory text-center border-2 border-vermilion/50 shadow-vermilion-glow">
        <div className="w-16 h-16 rounded-full bg-vermilion/20 border border-vermilion flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-vermilion" />
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-black text-ivory mb-3">
          {t("successTitle")}
        </h3>

        <p className="text-sm sm:text-base text-ivory/80 max-w-lg mx-auto leading-relaxed mb-8">
          {t("successDesc", { name, leadId: leadId.replace("lead_", "#") })}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="primary" size="md" className="sm:px-7 sm:py-3.5">
            <PhoneCall className="w-4 h-4" />
            <span>{t("talkNow")}</span>
          </Button>

          <Button href="/" variant="secondary" size="md" className="sm:px-7 sm:py-3.5">
            <span>{t("backToHome")}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-7 sm:p-10 bg-warm-card border-warm-border">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-vermilion" />
          <span className="text-xs uppercase font-bold tracking-widest text-vermilion font-display">
            {t("title")}
          </span>
        </div>
        <p className="text-sm text-charcoal-muted leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-vermilion/10 border border-vermilion/30 flex items-center gap-3 text-sm text-vermilion font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2">
              {t("name")} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2">
              {t("email")} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2">
              {t("company")}
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={t("companyPlaceholder")}
              className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
              className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion text-sm"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="md"
            className="w-full sm:w-auto sm:px-8 sm:py-3.5"
            cursorText="LOCK IN"
          >
            {isSubmitting ? (
              <span>{t("submitting")}</span>
            ) : (
              <>
                <span>{t("submit")}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 text-xs font-display font-semibold text-charcoal-muted hover:text-vermilion transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset & recalculate</span>
          </button>
        </div>
      </form>
    </Card>
  );
}
