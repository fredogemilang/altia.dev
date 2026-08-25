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
              "rounded-2xl border transition-[border-color,background-color,box-shadow] duration-220 ease-emil-out overflow-hidden will-change-transform",
              isOpen
                ? "bg-warm-card border-vermilion/50 shadow-warm"
                : "bg-cream/40 border-warm-border hover:border-charcoal/30 hover:bg-cream/70"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-charcoal transition-[color,transform] duration-160 ease-emil-out active:scale-[0.99] select-none group"
              data-cursor
            >
              <span className={cn("transition-colors duration-160 ease-emil-out", isOpen ? "text-vermilion" : "text-charcoal")}>
                {item.question}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-220 ease-emil-out flex-shrink-0",
                  isOpen
                    ? "bg-vermilion/15 text-vermilion rotate-180"
                    : "bg-cream text-charcoal-muted group-hover:text-charcoal"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            <div className={cn("accordion-grid-container", isOpen && "is-open")}>
              <div className="accordion-grid-content">
                <div className="px-6 pb-6 text-sm sm:text-base text-charcoal-muted leading-relaxed border-t border-warm-border/40 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
