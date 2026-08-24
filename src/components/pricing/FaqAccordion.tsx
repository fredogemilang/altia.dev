"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const accordionElements = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!accordionElements.length) return;

    const ctx = gsap.context(() => {
      accordionElements.forEach((item) => {
        gsap.set(item, { opacity: 0.2, y: 35, scale: 0.97 });
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

      accordionElements.forEach((item, index) => {
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
  }, [items]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden",
              isOpen
                ? "bg-warm-card border-vermilion/40 shadow-sm"
                : "bg-cream/40 border-warm-border hover:border-charcoal/20"
            )}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-charcoal"
              data-cursor
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-vermilion flex-shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-sm sm:text-base text-charcoal-muted leading-relaxed border-t border-warm-border/40 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
