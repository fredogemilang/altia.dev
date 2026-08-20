"use client";

import { useEffect, useRef, ReactNode, ElementType } from "react";
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
  threshold?: number;
}

export function ScrollReveal({
  children,
  as: Component = "div",
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  start = "top 85%",
}: ScrollRevealProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let anim: gsap.core.Tween | gsap.core.Timeline;

    if (variant === "stagger-children") {
      const childNodes = Array.from(el.children);
      gsap.set(childNodes, { opacity: 0, y: 40 });

      anim = gsap.to(childNodes, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });
    } else {
      const initialProps: gsap.TweenVars = { opacity: 0 };
      switch (variant) {
        case "fade-up":
          initialProps.y = 50;
          break;
        case "fade-down":
          initialProps.y = -50;
          break;
        case "fade-left":
          initialProps.x = 50;
          break;
        case "fade-right":
          initialProps.x = -50;
          break;
        case "scale-up":
          initialProps.scale = 0.92;
          break;
      }

      gsap.set(el, initialProps);

      anim = gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });
    }

    return () => {
      anim?.kill();
    };
  }, [variant, delay, duration, stagger, start]);

  return (
    <Component
      ref={elRef}
      className={cn("will-change-transform", className)}
    >
      {children}
    </Component>
  );
}
