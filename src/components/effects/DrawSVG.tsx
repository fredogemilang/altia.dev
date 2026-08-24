"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

interface DrawSVGProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function DrawSVG({
  children,
  className,
  duration = 1.5,
  delay = 0,
}: DrawSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const paths = svg.querySelectorAll("path, line, polyline");
    paths.forEach((path) => {
      const length = (path as SVGGeometryElement).getTotalLength?.() || 200;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          once: true,
        },
      });
    });
  }, [duration, delay]);

  return (
    <svg ref={svgRef} className={cn("overflow-visible", className)}>
      {children}
    </svg>
  );
}
