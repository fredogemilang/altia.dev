"use client";

import { useTranslations } from "@/i18n/useI18n";

export function HeroMarquee() {
  const tHero = useTranslations("Hero");

  const items = [
    tHero("service1"),
    "•",
    tHero("service2"),
    "•",
    tHero("service3"),
    "•",
    "ALTIA DEV STUDIO",
    "•",
    "CREATIVE ENGINEERING",
    "•",
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden select-none pointer-events-none translate-y-[32%] sm:translate-y-[36%] z-0">
      <div className="flex w-max animate-marquee will-change-transform opacity-75 hover:opacity-100 transition-opacity">
        {/* First Loop */}
        <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap pr-8 sm:pr-12">
          {items.map((item, idx) => (
            <span
              key={idx}
              className={`font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase ${
                item === "•"
                  ? "text-vermilion/40 text-2xl sm:text-4xl"
                  : "text-charcoal/[0.08]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Second Loop for Seamless Infinite Scroll */}
        <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap pr-8 sm:pr-12" aria-hidden="true">
          {items.map((item, idx) => (
            <span
              key={`dup-${idx}`}
              className={`font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase ${
                item === "•"
                  ? "text-vermilion/40 text-2xl sm:text-4xl"
                  : "text-charcoal/[0.08]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
