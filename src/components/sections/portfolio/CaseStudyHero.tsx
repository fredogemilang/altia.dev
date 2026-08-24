import { ArrowLeft, ExternalLink, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Project } from "@/data/projects";
import { getLocalizedPath } from "@/i18n/utils";

interface CaseStudyHeroProps {
  project: Project;
  lang: "id" | "en";
  backText: string;
}

export function CaseStudyHero({ project, lang, backText }: CaseStudyHeroProps) {
  return (
    <section className="relative pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-warm-border/60 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-ivory to-[#EDE3D2]">
      {/* Seamless Faded Background Grid with Ambient Radial Glow */}
      <div className="hero-grid-faded" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-vermilion/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="large" className="relative z-10">
        {/* Back Link */}
        <a
          href={getLocalizedPath("/portfolio", lang)}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted hover:text-vermilion mb-8 sm:mb-10 transition-colors group"
          data-cursor
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>{backText}</span>
        </a>

        {/* Header Content */}
        <div className="flex flex-col gap-6 max-w-5xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider text-[11px]">
              {project.category === "ai"
                ? (lang === "id" ? "AI & Sistem Otonom" : "AI & Autonomous Systems")
                : project.category === "app"
                ? (lang === "id" ? "Aplikasi Mobile & Desktop" : "Mobile & Desktop App")
                : (lang === "id" ? "Platform Web & Headless" : "Web & Headless Platform")}
            </Badge>
            <span className="text-xs font-mono font-medium text-charcoal-muted bg-cream px-3 py-1 rounded-full border border-warm-border/80">
              {project.client} · {project.year}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-charcoal leading-[1.05]">
            {project.title[lang]}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-charcoal-muted leading-relaxed font-normal max-w-4xl">
            {project.tagline[lang]}
          </p>

          {/* Quick Action Links */}
          {project.liveUrl && (
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="gap-2"
                cursorText="LIVE"
              >
                <span>{lang === "id" ? "Kunjungi Website Live" : "Visit Live Application"}</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-warm-card border border-warm-border shadow-warm">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-muted block mb-1">
              {lang === "id" ? "Klien" : "Client"}
            </span>
            <span className="font-display font-bold text-base sm:text-lg text-charcoal">
              {project.client}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-muted block mb-1">
              {lang === "id" ? "Tahun" : "Year"}
            </span>
            <span className="font-display font-bold text-base sm:text-lg text-charcoal">
              {project.year}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-muted block mb-1">
              {lang === "id" ? "Kategori" : "Category"}
            </span>
            <span className="font-display font-bold text-base sm:text-lg text-charcoal uppercase">
              {project.category}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-muted block mb-1">
              {lang === "id" ? "Stack Utama" : "Primary Stack"}
            </span>
            <span className="font-display font-bold text-base sm:text-lg text-charcoal truncate block">
              {project.stack[0]} + {project.stack[1] || "More"}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
