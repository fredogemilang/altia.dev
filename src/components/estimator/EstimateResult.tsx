"use client";

import { useTranslations } from "@/i18n/useI18n";
import { ProjectRequirements, ProjectEstimate } from "@/domain/estimator/types";
import { ContactData } from "./ContactGateStep";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Globe,
  Smartphone,
  Info,
  ArrowRight,
  RotateCcw,
  MessageSquare,
  PhoneCall,
  MailCheck,
} from "lucide-react";

interface EstimateResultProps {
  requirements: ProjectRequirements;
  estimate: ProjectEstimate;
  leadId?: string;
  contact?: ContactData;
  locale?: string;
  onRecalculate: () => void;
}

export function EstimateResult({
  requirements,
  estimate,
  leadId,
  contact,
  locale = "en",
  onRecalculate,
}: EstimateResultProps) {
  const t = useTranslations("Estimator.result", locale as any);

  const cleanLeadId = leadId ? leadId.replace("lead_", "#") : "#EST-2026";
  const whatsappNumber = SITE_CONFIG.contact.whatsapp || "6282147709084"; // ALTIA DEV Official WhatsApp

  const projectTypeName = (estimate?.projectType || requirements?.projectType || requirements?.service || "digital_product").replace(/_/g, " ");
  const minPrice = estimate?.pricing?.min ?? (estimate as any)?.minPrice ?? 3500;
  const maxPrice = estimate?.pricing?.max ?? (estimate as any)?.maxPrice ?? 7500;
  const rawMinWeeks = estimate?.timeline?.minWeeks ?? 4;
  const rawMaxWeeks = estimate?.timeline?.maxWeeks ?? 8;
  const minWeeks = Math.min(rawMinWeeks, rawMaxWeeks);
  const maxWeeks = Math.max(rawMinWeeks, rawMaxWeeks);
  const complexityLevel = estimate?.complexity?.level ?? (requirements as any)?.complexity ?? "medium";
  const solution = estimate?.recommendation?.solution ?? "Custom Digital Engineering Solution";
  const rationale = estimate?.recommendation?.rationale ?? "Tailored architecture built to scale with high performance and zero-jank frontend.";
  const highlights = estimate?.highlights || [
    "Production-grade modern tech stack",
    "Comprehensive responsive UI/UX implementation",
    "SEO, Core Web Vitals, and accessibility optimization",
  ];
  const assumptions = estimate?.assumptions || [
    "Design and specifications approved during sprint 0",
    "API credentials and assets provided on schedule",
  ];

  const waMessage = encodeURIComponent(
    `Halo ALTIA DEV, saya telah mengisi Project Estimator (${cleanLeadId}) untuk proyek ${projectTypeName} dengan estimasi $${minPrice.toLocaleString()} – $${maxPrice.toLocaleString()}. Saya ingin mendiskusikan implementasi teknisnya.`
  );
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  // Budget alignment check
  const budgetMaxMap: Record<string, number> = {
    under_1000: 1000, '1000_2500': 2500, '2500_5000': 5000,
    '5000_10000': 10000, '10000_plus': Infinity, not_sure: Infinity,
  };
  const budgetRange = requirements?.budget?.range || '';
  const budgetCeiling = budgetMaxMap[budgetRange] ?? Infinity;
  const budgetMismatch = budgetRange && budgetRange !== 'not_sure' && minPrice > budgetCeiling;

  const renderComplexityBadge = () => {
    switch (complexityLevel) {
      case "low":
        return (
          <Badge variant="outline" size="sm" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/30 uppercase font-bold text-xs">
            {t("complexityLow")}
          </Badge>
        );
      case "high":
        return (
          <Badge variant="vermilion" size="sm" className="font-bold text-xs uppercase">
            {t("complexityHigh")}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" size="sm" className="bg-amber-500/10 text-amber-700 border-amber-500/30 uppercase font-bold text-xs">
            {t("complexityMedium")}
          </Badge>
        );
    }
  };

  const renderServiceIcon = () => {
    switch (requirements?.service) {
      case "web":
        return <Globe className="w-5 h-5 text-vermilion" />;
      case "app":
        return <Smartphone className="w-5 h-5 text-vermilion" />;
      case "ai":
        return <Cpu className="w-5 h-5 text-vermilion" />;
      default:
        return <Globe className="w-5 h-5 text-vermilion" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10">
      {/* Delivery Confirmation Notice */}
      {contact && (
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5 sm:gap-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MailCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold font-display uppercase tracking-wider text-emerald-800">
                {t("deliverySuccessBadge")}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-500/20 px-2 py-0.5 rounded">
                {cleanLeadId}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900/85 leading-relaxed">
              {t("deliverySuccessDesc", {
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
              })}
            </p>
          </div>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-warm-border/60">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {renderServiceIcon()}
            <span className="text-xs uppercase font-bold tracking-widest text-vermilion font-display">
              {t("tag")}
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
            {t("subtitle", { version: estimate?.pricingRulesVersion || "2026.1" })}
          </p>
        </div>

        <button
          type="button"
          onClick={onRecalculate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream border border-warm-border text-xs font-display font-bold text-charcoal hover:text-vermilion hover:border-vermilion/40 active:scale-[0.96] transition-[color,border-color,transform] duration-160 ease-emil-out self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t("recalculate")}</span>
        </button>
      </div>

      {/* 2. Key Metrics Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        {/* Metric 1: Investment Range */}
        <Card className="p-6 sm:p-8 bg-charcoal text-ivory border-2 border-vermilion shadow-vermilion-glow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-ivory/70 font-display">
                {t("investmentTitle")}
              </span>
              <Sparkles className="w-4 h-4 text-vermilion" />
            </div>

            <div className="font-display font-black text-3xl sm:text-4xl text-vermilion my-2">
              ${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}
            </div>
          </div>

          <p className="text-xs text-ivory/60 mt-3 pt-3 border-t border-charcoal-500/40">
            USD currency · Calibrated range
          </p>
        </Card>

        {/* Metric 2: Timeline */}
        <Card className="p-6 sm:p-8 bg-warm-card border-warm-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-charcoal-muted font-display">
                {t("timelineTitle")}
              </span>
              <Calendar className="w-4 h-4 text-vermilion" />
            </div>

            <div className="font-display font-black text-3xl sm:text-4xl text-charcoal my-2">
              {minWeeks === maxWeeks ? `${minWeeks} ${t("weeks")}` : `${minWeeks} – ${maxWeeks} ${t("weeks")}`}
            </div>
          </div>

          <p className="text-xs text-charcoal-muted mt-3 pt-3 border-t border-warm-border/60">
            Sprint-based iterative delivery
          </p>
        </Card>

        {/* Metric 3: Complexity */}
        <Card className="p-6 sm:p-8 bg-warm-card border-warm-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-charcoal-muted font-display">
                {t("complexityTitle")}
              </span>
              <Layers className="w-4 h-4 text-vermilion" />
            </div>

            <div className="my-2">{renderComplexityBadge()}</div>
          </div>

          <p className="text-xs text-charcoal-muted mt-3 pt-3 border-t border-warm-border/60">
            Calculated from features & integrations
          </p>
        </Card>
      </div>

      {/* Budget Alignment Notice */}
      {budgetMismatch && (
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 sm:gap-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-amber-700" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-amber-800 block mb-1">
              {t("budgetNoticeTitle")}
            </span>
            <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed">
              {t("budgetNoticeDesc")}
            </p>
          </div>
        </div>
      )}

      {/* 3. Technical Solution & Rationale */}
      <Card className="p-6 sm:p-8 bg-warm-card border-warm-border">
        <h4 className="text-xs uppercase font-bold tracking-widest text-vermilion font-display mb-2">
          {t("recommendationTitle")}
        </h4>
        <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal mb-2">
          {solution}
        </h3>
        <p className="text-sm text-charcoal-muted leading-relaxed">
          {rationale}
        </p>
      </Card>

      {/* 4. Architecture Highlights & Assumptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highlights */}
        <Card className="p-6 sm:p-8 bg-cream/40 border-warm-border">
          <h4 className="font-display font-bold text-base text-charcoal mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-vermilion" />
            <span>{t("highlightsTitle")}</span>
          </h4>
          <ul className="space-y-3">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-vermilion flex-shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Assumptions */}
        <Card className="p-6 sm:p-8 bg-cream/40 border-warm-border">
          <h4 className="font-display font-bold text-base text-charcoal mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-vermilion" />
            <span>{t("assumptionsTitle")}</span>
          </h4>
          <ul className="space-y-3">
            {assumptions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-charcoal-muted flex-shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 5. Non-Binding Disclaimer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-cream/80 border border-warm-border/70 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-vermilion flex-shrink-0 mt-0.5" />
        <p className="text-xs text-charcoal-muted leading-relaxed">
          {t("disclaimer")}
        </p>
      </div>

      {/* 6. Post-Estimate Action CTA */}
      <Card className="p-8 sm:p-12 bg-charcoal text-ivory text-center border-2 border-vermilion/50 shadow-vermilion-glow">
        <h3 className="font-display text-2xl sm:text-3xl font-black text-ivory mb-3">
          {t("ctaTitle")}
        </h3>
        <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto leading-relaxed mb-8">
          {t("ctaSubtitle")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-ivory font-display font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-[transform,background-color,box-shadow] duration-160 ease-emil-out will-change-transform"
            data-cursor="WHATSAPP"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t("chatWhatsApp")}</span>
          </a>

          <Button href={locale === "id" ? "/id/contact" : "/contact"} variant="primary" size="md" className="sm:text-base sm:px-7 sm:py-3.5" cursorText="BOOK">
            <PhoneCall className="w-4 h-4" />
            <span>{t("bookCall")}</span>
          </Button>

          <Button onClick={onRecalculate} variant="secondary" size="md" className="sm:text-base sm:px-6 sm:py-3.5">
            <RotateCcw className="w-4 h-4" />
            <span>{t("recalculate")}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
