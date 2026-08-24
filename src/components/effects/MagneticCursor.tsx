"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Quick setters for ultra-smooth, responsive tracking
    const xDot = gsap.quickTo(cursor, "x", { duration: 0.02, ease: "power2.out" });
    const yDot = gsap.quickTo(cursor, "y", { duration: 0.02, ease: "power2.out" });

    const xFollower = gsap.quickTo(follower, "x", {
      duration: 0.14,
      ease: "power2.out",
    });
    const yFollower = gsap.quickTo(follower, "y", {
      duration: 0.14,
      ease: "power2.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Attach listeners for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], input, textarea"
      ) as HTMLElement | null;

      if (target) {
        setIsHovered(true);
        const text = target.getAttribute("data-cursor-text");
        if (text) {
          setCursorText(text);
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Center dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-vermilion pointer-events-none z-50 transition-opacity duration-150 hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-0 opacity-0" : "scale-100"}`}
      />

      {/* Trailing magnetic ring & label */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-50 flex items-center justify-center transition-[width,height,background-color,border-color,opacity] duration-200 ease-out hidden md:flex ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          cursorText
            ? "w-20 h-20 bg-charcoal text-ivory text-[10px] font-display font-bold uppercase tracking-widest border border-charcoal/20 shadow-warm-lg"
            : isHovered
            ? "w-12 h-12 bg-vermilion/15 border-2 border-vermilion"
            : "w-8 h-8 border border-charcoal/30"
        }`}
      >
        {cursorText && (
          <span ref={textRef} className="animate-pulse-soft">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
