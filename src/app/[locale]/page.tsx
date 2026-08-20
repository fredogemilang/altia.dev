import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/effects/TextReveal";
import { HeroTitleAnimation } from "@/components/effects/HeroTitleAnimation";
import { HeroLamp } from "@/components/effects/HeroLamp";
import { HeroMarquee } from "@/components/effects/HeroMarquee";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { CounterAnimation } from "@/components/effects/CounterAnimation";
import { HorizontalScroll } from "@/components/effects/HorizontalScroll";
import { ParallaxImage } from "@/components/effects/ParallaxImage";
import { PROJECTS } from "@/data/projects";
import { TESTIMONIALS } from "@/data/testimonials";
import {
  Globe,
  Smartphone,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Clock,
  ShieldCheck,
  Flame,
  Layers,
  Code2,
  Terminal,
} from "lucide-react";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Hero");
  const tServices = await getTranslations("Services");
  const tPortfolio = await getTranslations("Portfolio");
  const tStats = await getTranslations("Stats");
  const tTestimonials = await getTranslations("Testimonials");
  const tCommon = await getTranslations("Common");

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const lang = locale === "id" ? "id" : "en";

  return (
    <div className="flex flex-col gap-36 sm:gap-48 lg:gap-56 pb-36 overflow-hidden">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION (Pure Vermilion Lamp on Warm Ivory Stage)   */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center pt-8 pb-12 sm:pt-20 sm:pb-20 bg-ivory bg-noise border-b border-warm-border/60 overflow-hidden">
        <HeroLamp>
          <Container size="large">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10 pt-2 sm:pt-6">
              {/* Studio Badge */}
              <Badge
                variant="vermilion"
                size="sm"
                className="mb-3.5 sm:mb-6 px-3 py-1 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs shadow-sm uppercase font-bold tracking-wider sm:tracking-widest border border-vermilion/30 max-w-[92vw]"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-vermilion animate-pulse-soft shrink-0" />
                <span className="truncate sm:overflow-visible">{tHero("badge")}</span>
              </Badge>

              {/* Main Headline */}
              <HeroTitleAnimation
                line1={tHero("titleLine1")}
                line2={tHero("titleLine2")}
                theme="light"
              />

              {/* Subtitle with Relaxed Leading */}
              <p className="text-xs sm:text-base md:text-lg text-charcoal-muted max-w-lg leading-relaxed mb-6 sm:mb-10 font-normal px-2 sm:px-0">
                {tHero("subtitle")}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto pb-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 shadow-vermilion-glow justify-center"
                  cursorText="START"
                >
                  <span>{tHero("primaryCta")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  href="/portfolio"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 justify-center"
                  cursorText="VIEW"
                >
                  <span>{tHero("secondaryCta")}</span>
                </Button>
              </div>
            </div>
          </Container>
        </HeroLamp>

        {/* Submerged Bottom Marquee Ticker */}
        <HeroMarquee />
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. SERVICES PREVIEW SECTION                                  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative">
        <Container size="large">
          <SectionHeading
            tag={tServices("tag")}
            title={tServices("title")}
            subtitle={tServices("subtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Service 1: Web */}
            <ScrollReveal variant="fade-up" delay={0.1}>
              <Card className="p-8 sm:p-10 h-full flex flex-col justify-between group hover:border-vermilion transition-all duration-300 rounded-3xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-vermilion mb-8 group-hover:scale-110 group-hover:bg-vermilion group-hover:text-ivory transition-all duration-300">
                    <Globe className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-display font-bold uppercase tracking-widest text-charcoal-muted mb-2 block">
                    {tServices("items.web.number")}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                    {tServices("items.web.title")}
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8">
                    {tServices("items.web.tagline")}
                  </p>
                </div>

                <div className="pt-6 border-t border-warm-border flex items-center justify-between">
                  <span className="text-xs font-display font-medium text-charcoal-muted">
                    WordPress, Laravel, Next.js, Go
                  </span>
                  <Link
                    href="/services#web"
                    className="text-xs font-display font-bold text-vermilion flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    data-cursor
                  >
                    <span>{tCommon("explore")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </ScrollReveal>

            {/* Service 2: App */}
            <ScrollReveal variant="fade-up" delay={0.25}>
              <Card className="p-8 sm:p-10 h-full flex flex-col justify-between group hover:border-vermilion transition-all duration-300 rounded-3xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-vermilion mb-8 group-hover:scale-110 group-hover:bg-vermilion group-hover:text-ivory transition-all duration-300">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-display font-bold uppercase tracking-widest text-charcoal-muted mb-2 block">
                    {tServices("items.app.number")}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                    {tServices("items.app.title")}
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8">
                    {tServices("items.app.tagline")}
                  </p>
                </div>

                <div className="pt-6 border-t border-warm-border flex items-center justify-between">
                  <span className="text-xs font-display font-medium text-charcoal-muted">
                    Flutter, React Native, Rust
                  </span>
                  <Link
                    href="/services#app"
                    className="text-xs font-display font-bold text-vermilion flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    data-cursor
                  >
                    <span>{tCommon("explore")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </ScrollReveal>

            {/* Service 3: AI */}
            <ScrollReveal variant="fade-up" delay={0.4}>
              <Card className="p-8 sm:p-10 h-full flex flex-col justify-between group hover:border-vermilion transition-all duration-300 rounded-3xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-vermilion mb-8 group-hover:scale-110 group-hover:bg-vermilion group-hover:text-ivory transition-all duration-300">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-display font-bold uppercase tracking-widest text-charcoal-muted mb-2 block">
                    {tServices("items.ai.number")}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                    {tServices("items.ai.title")}
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8">
                    {tServices("items.ai.tagline")}
                  </p>
                </div>

                <div className="pt-6 border-t border-warm-border flex items-center justify-between">
                  <span className="text-xs font-display font-medium text-charcoal-muted">
                    LangChain, Qdrant, Python
                  </span>
                  <Link
                    href="/services#ai"
                    className="text-xs font-display font-bold text-vermilion flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    data-cursor
                  >
                    <span>{tCommon("explore")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. FEATURED PROJECTS (HORIZONTAL PIN + SCRUB)                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-cream/40 py-4 sm:py-6">
        <HorizontalScroll
          headerContent={
            <div>
              <Badge variant="vermilion" className="mb-1 uppercase tracking-widest text-[10px] sm:text-[11px] font-bold">
                {tPortfolio("tag")}
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
                {tPortfolio("title")}
              </h2>
            </div>
          }
        >
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              className="p-5 sm:p-6 flex flex-col justify-between h-full bg-ivory shadow-warm group rounded-3xl"
            >
              <div>
                <div className="relative overflow-hidden rounded-2xl aspect-[16/7] w-full mb-4 shadow-sm bg-warm-card">
                  <Image
                    src={project.image}
                    alt={project.title[lang]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider text-[10px]">
                    {project.category.toUpperCase()}
                  </Badge>
                  <span className="text-[11px] font-display text-charcoal-muted">
                    {project.client} • {project.year}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-1.5 group-hover:text-vermilion transition-colors line-clamp-1">
                  {project.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-3 line-clamp-2">
                  {project.tagline[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-warm-border flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                  {project.stack.slice(0, 3).map((st) => (
                    <span
                      key={st}
                      className="text-[10px] font-display font-medium px-2 py-0.5 rounded bg-cream text-charcoal-500 truncate"
                    >
                      {st}
                    </span>
                  ))}
                </div>
                <Button
                  href={`/portfolio/${project.slug}`}
                  variant="ghost"
                  size="sm"
                  className="text-vermilion font-bold p-0 text-xs hover:bg-transparent"
                  cursorText="CASE"
                >
                  <span>{tPortfolio("viewProject")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </HorizontalScroll>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. STATS COUNTER SECTION                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative py-4 sm:py-8">
        <Container size="large">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 bg-charcoal text-ivory rounded-4xl p-10 sm:p-16 lg:p-20 shadow-warm-lg relative overflow-hidden">
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-vermilion mb-2">
                <CounterAnimation value={45} suffix="+" />
              </span>
              <span className="font-display font-bold text-sm sm:text-base text-ivory mb-1.5">
                {tStats("stat1.label")}
              </span>
              <span className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
                {tStats("stat1.description")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-vermilion mb-2">
                <CounterAnimation value={99.8} decimals={1} suffix="%" />
              </span>
              <span className="font-display font-bold text-sm sm:text-base text-ivory mb-1.5">
                {tStats("stat2.label")}
              </span>
              <span className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
                {tStats("stat2.description")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-vermilion mb-2">
                <CounterAnimation value={4.2} decimals={1} suffix="x" />
              </span>
              <span className="font-display font-bold text-sm sm:text-base text-ivory mb-1.5">
                {tStats("stat3.label")}
              </span>
              <span className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
                {tStats("stat3.description")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-vermilion mb-2">
                <CounterAnimation value={12} suffix="+" />
              </span>
              <span className="font-display font-bold text-sm sm:text-base text-ivory mb-1.5">
                {tStats("stat4.label")}
              </span>
              <span className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
                {tStats("stat4.description")}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 5. CLIENT STORIES & TESTIMONIALS                             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative">
        <Container size="large">
          <SectionHeading
            tag={tTestimonials("tag")}
            title={tTestimonials("title")}
            subtitle={tTestimonials("subtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {TESTIMONIALS.map((item, index) => (
              <ScrollReveal
                key={item.id}
                variant="fade-up"
                delay={index * 0.15}
                className="h-full"
              >
                <Card className="p-8 sm:p-10 h-full flex flex-col justify-between bg-warm-card border-warm-border rounded-3xl">
                  <div>
                    {item.metric && (
                      <Badge
                        variant="vermilion"
                        size="sm"
                        className="mb-8 font-bold uppercase tracking-wider text-[11px] px-3 py-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{item.metric[lang]}</span>
                      </Badge>
                    )}
                    <p className="text-base sm:text-lg text-charcoal leading-relaxed mb-10 italic">
                      &ldquo;{item.quote[lang]}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 pt-6 border-t border-warm-border">
                    <div className="w-11 h-11 rounded-full bg-cream overflow-hidden relative flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-sm sm:text-base text-charcoal leading-tight">
                        {item.author}
                      </span>
                      <span className="text-xs sm:text-sm text-charcoal-muted leading-tight mt-0.5">
                        {item.role[lang]}, {item.company}
                      </span>
                    </div>
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
