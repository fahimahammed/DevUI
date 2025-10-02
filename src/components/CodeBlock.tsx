import { useState } from "react";
import dynamic from "next/dynamic";
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
    const SyntaxHighlighter = dynamic(() =>
        import("react-syntax-highlighter").then(m => m.Prism as any),
        { ssr: false, loading: () => <div className="p-4 text-xs text-muted-foreground">Loading highlighter…</div> }
    );
    const stylePromise = dynamic(() =>
        import("react-syntax-highlighter/dist/esm/styles/prism").then(m => m.vscDarkPlus),
        { ssr: false }
    ) as unknown as any;

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
                    style={stylePromise}
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
