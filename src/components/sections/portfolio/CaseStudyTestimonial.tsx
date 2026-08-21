"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ProjectTestimonial } from "@/data/projects";
import { Quote, CheckCircle2, Star } from "lucide-react";

interface CaseStudyTestimonialProps {
  testimonial?: ProjectTestimonial;
  lang: "id" | "en";
}

export function CaseStudyTestimonial({
  testimonial,
  lang,
}: CaseStudyTestimonialProps) {
  if (!testimonial) return null;

  return (
    <section className="relative py-8 sm:py-16">
      <Container size="large">
        <div className="p-8 sm:p-14 lg:p-16 rounded-4xl bg-gradient-to-br from-[#FFFDF9] via-cream/40 to-[#F0E8DC]/60 border-2 border-warm-border shadow-[0_20px_50px_rgba(47,42,38,0.08)] relative overflow-hidden">
          {/* Subtle Background Quote Watermark */}
          <Quote className="absolute -bottom-6 -right-6 w-48 h-48 text-charcoal/[0.04] pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider text-[10px]">
                {lang === "id" ? "TESTIMONIAL RESMI KLIEN" : "VERIFIED CLIENT IMPACT"}
              </Badge>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal tracking-tight leading-[1.25] mb-8 sm:mb-10">
              “{testimonial.quote[lang]}”
            </blockquote>

            <div className="flex items-center gap-4 pt-6 border-t border-warm-border/80">
              <div className="w-12 h-12 rounded-full bg-vermilion text-ivory flex items-center justify-center font-display font-black text-lg shadow-md">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-black text-lg text-charcoal">
                    {testimonial.author}
                  </h4>
                  <CheckCircle2 className="w-4 h-4 text-vermilion" />
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted font-normal">
                  {testimonial.role} · <span className="font-semibold text-charcoal">{testimonial.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
