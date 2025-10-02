"use client"
import { useState, useMemo } from "react";
import { ComponentCard } from "@/components/ComponentCard";
import { componentsData } from "@/data/components";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Github, Search, Sparkles, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique categories with counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    componentsData.forEach(component => {
      if (component.category) {
        categoryMap.set(component.category, (categoryMap.get(component.category) || 0) + 1);
      }
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
  }, []);

  // Enhanced filtering with better search
  const filteredComponents = useMemo(() => {
    return componentsData.filter(component => {
      const searchLower = searchQuery.toLowerCase().trim();
      
      // Enhanced search: title, description, category, and id
      const matchesSearch = !searchLower || 
        component.title.toLowerCase().includes(searchLower) ||
        component.description.toLowerCase().includes(searchLower) ||
        component.category?.toLowerCase().includes(searchLower) ||
        component.id.toLowerCase().includes(searchLower);
      
      const matchesCategory = !selectedCategory || component.category === selectedCategory;
      
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
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Open Source • Hacktoberfest 2025</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-4">
              DevUI Components
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Beautiful, accessible, and developer-friendly React components built with shadcn/ui.
              Copy, paste, and customize to build amazing UIs.
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4">
              <Link href={"https://github.com/fahimahammed/DevUI"}>
                <Button size="lg" className="bg-primary hover:opacity-90 transition-opacity text-sm sm:text-base">
                  <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Star on GitHub</span>
                  <span className="sm:hidden">Star</span>
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 text-sm sm:text-base">
                <span className="hidden sm:inline">Browse Components</span>
                <span className="sm:hidden">Browse</span>
              </Button>
              <Link href="/about">
                <Button size="lg" variant="ghost" className="text-primary font-semibold border border-primary/10 hover:bg-primary/10 text-sm sm:text-base">
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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 pr-10 h-10 sm:h-12 text-sm sm:text-base bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 focus:border-primary transition-colors dark:bg-card/30 dark:hover:bg-card/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm font-medium text-foreground dark:text-foreground">Filter by Category</span>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {filteredComponents.length} result{filteredComponents.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-xs hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
              >
                <X className="h-3 w-3 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80 transition-all hover:scale-105 dark:hover:bg-primary/70 dark:border-border text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1"
              onClick={() => setSelectedCategory(null)}
            >
              All ({componentsData.length})
            </Badge>
            {categories.map(({ name, count }) => (
              <Badge
                key={name}
                variant={selectedCategory === name ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80 transition-all hover:scale-105 dark:hover:bg-primary/70 dark:border-border text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1"
                onClick={() => setSelectedCategory(name)}
              >
                {name} ({count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          {filteredComponents.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">

              {filteredComponents.map((component, index) => {
                if (index % 2 != 0) return null;
                return (
                  <div
                    key={component.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ComponentCard {...component} />
                  </div>
                );
              })}
              </div>
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                {filteredComponents.map((component, index) => {
                  if (index % 2 === 0) return null;
                  return (
                    <div
                      key={component.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ComponentCard {...component} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 dark:bg-muted/20 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">No components found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                    : "No components match the selected category."}
                </p>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4"
                >
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
              <Link href={"https://github.com/fahimahammed"}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
