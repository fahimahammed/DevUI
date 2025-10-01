"use client"
import { useState } from "react";
import { ComponentCard } from "@/components/ComponentCard";
import { componentsData } from "@/data/components";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Github, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(componentsData.map(c => c.category).filter(Boolean)));

  const filteredComponents = componentsData.filter(component => {
    const matchesSearch = component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Open Source • Hacktoberfest 2025</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold">
              DevUI Components
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Beautiful, accessible, and developer-friendly React components built with shadcn/ui.
              Copy, paste, and customize to build amazing UIs.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link href={"https://github.com/fahimahammed/DevUI"}>
                <Button size="lg" className="bg-primary hover:opacity-90 transition-opacity">
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                Browse Components
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>{componentsData.length}+ Components</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Fully Responsive</span>
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
              placeholder="Search components..."
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
              All
            </Badge>
            {categories.map(category => (
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
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          {filteredComponents.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col gap-8">

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
              <div className="flex flex-col gap-8">
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
            <div className="text-center py-12">
              <p className="text-muted-foreground">No components found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
