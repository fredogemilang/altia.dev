"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

/**
 * Builds a srcSet for portfolio images.
 * Expects /uploads/portfolio/{project}/1.webp
 * and references pre-generated -sm (640w) and -md (960w) variants.
 */
function buildPortfolioSrcSet(src: string): string | undefined {
  if (!src || !src.includes('/uploads/portfolio/')) return undefined;
  const ext = src.lastIndexOf('.');
  if (ext === -1) return undefined;
  const base = src.slice(0, ext);
  const suffix = src.slice(ext);
  return `${base}-sm${suffix} 640w, ${base}-md${suffix} 960w, ${src} 2560w`;
}

interface CaseStudyGalleryProps {
  gallery?: string[];
  title: string;
  lang: "id" | "en";
}

export function CaseStudyGallery({ gallery, title, lang }: CaseStudyGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="relative py-8 sm:py-16">
      <Container size="large">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <Badge variant="vermilion" size="sm" className="mb-2.5 uppercase tracking-widest text-[10px] font-bold">
              {lang === "id" ? "SHOWCASE ANTARMUKA" : "INTERFACE & SYSTEM SHOWCASE"}
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-charcoal">
              {lang === "id" ? "Visual Eksplorasi & Walkthrough Produk" : "Visual Exploration & Product Walkthrough"}
            </h2>
          </div>
          <span className="text-xs font-mono text-charcoal-muted uppercase tracking-wider">
            {gallery.length} {lang === "id" ? "Layar Resolusi Tinggi" : "High-Resolution Screens"}
          </span>
        </div>

        {/* Main Active Screen Mockup in Framed Window */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-warm-border shadow-[0_25px_60px_rgba(47,42,38,0.12)] bg-charcoal mb-6 group">
          {/* Mac/Browser Frame Window Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#1F1D1A] border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
            </div>
            <span className="text-xs font-mono text-ivory/50 truncate max-w-xs">
              {title} · Production Build
            </span>
            <div className="w-12 text-right">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">LIVE 120Hz</span>
            </div>
          </div>

          {/* Active Image */}
          <div className="relative aspect-[16/9] w-full bg-charcoal overflow-hidden">
            <img
              src={gallery[activeImageIndex] || gallery[0]}
              srcSet={buildPortfolioSrcSet(gallery[activeImageIndex] || gallery[0])}
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 90vw, 1200px"
              alt={`${title} screenshot ${activeImageIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-emil-out group-hover:scale-[1.02] will-change-transform"
            />
          </div>
        </div>

        {/* Thumbnail Selector Grid */}
        {gallery.length > 1 && (
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/9] rounded-2xl overflow-hidden border-2 transition-[transform,border-color,opacity,box-shadow] duration-200 ease-emil-out active:scale-[0.97] group text-left will-change-transform ${
                  activeImageIndex === idx
                    ? "border-vermilion shadow-vermilion-glow scale-[1.02]"
                    : "border-warm-border opacity-70 hover:opacity-100 hover:border-charcoal/40"
                }`}
              >
                <img
                  src={img}
                  srcSet={buildPortfolioSrcSet(img)}
                  sizes="(max-width: 767px) 33vw, 400px"
                  alt={`Thumbnail ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono font-bold text-ivory uppercase tracking-wider">
                    {lang === "id" ? "Layar" : "Screen"} 0{idx + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
