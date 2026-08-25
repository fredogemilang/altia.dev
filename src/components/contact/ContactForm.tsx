"use client";

import { useState } from "react";
import { useTranslations } from "@/i18n/useI18n";
import type { Locale } from "@/i18n/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertCircle, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("Contact.form", (locale === "id" ? "id" : "en") as Locale);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web Development",
    budget: "$3,000 - $7,000",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const serviceOptions = [
    { id: "Web Development", label: t("services.web") },
    { id: "Mobile & Desktop Apps", label: t("services.app") },
    { id: "AI Automation & Systems", label: t("services.ai") },
    { id: "Comprehensive Suite", label: t("services.all") },
  ];

  const budgetOptions = [
    { id: "< $3,000", label: t("budgets.tier1") },
    { id: "$3,000 - $7,000", label: t("budgets.tier2") },
    { id: "$7,000 - $15,000", label: t("budgets.tier3") },
    { id: "$15,000+", label: t("budgets.tier4") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "Web Development",
        budget: "$3,000 - $7,000",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : t("errorMessage")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8 sm:p-10 bg-warm-card border-warm-border shadow-warm-lg">
      {status === "success" ? (
        <div className="flex flex-col items-center text-center py-12 gap-4">
          <div className="w-16 h-16 rounded-full bg-vermilion/10 text-vermilion flex items-center justify-center mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-charcoal">
            {t("successTitle")}
          </h3>
          <p className="text-base text-charcoal-muted max-w-md leading-relaxed">
            {t("successMessage")}
          </p>
          <Button
            variant="secondary"
            size="md"
            className="mt-6"
            onClick={() => setStatus("idle")}
          >
            <span>Send Another Inquiry</span>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-display font-bold uppercase tracking-wider text-charcoal">
                {t("nameLabel")} <span className="text-vermilion">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("namePlaceholder")}
                className="w-full px-4 py-3.5 rounded-2xl bg-ivory border border-warm-border text-charcoal text-sm focus:outline-none focus:border-vermilion transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-display font-bold uppercase tracking-wider text-charcoal">
                {t("emailLabel")} <span className="text-vermilion">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={t("emailPlaceholder")}
                className="w-full px-4 py-3.5 rounded-2xl bg-ivory border border-warm-border text-charcoal text-sm focus:outline-none focus:border-vermilion transition-colors"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-display font-bold uppercase tracking-wider text-charcoal">
              {t("serviceLabel")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {serviceOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() =>
                    setFormData({ ...formData, service: opt.id })
                  }
                  className={cn(
                    "px-4 py-3 rounded-2xl text-xs font-display font-medium text-left border transition-[transform,background-color,border-color,color,box-shadow] duration-160 ease-emil-out active:scale-[0.97] flex items-center justify-between will-change-transform",
                    formData.service === opt.id
                      ? "bg-charcoal text-ivory border-charcoal shadow-sm -translate-y-0.5"
                      : "bg-ivory text-charcoal-muted border-warm-border hover:border-charcoal/30 hover:bg-ivory/90 hover:-translate-y-0.5"
                  )}
                  data-cursor
                >
                  <span>{opt.label}</span>
                  {formData.service === opt.id && (
                    <Sparkles className="w-3.5 h-3.5 text-vermilion" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-display font-bold uppercase tracking-wider text-charcoal">
              {t("budgetLabel")}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {budgetOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() =>
                    setFormData({ ...formData, budget: opt.id })
                  }
                  className={cn(
                    "px-3 py-2.5 rounded-2xl text-xs font-display font-medium text-center border transition-[transform,background-color,border-color,color,box-shadow] duration-160 ease-emil-out active:scale-[0.97] will-change-transform",
                    formData.budget === opt.id
                      ? "bg-vermilion text-ivory border-vermilion shadow-sm -translate-y-0.5"
                      : "bg-ivory text-charcoal-muted border-warm-border hover:border-charcoal/30 hover:bg-ivory/90 hover:-translate-y-0.5"
                  )}
                  data-cursor
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-display font-bold uppercase tracking-wider text-charcoal">
              {t("messageLabel")} <span className="text-vermilion">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder={t("messagePlaceholder")}
              className="w-full px-4 py-3.5 rounded-2xl bg-ivory border border-warm-border text-charcoal text-sm focus:outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion transition-[border-color,box-shadow,background-color] duration-160 ease-emil-out leading-relaxed resize-none"
            />
          </div>

          {/* Error notice if submission fails */}
          {status === "error" && (
            <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-vermilion/10 text-vermilion text-xs font-medium border border-vermilion/20">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage || t("errorMessage")}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full mt-2"
            cursorText="SEND"
          >
            <span>{isSubmitting ? t("sending") : t("submit")}</span>
            {!isSubmitting && <Send className="w-4 h-4" />}
          </Button>
        </form>
      )}
    </Card>
  );
}
