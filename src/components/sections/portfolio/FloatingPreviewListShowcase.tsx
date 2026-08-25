"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { gsap } from "@/lib/gsapConfig";
import { getLocalizedPath } from "@/i18n/utils";

interface FloatingPreviewListShowcaseProps {
  projects: Project[];
  lang: "en" | "id";
  exploreText: string;
}

export function FloatingPreviewListShowcase({
  projects,
  lang,
  exploreText,
}: FloatingPreviewListShowcaseProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(projects[0] || null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preview = previewRef.current;
    const container = containerRef.current;
    if (!preview || !container) return;

    // QuickTo physics for ultra smooth cursor follow
    const xTo = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - 175; // Half width of preview card (350px / 2)
      const y = e.clientY - rect.top - 110; // Half height of preview card (220px / 2)
      xTo(x);
      yTo(y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-6">
      {/* Floating Magnetic Image Preview (Desktop Only) */}
      <div
        ref={previewRef}
        className={`hidden lg:block pointer-events-none absolute top-0 left-0 z-30 w-[350px] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-warm-card transition-[transform,opacity] duration-200 ease-emil-out ${
          isHovering ? "opacity-100 scale-100" : "opacity-0 scale-[0.95]"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        {activeProject && (
          <div className="relative w-full h-full">
            <img
              src={activeProject.image}
              alt={activeProject.title[lang]}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-display font-bold text-ivory drop-shadow-md">
                {activeProject.client} · {activeProject.category.toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Editorial Index List */}
      <div className="divide-y divide-warm-border/80 border-y border-warm-border/80">
        {projects.map((project, index) => (
          <a
            key={project.slug}
            href={getLocalizedPath(`/portfolio/${project.slug}`, lang)}
            onMouseEnter={() => {
              setActiveProject(project);
              setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative flex flex-col lg:flex-row lg:items-center justify-between py-6 sm:py-8 px-4 sm:px-6 transition-[background-color,transform] duration-200 ease-emil-out hover:bg-cream/50 active:scale-[0.99] rounded-2xl will-change-transform"
          >
            {/* Left: Number & Title */}
            <div className="flex items-start lg:items-center gap-4 sm:gap-6 flex-1 pr-4">
              <span className="text-xs font-mono font-bold text-charcoal-muted group-hover:text-vermilion transition-colors duration-160 mt-1 lg:mt-0">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal group-hover:text-vermilion transition-colors duration-160 leading-snug">
                  {project.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted line-clamp-1 mt-1 font-normal max-w-xl">
                  {project.tagline[lang]}
                </p>
              </div>
            </div>

            {/* Right: Meta, Stack & Arrow */}
            <div className="flex items-center justify-between lg:justify-end gap-6 mt-4 lg:mt-0">
              <div className="flex items-center gap-2">
                <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider text-[10px]">
                  {project.category.toUpperCase()}
                </Badge>
                <span className="text-xs font-display text-charcoal-muted hidden sm:inline">
                  {project.client}
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1.5">
                {project.stack.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-warm-border/60 text-charcoal-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="w-10 h-10 rounded-full bg-white border border-warm-border flex items-center justify-center text-charcoal group-hover:bg-vermilion group-hover:text-ivory group-hover:border-vermilion group-hover:scale-105 transition-[background-color,border-color,color,transform] duration-200 ease-emil-out">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-emil-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Mobile Thumbnail Preview */}
            <div className="block lg:hidden relative aspect-[16/9] w-full rounded-xl overflow-hidden mt-4 border border-warm-border">
              <img
                src={project.image}
                alt={project.title[lang]}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
