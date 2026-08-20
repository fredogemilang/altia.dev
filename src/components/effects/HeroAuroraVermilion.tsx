"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroAuroraVermilionProps {
  children?: React.ReactNode;
  className?: string;
}

export function HeroAuroraVermilion({
  children,
  className,
}: HeroAuroraVermilionProps) {
  const [mounted, setMounted] = useState(false);

  // Mouse parallax interaction coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // max 40px drift
      const y = (e.clientY / innerHeight - 0.5) * 30; // max 30px drift
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start overflow-hidden w-full z-0",
        className
      )}
    >
      {/* ── 1. Architectural Precision Dot Blueprint (Light Mode) ── */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C46B4E 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── 2. Pure Vermilion Ambient Aurora Mesh ── */}
      <div className="absolute top-0 left-0 right-0 h-[560px] flex w-full items-start justify-center isolate pointer-events-none z-0 overflow-hidden">
        {/* Top Center Radiant Beacon (Pure Vermilion Soft Glow) */}
        <motion.div
          initial={{ opacity: 0.4, scale: 0.9 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={mounted ? { x: smoothX, y: smoothY } : {}}
          className="absolute top-0 z-10 h-80 w-[36rem] sm:w-[50rem] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-vermilion/28 via-vermilion/10 to-transparent blur-3xl"
        />

        {/* Floating Fluid Orb 1: Left Focal Vermilion Orb */}
        <motion.div
          animate={{
            x: [-15, 20, -15],
            y: [-10, 15, -10],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 -left-12 sm:left-1/4 h-72 w-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-vermilion/20 via-vermilion/10 to-transparent blur-3xl"
        />

        {/* Floating Fluid Orb 2: Right Focal Vermilion Orb */}
        <motion.div
          animate={{
            x: [15, -20, 15],
            y: [10, -15, 10],
            scale: [1.05, 0.95, 1.05],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-8 -right-12 sm:right-1/4 h-72 w-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-bl from-vermilion/22 via-vermilion/8 to-transparent blur-3xl"
        />

        {/* Center Precision Horizon Slit */}
        <motion.div
          initial={{ width: "8rem", opacity: 0 }}
          animate={{ width: "24rem", opacity: 0.8 }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          className="absolute top-0 z-20 h-[1.5px] w-96 bg-gradient-to-r from-transparent via-vermilion/70 to-transparent shadow-[0_0_20px_rgba(227,66,52,0.3)]"
        />

        {/* Secondary Soft Ambient Depth Fill */}
        <div className="absolute top-24 z-10 h-56 w-[42rem] rounded-full bg-vermilion/[0.06] blur-2xl" />
      </div>

      {/* ── Content Container (Rendered crisp & clear on warm light background) ── */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
