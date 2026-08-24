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
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0.15, y: 60, scale: 0.95 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 20%",
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          index === 0 ? 0 : ">-0.45"
        );
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
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-warm-border">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2 rounded-full font-display text-xs sm:text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-vermilion text-ivory shadow-sm"
                  : "bg-cream text-charcoal-500 hover:text-charcoal hover:bg-ivory"
              )}
              data-cursor
            >
              {t(cat.labelKey)}
            </button>
          );
        })}
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
