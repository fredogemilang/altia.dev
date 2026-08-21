"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Globe, Smartphone, Cpu } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceCardItem {
  id: string;
  icon: "web" | "app" | "ai";
  number: string;
  title: string;
  tagline: string;
  stack: string;
  href: string;
}

interface ServicesCardGridProps {
  items: ServiceCardItem[];
  exploreText: string;
}

export function ServicesCardGrid({ items, exploreText }: ServicesCardGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      // 1. Initial State: lowered, tilted, translucent
      gsap.set(cards, {
        y: 60,
        rotateX: 12,
        scale: 0.94,
        opacity: 0,
        transformPerspective: 1000,
        transformOrigin: "center bottom",
      });

      // 2. Bidirectional Scroll Animation (Plays down AND reverses back on scroll up)
      gsap.to(cards, {
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        duration: 0.75,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse", // Re-triggers both ways seamlessly!
        },
      });

      // 3. Interactive 3D Magnetic Tilt on Hover for each card
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const deltaX = (x - centerX) / centerX;
          const deltaY = (y - centerY) / centerY;

          gsap.to(card, {
            rotateY: deltaX * 7,
            rotateX: -deltaY * 7,
            y: -6,
            duration: 0.25,
            ease: "power1.out",
            transformPerspective: 900,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  const renderIcon = (type: ServiceCardItem["icon"]) => {
    switch (type) {
      case "web":
        return <Globe className="w-7 h-7" />;
      case "app":
        return <Smartphone className="w-7 h-7" />;
      case "ai":
        return <Cpu className="w-7 h-7" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 perspective-[1200px]"
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="will-change-transform h-full"
        >
          <Card className="p-8 sm:p-10 h-full flex flex-col justify-between group hover:border-vermilion/80 transition-all duration-300 rounded-3xl bg-[#FFFDF9] border-2 border-warm-border shadow-[0_12px_30px_rgba(47,42,38,0.06)] hover:shadow-[0_20px_45px_rgba(227,66,52,0.12)]">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-vermilion mb-8 group-hover:scale-110 group-hover:bg-vermilion group-hover:text-ivory transition-all duration-300 shadow-sm">
                {renderIcon(item.icon)}
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-muted mb-2 block">
                {item.number}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-charcoal mb-4 group-hover:text-vermilion transition-colors">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8 font-normal">
                {item.tagline}
              </p>
            </div>

            <div className="pt-6 border-t border-warm-border/70 flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-charcoal-muted truncate max-w-[65%]">
                {item.stack}
              </span>
              <a
                href={item.href}
                className="text-xs font-display font-bold text-vermilion flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                data-cursor
                data-cursor-text="EXPLORE"
              >
                <span>{exploreText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
