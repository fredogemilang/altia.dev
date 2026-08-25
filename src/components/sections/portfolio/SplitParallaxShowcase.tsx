"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { getLocalizedPath } from "@/i18n/utils";

interface SplitParallaxShowcaseProps {
  projects: Project[];
  lang: "en" | "id";
  exploreText: string;
}

export function SplitParallaxShowcase({
  projects,
  lang,
  exploreText,
}: SplitParallaxShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, idx) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });

        // Parallax image movement inside card
        const img = el.querySelector(".parallax-img");
        if (img) {
          gsap.fromTo(
            img,
            { y: "-8%" },
            {
              y: "8%",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  const currentProject = projects[activeIndex] || projects[0];

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (Sticky Active Details Panel) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 p-8 sm:p-10 rounded-3xl bg-warm-card border-2 border-warm-border shadow-warm-lg flex flex-col justify-between min-h-[440px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider text-[11px]">
                {currentProject.category.toUpperCase()}
              </Badge>
              <span className="text-xs font-mono font-bold text-charcoal-muted">
                0{activeIndex + 1} / 0{projects.length}
              </span>
            </div>

            <span className="text-xs font-display font-medium text-charcoal-muted block mb-1">
              {currentProject.client} · {currentProject.year}
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-charcoal tracking-tight mb-3">
              {currentProject.title[lang]}
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6">
              {currentProject.tagline[lang]}
            </p>

            {/* Impact Highlights */}
            {currentProject.impact[lang] && currentProject.impact[lang].length > 0 && (
              <div className="space-y-2 mb-6 pt-4 border-t border-warm-border/60">
                {currentProject.impact[lang].slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-charcoal font-medium">
                    <CheckCircle2 className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-warm-border/60 mb-6">
              {currentProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream text-charcoal/80 border border-warm-border/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Button
            href={getLocalizedPath(`/portfolio/${currentProject.slug}`, lang)}
            variant="primary"
            size="sm"
            className="w-full justify-center shadow-vermilion-glow"
          >
            <span>{exploreText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Right Column (Parallax Media Stream) */}
        <div className="lg:col-span-7 flex flex-col gap-12 sm:gap-16">
          {projects.map((project, idx) => (
            <div
              key={project.slug}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={`rounded-3xl overflow-hidden border-2 transition-all duration-500 bg-warm-card shadow-md ${
                activeIndex === idx
                  ? "border-vermilion shadow-lg ring-4 ring-vermilion/10"
                  : "border-warm-border opacity-70 hover:opacity-100"
              }`}
            >
              <a
                href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
                className="block relative aspect-[16/10] overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  loading="lazy"
                  className="parallax-img object-cover w-full h-full scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent flex items-end p-6">
                  <div className="flex items-center justify-between w-full text-ivory">
                    <span className="font-display font-bold text-base sm:text-lg">
                      {project.title[lang]}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-ivory" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
