"use client";

import React, { useState } from "react";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { StackedCardsShowcase } from "./StackedCardsShowcase";
import { FloatingPreviewListShowcase } from "./FloatingPreviewListShowcase";
import { SplitParallaxShowcase } from "./SplitParallaxShowcase";
import { HorizontalScroll } from "@/components/effects/HorizontalScroll";
import { Card } from "@/components/ui/Card";
import { getLocalizedPath } from "@/i18n/utils";
import { ArrowUpRight, Layers, List, Columns, MoveHorizontal } from "lucide-react";

interface PortfolioShowcaseManagerProps {
  projects: Project[];
  lang: "en" | "id";
  tag: string;
  title: string;
  exploreText: string;
}

type ShowcaseMode = "stacking" | "list" | "split" | "horizontal";

export function PortfolioShowcaseManager({
  projects,
  lang,
  tag,
  title,
  exploreText,
}: PortfolioShowcaseManagerProps) {
  const [mode, setMode] = useState<ShowcaseMode>("stacking");

  const modeOptions: { id: ShowcaseMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "stacking", label: "1. Stacking Cards", icon: Layers },
    { id: "list", label: "2. Editorial List", icon: List },
    { id: "split", label: "3. Split Parallax", icon: Columns },
    { id: "horizontal", label: "Horizontal", icon: MoveHorizontal },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 overflow-hidden">
      <Container size="large">
        {/* Header with Title + Interactive Showcase Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <Badge variant="vermilion" className="mb-2 uppercase tracking-widest text-[10px] sm:text-[11px] font-bold">
              {tag}
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-charcoal">
              {title}
            </h2>
          </div>

          {/* Studio Showcase Switcher Bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-cream border-2 border-warm-border shadow-sm flex-wrap w-fit">
            <span className="text-[10px] font-mono uppercase font-bold text-charcoal-muted px-2.5 py-1 hidden sm:inline">
              Layout:
            </span>
            {modeOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMode(opt.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display text-xs font-bold transition-[background-color,color,box-shadow,transform] duration-160 ease-emil-out active:scale-[0.96] will-change-transform ${
                    isActive
                      ? "bg-charcoal text-ivory shadow-sm"
                      : "text-charcoal-500 hover:text-charcoal hover:bg-ivory"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-vermilion" : "text-charcoal-muted"}`} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Layout Rendering */}
        <div className="relative">
          {mode === "stacking" && (
            <StackedCardsShowcase projects={projects} lang={lang} exploreText={exploreText} />
          )}

          {mode === "list" && (
            <FloatingPreviewListShowcase projects={projects} lang={lang} exploreText={exploreText} />
          )}

          {mode === "split" && (
            <SplitParallaxShowcase projects={projects} lang={lang} exploreText={exploreText} />
          )}

          {mode === "horizontal" && (
            <div className="w-full">
              <HorizontalScroll>
                {projects.map((project) => (
                  <Card
                    key={project.slug}
                    className="p-6 sm:p-8 h-full flex flex-col justify-between group hover:border-vermilion transition-[transform,border-color,box-shadow] duration-250 ease-emil-out rounded-3xl bg-warm-card border-2 border-warm-border shadow-warm will-change-transform"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-charcoal">
                        <img
                          src={project.image}
                          alt={project.title[lang]}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 ease-emil-out group-hover:scale-105 will-change-transform"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider text-[10px]">
                          {project.category.toUpperCase()}
                        </Badge>
                        <span className="text-[11px] font-display text-charcoal-muted">
                          {project.client} · {project.year}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-1.5 group-hover:text-vermilion transition-colors line-clamp-1">
                        {project.title[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-3 line-clamp-2">
                        {project.tagline[lang]}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-warm-border flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {project.stack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream text-charcoal-muted border border-warm-border/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                        className="text-xs font-display font-bold text-vermilion flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>{exploreText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </Card>
                ))}
              </HorizontalScroll>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
