"use client";

import React from "react";
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ArchitecturalHeroProps {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  marqueeItems: string[];
}

export function ArchitecturalHero({
  badge,
  titleLine1,
  titleLine2,
  subtitle,
  primaryCta,
  secondaryCta,
  marqueeItems,
}: ArchitecturalHeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 text-center md:px-8 
      min-h-[calc(100vh-80px)] flex flex-col justify-between items-center overflow-hidden 
      bg-gradient-to-b from-[#FFFDF9] via-ivory to-[#F0E8DC]
      border-b border-warm-border/60"
    >
      {/* 1. Technical Blueprint Grid with Radial Vignette Fade */}
      <div
        className="absolute inset-0 z-0 h-full w-full 
        bg-[linear-gradient(to_right,rgba(26,24,22,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,24,22,0.06)_1px,transparent_1px)] 
        bg-[size:24px_24px] 
        [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
      />

      {/* 2. Top Vermilion Horizon Glow Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-36 bg-gradient-to-b from-vermilion/15 via-vermilion/5 to-transparent blur-3xl pointer-events-none" />

      {/* 3. Main Center Content */}
      <Container size="large" className="relative z-10 my-auto pt-2 sm:pt-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="/services" className="group inline-flex mb-5 sm:mb-7">
              <span
                className="text-[11px] sm:text-xs text-charcoal/85 font-sans px-4 py-1.5 sm:px-5 sm:py-2 
                bg-white/85 hover:bg-white backdrop-blur-md
                border border-warm-border hover:border-vermilion/40
                rounded-full w-fit tracking-wider sm:tracking-widest uppercase font-semibold 
                flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-vermilion mr-2 animate-pulse-soft shrink-0" />
                <span className="truncate max-w-[75vw] sm:max-w-none">{badge}</span>
                <ChevronRight className="inline w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1 text-vermilion" />
              </span>
            </a>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-display font-black tracking-tight text-charcoal text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] sm:leading-[1.05] mb-5 sm:mb-6"
          >
            <span>{titleLine1}</span>
            <br />
            <span className="bg-gradient-to-r from-vermilion via-[#FF5733] to-[#E34234] bg-clip-text text-transparent">
              {titleLine2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-xs sm:text-base md:text-lg text-charcoal-muted max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal px-2 sm:px-0"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto z-20"
          >
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 shadow-vermilion-glow justify-center"
              cursorText="START"
            >
              <span>{primaryCta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              href="/portfolio"
              variant="secondary"
              size="md"
              className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 justify-center bg-white/80 hover:bg-white"
              cursorText="VIEW"
            >
              <span>{secondaryCta}</span>
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* 4. Giant Bottom Horizon Dome (Warm Ivory Canvas Stage with Glowing Rim) */}
      <div
        className="absolute left-1/2 bottom-[-280px] sm:bottom-[-380px] md:bottom-[-480px] lg:bottom-[-560px] 
        h-[320px] w-[125%] sm:h-[440px] sm:w-[135%] md:h-[560px] md:w-[145%] lg:h-[660px] lg:w-[155%] 
        -translate-x-1/2 rounded-[100%] 
        border-t-2 border-vermilion/30 
        bg-gradient-to-b from-white/95 via-ivory to-[#EFE7DC] 
        shadow-[0_-16px_40px_rgba(227,66,52,0.08),0_-1px_0_rgba(227,66,52,0.35)] 
        pointer-events-none z-0"
      />

      {/* 5. Integrated Marquee Ticker along the Bottom Horizon */}
      <div className="relative w-full mt-12 sm:mt-16 z-10 overflow-hidden select-none pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee will-change-transform opacity-85 hover:opacity-100 transition-opacity">
          {/* Loop 1 */}
          <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap pr-8 sm:pr-12">
            {marqueeItems.map((item, idx) => (
              <span
                key={`m1-${idx}`}
                className={`font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase ${
                  item === "•"
                    ? "text-vermilion/40 text-xl sm:text-3xl"
                    : "text-charcoal/[0.12]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Loop 2 for infinite scroll */}
          <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap pr-8 sm:pr-12" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <span
                key={`m2-${idx}`}
                className={`font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase ${
                  item === "•"
                    ? "text-vermilion/40 text-xl sm:text-3xl"
                    : "text-charcoal/[0.12]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
