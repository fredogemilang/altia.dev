import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FaqAccordion } from "@/components/pricing/FaqAccordion";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Globe,
  Smartphone,
  Cpu,
  Wrench,
  Info,
} from "lucide-react";

interface PricingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Pricing");

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
  ];

  const webServices = [
    { name: t("web.items.0.name"), price: t("web.items.0.price"), desc: t("web.items.0.desc") },
    { name: t("web.items.1.name"), price: t("web.items.1.price"), desc: t("web.items.1.desc") },
    { name: t("web.items.2.name"), price: t("web.items.2.price"), desc: t("web.items.2.desc") },
    { name: t("web.items.3.name"), price: t("web.items.3.price"), desc: t("web.items.3.desc") },
    { name: t("web.items.4.name"), price: t("web.items.4.price"), desc: t("web.items.4.desc") },
    { name: t("web.items.5.name"), price: t("web.items.5.price"), desc: t("web.items.5.desc") },
  ];

  const appServices = [
    { name: t("app.items.0.name"), price: t("app.items.0.price"), desc: t("app.items.0.desc") },
    { name: t("app.items.1.name"), price: t("app.items.1.price"), desc: t("app.items.1.desc") },
    { name: t("app.items.2.name"), price: t("app.items.2.price"), desc: t("app.items.2.desc") },
  ];

  const aiServices = [
    { name: t("ai.items.0.name"), price: t("ai.items.0.price"), desc: t("ai.items.0.desc") },
    { name: t("ai.items.1.name"), price: t("ai.items.1.price"), desc: t("ai.items.1.desc") },
    { name: t("ai.items.2.name"), price: t("ai.items.2.price"), desc: t("ai.items.2.desc") },
    { name: t("ai.items.3.name"), price: t("ai.items.3.price"), desc: t("ai.items.3.desc") },
    { name: t("ai.items.4.name"), price: t("ai.items.4.price"), desc: t("ai.items.4.desc") },
  ];

  const ongoingServices = [
    { name: t("ongoing.items.0.name"), price: t("ongoing.items.0.price"), desc: t("ongoing.items.0.desc") },
    { name: t("ongoing.items.1.name"), price: t("ongoing.items.1.price"), desc: t("ongoing.items.1.desc") },
    { name: t("ongoing.items.2.name"), price: t("ongoing.items.2.price"), desc: t("ongoing.items.2.desc") },
  ];

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-24">
      {/* 1. Header */}
      <section className="pt-12 pb-8 bg-noise border-b border-warm-border/60">
        <Container size="large">
          <div className="max-w-3xl">
            <Badge
              variant="vermilion"
              size="md"
              className="mb-4 uppercase tracking-widest text-[11px] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-vermilion" />
              <span>{t("tag")}</span>
            </Badge>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-charcoal leading-[1.12] mb-6">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl text-charcoal-muted leading-relaxed mb-4">
              {t("subtitle")}
            </p>
            <p className="text-sm text-charcoal-muted/80 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-vermilion flex-shrink-0 mt-0.5" />
              <span>{t("note")}</span>
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Web Development */}
      <section>
        <Container size="large">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-vermilion/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-vermilion" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                  {t("web.title")}
                </h2>
                <p className="text-sm text-charcoal-muted">{t("web.subtitle")}</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {webServices.map((service, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.08}>
                <Card className="h-full p-6 sm:p-7 bg-warm-card border-warm-border flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-charcoal mb-1">
                      {service.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                      {service.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-warm-border/60">
                    <span className="font-display text-lg font-black text-charcoal">{service.price}</span>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Mobile & Desktop Apps */}
      <section>
        <Container size="large">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-vermilion/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-vermilion" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                  {t("app.title")}
                </h2>
                <p className="text-sm text-charcoal-muted">{t("app.subtitle")}</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appServices.map((service, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.08}>
                <Card className="h-full p-6 sm:p-7 bg-warm-card border-warm-border flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-charcoal mb-1">
                      {service.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                      {service.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-warm-border/60">
                    <span className="font-display text-lg font-black text-charcoal">{service.price}</span>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. AI Automation & Systems */}
      <section>
        <Container size="large">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-vermilion/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-vermilion" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                  {t("ai.title")}
                </h2>
                <p className="text-sm text-charcoal-muted">{t("ai.subtitle")}</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiServices.map((service, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.08}>
                <Card className="h-full p-6 sm:p-7 bg-warm-card border-warm-border flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-charcoal mb-1">
                      {service.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                      {service.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-warm-border/60">
                    <span className="font-display text-lg font-black text-charcoal">{service.price}</span>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* AI API Cost Notice */}
          <ScrollReveal variant="fade-up" delay={0.3}>
            <div className="mt-6 p-5 rounded-2xl bg-cream/60 border border-warm-border/60 flex items-start gap-3">
              <Info className="w-4 h-4 text-vermilion flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {t("ai.apiNote")}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5. Ongoing Services */}
      <section>
        <Container size="large">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-vermilion/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-vermilion" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                  {t("ongoing.title")}
                </h2>
                <p className="text-sm text-charcoal-muted">{t("ongoing.subtitle")}</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ongoingServices.map((service, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.08}>
                <Card className="h-full p-6 sm:p-7 bg-warm-card border-warm-border flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-charcoal mb-1">
                      {service.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                      {service.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-warm-border/60">
                    <span className="font-display text-lg font-black text-charcoal">{service.price}</span>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. CTA Banner with Estimator */}
      <section>
        <Container size="large">
          <ScrollReveal variant="scale-up">
            <Card className="p-8 sm:p-12 bg-charcoal text-ivory text-center border-2 border-vermilion/50 shadow-vermilion-glow">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory mb-3">
                {t("cta.title")}
              </h3>
              <p className="text-sm sm:text-base text-ivory/70 mb-8 max-w-lg mx-auto leading-relaxed">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button href="/estimator" variant="primary" size="md" className="sm:text-base sm:px-8 sm:py-3.5" cursorText="ESTIMATE">
                  <Sparkles className="w-4 h-4" />
                  <span>Use Project Estimator</span>
                </Button>
                <Button href="/contact" variant="secondary" size="md" className="sm:text-base sm:px-8 sm:py-3.5" cursorText="TALK">
                  <span>{t("cta.button")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </section>

      {/* 7. FAQ Section */}
      <section className="pt-8">
        <Container size="large">
          <SectionHeading
            tag="FAQ"
            title={t("faq.title")}
            align="center"
          />
          <FaqAccordion items={faqItems} />
        </Container>
      </section>
    </div>
  );
}
