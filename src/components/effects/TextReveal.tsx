"use client";

import { useEffect, useRef, ElementType, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  type?: "chars" | "words";
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

export function TextReveal({
  children,
  as: Component = "div",
  className,
  type = "words",
  delay = 0,
  duration = 0.9,
  stagger = 0.025,
  triggerOnScroll = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = el.querySelectorAll(".reveal-unit");
    if (!targets.length) return;

    gsap.set(targets, {
      y: "115%",
      opacity: 0,
      rotateX: -55,
      transformOrigin: "50% 100%",
    });

    const anim = gsap.to(targets, {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: "expo.out",
      scrollTrigger: triggerOnScroll
        ? {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          }
        : undefined,
    });

    return () => {
      anim.kill();
    };
  }, [children, delay, duration, stagger, triggerOnScroll]);

  if (typeof children !== "string") {
    return (
      <Component ref={containerRef} className={cn("overflow-hidden", className)}>
        <span className="reveal-unit inline-block will-change-transform">
          {children}
        </span>
      </Component>
    );
  }

  const words = children.split(" ");

  return (
    <Component
      ref={containerRef}
      className={cn("overflow-hidden inline-block", className)}
      style={{ perspective: 800 }}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-1"
        >
          {type === "chars" ? (
            word.split("").map((char, cIdx) => (
              <span
                key={cIdx}
                className="reveal-unit inline-block will-change-transform origin-bottom"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))
          ) : (
            <span
              className="reveal-unit inline-block will-change-transform origin-bottom"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          )}
        </span>
      ))}
    </Component>
  );
}
