import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { TextReveal } from "@/components/effects/TextReveal";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      className,
      tag,
      title,
      subtitle,
      align = "left",
      dark = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4 mb-16 sm:mb-24",
          {
            "items-start text-left": align === "left",
            "items-center text-center": align === "center",
            "items-end text-right": align === "right",
          },
          className
        )}
        {...props}
      >
        {tag && (
          <Badge
            variant={dark ? "charcoal" : "vermilion"}
            className="mb-2 uppercase tracking-widest text-[11px] font-bold px-3 py-1"
          >
            {tag}
          </Badge>
        )}

        <h2
          className={cn(
            "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]",
            dark ? "text-ivory" : "text-charcoal"
          )}
        >
          <TextReveal type="words" duration={0.85} stagger={0.025}>
            {title}
          </TextReveal>
        </h2>

        {subtitle && (
          <p
            className={cn(
              "text-base sm:text-lg max-w-xl leading-relaxed mt-1",
              dark ? "text-ivory/70" : "text-charcoal-muted"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
