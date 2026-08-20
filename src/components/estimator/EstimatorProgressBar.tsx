"use client";

import { useTranslations } from "next-intl";

interface EstimatorProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function EstimatorProgressBar({
  currentStep,
  totalSteps,
}: EstimatorProgressBarProps) {
  const t = useTranslations("Estimator.steps");
  const percentage = Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100));

  return (
    <div className="w-full mb-8 sm:mb-10">
      <div className="flex items-center justify-between text-xs font-display font-semibold text-charcoal-muted uppercase tracking-wider mb-2.5">
        <span>{t("stepOf", { current: currentStep + 1, total: totalSteps })}</span>
        <span className="text-vermilion font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-cream border border-warm-border/60 overflow-hidden p-0.5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-vermilion to-terracotta transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
