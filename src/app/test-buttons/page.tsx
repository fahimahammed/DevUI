"use client";

import { Button } from "@/components/ui/button";
import { Github, Download, Settings, Trash2, ExternalLink } from "lucide-react";

export default function TestButtonsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Enhanced Button Animations
          </h1>
          <p className="text-muted-foreground text-lg">
            Hover over buttons to see smooth scale, glow, and shadow effects
          </p>
        </div>

        {/* Button Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Button Variants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Default Buttons</h3>
              <div className="flex flex-col gap-3">
                <Button>Default Button</Button>
                <Button size="sm">Small Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Secondary Buttons</h3>
              <div className="flex flex-col gap-3">
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary" size="sm">
                  Small Secondary
                </Button>
                <Button variant="secondary" size="lg">
                  Large Secondary
                </Button>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Outline Buttons</h3>
              <div className="flex flex-col gap-3">
                <Button variant="outline">Outline Button</Button>
                <Button variant="outline" size="sm">
                  Small Outline
                </Button>
                <Button variant="outline" size="lg">
                  Large Outline
                </Button>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Ghost Buttons</h3>
              <div className="flex flex-col gap-3">
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="ghost" size="sm">
                  Small Ghost
                </Button>
                <Button variant="ghost" size="lg">
                  Large Ghost
                </Button>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Destructive Buttons</h3>
              <div className="flex flex-col gap-3">
                <Button variant="destructive">Destructive</Button>
                <Button variant="destructive" size="sm">
                  Small Destructive
                </Button>
                <Button variant="destructive" size="lg">
                  Large Destructive
                </Button>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Link Buttons</h3>
              <div className="flex flex-col gap-3">
                <Button variant="link">Link Button</Button>
                <Button variant="link" size="sm">
                  Small Link
                </Button>
                <Button variant="link" size="lg">
                  Large Link
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons with Icons */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Buttons with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>
              <Github className="mr-2 h-4 w-4" />
              Star on GitHub
            </Button>
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost">
              <ExternalLink className="mr-2 h-4 w-4" />
              External Link
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </section>

        {/* Icon Only Buttons */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Icon Only Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="secondary" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">External Link</span>
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </section>

        {/* Loading States */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Loading States</h2>
          <div className="flex flex-wrap gap-4">
            <Button loading>Loading Button</Button>
            <Button variant="secondary" loading>
              Loading Secondary
            </Button>
            <Button variant="outline" loading>
              Loading Outline
            </Button>
          </div>
        </section>

        {/* Disabled States */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Disabled States</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled Button</Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
            <Button variant="ghost" disabled>
              Disabled Ghost
            </Button>
            <Button variant="destructive" disabled>
              Disabled Destructive
            </Button>
          </div>
        </section>

        {/* Focus Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Accessibility & Focus Testing
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Use Tab key to navigate through buttons and test focus states with
              animations:
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>Tab Focus Test 1</Button>
              <Button variant="secondary">Tab Focus Test 2</Button>
              <Button variant="outline">Tab Focus Test 3</Button>
              <Button variant="ghost">Tab Focus Test 4</Button>
              <Button variant="destructive">Tab Focus Test 5</Button>
            </div>
          </div>
        </section>

        {/* Dark Mode Notice */}
        <section>
          <div className="p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Theme Testing</h3>
            <p className="text-muted-foreground">
              Toggle between light and dark modes using the theme switcher in
              the header to test animation consistency across themes. The glow
              and shadow effects automatically adapt to the current theme for
              optimal visibility.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
