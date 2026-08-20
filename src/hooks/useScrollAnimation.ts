"use client";

import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export type AnimationCallback = (
  context: {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
    isDesktop: boolean;
    isMobile: boolean;
  }
) => void | (() => void);

export function useScrollAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  callback: AnimationCallback,
  dependencies: unknown[] = []
) {
  useGSAP(
    () => {
      if (!scopeRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop = false, isMobile = false, reduceMotion = false } =
            context.conditions || {};

          if (reduceMotion) {
            // Respect accessibility settings
            gsap.set(scopeRef.current?.querySelectorAll(".will-change-transform") || [], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              clearProps: "all",
            });
            return;
          }

          return callback({
            gsap,
            ScrollTrigger,
            isDesktop,
            isMobile,
          });
        },
        scopeRef
      );

      return () => {
        mm.revert();
      };
    },
    { scope: scopeRef, dependencies }
  );
}
