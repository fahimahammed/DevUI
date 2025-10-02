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
      } else if (
        computedPrimary &&
        (computedPrimary.startsWith("#") ||
          computedPrimary.startsWith("rgb") ||
          computedPrimary.startsWith("hsl"))
      ) {
        setPrimary(computedPrimary);
        document.documentElement.style.setProperty("--primary", computedPrimary);
      } else {
        document.documentElement.style.setProperty("--primary", DEFAULT_PRIMARY);
      }

      if (savedS) {
        setSecondary(savedS);
        document.documentElement.style.setProperty("--secondary", savedS);
      } else if (
        computedSecondary &&
        (computedSecondary.startsWith("#") ||
          computedSecondary.startsWith("rgb") ||
          computedSecondary.startsWith("hsl"))
      ) {
        setSecondary(computedSecondary);
        document.documentElement.style.setProperty(
          "--secondary",
          computedSecondary
        );
      } else {
        document.documentElement.style.setProperty(
          "--secondary",
          DEFAULT_SECONDARY
        );
      }
    } catch (e) {
      document.documentElement.style.setProperty("--primary", DEFAULT_PRIMARY);
      document.documentElement.style.setProperty(
        "--secondary",
        DEFAULT_SECONDARY
      );
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.style.setProperty("--primary", primary);
      localStorage.setItem("devui:primary", primary);
    } catch {}
  }, [primary]);

  useEffect(() => {
    try {
      document.documentElement.style.setProperty("--secondary", secondary);
      localStorage.setItem("devui:secondary", secondary);
    } catch {}
  }, [secondary]);

  const reset = () => {
    setPrimary(DEFAULT_PRIMARY);
    setSecondary(DEFAULT_SECONDARY);
    try {
      localStorage.removeItem("devui:primary");
      localStorage.removeItem("devui:secondary");
    } catch {}
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes sheen {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) rotate(45deg);
          }
        }
        
        .picker-container {
          animation: float 6s ease-in-out infinite;
        }
        
        .shimmer-bg {
          background: linear-gradient(
            120deg,
            rgba(124, 58, 237, 0.03) 0%,
            rgba(6, 182, 212, 0.06) 25%,
            rgba(124, 58, 237, 0.03) 50%,
            rgba(6, 182, 212, 0.06) 75%,
            rgba(124, 58, 237, 0.03) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 8s linear infinite;
        }
        
        .color-swatch {
          position: relative;
          overflow: hidden;
        }
        
        .color-swatch::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: sheen 3s ease-in-out infinite;
        }
        
        .reset-btn-ripple::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
          transform: scale(0);
          transition: transform 0.6s, opacity 0.6s;
        }
        
        .reset-btn-ripple:active::after {
          transform: scale(2);
          opacity: 1;
          transition: transform 0s, opacity 0s;
        }
        
        .star-particle {
          animation: sparkle 3s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .picker-container,
          .shimmer-bg,
          .color-swatch::before,
          .star-particle {
            animation: none !important;
          }
        }
      `}</style>

      <div className="fixed top-3 right-3 z-50">
        <div
          className="picker-container relative flex items-center gap-2 p-2 rounded-xl border border-purple-200/30 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-[0_8px_30px_-8px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(250,250,255,0.9) 100%)',
          }}
          aria-label="Theme color picker"
        >
          {/* Animated background shimmer layer */}
          <div className="shimmer-bg absolute inset-0 rounded-xl opacity-40 pointer-events-none" />

          {/* Content layer */}
          <div className="relative flex items-center gap-2 z-10">
            {/* Compact header */}
            <div className="flex items-center gap-1.5 pr-2 border-r border-gray-300/40">
              <svg
                className="h-4 w-4 shrink-0 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2"/>
                <path
                  d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-semibold select-none text-gray-700">
                Theme
              </span>
            </div>

            {/* Compact color controls */}
            <div className="flex items-center gap-2">
              <div className="color-swatch relative">
                <input
                  aria-label="Primary color"
                  type="color"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                  className="w-8 h-8 p-0 border border-purple-300/50 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-400 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-1 active:scale-95"
                  style={{
                    boxShadow: `0 2px 8px -2px ${primary}60`,
                  }}
                />
              </div>

              <div className="color-swatch relative">
                <input
                  aria-label="Secondary color"
                  type="color"
                  value={secondary}
                  onChange={(e) => setSecondary(e.target.value)}
                  className="w-8 h-8 p-0 border border-cyan-300/50 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 active:scale-95"
                  style={{
                    boxShadow: `0 2px 8px -2px ${secondary}60`,
                  }}
                />
              </div>
            </div>

            {/* Spacer */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent" />

            {/* Compact Reset button */}
            <button
              type="button"
              onClick={reset}
              aria-label="Reset theme colors"
              className="reset-btn-ripple group relative inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-purple-300/50 text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-1 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${primary}dd 0%, ${secondary}dd 100%)`,
                boxShadow: `0 4px 12px -4px ${primary}50, 0 4px 12px -4px ${secondary}50`,
              }}
            >
              {/* Animated icon */}
              <svg
                className="h-3.5 w-3.5 transition-all duration-500 ease-out group-hover:rotate-180 group-active:rotate-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
                <path
                  d="M12 8v4l2 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="select-none">Reset</span>

              {/* Subtle glow on hover */}
              <span
                aria-hidden="true"
                className="absolute rounded-lg -inset-0.5 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
