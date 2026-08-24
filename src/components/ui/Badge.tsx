import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "vermilion" | "cream" | "charcoal" | "outline" | "terracotta";
  size?: "sm" | "md";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "cream", size = "sm", children, ...props }, ref) => {
    const variantStyles = {
      vermilion: "bg-vermilion-light text-vermilion border-vermilion/20",
      cream: "bg-cream text-charcoal-500 border-warm-border",
      charcoal: "bg-charcoal text-ivory border-transparent",
      outline: "bg-transparent text-charcoal-400 border-warm-border",
      terracotta: "bg-terracotta/10 text-terracotta border-terracotta/20",
    };

    const sizeStyles = {
      sm: "text-xs px-2.5 py-0.5 font-medium tracking-wide",
      md: "text-sm px-3.5 py-1 font-medium tracking-wide",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-display transition-colors",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
