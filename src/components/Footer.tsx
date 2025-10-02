"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Code2,
  Heart,
  ExternalLink,
  Home,
  BookOpen,
  Users,
  Coffee,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Components", href: "#components", icon: Code2 },
    { name: "About", href: "/about", icon: Users },
    { name: "Documentation", href: "#docs", icon: BookOpen },
  ];

  return (
    <footer className="border-t border-border bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Code2 className="h-8 w-8 text-primary" />
                  <div className="absolute -inset-1 rounded-full bg-primary/20 blur animate-pulse" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  DevUI
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Beautiful, accessible, and developer-friendly React components.
                Built with modern tools for the next generation of web apps.
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Coffee className="h-3 w-3 mr-1" />
                <span>Made with</span>
                <Heart className="h-3 w-3 mx-1 text-red-500 animate-pulse" />
                <span>for developers</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <link.icon className="h-3 w-3 mr-2 transition-transform group-hover:scale-110" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community & Social */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Community
              </h3>
              <p className="text-sm text-muted-foreground">
                Join our community and stay updated with the latest components
                and features.
              </p>
              <div className="flex items-center space-x-2">
                <Link
                  href="https://github.com/fahimahammed/DevUI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
              </div>
              <Link
                href="https://github.com/fahimahammed/DevUI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>Star us on GitHub</span>
                <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover:scale-110" />
              </Link>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} DevUI. All rights reserved.</span>
              <div className="w-px h-4 bg-border" />
              <span className="flex items-center">
                Built for
                <Link
                  href="https://hacktoberfest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 text-primary hover:underline font-medium"
                >
                  Hacktoberfest 2025
                </Link>
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <Link
                href="#privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <div className="w-px h-3 bg-border" />
              <Link
                href="#terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <div className="w-px h-3 bg-border" />
              <Link
                href="#cookies"
                className="hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;