"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // ✅ Import Input component
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
  Search, // ✅ Import Search Icon
} from "lucide-react";

// ✅ Define the types for the new props
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => { // ✅ Accept props
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // ✅ State for search animation
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Components", href: "#components", icon: Code2 },
    { name: "About", href: "/about", icon: Users },
    { name: "Docs", href: "#docs", icon: BookOpen },
    { name: "Analytics", href: "/analytics", icon: Star },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // When search opens, focus the input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false); // ✅ Close search on escape
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 transition-shadow">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group focus-ring rounded-md flex-shrink-0"
              aria-label="DevUI home"
            >
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute -inset-1 rounded-full bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:inline">DevUI</span>
            </Link>

            {/* Desktop Navigation - Hide when search is open on small screens */}
            <nav
              className={`hidden md:flex items-center space-x-1 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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
            <div className="flex items-center justify-end space-x-2 flex-1">
              {/* ✅ START: Animated Search Bar */}
              <div className="relative flex items-center">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`h-10 rounded-full border-2 border-transparent bg-muted/50 focus:border-primary focus:bg-transparent transition-all duration-300 ease-in-out ${
                    isSearchOpen
                      ? "w-48 sm:w-64 px-4 opacity-100"
                      : "w-0 px-0 opacity-0"
                  }`}
                />
                 <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hover:bg-primary/10 rounded-full"
                  aria-label="Toggle search bar"
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </Button>
              </div>
              {/* ✅ END: Animated Search Bar */}

              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="relative hover:bg-primary/10 transition-all duration-200 focus-ring rounded-full"
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
                  className="hover:bg-primary/10 transition-all duration-200 focus-ring rounded-full"
                  aria-label="View on GitHub"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/10 transition-all duration-200 focus-ring rounded-full"
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
          {/* ... (Mobile navigation remains the same) ... */}
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
