"use client";

import React, { useEffect, useRef } from "react";
import { CounterAnimation } from "@/components/effects/CounterAnimation";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export interface StatItem {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  description: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        gsap.set(item, { opacity: 0.15, y: 40, scale: 0.94 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 30%",
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((item, index) => {
        tl.to(
          item,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          index === 0 ? 0 : ">-0.45"
        );
      });
    }, el);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 texture-charcoal-spotlight text-ivory rounded-4xl p-10 sm:p-16 lg:p-20 shadow-[0_20px_50px_rgba(47,42,38,0.2)] border border-ivory/10 relative overflow-hidden"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className="flex flex-col will-change-transform"
        >
          <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-vermilion mb-2">
            <CounterAnimation
              value={stat.value}
              decimals={stat.decimals}
              suffix={stat.suffix}
            />
          </span>
          <span className="font-display font-bold text-sm sm:text-base text-ivory mb-1.5">
            {stat.label}
          </span>
          <span className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
            {stat.description}
          </span>
        </div>
      ))}
    </div>
  );
}
