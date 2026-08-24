"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

interface ProcessStepsGridProps {
  steps: ProcessStep[];
}

export function ProcessStepsGrid({ steps }: ProcessStepsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // 1. Initial State: cards lowered slightly with low opacity
      cards.forEach((card) => {
        gsap.set(card, {
          y: 45,
          scale: 0.95,
          opacity: 0.2,
        });
      });

      // 2. Chained Domino Wave Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 35%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          index === 0 ? 0 : ">-0.5"
        );
      });
    }, el);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
    >
      {steps.map((step, index) => (
        <div
          key={index}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 overflow-hidden group hover:border-vermilion/40 transition-colors duration-300 will-change-transform h-full"
        >
          {/* Faded Technical Grid Header (covering Number & Title, fading out before Description) */}
          <div className="step-grid-header group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top Subtle Ambient Radial Glow on hover */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-vermilion/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-4">
            <span className="font-display font-black text-4xl text-vermilion tracking-tight">
              {step.number}
            </span>
            <h3 className="font-display text-xl font-bold text-ivory leading-snug">
              {step.title}
            </h3>
            <p className="text-sm text-ivory/70 leading-relaxed pt-2">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
