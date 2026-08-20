import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { TEAM_MEMBERS } from "@/data/team";
import {
  Sparkles,
  HeartHandshake,
  Target,
  Eye,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");
  const lang = locale === "id" ? "id" : "en";

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-24">
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
          </div>
        </Container>
      </section>

      {/* 2. Philosophy / Story */}
      <section>
        <Container size="large">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase font-display font-bold tracking-widest text-vermilion mb-2 block">
                {t("storyTitle")}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                Software built with intent, beauty, and scale.
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-charcoal-muted leading-relaxed">
              <p>{t("storyP1")}</p>
              <p>{t("storyP2")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Core Values / Pillars */}
      <section className="py-12 bg-charcoal text-ivory">
        <Container size="large">
          <SectionHeading
            tag={t("values.tag")}
            title="The three pillars that guide every line of code"
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal variant="fade-up" delay={0.1}>
              <div className="flex flex-col gap-4 p-8 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 h-full">
                <div className="w-12 h-12 rounded-2xl bg-vermilion text-ivory flex items-center justify-center font-display font-bold">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ivory">
                  {t("values.v1Title")}
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  {t("values.v1Desc")}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.25}>
              <div className="flex flex-col gap-4 p-8 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 h-full">
                <div className="w-12 h-12 rounded-2xl bg-vermilion text-ivory flex items-center justify-center font-display font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ivory">
                  {t("values.v2Title")}
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  {t("values.v2Desc")}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.4}>
              <div className="flex flex-col gap-4 p-8 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 h-full">
                <div className="w-12 h-12 rounded-2xl bg-vermilion text-ivory flex items-center justify-center font-display font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ivory">
                  {t("values.v3Title")}
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  {t("values.v3Desc")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 4. Team Members */}
      <section>
        <Container size="large">
          <SectionHeading
            tag="Team"
            title={t("teamTitle")}
            subtitle="Engineers, architects, and designers dedicated to elevating digital products."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <ScrollReveal
                key={member.name}
                variant="fade-up"
                delay={index * 0.1}
                className="h-full"
              >
                <Card className="h-full flex flex-col justify-between p-6 bg-warm-card border-warm-border group hover:border-vermilion">
                  <div>
                    <div className="aspect-square w-full rounded-2xl bg-cream overflow-hidden mb-6 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-display font-bold text-xl text-charcoal mb-1">
                      {member.name}
                    </h3>
                    <span className="text-xs font-display font-bold uppercase tracking-wider text-vermilion block mb-3">
                      {member.role[lang]}
                    </span>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-6">
                      {member.bio[lang]}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-warm-border text-charcoal-muted">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full hover:text-vermilion transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full hover:text-vermilion transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full hover:text-vermilion transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
