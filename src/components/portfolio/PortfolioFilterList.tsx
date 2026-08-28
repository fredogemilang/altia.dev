"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "@/i18n/useI18n";
import { type Locale, getLocalizedPath } from "@/i18n/utils";
import type { Project } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/effects/ParallaxImage";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

/**
 * Builds a srcSet string for portfolio card images.
 * Expects images in the form /uploads/portfolio/{project}/1.webp
 * and will reference generated -sm (640w) and -md (960w) variants.
 */
function buildPortfolioSrcSet(src: string): string | undefined {
  if (!src) return undefined;
  const ext = src.lastIndexOf('.');
  if (ext === -1) return undefined;
  const base = src.slice(0, ext);
  const suffix = src.slice(ext);
  return [
    `${base}-sm${suffix} 640w`,
    `${base}-md${suffix} 960w`,
    `${src} 2560w`,
  ].join(', ');
}

interface PortfolioFilterListProps {
  projects: Project[];
  locale?: string;
}

export function PortfolioFilterList({
  projects,
  locale = "en",
}: PortfolioFilterListProps) {
  const lang: Locale = locale === "id" ? "id" : "en";
  const t = useTranslations("Portfolio", lang);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "web" | "app" | "ai"
  >("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tagParam = params.get("tag") || params.get("company");
      if (tagParam) {
        setSelectedTag(tagParam);
      }
    }
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesTag =
      !selectedTag ||
      p.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase()) ||
      p.client.toLowerCase().includes(selectedTag.toLowerCase()) ||
      p.title.en.toLowerCase().includes(selectedTag.toLowerCase()) ||
      p.title.id.toLowerCase().includes(selectedTag.toLowerCase());
    return matchesCategory && matchesTag;
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(cards, { opacity: 0, y: 36, scale: 0.97 });

      // Domino Wave Reveal via ScrollTrigger Batch
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.12, // Snappy domino delay between adjacent cards
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [filteredProjects]);

  const categories: Array<{ id: "all" | "web" | "app" | "ai"; labelKey: string }> = [
    { id: "all", labelKey: "allFilter" },
    { id: "web", labelKey: "webFilter" },
    { id: "app", labelKey: "appFilter" },
    { id: "ai", labelKey: "aiFilter" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-warm-border">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2 rounded-full font-display text-xs sm:text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-160 ease-emil-out active:scale-[0.96] select-none",
                  isActive
                    ? "bg-vermilion text-ivory shadow-warm hover:-translate-y-0.5"
                    : "bg-cream text-charcoal-500 hover:text-charcoal hover:bg-ivory hover:-translate-y-0.5"
                )}
                data-cursor
              >
                {t(cat.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Selected Tag Filter Badge */}
        {selectedTag && (
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cream border border-warm-border text-xs font-display animate-popover-enter">
            <span className="text-charcoal-muted">
              {lang === "id" ? "Tag:" : "Tag:"}
            </span>
            <span className="font-bold text-charcoal font-mono bg-warm-border/50 px-2 py-0.5 rounded-md text-[11px]">
              #{selectedTag}
            </span>
            <span className="text-[11px] text-charcoal-muted font-mono">
              ({filteredProjects.length})
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedTag(null);
                const url = new URL(window.location.href);
                url.searchParams.delete("tag");
                url.searchParams.delete("company");
                window.history.replaceState({}, "", url.toString());
              }}
              className="ml-1 w-4 h-4 rounded-full bg-charcoal/10 hover:bg-vermilion hover:text-ivory inline-flex items-center justify-center text-[10px] font-bold transition-colors"
              title={lang === "id" ? "Hapus filter tag" : "Clear tag filter"}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project, index) => (
          <div
            key={project.slug}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="will-change-transform h-full"
          >
            <Card
              className="flex flex-col justify-between h-full bg-warm-card border-warm-border group hover:border-vermilion"
            >
            <div>
              <a
                href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                className="block mb-6 shadow-sm cursor-pointer"
                data-cursor
                data-cursor-text="VIEW"
              >
                <ParallaxImage
                  src={project.image}
                  alt={project.title[lang]}
                  aspectRatio="aspect-[16/10]"
                  className="w-full"
                  priority={index < 2}
                  srcSet={buildPortfolioSrcSet(project.image)}
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 620px"
                />
              </a>
              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant="vermilion"
                  size="sm"
                  className="uppercase font-bold tracking-wider text-[11px]"
                >
                  {project.category.toUpperCase()}
                </Badge>
                <span className="text-xs font-display text-charcoal-muted">
                  {project.client} · {project.year}
                </span>
              </div>
              <a
                href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                className="block group/title"
                data-cursor
                data-cursor-text="VIEW"
              >
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-3 group-hover:text-vermilion transition-colors">
                  {project.title[lang]}
                </h3>
              </a>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                {project.tagline[lang]}
              </p>
            </div>

            <div className="pt-4 border-t border-warm-border flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5 max-w-[60%]">
                {project.stack.slice(0, 3).map((st) => (
                  <span
                    key={st}
                    className="text-[11px] font-display font-medium px-2 py-0.5 rounded bg-cream text-charcoal-500 truncate"
                  >
                    {st}
                  </span>
                ))}
              </div>
              <Button
                href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                variant="ghost"
                size="sm"
                className="text-vermilion font-bold p-0 hover:bg-transparent"
                cursorText="VIEW"
              >
                <span>{t("viewProject")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
        ))}
      </div>
    </div>
  );
}
