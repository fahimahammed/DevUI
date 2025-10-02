"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = "tsx", showLineNumbers = true }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-lg overflow-hidden border border-border bg-secondary/50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/80">
                <span className="text-sm font-mono text-muted-foreground">{language}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 px-2 hover:bg-accent/50"
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4 mr-1" />
                            <span className="text-xs">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4 mr-1" />
                            <span className="text-xs">Copy</span>
                        </>
                    )}
                </Button>
            </div>
            <div className="overflow-x-auto bg-primary">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    showLineNumbers={showLineNumbers}
                    customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "transparent",
                        fontSize: "0.875rem",
                    }}
                    wrapLongLines
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};
