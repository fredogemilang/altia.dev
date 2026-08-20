"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeroTitleAnimationProps {
  line1: string;
  line2: string;
  className?: string;
  theme?: "light" | "dark";
}

export function HeroTitleAnimation({
  line1,
  line2,
  className,
  theme = "light",
}: HeroTitleAnimationProps) {
  const isDark = theme === "dark";

  return (
    <h1
      className={cn(
        "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] mb-4 sm:mb-5 select-none text-center",
        isDark ? "text-white" : "text-charcoal",
        className
      )}
    >
      <span
        className={cn(
          "block py-0.5",
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-b from-white via-[#FAF4E9] to-[#C4BCB0]"
            : "text-charcoal"
        )}
      >
        {line1}
      </span>
      <span
        className={cn(
          "block py-0.5",
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-vermilion to-vermilion-light drop-shadow-[0_0_35px_rgba(227,66,52,0.5)]"
            : "text-vermilion"
        )}
      >
        {line2}
      </span>
    </h1>
  );
}
