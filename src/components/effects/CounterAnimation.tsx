"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function CounterAnimation({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className,
}: CounterAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(
    prefix + (0).toFixed(decimals) + suffix
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(prefix + value.toFixed(decimals) + suffix);
      return;
    }

    const counterObj = { val: 0 };

    const anim = gsap.to(counterObj, {
      val: value,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        setDisplayValue(
          prefix + counterObj.val.toFixed(decimals) + suffix
        );
      },
    });

    return () => {
      anim.kill();
    };
  }, [value, prefix, suffix, decimals, duration]);

  return (
    <span ref={containerRef} className={cn("tabular-nums", className)}>
      {displayValue}
    </span>
  );
}
