"use client";

import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({
  code,
  language = "tsx",
  showLineNumbers = true,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const generateHighlight = async () => {
      try {
        const theme = mounted && resolvedTheme === "dark" ? "github-dark" : "github-light";
        const html = await codeToHtml(code, {
          lang: language,
          theme,
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Highlighting error:", error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      }
    };

    generateHighlight();
  }, [code, language, mounted, resolvedTheme]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/30">
      {/* Header with primary color accents */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-3">
          {/* VS Code style dots with primary color */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <div className="w-3 h-3 rounded-full bg-primary/20" />
          </div>
          <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
            {language}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-3 text-primary hover:bg-primary/10 hover:text-primary transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>
      
      {/* Code content with Shiki highlighting */}
      <div 
        className="overflow-x-auto text-sm leading-relaxed"
        style={{
          fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
        }}
      >
        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className="[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:p-4 [&_code]:!bg-transparent"
            style={{
              // Custom line number styling with primary color
              counterReset: showLineNumbers ? "line" : "none",
            }}
          />
        ) : (
          <pre className="p-4 text-muted-foreground">
            <code>{code}</code>
          </pre>
        )}
      </div>
      
      {/* Subtle primary color accent at bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};