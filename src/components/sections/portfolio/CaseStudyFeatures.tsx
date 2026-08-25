"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ProjectFeature } from "@/data/projects";
import { CheckCircle2, Zap, Code2, Terminal } from "lucide-react";

interface CaseStudyFeaturesProps {
  features?: ProjectFeature[];
  lang: "id" | "en";
}

export function CaseStudyFeatures({ features, lang }: CaseStudyFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="relative py-8 sm:py-16">
      <Container size="large">
        <div className="flex flex-col gap-4 max-w-3xl mb-10 sm:mb-14">
          <Badge variant="vermilion" size="sm" className="w-fit uppercase tracking-widest text-[10px] font-bold">
            {lang === "id" ? "INOVASI & FITUR REKAYASA" : "ENGINEERED CAPABILITIES"}
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-charcoal">
            {lang === "id" ? "Fitur Kunci & Keunggulan Arsitektur" : "Key Features & Technical Innovations"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-9 rounded-3xl bg-[#FFFDF9] border border-warm-border shadow-[0_12px_30px_rgba(47,42,38,0.05)] hover:border-vermilion/50 hover:shadow-warm-lg hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-250 ease-emil-out flex flex-col justify-between group will-change-transform"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-vermilion mb-6 group-hover:scale-110 group-hover:bg-vermilion group-hover:text-ivory transition-[transform,background-color,color] duration-200 ease-emil-out will-change-transform">
                  <Zap className="w-6 h-6" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-3 group-hover:text-vermilion transition-colors leading-snug">
                  {feature.title[lang]}
                </h3>

                <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-6 font-normal">
                  {feature.description[lang]}
                </p>
              </div>

              {feature.technicalNote && (
                <div className="pt-4 border-t border-warm-border/70 flex items-start gap-2 text-xs font-mono text-charcoal/70 bg-cream/50 p-3 rounded-xl border border-warm-border/60">
                  <Terminal className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature.technicalNote}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
