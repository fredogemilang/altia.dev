"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroLampProps {
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function HeroLamp({ badge, children, className }: HeroLampProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start overflow-hidden w-full bg-ivory text-charcoal z-0",
        className
      )}
    >
      {/* ── Background Subtle Architectural Dot Pattern on Ivory ── */}
      <div
        className="absolute inset-0 opacity-25 sm:opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C46B4E 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Studio Badge (Positioned Above the Lamp Origin) ── */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-40 mb-3 sm:mb-5 pt-2 sm:pt-4"
        >
          {badge}
        </motion.div>
      )}

      {/* ── Solid Glowing Horizontal Laser Slit Bar ── */}
      <div className="relative flex flex-col items-center w-full">
        {/* The Crisp Solid Glowing Laser Line (Gently Scaled Up) */}
        <motion.div
          initial={{ width: "18rem", opacity: 0.6 }}
          whileInView={{ width: "38rem", opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-30 h-[2.5px] sm:h-[3px] rounded-full bg-vermilion shadow-[0_0_12px_#E34234,0_0_24px_rgba(227,66,52,0.6)]"
        />

        {/* ── Downward Symmetrical Light Cones (Seamless & Balanced Width) ── */}
        <div className="absolute top-[2px] left-0 right-0 h-[480px] sm:h-[560px] flex w-full items-start justify-center isolate pointer-events-none z-0 overflow-hidden">
          {/* Main Expanding Spotlight Beam (Expanded to 48rem) */}
          <motion.div
            initial={{ opacity: 0.4, width: "20rem" }}
            whileInView={{ opacity: 0.9, width: "48rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute top-0 h-64 sm:h-88 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,_rgba(227,66,52,0.4)_0%,_rgba(227,66,52,0.18)_45%,_rgba(227,66,52,0.04)_75%,_transparent_100%)] mix-blend-multiply blur-[2px] [mask-image:linear-gradient(to_bottom,white_15%,white_75%,transparent_100%)]"
          />

          {/* High Intensity Inner Filament Glow */}
          <motion.div
            initial={{ width: "14rem", opacity: 0.3 }}
            whileInView={{ width: "32rem", opacity: 0.85 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute top-0 h-44 sm:h-56 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,_rgba(227,66,52,0.52)_0%,_rgba(227,66,52,0.18)_50%,_transparent_85%)] mix-blend-multiply blur-[3px]"
          />

          {/* Core Glow Center Ball */}
          <motion.div
            initial={{ width: "10rem" }}
            whileInView={{ width: "20rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute top-0 z-20 h-22 sm:h-30 rounded-full bg-vermilion/28 blur-2xl pointer-events-none"
          />

          {/* Atmosphere Ambient Soft Wash */}
          <div className="absolute top-0 h-48 w-[42rem] sm:w-[56rem] rounded-full bg-vermilion/15 blur-3xl pointer-events-none" />
        </div>

        {/* ── Content Container (Main Headline, Subtitle, CTAs inside spotlight) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-10 w-full flex flex-col items-center pt-4 sm:pt-6 pb-4 sm:pb-6 px-3 sm:px-4"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
