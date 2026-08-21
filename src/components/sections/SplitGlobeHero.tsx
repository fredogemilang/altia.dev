"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InteractiveGlobe } from "@/components/effects/InteractiveGlobe";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitGlobeHeroProps {
  badge?: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  marqueeItems: string[];
}

export function SplitGlobeHero({
  titleLine1,
  titleLine2,
  subtitle,
  primaryCta,
  secondaryCta,
  marqueeItems,
}: SplitGlobeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Globe Zoom-In & Glide to Bottom-Right on Scroll Down
      if (globeWrapperRef.current) {
        gsap.to(globeWrapperRef.current, {
          scale: 1.6,
          x: "15%",
          y: "24%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 15%",
            scrub: 1.2, // Ultra-smooth inertia scrub
          },
        });
      }

      // 2. Subtle Parallax Content Float on Left Column
      if (contentWrapperRef.current) {
        gsap.to(contentWrapperRef.current, {
          y: "-8%",
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 10%",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative mx-auto w-full pt-10 sm:pt-16 md:pt-20 pb-12 sm:pb-16 
      min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden 
      bg-gradient-to-b from-[#FFFDF9] via-ivory to-[#F0E8DC]
      border-b border-warm-border/60"
    >
      {/* 1. Technical Blueprint Grid Background */}
      <div
        className="absolute inset-0 z-0 h-full w-full 
        bg-[linear-gradient(to_right,rgba(26,24,22,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,24,22,0.05)_1px,transparent_1px)] 
        bg-[size:4.5rem_3.5rem] sm:bg-[size:5.5rem_4.5rem] 
        [mask-image:radial-gradient(ellipse_85%_75%_at_50%_40%,#000_40%,transparent_100%)] pointer-events-none"
      />

      {/* Top Ivory Soft Transition Overlay (Seamless header-to-grid blend) */}
      <div className="absolute top-0 inset-x-0 h-32 sm:h-48 bg-gradient-to-b from-ivory via-ivory/85 to-transparent pointer-events-none z-0" />

      {/* 2. Soft Ambient Vermilion Glow on Globe Side */}
      <div
        className="absolute top-1/4 right-5 sm:right-20 w-[30rem] h-[30rem] 
        bg-vermilion/[0.04] rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* 3. Main Two-Column Split Container */}
      <Container size="large" className="relative z-10 my-auto w-full py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (Content & Value Prop) */}
          <div
            ref={contentWrapperRef}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left will-change-transform"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance font-display font-black tracking-tight text-charcoal text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.05] mb-5 sm:mb-6"
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
              className="text-balance text-sm sm:text-base md:text-lg text-charcoal-muted max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal"
            >
              {subtitle}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-10"
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

            {/* Micro Feature Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 pt-4 border-t border-warm-border/70 text-xs text-charcoal/75 font-mono uppercase tracking-wider"
            >
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-vermilion" />
                <span>Worldwide Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-vermilion" />
                <span>Production-Ready Speed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-vermilion" />
                <span>Zero Lock-In Codebase</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (3D Interactive Globe with Dynamic Zoom-In on Scroll) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div
              ref={globeWrapperRef}
              className="w-full will-change-transform transform-gpu"
              style={{ transformOrigin: "center center" }}
            >
              <InteractiveGlobe />
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Submerged Infinite Marquee Ticker along the Bottom */}
      <div className="relative w-full mt-6 sm:mt-10 z-10 overflow-hidden select-none pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee will-change-transform opacity-80 hover:opacity-100 transition-opacity">
          {/* Loop 1 */}
          <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap pr-8 sm:pr-12">
            {marqueeItems.map((item, idx) => (
              <span
                key={`m1-${idx}`}
                className={`font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase ${
                  item === "•"
                    ? "text-vermilion/40 text-lg sm:text-2xl"
                    : "text-charcoal/[0.10]"
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
                className={`font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase ${
                  item === "•"
                    ? "text-vermilion/40 text-lg sm:text-2xl"
                    : "text-charcoal/[0.10]"
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
