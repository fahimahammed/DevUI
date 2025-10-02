"use client";

import React, { useEffect, useState } from "react";

export default function ThemeColorPicker() {
  const DEFAULT_PRIMARY = "#7c3aed";
  const DEFAULT_SECONDARY = "#06b6d4";

  const [primary, setPrimary] = useState<string>(DEFAULT_PRIMARY);
  const [secondary, setSecondary] = useState<string>(DEFAULT_SECONDARY);

  useEffect(() => {
    try {
      const savedP = localStorage.getItem("devui:primary");
      const savedS = localStorage.getItem("devui:secondary");

      const computedPrimary = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      const computedSecondary = getComputedStyle(document.documentElement)
        .getPropertyValue("--secondary")
        .trim();

      if (savedP) {
        setPrimary(savedP);
        document.documentElement.style.setProperty("--primary", savedP);
      } else if (computedPrimary) {
        setPrimary(computedPrimary);
        document.documentElement.style.setProperty("--primary", computedPrimary);
      } else {
        document.documentElement.style.setProperty("--primary", DEFAULT_PRIMARY);
      }

      if (savedS) {
        setSecondary(savedS);
        document.documentElement.style.setProperty("--secondary", savedS);
      } else if (computedSecondary) {
        setSecondary(computedSecondary);
        document.documentElement.style.setProperty("--secondary", computedSecondary);
      } else {
        document.documentElement.style.setProperty("--secondary", DEFAULT_SECONDARY);
      }
    } catch (e) {
      document.documentElement.style.setProperty("--primary", DEFAULT_PRIMARY);
      document.documentElement.style.setProperty("--secondary", DEFAULT_SECONDARY);
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.style.setProperty("--primary", primary);
      localStorage.setItem("devui:primary", primary);
    } catch { }
  }, [primary]);

  useEffect(() => {
    try {
      document.documentElement.style.setProperty("--secondary", secondary);
      localStorage.setItem("devui:secondary", secondary);
    } catch { }
  }, [secondary]);

  const reset = () => {
    setPrimary(DEFAULT_PRIMARY);
    setSecondary(DEFAULT_SECONDARY);
    try {
      localStorage.removeItem("devui:primary");
      localStorage.removeItem("devui:secondary");
    } catch { }
  };

  return (
    <>
      <style>{`
      @keyframes float {
        0%,100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      .picker-container { animation: float 6s ease-in-out infinite; }
      .shimmer-bg {
        background: linear-gradient(120deg, rgba(124,58,237,0.05) 0%, rgba(6,182,212,0.08) 50%, rgba(124,58,237,0.05) 100%);
        background-size: 200% 100%;
        animation: shimmer 8s linear infinite;
      }
      .reset-btn-ripple::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  pointer-events: none;
}

.reset-btn-ripple:active::after {
  transform: scale(2);
  opacity: 1;
  transition: transform 0s, opacity 0s;
}

      @media (prefers-reduced-motion: reduce) {
        .picker-container, .shimmer-bg { animation: none !important; }
      }
    `}</style>

      <div className="fixed top-3 right-3 z-50">
        <div
          className="picker-container relative flex items-center gap-2 p-2 rounded-xl backdrop-blur-lg shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,250,255,0.95) 100%)',
          }}
          aria-label="Theme color picker"
        >
          {/* Shimmer background */}
          <div className="shimmer-bg absolute inset-0 rounded-xl opacity-25 pointer-events-none" />

          <div className="relative flex items-center gap-2 z-10">
            {/* Label */}
            <div className="flex items-center gap-1.5 pr-2 border-r border-gray-300/20">
              <svg
                className="h-4 w-4 shrink-0 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
                <path
                  d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700 select-none">Theme</span>
            </div>

            {/* Color Pickers */}
            <div className="flex items-center gap-2">
              {/* Primary */}
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 shimmer-bg rounded-lg pointer-events-none" />
                <input
                  type="color"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                  className="relative w-10 h-10 border border-purple-300/50 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-400 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-1 active:scale-95"
                  style={{ boxShadow: `0 3px 8px -3px ${primary}60` }}
                />
              </div>

              {/* Secondary */}
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 shimmer-bg rounded-lg pointer-events-none" />
                <input
                  type="color"
                  value={secondary}
                  onChange={(e) => setSecondary(e.target.value)}
                  className="relative w-10 h-10 border border-cyan-300/50 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 active:scale-95"
                  style={{ boxShadow: `0 3px 8px -3px ${secondary}60` }}
                />
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              className="reset-btn-ripple group relative inline-flex items-center gap-2 text-sm sm:text-base px-4 py-2 rounded-xl border border-purple-300/50 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-1 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${primary}dd 0%, ${secondary}dd 100%)`,
                boxShadow: `0 4px 12px -4px ${primary}50, 0 4px 12px -4px ${secondary}50`,
              }}
            >
              {/* Animated Icon */}
              <svg
                className="h-5 w-5 transition-transform duration-500 ease-out group-hover:rotate-180 group-active:rotate-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Text */}
              <span className="select-none font-medium">Reset</span>

              {/* Subtle Glow on Hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${primary}30, ${secondary}30, transparent)`,
                  filter: 'blur(8px)',
                }}
              />
            </button>

          </div>
        </div>
      </div>
    </>
  );

}