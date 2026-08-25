"use client";

import { useTranslations } from "@/i18n/useI18n";
import type { Locale } from "@/i18n/utils";
import { WizardQuestion } from "@/domain/estimator/types";
import { OptionCard } from "./OptionCard";

interface QuestionStepProps {
  question: WizardQuestion;
  value: unknown;
  locale?: Locale;
  onChange: (value: unknown) => void;
}

export function QuestionStep({ question, value, locale = "en", onChange }: QuestionStepProps) {
  const t = useTranslations(undefined, locale);

  const handleSingleSelect = (val: string) => {
    onChange(val);
  };

  const handleMultiSelect = (val: string) => {
    const currentList = Array.isArray(value) ? [...(value as string[])] : [];
    if (currentList.includes(val)) {
      onChange(currentList.filter((item) => item !== val));
    } else {
      onChange([...currentList, val]);
    }
  };

  return (
    <div className="w-full animate-popover-enter origin-top">
      {/* Question Header */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal tracking-tight leading-tight mb-2.5">
          {t(question.titleKey)}
        </h3>
        {question.descriptionKey && (
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            {t(question.descriptionKey)}
          </p>
        )}
      </div>

      {/* Single Select Grid */}
      {question.type === "single_select" && question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {question.options.map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              labelKey={option.labelKey}
              descriptionKey={option.descriptionKey}
              icon={option.icon}
              badge={option.badge}
              isSelected={value === option.value}
              isMulti={false}
              locale={locale}
              onSelect={handleSingleSelect}
            />
          ))}
        </div>
      )}

      {/* Multi Select Grid */}
      {question.type === "multi_select" && question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {question.options.map((option) => {
            const isSelected = Array.isArray(value) && (value as string[]).includes(option.value);
            return (
              <OptionCard
                key={option.value}
                value={option.value}
                labelKey={option.labelKey}
                descriptionKey={option.descriptionKey}
                icon={option.icon}
                badge={option.badge}
                isSelected={isSelected}
                isMulti={true}
                locale={locale}
                onSelect={handleMultiSelect}
              />
            );
          })}
        </div>
      )}

      {/* Textarea Input */}
      {question.type === "textarea" && (
        <div className="w-full">
          <textarea
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            placeholder={question.placeholderKey ? t(question.placeholderKey) : ""}
            className="w-full px-5 py-4 rounded-2xl bg-cream/50 border border-warm-border/80 text-charcoal placeholder:text-charcoal-muted/60 focus:outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion transition-[border-color,box-shadow,background-color] duration-160 ease-emil-out text-sm sm:text-base resize-y"
          />
        </div>
      )}
    </div>
  );
}
