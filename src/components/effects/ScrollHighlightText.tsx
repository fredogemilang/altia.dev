"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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
  start = "top 85%",
  end = "bottom 45%",
}: ScrollHighlightTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".highlight-word");
    if (!words.length) return;

    const initialColor = dark
      ? "rgba(255, 253, 249, 0.2)"
      : "rgba(26, 24, 22, 0.18)";
    const targetColor = dark
      ? "rgba(255, 253, 249, 1.0)"
      : "rgba(26, 24, 22, 1.0)";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          color: initialColor,
          opacity: 0.25,
        },
        {
          color: targetColor,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.7,
          },
        }
      );
    }, containerRef);

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
          style={{
            color: dark
              ? "rgba(255, 253, 249, 0.2)"
              : "rgba(26, 24, 22, 0.18)",
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
