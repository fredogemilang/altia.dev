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
        className="absolute inset-0 opacity-25 sm:opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C46B4E 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Pure Vermilion Text-Fitted Lamp Backlight (Zero Center Seam) ── */}
      <div className="absolute top-0 left-0 right-0 h-[480px] sm:h-[560px] flex w-full items-start justify-center isolate pointer-events-none z-0 overflow-hidden">
        {/* Left Conic Beam (Overlapped across center to eliminate seam) */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          whileInView={{ opacity: 0.85, width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-[calc(50%-2rem)] top-0 h-64 sm:h-80 overflow-visible w-[24rem] bg-gradient-conic from-vermilion via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] mix-blend-multiply blur-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,white_16px,white_75%,transparent_100%)]"
        >
          {/* Bottom fade mask to ivory */}
          <div className="absolute w-full left-0 bg-ivory h-32 sm:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          {/* Left fade mask to ivory */}
          <div className="absolute w-28 sm:w-36 h-full left-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Beam (Overlapped across center to eliminate seam) */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          whileInView={{ opacity: 0.85, width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-[calc(50%-2rem)] top-0 h-64 sm:h-80 w-[24rem] bg-gradient-conic from-transparent via-transparent to-vermilion text-white [--conic-position:from_290deg_at_center_top] mix-blend-multiply blur-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,white_16px,white_75%,transparent_100%)]"
        >
          {/* Right fade mask to ivory */}
          <div className="absolute w-28 sm:w-36 h-full right-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          {/* Bottom fade mask to ivory */}
          <div className="absolute w-full right-0 bg-ivory h-32 sm:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Central Seamless Fusion Cone (Erases all vertical center lines completely) */}
        <motion.div
          initial={{ opacity: 0.2, scale: 0.85 }}
          whileInView={{ opacity: 0.75, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-60 sm:h-76 w-[26rem] sm:w-[34rem] bg-[radial-gradient(ellipse_at_top,_rgba(227,66,52,0.4)_0%,_rgba(227,66,52,0.18)_40%,_transparent_75%)] mix-blend-multiply blur-[2px] pointer-events-none"
        />

        {/* Ambient Atmosphere Soft Diffusion */}
        <div className="absolute top-2 sm:top-6 h-40 sm:h-52 w-[28rem] sm:w-[38rem] scale-x-125 bg-ivory/50 blur-3xl pointer-events-none" />

        {/* High-Intensity Vermilion Core Glow */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-20 h-16 sm:h-24 w-60 rounded-full bg-vermilion/25 blur-xl"
        />

        {/* Horizon Laser Slit Bar (Fitted to text width) */}
        <motion.div
          initial={{ width: "10rem", opacity: 0.4 }}
          whileInView={{ width: "24rem", opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-30 h-[2px] w-[24rem] bg-gradient-to-r from-transparent via-vermilion to-transparent shadow-[0_0_18px_rgba(227,66,52,0.45)]"
        />
      </div>

      {/* ── Content Container (Comfortably Spaced for Mobile & Desktop) ── */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full flex flex-col items-center pt-5 sm:pt-12 pb-4 sm:pb-6 px-3 sm:px-4"
      >
        {children}
      </motion.div>
    </div>
  );
}
