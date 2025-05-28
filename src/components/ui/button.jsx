import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

/**
 * @typedef {object} ButtonProps
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>['variant']} [variant] - The visual variant of the button.
 * @property {"default" | "sm" | "lg" | "icon"} [size] - The size of the button.
 * @property {string} [className] - Optional CSS class names to apply.
 * @property {React.ReactNode} [children] - The content to render inside the button.
 * @property {boolean} [asChild] - Whether to render the children directly instead of a <button> element.
 */

/**
 * A reusable button component.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {React.ForwardedRef<HTMLButtonElement>} ref - The forwarded ref.
 * @returns {JSX.Element} The Button component.
 */
const Button = forwardRef(({
  variant = "default",
  size = "default",
  className,
  children,
  asChild = false,
  ...props
}, ref) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    // Variant Classes
    variant === "default" &&
      "bg-primary text-primary-foreground hover:bg-primary/90",
    variant === "secondary" &&
      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    variant === "ghost" &&
      "text-foreground hover:bg-accent hover:text-accent-foreground",
    variant === "outline" &&
      "border border-input text-foreground hover:bg-accent hover:text-accent-foreground",
    variant === "destructive" &&
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    variant === "link" && "text-primary underline-offset-4 hover:underline",
    // Size Classes
    size === "default" && "px-4 py-2",
    size === "sm" && "px-3 py-1.5 text-sm",
    size === "lg" && "px-6 py-3 text-lg",
    size === "icon" && "h-9 w-9 p-0",
    className
  );

  if (asChild) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <button ref={ref} className={baseClasses} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

export default Button;