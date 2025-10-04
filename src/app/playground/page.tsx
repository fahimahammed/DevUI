"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Moon, Sun } from "lucide-react";

// Only include components that exist in your fork
const componentsList = {
  Button: <Button>Click Me</Button>,
  ComponentCard: (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="font-bold text-lg">Demo Card</p>
        <p>Preview content here</p>
      </CardContent>
    </Card>
  ),
};

const codeSnippets: Record<string, string> = {
  Button: `<Button>Click Me</Button>`,
  ComponentCard: `<Card>
  <CardContent className="p-4 text-center">
    <p className="font-bold text-lg">Demo Card</p>
    <p>Preview content here</p>
  </CardContent>
</Card>`,
};

export default function PlaygroundPage() {
  const [selected, setSelected] = useState<string>("Button");
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[selected as keyof typeof codeSnippets]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Component Playground
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="ml-auto"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Component selector */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {Object.keys(componentsList).map((name) => (
            <Button
              key={name}
              variant={selected === name ? "default" : "outline"}
              onClick={() => setSelected(name)}
            >
              {name}
            </Button>
          ))}
        </div>

        {/* Live preview */}
        <Card className={`mb-6 shadow-lg border-2 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <CardContent className="p-8 md:p-12 flex justify-center items-center min-h-[200px]">
            {componentsList[selected as keyof typeof componentsList]}

          </CardContent>
        </Card>

        {/* Copy code snippet */}
        <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-black" : "bg-gray-900"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs uppercase ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
              Code Snippet
            </span>
            <Button
              onClick={handleCopy}
              size="sm"
              variant="ghost"
              className="flex items-center gap-2 text-gray-100 hover:text-white"
            >
              <Copy className="w-3 h-3" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <pre className="text-sm overflow-x-auto text-gray-100">
            <code>{codeSnippets[selected]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}