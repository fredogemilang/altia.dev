"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

interface ScrollHighlightTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: React.ElementType;
  dark?: boolean;
  start?: string;
  end?: string;
}

export function ScrollHighlightText({
  text,
  className = "",
  wordClassName = "",
  as: Component = "span",
  dark = false,
  start = "top 90%",
  end = "bottom 50%",
}: ScrollHighlightTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const words = el.querySelectorAll(".highlight-word");
    if (!words.length) return;

    const initialColor = dark
      ? "rgba(255, 253, 249, 0.2)"
      : "rgba(47, 42, 38, 0.22)";
    const targetColor = dark
      ? "rgba(255, 253, 249, 1.0)"
      : "rgba(47, 42, 38, 1.0)";

    // Set initial state immediately to prevent flash
    gsap.set(words, {
      color: initialColor,
      opacity: 0.25,
    });

    const ctx = gsap.context(() => {
      // Sequential, tight-gradient timeline for distinct word activation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.25, // Snappy inertia
          invalidateOnRefresh: true,
        },
      });

      // Chain each word sequentially with tight overlap so the active boundary is crisp
      words.forEach((word) => {
        tl.to(
          word,
          {
            color: targetColor,
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "-=0.04" // Slight overlap so it flows smoothly word-by-word without wide gray gradient
        );
      });
    }, containerRef);

    // Refresh ScrollTrigger so calculations are accurate
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [text, dark, start, end]);

  const words = text.split(" ");

  return (
    <Component
      ref={containerRef}
      className={cn("inline font-display", className)}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className={cn(
            "highlight-word inline-block mr-[0.25em] transition-colors will-change-transform",
            wordClassName
          )}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
