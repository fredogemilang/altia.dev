import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "warm" | "glass" | "bordered" | "dark";
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "warm",
      hoverEffect = true,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      warm: "bg-warm-card border border-warm-border text-charcoal",
      glass: "glass-warm text-charcoal",
      bordered: "bg-transparent border border-warm-border text-charcoal",
      dark: "bg-charcoal text-ivory border border-charcoal-500/40",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden",
          variantStyles[variant],
          hoverEffect &&
            "hover:shadow-warm-lg hover:-translate-y-1 hover:border-vermilion/40",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
