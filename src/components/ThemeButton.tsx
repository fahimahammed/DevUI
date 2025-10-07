"use client";
import { useState, useEffect, useRef } from "react";

export default function ThemeButton() {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Apply selected theme to document
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Theme icon button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === "dark" ? "🌙" : "☀"}
      </button>

      {/* Popup */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-50">
          <button
            onClick={() => setTheme("light")}
            className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Light Mode
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Dark Mode
          </button>
          <button
            onClick={() => setTheme("system")}
            className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            System Default
          </button>
          <button
            onClick={() => setTheme("light")}
            className="block w-full text-left p-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}