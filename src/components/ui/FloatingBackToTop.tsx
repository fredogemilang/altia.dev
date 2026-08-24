"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    // 1. Scroll visibility listener
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. IntersectionObserver to detect when the button enters dark sections/footer
    const darkElements = document.querySelectorAll("footer, [data-dark-bg], section.bg-charcoal");
    if (!darkElements || darkElements.length === 0) {
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    const intersectingSet = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSet.add(entry.target);
          } else {
            intersectingSet.delete(entry.target);
          }
        });
        setIsOverDark(intersectingSet.size > 0);
      },
      {
        root: null,
        // Trigger precisely when the dark section reaches the button position (~75px from bottom)
        rootMargin: "0px 0px -75px 0px",
        threshold: 0,
      }
    );

    darkElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      data-cursor="TOP"
      className={cn(
        "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50",
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out group backdrop-blur-md",
        isOverDark
          ? "bg-vermilion hover:bg-vermilion-light text-ivory border border-vermilion/80 shadow-vermilion-glow ring-2 ring-vermilion/40"
          : "bg-charcoal/90 hover:bg-vermilion text-ivory border border-charcoal-500/40 hover:border-vermilion/60 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.45)]",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-6 pointer-events-none scale-90"
      )}
    >
      <ArrowUp className="w-5 h-5 text-ivory transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
}
