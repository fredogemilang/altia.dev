"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  speed?: number; // e.g. 15 for 15% parallax shift
}

export function ParallaxImage({
  src,
  alt,
  className,
  aspectRatio = "aspect-[16/10]",
  speed = 12,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const tween = gsap.fromTo(
      img,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-3xl", aspectRatio, className)}
    >
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-[125%] -top-[12.5%] will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}
