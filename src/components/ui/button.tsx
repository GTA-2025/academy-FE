import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-full font-semibold transition-all",
          "",
          "disabled:opacity-50 disabled:pointer-events-none",

          // Size variants
          {
            "h-9 px-4 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-11 px-8 text-base": size === "lg",
          },

          // Style variants
          {
            // Default variant (filled)
            "bg-brand-primary text-brand-white hover:bg-brand-primary/90 dark:bg-brand-primary dark:hover:bg-brand-primary/90":
              variant === "default",

            // Outline variant
            "border-[1px] border-brand-primary text-brand-primary hover:bg-brand-primary/10 dark:border-brand-primary dark:text-brand-primary dark:hover:bg-brand-primary/20":
              variant === "outline",

            // Ghost variant
            "text-brand-black hover:bg-brand-gray-light dark:text-brand-white dark:hover:bg-brand-dark":
              variant === "ghost",
          },

          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
