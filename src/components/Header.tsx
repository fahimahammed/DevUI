"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Github,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Home,
  BookOpen,
  Users,
  Star,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Components", href: "#components", icon: Code2 },
    { name: "About", href: "/about", icon: Users },
    { name: "Docs", href: "#docs", icon: BookOpen },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 transition-shadow">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group focus-ring rounded-md"
              aria-label="DevUI home"
            >
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute -inset-1 rounded-full bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <span className="text-xl font-bold gradient-text">DevUI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-1"
              aria-label="Main navigation"
            >
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      aria-current={isActive ? "page" : undefined}
                      className={`text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 focus-ring ${
                        isActive
                          ? "bg-primary/10 text-foreground font-medium"
                          : ""
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="relative hover:bg-primary/10 transition-all duration-200 focus-ring"
                  aria-label={`Switch to ${
                    theme === "dark" ? "light" : "dark"
                  } mode`}
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              )}

              {/* GitHub Link */}
              <Link
                href="https://github.com/fahimahammed/DevUI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 transition-all duration-200 focus-ring"
                  aria-label="View on GitHub"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>

              {/* Star Button */}
              <Link
                href="https://github.com/fahimahammed/DevUI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="hidden sm:flex bg-primary hover:bg-primary/90 transition-all duration-200 focus-ring shine-effect"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Star
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/10 transition-all duration-200 focus-ring"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav
              id="mobile-menu"
              className="md:hidden animate-fade-in"
              aria-label="Mobile navigation"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/40">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 focus-ring ${
                        isActive
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
                <div className="border-t border-border/40 pt-3 mt-3">
                  <Link
                    href="https://github.com/fahimahammed/DevUI"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 focus-ring"
                  >
                    <Star className="h-4 w-4 mr-3" />
                    Star on GitHub
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
