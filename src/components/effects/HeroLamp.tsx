"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroLampProps {
  children?: React.ReactNode;
  className?: string;
}

export function HeroLamp({ children, className }: HeroLampProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start overflow-hidden w-full bg-ivory text-charcoal z-0",
        className
      )}
    >
      {/* ── Background Subtle Architectural Dot Pattern on Ivory ── */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C46B4E 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Pure Vermilion Lamp Ambient Backlight System ── */}
      <div className="absolute top-0 left-0 right-0 h-[560px] flex w-full items-start justify-center isolate pointer-events-none z-0 overflow-hidden">
        {/* Left Conic Beam (Pure Vermilion on Ivory) */}
        <motion.div
          initial={{ opacity: 0.3, width: "15rem" }}
          whileInView={{ opacity: 0.85, width: "34rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 top-0 h-80 overflow-visible w-[34rem] bg-gradient-conic from-vermilion via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] mix-blend-multiply blur-sm"
        >
          {/* Bottom fade mask */}
          <div className="absolute w-full left-0 bg-ivory h-44 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          {/* Left fade mask */}
          <div className="absolute w-44 h-full left-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Beam (Pure Vermilion on Ivory - Symmetrical) */}
        <motion.div
          initial={{ opacity: 0.3, width: "15rem" }}
          whileInView={{ opacity: 0.85, width: "34rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 top-0 h-80 w-[34rem] bg-gradient-conic from-transparent via-transparent to-vermilion text-white [--conic-position:from_290deg_at_center_top] mix-blend-multiply blur-sm"
        >
          {/* Right fade mask */}
          <div className="absolute w-44 h-full right-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          {/* Bottom fade mask */}
          <div className="absolute w-full right-0 bg-ivory h-44 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Ambient Atmosphere Diffusion */}
        <div className="absolute top-12 h-56 w-full scale-x-150 bg-ivory/60 blur-3xl pointer-events-none" />

        {/* Central Luminous Vermilion Ambient Core */}
        <motion.div
          initial={{ opacity: 0.3, scale: 0.85 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-8 z-10 h-56 w-[32rem] sm:w-[44rem] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-vermilion/30 via-vermilion/10 to-transparent blur-2xl"
        />

        {/* Focused Core Glow */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "18rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-20 h-24 w-72 rounded-full bg-vermilion/25 blur-xl"
        />

        {/* Horizon Laser Slit Bar (Vermilion Beam) */}
        <motion.div
          initial={{ width: "12rem", opacity: 0.4 }}
          whileInView={{ width: "32rem", opacity: 0.95 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-30 h-[2px] w-[32rem] bg-gradient-to-r from-transparent via-vermilion to-transparent shadow-[0_0_24px_rgba(227,66,52,0.5)]"
        />
      </div>

      {/* ── Content Container (Simultaneous Unified Slide-Up for Badge, Title, Description, and Buttons) ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full flex flex-col items-center pt-4 sm:pt-6 pb-4"
      >
        {children}
      </motion.div>
    </div>
  );
}
