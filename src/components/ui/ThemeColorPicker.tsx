"use client";

import { useEffect, useRef, useState } from "react";
import { Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define our color themes
const themes = [
  { name: "Blue", color: "oklch(0.6 0.118 244.7)", ring: "oklch(0.6 0.118 244.7)" },
  { name: "Green", color: "oklch(0.65 0.15 150)", ring: "oklch(0.65 0.15 150)" },
  { name: "Orange", color: "oklch(0.7 0.16 55)", ring: "oklch(0.7 0.16 55)" },
  { name: "Rose", color: "oklch(0.7 0.18 10)", ring: "oklch(0.7 0.18 10)" },
  { name: "Violet", color: "oklch(0.65 0.2 280)", ring: "oklch(0.65 0.2 280)" },
];

// NEW: Define a key for localStorage
const STORAGE_KEY = "devui-theme-color";

const ThemeColorPicker = () => {
  const [mounted, setMounted] = useState(false);
  const [activeColor, setActiveColor] = useState(themes[0].color);
  const [open, setOpen] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // UPDATED: This effect now loads the saved theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedThemeName = localStorage.getItem(STORAGE_KEY);
    const savedTheme = themes.find((t) => t.name === savedThemeName);

    if (savedTheme) {
      // If a theme was saved, apply it
      handleThemeChange(savedTheme, false); // Pass false to prevent re-saving
    } else {
      // Otherwise, get the default color from CSS
      const currentColor = getComputedStyle(document.body)
        .getPropertyValue("--primary")
        .trim();
      setActiveColor(currentColor);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // When opening, detect viewport overflow and flip alignment if needed
  useEffect(() => {
    if (!open) return;
    const el = menuRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportRight = window.innerWidth - 8; // 8px safe padding
    if (rect.right > viewportRight) {
      setAlignLeft(true);
    } else {
      setAlignLeft(false);
    }
  }, [open]);

  // UPDATED: This function now saves the choice to localStorage
  const handleThemeChange = (theme: typeof themes[0], save = true) => {
    // Update CSS variables directly on the body
    document.body.style.setProperty("--primary", theme.color);
    document.body.style.setProperty("--ring", theme.ring);
    document.body.style.setProperty("--sidebar-primary", theme.color);
    document.body.style.setProperty("--sidebar-ring", theme.ring);
    
    setActiveColor(theme.color);

    // NEW: Save the selected theme NAME to localStorage if 'save' is true
    if (save) {
      localStorage.setItem(STORAGE_KEY, theme.name);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-4 sm:right-4 z-50" ref={containerRef}>
      <div className="relative">
        <div
          ref={menuRef}
          className={`absolute bottom-full ${alignLeft ? 'left-0 right-auto' : 'right-0 left-auto'} mb-3 flex items-center gap-2 rounded-xl border bg-background/90 p-2 backdrop-blur-md shadow-lg transition-all duration-200 origin-bottom-right overflow-visible min-w-max ${alignLeft ? 'translate-x-[4px]' : 'translate-x-[-4px]'}
            ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
          role="menu"
          aria-label="Theme colors"
          id="theme-color-menu"
        >
          {themes.map((theme) => (
            <button
              key={theme.name}
              aria-label={`Switch to ${theme.name} theme`}
              onClick={() => {
                handleThemeChange(theme);
                setOpen(false);
              }}
              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 focus-ring ${
                activeColor === theme.color ? "border-foreground" : "border-transparent"
              }`}
              style={{ backgroundColor: theme.color }}
              role="menuitem"
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="theme-color-menu"
          onClick={() => setOpen((prev: boolean) => !prev)}
        >
          <Paintbrush className="h-6 w-6" />
          <span className="sr-only">Change Theme Color</span>
        </Button>
      </div>
    </div>
  );
};

export default ThemeColorPicker;

