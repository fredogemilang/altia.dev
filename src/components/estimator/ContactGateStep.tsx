"use client";

import { useState } from "react";
import { useTranslations } from "@/i18n/useI18n";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  LockOpen,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MessageSquare,
  Mail,
  User,
  Building,
  Sparkles,
} from "lucide-react";

import type { Locale } from "@/i18n/utils";

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface ContactGateStepProps {
  onBack: () => void;
  onSubmit: (contact: ContactData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  locale?: Locale;
}

export function ContactGateStep({
  onBack,
  onSubmit,
  isSubmitting,
  error,
  locale = "en",
}: ContactGateStepProps) {
  const t = useTranslations("Estimator.contactGate", locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError(t("errors.nameRequired"));
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError(t("errors.emailRequired"));
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      setValidationError(t("errors.phoneRequired"));
      return;
    }

    setValidationError(null);
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
    });
  };

  const displayError = validationError || error;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2.5">
          <Sparkles className="w-4 h-4 text-vermilion" />
          <span className="text-xs uppercase font-bold tracking-widest text-vermilion font-display">
            {t("badge")}
          </span>
        </div>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal tracking-tight leading-tight mb-2.5">
          {t("title")}
        </h3>
        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Error message */}
      {displayError && (
        <div className="mb-6 p-4 rounded-xl bg-vermilion/10 border border-vermilion/30 flex items-center gap-3 text-sm text-vermilion font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2">
              {t("nameLabel")} <span className="text-vermilion">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-muted/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion text-sm transition-[border-color,box-shadow,background-color] duration-160 ease-emil-out"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2">
              {t("emailLabel")} <span className="text-vermilion">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-muted/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion text-sm transition-[border-color,box-shadow,background-color] duration-160 ease-emil-out"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WhatsApp / Phone (MANDATORY) */}
          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{t("phoneLabel")} <span className="text-vermilion">*</span></span>
              <span className="text-[10px] text-vermilion font-semibold uppercase tracking-wider bg-vermilion/10 px-2 py-0.5 rounded-md">
                WhatsApp Delivery
              </span>
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-vermilion absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion text-sm transition-[border-color,box-shadow,background-color] duration-160 ease-emil-out"
              />
            </div>
            <p className="text-[11px] text-charcoal-muted mt-1.5 pl-1">
              {t("phoneHint")}
            </p>
          </div>

          {/* Company (Optional) */}
          <div>
            <label className="block text-xs font-display font-bold text-charcoal uppercase tracking-wider mb-2">
              {t("companyLabel")} <span className="text-charcoal-muted/60 font-normal">({t("optional")})</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-charcoal-muted/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t("companyPlaceholder")}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-cream/50 border border-warm-border text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion text-sm transition-[border-color,box-shadow,background-color] duration-160 ease-emil-out"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-warm-border/60 mt-8">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold text-charcoal-muted hover:text-charcoal hover:bg-cream transition-[color,background-color,transform] duration-160 ease-emil-out active:scale-[0.96]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("back")}</span>
          </button>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="md"
            className="sm:px-8 sm:py-3.5"
            cursorText="UNLOCK"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <LockOpen className="w-4 h-4" />
                <span>{t("submit")}</span>
              </>
            )}
          </Button>
        </div>

        {/* Legal Consent Disclaimer */}
        <p className="text-[11px] text-center text-charcoal-muted/80 leading-relaxed pt-2">
          {locale === "id" ? (
            <>
              Dengan mengirim data ini, Anda menyetujui{" "}
              <a
                href="/id/privacy"
                className="text-charcoal hover:text-vermilion underline decoration-warm-border underline-offset-2 transition-colors"
              >
                Kebijakan Privasi
              </a>{" "}
              dan{" "}
              <a
                href="/id/terms"
                className="text-charcoal hover:text-vermilion underline decoration-warm-border underline-offset-2 transition-colors"
              >
                Syarat & Ketentuan
              </a>{" "}
              kami.
            </>
          ) : (
            <>
              By submitting your details, you agree to our{" "}
              <a
                href="/privacy"
                className="text-charcoal hover:text-vermilion underline decoration-warm-border underline-offset-2 transition-colors"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms"
                className="text-charcoal hover:text-vermilion underline decoration-warm-border underline-offset-2 transition-colors"
              >
                Terms of Service
              </a>
              .
            </>
          )}
        </p>
      </form>
    </div>
  );
}
