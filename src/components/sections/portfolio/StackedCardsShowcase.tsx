"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { getLocalizedPath } from "@/i18n/utils";

interface StackedCardsShowcaseProps {
  projects: Project[];
  lang: "en" | "id";
  exploreText: string;
}

export function StackedCardsShowcase({
  projects,
  lang,
  exploreText,
}: StackedCardsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];

        ScrollTrigger.create({
          trigger: nextCard,
          start: "top 85%",
          end: "top 25%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.06;
            const opacity = 1 - progress * 0.25;
            const brightness = 1 - progress * 0.15;

            gsap.set(card, {
              scale,
              opacity,
              filter: `brightness(${brightness})`,
              transformOrigin: "center top",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-8 sm:gap-12 pb-8">
      {projects.map((project, idx) => {
        const topOffset = 100 + idx * 24;

        return (
          <div
            key={project.slug}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            style={{ top: `${topOffset}px` }}
            className="sticky rounded-4xl bg-warm-card border border-warm-border p-6 sm:p-10 lg:p-12 shadow-warm-lg overflow-hidden will-change-transform group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (Metadata & Details) */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge
                      variant="vermilion"
                      size="sm"
                      className="uppercase font-bold tracking-wider text-[11px]"
                    >
                      {project.category}
                    </Badge>
                    <span className="text-xs font-display font-medium text-charcoal-muted">
                      {project.client} · {project.year}
                    </span>
                  </div>

                  <a
                    href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                    className="block group/title"
                    data-cursor
                    data-cursor-text="VIEW"
                  >
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-charcoal tracking-tight group-hover:text-vermilion transition-colors mb-3">
                      {project.title[lang]}
                    </h3>
                  </a>

                  <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-6 font-normal">
                    {project.tagline[lang]}
                  </p>

                  {/* Impact Highlights */}
                  {project.impact[lang] && project.impact[lang].length > 0 && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-warm-border/60">
                      {project.impact[lang].slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-charcoal/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-vermilion shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Stack & CTA Link */}
                <div className="pt-4 border-t border-warm-border/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-cream text-charcoal/75 border border-warm-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-bold text-charcoal hover:text-vermilion transition-colors group/link"
                    data-cursor
                    data-cursor-text="VIEW"
                  >
                    <span>{exploreText}</span>
                    <ArrowUpRight className="w-4 h-4 text-vermilion transition-transform duration-200 ease-emil-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Right Column (Visual Mockup Image) */}
              <a
                href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                className="lg:col-span-6 block relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-warm-card border border-warm-border/50 cursor-pointer"
                data-cursor
                data-cursor-text="VIEW"
              >
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-emil-out group-hover:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-emil-out" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
