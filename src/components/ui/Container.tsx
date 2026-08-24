import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "small" | "medium" | "large" | "full";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-20",
          {
            "max-w-7xl": size === "default",
            "max-w-4xl": size === "small",
            "max-w-5xl": size === "medium",
            "max-w-[1380px]": size === "large",
            "max-w-full": size === "full",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
