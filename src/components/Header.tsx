"use client"
import { useState } from "react";
import Link from "next/link";
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

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Components", href: "#components", icon: Code2 },
    { name: "About", href: "/about", icon: Users },
    { name: "Docs", href: "#docs", icon: BookOpen },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute -inset-1 rounded-full bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DevUI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-primary/10 transition-colors"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* GitHub Link */}
            <Link href="https://github.com/fahimahammed/DevUI">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>

            {/* Star Button */}
            <Link href="https://github.com/fahimahammed/DevUI">
              <Button
                size="sm"
                className="hidden sm:flex bg-primary hover:bg-primary/90 transition-colors"
              >
                <Star className="h-4 w-4 mr-2" />
                Star
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/40 animate-fade-in">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border/40 pt-3 mt-3">
                <Link
                  href="https://github.com/fahimahammed/DevUI"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <Star className="h-4 w-4 mr-3" />
                  Star on GitHub
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;