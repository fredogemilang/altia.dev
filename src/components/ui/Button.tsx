import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "dark" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  cursorText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      isLoading = false,
      isSuccess = false,
      cursorText,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-display font-medium rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden select-none";

    const variantStyles = {
      primary:
        "bg-vermilion text-ivory hover:bg-vermilion-hover shadow-warm hover:shadow-vermilion-glow",
      secondary:
        "bg-cream text-charcoal border border-warm-border hover:bg-ivory hover:border-charcoal/40 shadow-warm",
      dark:
        "bg-charcoal text-ivory hover:bg-charcoal-500 shadow-warm",
      ghost:
        "bg-transparent text-charcoal hover:bg-cream/70",
      outline:
        "bg-transparent border border-vermilion text-vermilion hover:bg-vermilion hover:text-ivory",
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-3 gap-2",
      lg: "text-base px-8 py-4 gap-2.5",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={combinedClasses}
          data-cursor
          data-cursor-text={cursorText}
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || isLoading || isSuccess}
        data-cursor
        data-cursor-text={cursorText}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
