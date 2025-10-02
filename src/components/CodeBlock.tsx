"use client"

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = "tsx", showLineNumbers = true }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted ? (resolvedTheme || theme) : 'dark';
    const syntaxTheme = currentTheme === 'dark' ? vscDarkPlus : vs;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            toast.success("Code copied to clipboard!", {
                duration: 2000,
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy code");
        }
    };

    return (
        <div className="relative rounded-lg overflow-hidden border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border bg-secondary/80 dark:bg-secondary/50">
                <span className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wide">{language}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 sm:h-8 px-2 sm:px-3 hover:bg-accent/50 transition-all"
                    aria-label={copied ? "Code copied" : "Copy code"}
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                            <span className="text-xs hidden sm:inline">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="text-xs hidden sm:inline">Copy</span>
                        </>
                    )}
                </Button>
            </div>
            <div className="overflow-x-auto bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-[#f5f5f5]">
                <SyntaxHighlighter
                    language={language}
                    style={syntaxTheme}
                    showLineNumbers={showLineNumbers}
                    customStyle={{
                        margin: 0,
                        padding: "0.875rem 1rem",
                        background: "transparent",
                        fontSize: "0.8125rem",
                        lineHeight: "1.6",
                    }}
                    codeTagProps={{
                        style: {
                            fontSize: "0.8125rem",
                            fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
                        }
                    }}
                    wrapLongLines={false}
                    className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};
