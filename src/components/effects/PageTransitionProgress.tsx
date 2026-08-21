"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransitionProgress() {
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Trigger on initial mount & link clicks
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    const handleNavigation = () => {
      setIsNavigating(true);
      setTimeout(() => setIsNavigating(false), 450);
    };

    window.addEventListener("popstate", handleNavigation);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          key="top-page-progress"
          initial={{ scaleX: 0, opacity: 1, transformOrigin: "0% 50%" }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-vermilion z-[9999] pointer-events-none shadow-[0_0_12px_#E34234,0_0_24px_rgba(227,66,52,0.8)]"
        />
      )}
    </AnimatePresence>
  );
}
