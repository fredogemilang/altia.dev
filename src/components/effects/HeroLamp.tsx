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

      {/* ── Single Unified Symmetrical Vermilion Spotlight (100% Zero Seam Artifact) ── */}
      <div className="absolute top-0 left-0 right-0 h-[480px] sm:h-[560px] flex w-full items-start justify-center isolate pointer-events-none z-0 overflow-hidden">
        {/* Expanding Main Spotlight Cone (Unified single gradient, no split) */}
        <motion.div
          initial={{ opacity: 0.3, width: "14rem" }}
          whileInView={{ opacity: 0.85, width: "42rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 h-72 sm:h-96 rounded-b-[100%] bg-[radial-gradient(ellipse_at_top,_rgba(227,66,52,0.38)_0%,_rgba(227,66,52,0.18)_45%,_rgba(227,66,52,0.04)_70%,_transparent_85%)] blur-[3px] mix-blend-multiply [mask-image:linear-gradient(to_bottom,white_10%,white_75%,transparent_100%)]"
        />

        {/* Inner High-Definition Light Core */}
        <motion.div
          initial={{ opacity: 0.2, width: "8rem" }}
          whileInView={{ opacity: 0.9, width: "26rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 h-48 sm:h-64 rounded-b-[100%] bg-[radial-gradient(ellipse_at_top,_rgba(227,66,52,0.45)_0%,_rgba(227,66,52,0.15)_50%,_transparent_80%)] blur-md mix-blend-multiply"
        />

        {/* Soft Ambient Horizon Diffusion */}
        <div className="absolute top-0 h-32 w-[34rem] sm:w-[48rem] rounded-full bg-vermilion/15 blur-3xl pointer-events-none" />

        {/* Horizon Laser Slit Bar (Fitted tightly to text width) */}
        <motion.div
          initial={{ width: "10rem", opacity: 0.4 }}
          whileInView={{ width: "24rem", opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-30 h-[2px] w-[24rem] bg-gradient-to-r from-transparent via-vermilion to-transparent shadow-[0_0_20px_rgba(227,66,52,0.5)]"
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
