import * as React from "react";
import { cn } from "@/lib/utils";

export type KbdProps = React.ComponentProps<"kbd">;

const KbdInner = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
          className
        )}
      >
        {children}
      </kbd>
    );
  }
);
KbdInner.displayName = "Kbd";
const KbdPreview: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = React.useState(false);

  // handle global shortcut (Ctrl/Cmd + K)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // normalize key + modifier check
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        // prevent browser default (may be browser-specific in some edge cases)
        e.preventDefault();
        inputRef.current?.focus();
        setFocused(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full max-w-xs">
      <div className="relative">
        <input
          ref={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Search"
          placeholder="Search..."
          className="w-full rounded-md border border-border bg-input px-3 py-2 pl-8 pr-28 text-sm placeholder:text-muted-foreground focus:outline-none"
        />

        {/* left search icon (inside the bar) */}
        <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-4 opacity-80"
            aria-hidden="true"
            width="16"
            height="16"
          >
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        {!focused && (
          <div
            onMouseDown={(e) => {
              // ensure click focuses input (use mousedown to avoid losing focus)
              e.preventDefault();
              inputRef.current?.focus();
              setFocused(true);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2"
            aria-hidden
          >
            <KbdInner>⌘</KbdInner>
            <KbdInner>K</KbdInner>
          </div>
        )}
      </div>
    </div>
  );
};

// Expose Preview as a static property so data file only imports { Kbd }
type KbdComponentType = typeof KbdInner & { Preview: React.FC };

const Kbd = KbdInner as KbdComponentType;
Kbd.Preview = KbdPreview;

export { Kbd };
