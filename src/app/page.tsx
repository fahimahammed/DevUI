"use client";
import { useState, useMemo, useEffect } from "react";
import { ComponentCard } from "@/components/ComponentCard";
import { componentsData } from "@/data/components";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Search,
  Sparkles,
  Filter,
  X,
  Code2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique categories with counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    componentsData.forEach((component) => {
      if (component.category) {
        categoryMap.set(
          component.category,
          (categoryMap.get(component.category) || 0) + 1
        );
      }
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, []);

  // Enhanced filtering with better search
  const filteredComponents = useMemo(() => {
    return componentsData.filter((component) => {
      const searchLower = searchQuery.toLowerCase().trim();

      // Enhanced search: title, description, category, and id
      const matchesSearch =
        !searchLower ||
        component.title.toLowerCase().includes(searchLower) ||
        component.description.toLowerCase().includes(searchLower) ||
        component.category?.toLowerCase().includes(searchLower) ||
        component.id.toLowerCase().includes(searchLower);

      const matchesCategory =
        !selectedCategory || component.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Modern & Clean */}
      <section
        id="main-content"
        className="relative overflow-hidden border-b border-border/50"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px] animate-glow float-animation" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-[120px] animate-glow"
            style={{ animationDelay: "1s", animationDuration: "8s" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 shine-effect animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Open Source • Hacktoberfest 2025
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-up px-4">
              <span className="gradient-text">DevUI</span>
              <br />
              <span className="text-foreground">Components</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Beautiful, accessible, and developer-friendly React components
              built with{" "}
              <span className="text-foreground font-semibold">shadcn/ui</span>.
              <br className="hidden sm:block" />
              Copy, paste, and customize to build amazing UIs.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex items-center justify-center gap-4 flex-wrap px-4 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                href="https://github.com/fahimahammed/DevUI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 focus-ring shine-effect shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 focus-ring backdrop-blur-sm hover:scale-105"
              >
                <a href="#component-categories">Browse Components</a>
              </Button>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-foreground font-semibold hover:bg-primary/10 transition-all duration-300 focus-ring"
                >
                  About Us
                </Button>
              </Link>
            </div>
            {/* Stats Section */}
            <section className="relative z-10 mt-6 sm:mt-10">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 animate-fade-up">
                  {[
                    {
                      label: `${componentsData.length}+ Components`,
                      icon: <Code2 className="h-4 w-4 text-primary" />,
                      delay: "0s",
                    },
                    {
                      label: "TypeScript",
                      icon: (
                        <img
                          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
                          alt="TypeScript"
                          className="h-4 w-4"
                        />
                      ),
                      delay: "0.15s",
                    },
                    {
                      label: "Responsive",
                      icon: <Users className="h-4 w-4 text-black" />,
                      delay: "0.3s",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full 
                     bg-muted/30 dark:bg-muted/20 text-xs sm:text-sm 
                     hover:bg-muted/50 transition-colors duration-200"
                      style={{ animationDelay: stat.delay }}
                    >
                      {stat.icon}
                      <span className="font-medium">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Search & Filters - Engaging Animated Search */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            {/* Animated Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 animate-fade-in" />

            <div className="relative">
              {/* Search Icon */}
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary pointer-events-none" />

              {/* Input Field */}
              <Input
                type="search"
                placeholder="Search components by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-12 h-16 text-lg sm:text-xl font-semibold bg-card/60 dark:bg-card/30 backdrop-blur-md border border-transparent focus:border-transparent transition-all duration-300 rounded-xl shadow-md hover:shadow-lg focus:shadow-lg focus:shadow-primary/20 focus-ring animate-fade-in"
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-foreground transition-all duration-200 p-1 hover:bg-muted/50 rounded-md focus-ring animate-fade-in"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary animate-fade-in" />
              <span className="text-base font-semibold text-foreground animate-fade-in">
                Filter by Category
              </span>
              {hasActiveFilters && (
                <span className="text-sm text-muted-foreground ml-2 animate-fade-in">
                  · {filteredComponents.length}{" "}
                  {filteredComponents.length === 1 ? "result" : "results"}
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 px-3 text-sm rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors focus-ring animate-fade-in"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-3" id="component-categories">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer transition-transform duration-200 hover:scale-105 text-sm sm:text-base px-4 py-2 rounded-full animate-fade-in"
              onClick={() => setSelectedCategory(null)}
            >
              All ({componentsData.length})
            </Badge>
            {categories.map(({ name, count }) => (
              <Badge
                key={name}
                variant={selectedCategory === name ? "default" : "outline"}
                className="cursor-pointer transition-transform duration-200 hover:scale-105 text-sm sm:text-base px-4 py-2 rounded-full animate-fade-in"
                onClick={() => setSelectedCategory(name)}
              >
                {name} ({count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Components Grid - Masonry Layout */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto">
          {filteredComponents.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
              {/* Left Column */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {filteredComponents.map((component, index) => {
                  if (index % 2 !== 0) return null;
                  return (
                    <div
                      key={component.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ComponentCard {...component} />
                    </div>
                  );
                })}
              </div>
              {/* Right Column */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {filteredComponents.map((component, index) => {
                  if (index % 2 === 0) return null;
                  return (
                    <div
                      key={component.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ComponentCard {...component} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 dark:bg-muted/20 mb-4 animate-pulse">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  No components found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                    : "No components match the selected category."}
                </p>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-6 focus-ring hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer - Clean & Modern */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold gradient-text">
                    DevUI
                  </span>
                </div>
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  Built with ❤️ for{" "}
                  <span className="text-foreground font-medium">
                    Hacktoberfest 2025
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="https://github.com/fahimahammed/DevUI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 focus-ring"
                    aria-label="View on GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/fahimahammed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 focus-ring"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Contributors
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} DevUI. Open source under MIT
                License.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
