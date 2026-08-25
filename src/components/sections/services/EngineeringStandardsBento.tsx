"use client";

import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import {
  ShieldCheck,
  Zap,
  Clock,
  GitBranch,
  CheckCircle2,
  Lock,
  Server,
  Activity,
  Terminal,
  Layers,
} from "lucide-react";

export interface BentoCardData {
  tag: string;
  title: string;
  desc: string;
  badge: string;
}

export interface EngineeringStandardsBentoProps {
  card1: BentoCardData;
  card2: BentoCardData;
  card3: BentoCardData;
  card4: BentoCardData;
}

export function EngineeringStandardsBento({
  card1,
  card2,
  card3,
  card4,
}: EngineeringStandardsBentoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.set(card, {
          y: 45,
          scale: 0.96,
          opacity: 0.2,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 35%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          index === 0 ? 0 : ">-0.5"
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
    >
      {/* 1. HERO BENTO CARD (2 Columns Wide on Desktop) - 100% IP & Clean Repo Ownership */}
      <div
        ref={(el) => {
          cardRefs.current[0] = el;
        }}
        className="lg:col-span-7 rounded-4xl bg-warm-card border border-warm-border p-8 sm:p-10 flex flex-col justify-between shadow-warm-sm hover:shadow-warm-md hover:border-vermilion/30 hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-250 ease-emil-out relative overflow-hidden group will-change-transform"
      >
        {/* Subtle top blueprint grid */}
        <div className="absolute inset-0 texture-blueprint-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-vermilion/5 rounded-full blur-2xl pointer-events-none group-hover:bg-vermilion/10 transition-colors" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Badge variant="terracotta" size="sm" className="font-bold uppercase tracking-wider text-[11px] px-3 py-1">
              <Lock className="w-3.5 h-3.5 mr-1.5 inline-block text-terracotta" />
              {card1.tag}
            </Badge>
            <span className="text-[11px] font-mono font-bold text-charcoal-muted tracking-wider uppercase">
              {card1.badge}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black text-charcoal tracking-tight leading-tight mb-4">
            {card1.title}
          </h3>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8">
            {card1.desc}
          </p>
        </div>

        {/* Visual Mini Widget: Clean Git Repository Handover */}
        <div className="relative z-10 bg-charcoal text-ivory rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner border border-charcoal-500/30">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-charcoal-500/40 text-[11px] text-ivory/60">
            <div className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-vermilion" />
              <span>main • client-production-repo</span>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Transferred
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-ivory/80">
            <p className="text-ivory/50">$ git remote -v</p>
            <p className="text-emerald-400/90 font-medium">origin  git@github.com:your-company/app.git (fetch & push)</p>
            <p className="text-ivory/50 pt-1">$ cat .env.example # 100% documented variables & zero vendor lock-in</p>
          </div>
        </div>
      </div>

      {/* 2. METRIC BENTO CARD (1 Column Wide on Desktop) - 100/100 Core Web Vitals */}
      <div
        ref={(el) => {
          cardRefs.current[1] = el;
        }}
        className="lg:col-span-5 rounded-4xl bg-warm-card border border-warm-border p-8 sm:p-10 flex flex-col justify-between shadow-warm-sm hover:shadow-warm-md hover:border-vermilion/30 hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-250 ease-emil-out relative overflow-hidden group will-change-transform"
      >
        <div className="absolute inset-0 texture-editorial-lines opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-terracotta/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Badge variant="vermilion" size="sm" className="font-bold uppercase tracking-wider text-[11px] px-3 py-1">
              <Zap className="w-3.5 h-3.5 mr-1.5 inline-block text-vermilion" />
              {card2.tag}
            </Badge>
            <span className="text-[11px] font-mono font-bold text-vermilion tracking-wider uppercase">
              {card2.badge}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black text-charcoal tracking-tight leading-tight mb-4">
            {card2.title}
          </h3>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8">
            {card2.desc}
          </p>
        </div>

        {/* Visual Mini Widget: Lighthouse 100/100 Benchmark Matrix */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 bg-cream/70 rounded-2xl p-4 border border-warm-border/80">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-warm-card border border-warm-border/60 text-center">
            <span className="font-display text-lg font-black text-emerald-600">100</span>
            <span className="text-[10px] font-mono uppercase text-charcoal-muted font-bold">Perf</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-warm-card border border-warm-border/60 text-center">
            <span className="font-display text-lg font-black text-emerald-600">100</span>
            <span className="text-[10px] font-mono uppercase text-charcoal-muted font-bold">SEO</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-warm-card border border-warm-border/60 text-center">
            <span className="font-display text-lg font-black text-emerald-600">&lt;50ms</span>
            <span className="text-[10px] font-mono uppercase text-charcoal-muted font-bold">TTFB</span>
          </div>
        </div>
      </div>

      {/* 3. WARRANTY BENTO CARD - 30-Day Post-Launch Hypercare */}
      <div
        ref={(el) => {
          cardRefs.current[2] = el;
        }}
        className="lg:col-span-5 rounded-4xl bg-warm-card border border-warm-border p-8 sm:p-10 flex flex-col justify-between shadow-warm-sm hover:shadow-warm-md hover:border-vermilion/30 hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-250 ease-emil-out relative overflow-hidden group will-change-transform"
      >
        <div className="absolute inset-0 texture-blueprint-grid opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Badge variant="terracotta" size="sm" className="font-bold uppercase tracking-wider text-[11px] px-3 py-1">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 inline-block text-terracotta" />
              {card3.tag}
            </Badge>
            <span className="text-[11px] font-mono font-bold text-charcoal-muted tracking-wider uppercase">
              {card3.badge}
            </span>
          </div>

          <h3 className="font-display text-2xl font-black text-charcoal tracking-tight leading-tight mb-4">
            {card3.title}
          </h3>

          <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
            {card3.desc}
          </p>
        </div>

        {/* Visual Mini Widget: SLA Warranty & Live Uptime */}
        <div className="relative z-10 flex items-center justify-between p-4 rounded-2xl bg-cream/70 border border-warm-border/80 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-bold text-charcoal">99.98% Uptime SLA</span>
          </div>
          <span className="font-mono text-[11px] text-terracotta font-bold">30-Day Hypercare</span>
        </div>
      </div>

      {/* 4. CI/CD & SECURITY HARDENING BENTO CARD */}
      <div
        ref={(el) => {
          cardRefs.current[3] = el;
        }}
        className="lg:col-span-7 rounded-4xl bg-warm-card border border-warm-border p-8 sm:p-10 flex flex-col justify-between shadow-warm-sm hover:shadow-warm-md hover:border-vermilion/30 hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-250 ease-emil-out relative overflow-hidden group will-change-transform"
      >
        <div className="absolute inset-0 texture-editorial-lines opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Badge variant="vermilion" size="sm" className="font-bold uppercase tracking-wider text-[11px] px-3 py-1">
              <Server className="w-3.5 h-3.5 mr-1.5 inline-block text-vermilion" />
              {card4.tag}
            </Badge>
            <span className="text-[11px] font-mono font-bold text-vermilion tracking-wider uppercase">
              {card4.badge}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black text-charcoal tracking-tight leading-tight mb-4">
            {card4.title}
          </h3>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8">
            {card4.desc}
          </p>
        </div>

        {/* Visual Mini Widget: Automated Pipeline Flow */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 p-3.5 rounded-2xl bg-charcoal text-ivory text-[11px] font-mono border border-charcoal-500/30">
          <span className="px-2.5 py-1 rounded-lg bg-charcoal-700 text-emerald-400 font-bold flex items-center gap-1">
            ✓ Lint & Format
          </span>
          <span className="text-ivory/40">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-charcoal-700 text-emerald-400 font-bold flex items-center gap-1">
            ✓ Type-Check
          </span>
          <span className="text-ivory/40">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-charcoal-700 text-emerald-400 font-bold flex items-center gap-1">
            ✓ Unit Tests
          </span>
          <span className="text-ivory/40">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-vermilion/20 text-vermilion font-bold border border-vermilion/30">
            ● Edge Release
          </span>
        </div>
      </div>
    </div>
  );
}
