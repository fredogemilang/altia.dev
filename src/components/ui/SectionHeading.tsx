"use client";

import React, { forwardRef, useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { ScrollHighlightText } from "@/components/effects/ScrollHighlightText";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      className,
      tag,
      title,
      subtitle,
      align = "left",
      dark = false,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
      const container = internalRef.current;
      if (!container) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const elementsToAnimate = [tagRef.current, subRef.current].filter(Boolean);
      if (!elementsToAnimate.length) return;

      const ctx = gsap.context(() => {
        if (tagRef.current) gsap.set(tagRef.current, { opacity: 0, y: -16, scale: 0.9 });
        if (subRef.current) gsap.set(subRef.current, { opacity: 0.15, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            end: "bottom 35%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        if (tagRef.current) {
          tl.to(tagRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        if (subRef.current) {
          tl.to(
            subRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            tagRef.current ? ">-0.2" : 0
          );
        }
      }, container);

      return () => ctx.revert();
    }, [subtitle, tag]);

    return (
      <div
        ref={(node) => {
          (internalRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(
          "flex flex-col gap-4 mb-16 sm:mb-24",
          {
            "items-start text-left": align === "left",
            "items-center text-center": align === "center",
            "items-end text-right": align === "right",
          },
          className
        )}
        {...props}
      >
        {tag && (
          <div ref={tagRef} className="will-change-transform">
            <Badge
              variant={dark ? "charcoal" : "vermilion"}
              className="mb-2 uppercase tracking-widest text-[11px] font-bold px-3 py-1"
            >
              {tag}
            </Badge>
          </div>
        )}

        <h2
          className={cn(
            "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]",
            dark ? "text-ivory" : "text-charcoal"
          )}
        >
          <ScrollHighlightText text={title} dark={dark} />
        </h2>

        {subtitle && (
          <p
            ref={subRef}
            className={cn(
              "text-base sm:text-lg max-w-xl leading-relaxed mt-1 will-change-transform",
              dark ? "text-ivory/70" : "text-charcoal-muted"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";

