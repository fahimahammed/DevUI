"use client";

import { useState } from "react";
import { ComponentCard } from "@/components/ComponentCard";
import { componentsData } from "@/data/components";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Github, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Toaster } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(componentsData.map((c) => c.category).filter(Boolean))
  );

  // Filter components based on search query and selected category
  const filteredComponents = componentsData.filter((component) => {
    const matchesSearch =
      component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Check if there are any active filters
  const hasActiveFilters = selectedCategory !== null || searchQuery !== "";

  // Function to clear filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-glow" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Open Source • Hacktoberfest 2025
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-4">
              DevUI Components
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Beautiful, accessible, and developer-friendly React components
              built with shadcn/ui. Copy, paste, and customize to build amazing
              UIs.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="https://github.com/fahimahammed/DevUI">
                <Button size="lg" className="bg-primary hover:opacity-90 transition-opacity">
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 hover:bg-primary/5"
              >
                Browse Components
              </Button>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary font-semibold border border-primary/10 hover:bg-primary/10"
                >
                  About Us
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
              <span>{componentsData.length}+ Components</span>
              <span className="hidden sm:inline">•</span>
              <span>TypeScript</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Fully Responsive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card/50 backdrop-blur-sm border-border"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => setSelectedCategory(null)}
            >
              All ({componentsData.length})
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          {filteredComponents.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                {filteredComponents
                  .filter((_, index) => index % 2 === 0)
                  .map((component, index) => (
                    <div
                      key={component.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ComponentCard {...component} />
                    </div>
                  ))}
              </div>
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                {filteredComponents
                  .filter((_, index) => index % 2 !== 0)
                  .map((component, index) => (
                    <div
                      key={component.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ComponentCard {...component} status={component.status} />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 dark:bg-muted/20 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                  No components found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                    : "No components match the selected category."}
                </p>
              </div>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-sm text-muted-foreground">
              Built with ❤️ for Hacktoberfest 2025
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/fahimahammed">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
};

export default Index;
