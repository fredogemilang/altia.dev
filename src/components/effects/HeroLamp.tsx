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

      {/* ── Solid Visible Horizon Laser Slit Bar (Glows & Grows 15rem -> 30rem) ── */}
      <div className="relative flex flex-col items-center w-full">
        {/* The Crisp Solid Glowing Laser Line (Clearly Visible) */}
        <motion.div
          initial={{ width: "15rem", opacity: 0.6 }}
          whileInView={{ width: "30rem", opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-30 h-[2.5px] sm:h-[3px] rounded-full bg-vermilion shadow-[0_0_12px_#E34234,0_0_24px_rgba(227,66,52,0.6)]"
        />

        {/* ── Downward Symmetrical Light Cones Originating From Laser Line ── */}
        <div className="absolute top-[2px] left-0 right-0 h-[480px] sm:h-[560px] flex w-full items-start justify-center isolate pointer-events-none z-0 overflow-hidden">
          {/* Left Conic Beam (15rem -> 30rem growth) */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 0.9, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto right-1/2 top-0 h-64 sm:h-80 overflow-visible w-[30rem] bg-gradient-conic from-vermilion via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] mix-blend-multiply blur-[1px] [mask-image:linear-gradient(to_bottom,white_10%,white_75%,transparent_100%)]"
          >
            {/* Bottom fade mask to ivory */}
            <div className="absolute w-[100%] left-0 bg-ivory h-36 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            {/* Left fade mask to ivory */}
            <div className="absolute w-36 h-[100%] left-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Right Conic Beam (15rem -> 30rem growth) */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 0.9, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto left-1/2 top-0 h-64 sm:h-80 w-[30rem] bg-gradient-conic from-transparent via-transparent to-vermilion text-white [--conic-position:from_290deg_at_center_top] mix-blend-multiply blur-[1px] [mask-image:linear-gradient(to_bottom,white_10%,white_75%,transparent_100%)]"
          >
            {/* Right fade mask to ivory */}
            <div className="absolute w-36 h-[100%] right-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            {/* Bottom fade mask to ivory */}
            <div className="absolute w-[100%] right-0 bg-ivory h-36 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Diffuser Core Glow Sphere (8rem -> 16rem growth) */}
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "18rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute top-0 z-20 h-24 sm:h-32 w-72 rounded-full bg-vermilion/30 blur-2xl pointer-events-none"
          />

          {/* Atmosphere Ambient Radial Wash */}
          <div className="absolute top-0 h-40 w-[32rem] sm:w-[46rem] rounded-full bg-vermilion/15 blur-3xl pointer-events-none" />
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
