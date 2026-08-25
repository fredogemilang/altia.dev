"use client";

import { useTranslations } from "@/i18n/useI18n";
import type { Locale } from "@/i18n/utils";
import { Globe, Smartphone, Cpu, Check, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  value: string;
  labelKey: string;
  descriptionKey?: string;
  icon?: string;
  badge?: string;
  isSelected: boolean;
  isMulti?: boolean;
  locale?: Locale;
  onSelect: (value: string) => void;
}

export function OptionCard({
  value,
  labelKey,
  descriptionKey,
  icon,
  badge,
  isSelected,
  isMulti = false,
  locale = "en",
  onSelect,
}: OptionCardProps) {
  const t = useTranslations(undefined, locale);

  const renderIcon = () => {
    switch (icon) {
      case "Globe":
        return <Globe className="w-5 h-5 text-vermilion" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-vermilion" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-vermilion" />;
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "w-full text-left p-5 sm:p-6 rounded-2xl border transition-[transform,background-color,border-color,box-shadow] duration-160 ease-emil-out active:scale-[0.98] flex flex-col justify-between group relative select-none will-change-transform",
        isSelected
          ? "bg-ivory border-vermilion shadow-vermilion-glow ring-1 ring-vermilion/50 -translate-y-0.5"
          : "bg-cream/50 border-warm-border/80 hover:bg-ivory hover:border-vermilion/40 hover:shadow-sm hover:-translate-y-0.5"
      )}
      data-cursor={isSelected ? "ACTIVE" : "SELECT"}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            {icon && (
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-[background-color,transform] duration-160 ease-emil-out",
                  isSelected ? "bg-vermilion/15 scale-105" : "bg-cream group-hover:bg-vermilion/10"
                )}
              >
                {renderIcon()}
              </div>
            )}
            <h4 className="font-display font-bold text-base sm:text-lg text-charcoal leading-snug">
              {t(labelKey)}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <Badge variant="vermilion" size="sm" className="font-bold text-[10px] uppercase tracking-wider">
                {badge}
              </Badge>
            )}

            {/* Selection Checkmark Indicator */}
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center border transition-[transform,background-color,border-color,color] duration-160 ease-emil-out",
                isMulti ? "rounded-lg" : "rounded-full",
                isSelected
                  ? "bg-vermilion border-vermilion text-ivory scale-105 shadow-xs"
                  : "border-warm-border/80 bg-cream/60 group-hover:border-vermilion/40 text-transparent scale-100"
              )}
            >
              {isMulti ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <div className={cn("w-2 h-2 rounded-full transition-transform duration-160", isSelected ? "bg-ivory scale-100" : "bg-transparent scale-50")} />
              )}
            </div>
          </div>
        </div>

        {descriptionKey && (
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed pl-0.5">
            {t(descriptionKey)}
          </p>
        )}
      </div>
    </button>
  );
}
