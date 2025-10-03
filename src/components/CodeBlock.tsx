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

  // Calculate line count and create line numbers array
  const lines = code.split('\n');
  const lineCount = lines.length;
  const maxLineNumberWidth = lineCount.toString().length;

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

        // If line numbers are enabled, process the HTML to add line number structure
        if (showLineNumbers) {
          const processedHtml = addLineNumbersToHtml(html, lineCount);
          setHighlightedCode(processedHtml);
        } else {
          setHighlightedCode(html);
        }
      } catch (error) {
        console.error("Highlighting error:", error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      }
    };

    generateHighlight();
  }, [code, language, mounted, resolvedTheme, showLineNumbers, lineCount]);

  // Function to add line numbers to the highlighted HTML
  const addLineNumbersToHtml = (html: string, totalLines: number) => {
    // Split HTML by newlines and add line number structure
    const htmlLines = html.split('\n');
    const preMatch = html.match(/<pre[^>]*>/);
    const codeMatch = html.match(/<code[^>]*>/);
    const preOpenTag = preMatch ? preMatch[0] : '<pre>';
    const codeOpenTag = codeMatch ? codeMatch[0] : '<code>';

    // Extract the content between <code> and </code>
    const codeContent = html.match(/<code[^>]*>([\s\S]*?)<\/code>/)?.[1] || '';
    const lines = codeContent.split('\n');

    // Wrap each line with line number data
    const numberedLines = lines.map((line, index) => {
      const lineNumber = index + 1;
      return `<span class="code-line" data-line-number="${lineNumber}">${line}</span>`;
    }).join('\n');

    return `${preOpenTag}${codeOpenTag}${numberedLines}</code></pre>`;
  };

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
          {/* Language Label */}
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold">
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

      {/* Code content with Shiki highlighting and logical line numbers */}
      <div
        className="overflow-x-auto text-sm leading-relaxed relative"
        style={{
          fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
        }}
      >
        {showLineNumbers && (
          <div
            className="absolute left-0 top-0 flex flex-col py-4 px-2 text-right select-none pointer-events-none z-10"
            style={{
              width: `${Math.max(2.5, maxLineNumberWidth * 0.6 + 1)}rem`,
              backgroundColor: 'transparent',
              borderRight: '1px solid hsl(var(--primary) / 0.2)',
            }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <span
                key={i + 1}
                className="block text-xs leading-relaxed opacity-70 hover:opacity-100 transition-opacity"
                style={{
                  color: 'hsl(var(--primary) / 0.8)',
                  lineHeight: '1.5',
                  height: '1.5em',
                }}
              >
                {i + 1}
              </span>
            ))}
          </div>
        )}

        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={`
              [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:py-4 [&_code]:!bg-transparent
              ${showLineNumbers ? `[&_pre]:pl-[${Math.max(2.5, maxLineNumberWidth * 0.6 + 1) + 1}rem]` : '[&_pre]:px-4'}
            `}
            style={{
              marginLeft: showLineNumbers ? `${Math.max(2.5, maxLineNumberWidth * 0.6 + 1)}rem` : '0',
              paddingLeft: showLineNumbers ? '1rem' : '1rem',
            }}
          />
        ) : (
          <pre
            className={`py-4 text-muted-foreground ${showLineNumbers ? 'pl-16' : 'px-4'}`}
            style={{
              marginLeft: showLineNumbers ? `${Math.max(2.5, maxLineNumberWidth * 0.6 + 1)}rem` : '0',
            }}
          >
            <code>{code}</code>
          </pre>
        )}
      </div>

      {/* Subtle primary color accent at bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};