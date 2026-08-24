"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: ReactNode[];
  className?: string;
  headerContent?: ReactNode;
}

export function HorizontalScroll({
  children,
  className,
  headerContent,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<HTMLSpanElement>(null);
  const totalPanels = children.length;

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Calculate total horizontal scroll distance
      const getScrollAmount = () => {
        return -(section.scrollWidth - window.innerWidth + 80);
      };

      const tween = gsap.to(section, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Direct DOM updates: 0 React re-renders for buttery 120fps smoothness
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(
                5,
                self.progress * 100
              )}%`;
            }
            if (activeIndexRef.current) {
              const index = Math.min(
                totalPanels,
                Math.floor(self.progress * totalPanels) + 1
              );
              activeIndexRef.current.textContent = `0${index}`;
            }
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [totalPanels]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden w-full min-h-screen flex flex-col justify-center pt-20 pb-12",
        className
      )}
    >
      {/* Sticky Header & Progress Indicator */}
      {headerContent && (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex-1">{headerContent}</div>

          {/* Desktop Progress Counter (Zero re-render DOM targets) */}
          <div className="hidden lg:flex items-center gap-4 text-sm font-display text-charcoal-muted mb-1">
            <span
              ref={activeIndexRef}
              className="text-xl font-bold text-vermilion"
            >
              01
            </span>
            <div className="w-24 h-1 bg-warm-border rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-vermilion transition-all duration-75 ease-out"
                style={{ width: "5%" }}
              />
            </div>
            <span>0{totalPanels}</span>
          </div>
        </div>
      )}

      {/* Horizontal Panels Wrapper */}
      <div
        ref={sectionRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 lg:w-max will-change-transform items-stretch"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="horizontal-panel w-full lg:w-[680px] xl:w-[760px] 2xl:w-[820px] lg:flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
