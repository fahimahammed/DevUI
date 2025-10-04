import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// NOTE: CodeBlock was missing, so we define a basic version here to ensure the file compiles.
// In a real project, this would be its own file with syntax highlighting (e.g., PrismJS or Shiki).
import { Eye, Code2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { CodeBlock } from "@/components/CodeBlock";


interface PropData {
    name: string;
    type: string;
    description: string;
    required?: boolean;
    default?: string;
}

interface ComponentCardProps {
    title: string;
    description: string;
    preview: React.ReactNode;
    code: string;
    category?: string;
    propsData?: PropData[];
    usageNotes?: string;
    installCommand?: string;
    loading?: boolean;
    highlightQuery?: string;
}

export const ComponentCard = ({
    title,
    description,
    preview,
    code,
    category,
    propsData,
    usageNotes,
    installCommand,
    loading = false, // Retaining default value from the loading branch
    highlightQuery
}: ComponentCardProps) => {
    const [activeTab, setActiveTab] = useState("preview");
    const [showDetails, setShowDetails] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    const isDark = mounted && resolvedTheme === 'dark';

    // Conditional function to render the highlighted title
    const renderTitle = () => {
        if (!highlightQuery) {
            return title;
        }

        // Split the title using a RegExp to capture the query for marking
        return title.split(new RegExp(`(${highlightQuery})`, "ig")).map((part, idx) => (
            part.toLowerCase() === highlightQuery.toLowerCase() ? (
                <mark key={idx} className="bg-primary/20 text-primary rounded px-0.5">
                    {part}
                </mark>
            ) : (
                <span key={idx}>{part}</span>
            )
        ));
    };

    return (
        <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <div className="p-4 sm:p-5 lg:p-6 border-b border-border bg-gradient-to-br from-card to-card/50">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            {/* Title Rendering - Loading check takes precedence */}
                            {loading ? (
                                <Skeleton width="200px" height="1.5rem" />
                            ) : (
                                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                                    {renderTitle()}
                                </h3>
                            )}

                            {/* Category Badge */}
                            {!loading && category && (
                                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {category}
                                </span>
                            )}
                        </div>
                        {/* Description Rendering */}
                        {loading ? (
                            <>
                                <Skeleton width="100%" height="1rem" className="mb-1" />
                                <Skeleton width="80%" height="1rem" />
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                        )}
                    </div>
                </div>

                {(propsData || installCommand) && (
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/50">
                        {!loading && propsData && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDetails(!showDetails)}
                                className="h-8 text-xs gap-1.5"
                            >
                                <Info className="h-3.5 w-3.5" />
                                Props & API
                                {showDetails ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                )}
                            </Button>
                        )}
                        {loading && <Skeleton width="100px" height="1.5rem" />}
                        {!loading && installCommand && (
                            <code className="px-3 py-1.5 text-xs font-mono bg-secondary/80 rounded-md border border-border">
                                {installCommand}
                            </code>
                        )}
                    </div>
                )}
            </div>

            {showDetails && propsData && !loading && (
                <div className="px-4 sm:px-5 lg:px-6 py-4 border-b border-border bg-secondary/30 animate-in slide-in-from-top-2 duration-300">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        Component Props
                    </h4>
                    <div className="space-y-2">
                        {propsData.map((prop, idx) => (
                            <div
                                key={idx}
                                className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                            >
                                <div className="flex flex-wrap items-start gap-2 mb-1">
                                    <code className="text-sm font-mono font-semibold text-primary">{prop.name}</code>
                                    {prop.required && (
                                        <span className="text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
                                            required
                                        </span>
                                    )}
                                    <code className="text-xs font-mono text-muted-foreground">{prop.type}</code>
                                    {prop.default && (
                                        <code className="text-xs font-mono text-muted-foreground ml-auto">
                                            default: {prop.default}
                                        </code>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{prop.description}</p>
                            </div>
                        ))}
                    </div>
                    {usageNotes && (
                        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <p className="text-xs text-foreground/80 leading-relaxed">
                                💡 <span className="font-medium">Usage Tip:</span> {usageNotes}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4 sm:px-5 lg:px-6 py-3 border-b border-border ">
                    <TabsList className={`${isDark ? 'bg-zinc-900/30' : 'bg-zinc-100'} h-10 sm:h-11 p-1`}>
                        <TabsTrigger
                            value="preview"
                            className={`flex items-center gap-2 text-sm px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm ${loading ? 'pointer-events-none opacity-80' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Skeleton width={20} height={20} className="rounded-full" />
                                    <Skeleton width={64} height={12} className="rounded-md" />
                                </div>
                            ) : (
                                <>
                                    <Eye className="h-4 w-4" />
                                    <span>Preview</span>
                                </>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className={`flex items-center gap-2 text-sm px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm ${loading ? 'pointer-events-none opacity-80' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Skeleton width={20} height={20} className="rounded-full" />
                                    <Skeleton width={48} height={12} className="rounded-md" />
                                </div>
                            ) : (
                                <>
                                    <Code2 className="h-4 w-4" />
                                    <span>Code</span>
                                </>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent
                    value="preview"
                    className="p-4 sm:p-6 lg:p-8 min-h-[200px] sm:min-h-[240px]"
                >
                    {loading ? (
                        <Skeleton width="100%" height="150px" rounded="xl" className={isDark ? 'bg-zinc-700' : 'bg-zinc-200'} />
                    ) : (
                        <div className={`w-full flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-border/50 ${isDark ? 'bg-zinc-900/30' : 'bg-zinc-50'} hover:border-border transition-colors`}>
                            <div className="scale-90 sm:scale-95 lg:scale-100 origin-center">
                                {preview}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="code" className="p-4 sm:p-5 lg:p-6">
    {loading ? (
        <Skeleton width="100%" height="200px" className={isDark ? 'bg-zinc-700' : 'bg-zinc-200'} />
    ) : (
        <CodeBlock code={code} componentName={title} />
    )}
</TabsContent>
            </Tabs>
        </Card>
    );
};
