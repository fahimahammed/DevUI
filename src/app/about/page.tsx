"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Sparkles, Heart, Code, Users, Zap, Palette, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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
              About DevUI
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              DevUI is a modern, open-source component library showcase built with shadcn/ui. 
              Explore, copy, and reuse beautifully designed components in your React or Next.js projects. 
              GitHub-ready and perfect for Hacktoberfest 2025! 🚀
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4">
              <Link href="https://github.com/fahimahammed/DevUI">
                <Button size="lg" className="bg-primary hover:opacity-90 transition-opacity text-sm sm:text-base">
                  <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Star on GitHub</span>
                  <span className="sm:hidden">Star</span>
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 text-sm sm:text-base">
                  <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Home</span>
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
              <span>Open Source</span>
              <span className="hidden sm:inline">•</span>
              <span>TypeScript</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Fully Responsive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          
          {/* Team & Purpose Section */}
          <Card className="bg-card/50 backdrop-blur-sm border-border dark:bg-card/30">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet the Team & Purpose</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-base sm:text-lg">
                  <span className="font-semibold text-primary">DevUI</span> is built by passionate open-source contributors for the community. 
                  Our goal is to make it easy for developers to discover, preview, and use high-quality UI components in their projects.
                </p>
                <p className="text-base sm:text-lg">
                  We believe in collaboration, learning, and sharing. Whether you're a beginner or a pro, you're welcome to contribute, 
                  suggest ideas, or just explore and enjoy the library!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="bg-card/50 backdrop-blur-sm border-border dark:bg-card/30">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Features</h2>
              </div>
              <div className="grid gap-4 sm:gap-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Code className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Shadcn/UI components with live previews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Code className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Syntax-highlighted code blocks for easy readability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Code className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>One-click copy functionality to quickly grab code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Palette className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Beautiful, minimal design with subtle accent colors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Palette className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Fully responsive design with smooth animations and hover effects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Code className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Search &amp; filter components by category</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Github className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>GitHub-ready for open-source contributions</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
            {/* Design & Components */}
            <Card className="bg-card/50 backdrop-blur-sm border-border dark:bg-card/30">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Design & Components</h3>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Enjoy a clean, modern UI with subtle gradients, clean sans-serif fonts, and smooth transitions. 
                  Browse a growing collection of components—Buttons, Inputs, Cards, Avatars, Badges, and more—each 
                  with live previews and copyable code.
                </p>
              </CardContent>
            </Card>

            {/* Open Source & Hacktoberfest */}
            <Card className="bg-card/50 backdrop-blur-sm border-border dark:bg-card/30">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Open Source & Hacktoberfest</h3>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  DevUI is GitHub-ready and welcomes contributions from everyone! Whether you want to add new components, 
                  improve designs, fix bugs, or suggest ideas, your PRs help us grow. Join us for Hacktoberfest 2025 
                  and make DevUI Components the ultimate open-source showcase!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Note */}
          <Card className="bg-muted/30 border-dashed border-muted-foreground/20">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground italic text-sm">
                (This is demo placeholder text. Final content coming soon!)
              </p>
            </CardContent>
          </Card>
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
}