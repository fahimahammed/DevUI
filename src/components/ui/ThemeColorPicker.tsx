"use client";

import { useEffect, useState } from "react";
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

  // UPDATED: This effect now loads the saved theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedThemeName = localStorage.getItem(STORAGE_KEY);
    const savedTheme = themes.find(t => t.name === savedThemeName);

    if (savedTheme) {
      // If a theme was saved, apply it
      handleThemeChange(savedTheme, false); // Pass false to prevent re-saving
    } else {
      // Otherwise, get the default color from CSS
      const currentColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
      setActiveColor(currentColor);
    }
  }, []);

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
    <div className="fixed bottom-4 right-4 z-50">
      <div className="group relative">
        <div className="absolute bottom-full right-0 mb-4 grid grid-cols-5 gap-2 rounded-lg border bg-background/80 p-2 backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          {themes.map((theme) => (
            <button
              key={theme.name}
              aria-label={`Switch to ${theme.name} theme`}
              onClick={() => handleThemeChange(theme)}
              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                activeColor === theme.color ? "border-foreground" : "border-transparent"
              }`}
              style={{ backgroundColor: theme.color }}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-lg">
          <Paintbrush className="h-6 w-6" />
          <span className="sr-only">Change Theme Color</span>
        </Button>
      </div>
    </div>
  );
};

export default ThemeColorPicker;

