"use client";

import React, { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "stagger-children";
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  threshold?: number;
  key?: any;
}

export function ScrollReveal({
  children,
  as: Component = "div",
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  stagger = 0.25,
  start = "top 88%",
  end = "bottom 20%",
  scrub = 1.0,
}: ScrollRevealProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (variant === "stagger-children") {
        const childNodes = Array.from(el.children);
        if (!childNodes.length) return;

        gsap.set(childNodes, {
          opacity: 0.15,
          y: 45,
          scale: 0.96,
        });

        // Timeline scrub for cascading wave (Item 1 -> Item 2 -> Item 3)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: typeof scrub === "number" ? scrub : 1.0,
            invalidateOnRefresh: true,
          },
        });

        childNodes.forEach((child, idx) => {
          tl.to(
            child,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            idx === 0 ? 0 : ">-0.45" // Overlapping wave offset
          );
        });
      } else {
        const initialProps: gsap.TweenVars = { opacity: 0.15 };
        switch (variant) {
          case "fade-up":
            initialProps.y = 45;
            break;
          case "fade-down":
            initialProps.y = -45;
            break;
          case "fade-left":
            initialProps.x = 45;
            break;
          case "fade-right":
            initialProps.x = -45;
            break;
          case "scale-up":
            initialProps.scale = 0.92;
            break;
        }

        gsap.set(el, initialProps);

        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: typeof scrub === "number" ? scrub : 1.0,
            invalidateOnRefresh: true,
          },
        });
      }
    }, elRef);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, start, end, scrub]);

  return (
    <Component
      ref={elRef}
      className={cn("will-change-transform", className)}
    >
      {children}
    </Component>
  );
}

