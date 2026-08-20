import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/effects/ParallaxImage";
import { getCmsProjects, getCmsProjectBySlug } from "@/lib/payload/data";
import { PROJECTS } from "@/data/projects";
import { routing } from "@/i18n/routing";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Building,
  Layers,
} from "lucide-react";

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  routing.locales.forEach((locale) => {
    PROJECTS.forEach((project) => {
      params.push({ locale, slug: project.slug });
    });
  });
  return params;
}

interface ProjectDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getCmsProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations("Portfolio");
  const lang = locale === "id" ? "id" : "en";

  const allProjects = await getCmsProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length] || allProjects[0];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* 1. Header & Back button */}
      <section className="pt-8 bg-noise border-b border-warm-border/60 pb-12">
        <Container size="large">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-charcoal-muted hover:text-vermilion mb-8 transition-colors"
            data-cursor
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("backToList")}</span>
          </Link>

          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <Badge variant="vermilion" size="md" className="uppercase font-bold tracking-wider">
                {project.category.toUpperCase()}
              </Badge>
              <span className="text-sm font-display text-charcoal-muted">
                {project.client} • {project.year}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-charcoal leading-[1.12]">
              {project.title[lang]}
            </h1>

            <p className="text-lg sm:text-2xl text-charcoal-muted leading-relaxed">
              {project.tagline[lang]}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Hero Image */}
      <section>
        <Container size="large">
          <ParallaxImage
            src={project.image}
            alt={project.title[lang]}
            aspectRatio="aspect-[21/9]"
            className="shadow-warm-lg"
          />
        </Container>
      </section>

      {/* 3. Case Study Breakdown */}
      <section>
        <Container size="large">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Project Meta Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-cream/50 rounded-3xl p-6 sm:p-8 border border-warm-border flex flex-col gap-6">
                <div>
                  <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted block mb-1">
                    Client
                  </span>
                  <span className="font-display font-bold text-base text-charcoal">
                    {project.client}
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted block mb-1">
                    Year
                  </span>
                  <span className="font-display font-bold text-base text-charcoal">
                    {project.year}
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted block mb-1">
                    Discipline
                  </span>
                  <span className="font-display font-bold text-base text-charcoal capitalize">
                    {project.category === "ai"
                      ? "AI Automation & Systems"
                      : project.category === "app"
                      ? "Mobile & Desktop App"
                      : "Web Development"}
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted block mb-2">
                    {t("technologies")}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <Badge key={item} variant="cream" size="sm">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.liveUrl && (
                  <div className="pt-4 border-t border-warm-border">
                    <Button
                      href="/contact"
                      variant="primary"
                      size="sm"
                      className="w-full"
                      cursorText="BUILD"
                    >
                      <span>Build a Similar Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Case Study Content */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              {/* Overview */}
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                  {t("overview")}
                </h2>
                <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
                  {project.summary[lang]}
                </p>
              </div>

              {/* Challenge */}
              <div className="p-8 rounded-3xl bg-warm-card border border-warm-border">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-3">
                  {t("challenge")}
                </h3>
                <p className="text-base text-charcoal-muted leading-relaxed">
                  {project.challenge[lang]}
                </p>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-3xl bg-cream/40 border border-warm-border">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-3">
                  {t("solution")}
                </h3>
                <p className="text-base text-charcoal-muted leading-relaxed">
                  {project.solution[lang]}
                </p>
              </div>

              {/* Impact / Metrics */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-4">
                  {t("impact")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.impact[lang].map((metric, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-charcoal text-ivory flex flex-col gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-vermilion" />
                      <span className="font-display font-medium text-sm text-ivory/90 leading-snug">
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Next Project Navigation Banner */}
      <section className="pt-12 border-t border-warm-border">
        <Container size="large">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-12 rounded-4xl bg-warm-card border border-warm-border">
            <div className="flex flex-col">
              <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted mb-1">
                {t("nextProject")}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                {nextProject.title[lang]}
              </h3>
            </div>

            <Button
              href={`/portfolio/${nextProject.slug}`}
              variant="primary"
              size="md"
              cursorText="NEXT"
            >
              <span>{t("viewProject")}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
