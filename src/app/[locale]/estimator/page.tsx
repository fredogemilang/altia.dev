import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { EstimatorWizard } from "@/components/estimator/EstimatorWizard";
import { Sparkles, ShieldCheck, Clock, Zap } from "lucide-react";

interface EstimatorPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function EstimatorPage({ params }: EstimatorPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Estimator");

  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-24">
      {/* Header Section */}
      <section className="pt-12 pb-8 bg-noise border-b border-warm-border/60">
        <Container size="large">
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              variant="vermilion"
              size="md"
              className="mb-4 uppercase tracking-widest text-[11px] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-vermilion" />
              <span>{t("tag")}</span>
            </Badge>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-charcoal leading-[1.1] mb-5">
              {t("title")}
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-2xl mx-auto mb-8">
              {t("subtitle")}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-warm-border/60 text-xs font-display font-medium text-charcoal-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-vermilion" />
                <span>Deterministic Pricing Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-vermilion" />
                <span>Takes ~2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-vermilion" />
                <span>Zero sales pressure</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Wizard Container */}
      <section>
        <Container size="medium">
          <EstimatorWizard />
        </Container>
      </section>
    </div>
  );
}
