import * as React from "react";
import { cn } from "@/lib/utils";

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
  label?: string;
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", label = "Loading", ...props }, ref) => {
    const sizeClass =
      size === "sm"
        ? "h-4 w-4 border-2"
        : size === "lg"
        ? "h-8 w-8 border-2"
        : "h-5 w-5 border-2";

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(
          "inline-block animate-spin rounded-full border-current border-t-transparent text-muted-foreground flex-shrink-0 align-middle",
          sizeClass,
          className
        )}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";
export default Spinner;
