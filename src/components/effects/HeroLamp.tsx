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

      {/* ── Pure Vermilion Responsive Lamp Ambient Backlight System ── */}
      <div className="absolute top-0 left-0 right-0 h-[520px] sm:h-[640px] flex w-full items-start justify-center isolate pointer-events-none z-0 overflow-hidden">
        {/* Left Conic Beam (Responsive width & silky mask) */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 0.85, width: "100%" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 top-0 h-72 sm:h-96 overflow-visible w-[18rem] sm:w-[36rem] bg-gradient-conic from-vermilion via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] mix-blend-multiply blur-[1px] [mask-image:linear-gradient(to_bottom,transparent_0%,white_16px,white_80%,transparent_100%)]"
        >
          {/* Bottom fade mask to ivory */}
          <div className="absolute w-full left-0 bg-ivory h-36 sm:h-48 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          {/* Left fade mask to ivory */}
          <div className="absolute w-32 sm:w-48 h-full left-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Beam (Responsive width & silky mask) */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 0.85, width: "100%" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 top-0 h-72 sm:h-96 w-[18rem] sm:w-[36rem] bg-gradient-conic from-transparent via-transparent to-vermilion text-white [--conic-position:from_290deg_at_center_top] mix-blend-multiply blur-[1px] [mask-image:linear-gradient(to_bottom,transparent_0%,white_16px,white_80%,transparent_100%)]"
        >
          {/* Right fade mask to ivory */}
          <div className="absolute w-32 sm:w-48 h-full right-0 bg-ivory bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          {/* Bottom fade mask to ivory */}
          <div className="absolute w-full right-0 bg-ivory h-36 sm:h-48 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Central Seamless Blend Overlap (Eliminates vertical split line) */}
        <motion.div
          initial={{ opacity: 0.2, scale: 0.85 }}
          whileInView={{ opacity: 0.65, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 z-10 h-56 sm:h-72 w-[20rem] sm:w-[48rem] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-vermilion/35 via-vermilion/10 to-transparent blur-2xl pointer-events-none"
        />

        {/* Ambient Atmosphere Soft Diffusion */}
        <div className="absolute top-4 sm:top-8 h-48 sm:h-64 w-full scale-x-150 bg-ivory/50 blur-3xl pointer-events-none" />

        {/* High-Intensity Vermilion Core Glow */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-20 h-20 sm:h-28 w-56 sm:w-80 rounded-full bg-vermilion/25 blur-xl"
        />

        {/* Horizon Laser Slit Bar (Soft glowing top beam) */}
        <motion.div
          initial={{ width: "10rem", opacity: 0.4 }}
          whileInView={{ width: "24rem", opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-30 h-[2px] w-[18rem] sm:w-[36rem] bg-gradient-to-r from-transparent via-vermilion to-transparent shadow-[0_0_20px_rgba(227,66,52,0.4)]"
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
