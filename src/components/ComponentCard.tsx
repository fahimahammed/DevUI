import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";
import { Eye, Code2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    highlightQuery
}: ComponentCardProps) => {
    const [activeTab, setActiveTab] = useState("preview");
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            {/* Header Section - Enhanced */}
            <div className="p-4 sm:p-5 lg:p-6 border-b border-border bg-gradient-to-br from-card to-card/50">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                                {highlightQuery ? (
                                    <>
                                        {title.split(new RegExp(`(${highlightQuery})`, "ig")).map((part, idx) => (
                                            part.toLowerCase() === highlightQuery.toLowerCase() ? (
                                                <mark key={idx} className="bg-primary/20 text-primary rounded px-0.5">
                                                    {part}
                                                </mark>
                                            ) : (
                                                <span key={idx}>{part}</span>
                                            )
                                        ))}
                                    </>
                                ) : (
                                    title
                                )}
                            </h3>
                            {category && (
                                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {category}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Quick Actions Row */}
                {(propsData || installCommand) && (
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/50">
                        {propsData && (
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
                        {installCommand && (
                            <code className="px-3 py-1.5 text-xs font-mono bg-secondary/80 rounded-md border border-border">
                                {installCommand}
                            </code>
                        )}
                    </div>
                )}
            </div>

            {/* Expandable Props Documentation */}
            {showDetails && propsData && (
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
                                    <code className="text-sm font-mono font-semibold text-primary">
                                        {prop.name}
                                    </code>
                                    {prop.required && (
                                        <span className="text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
                                            required
                                        </span>
                                    )}
                                    <code className="text-xs font-mono text-muted-foreground">
                                        {prop.type}
                                    </code>
                                    {prop.default && (
                                        <code className="text-xs font-mono text-muted-foreground ml-auto">
                                            default: {prop.default}
                                        </code>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {prop.description}
                                </p>
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

            {/* Tabs Section - Enhanced */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4 sm:px-5 lg:px-6 py-3 border-b border-border ">
                    <TabsList className="bg-zinc-100 h-10 sm:h-11 p-1">
                        <TabsTrigger
                            value="preview"
                            className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                        >
                            <Eye className="h-4 w-4" />
                            <span>Preview</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                        >
                            <Code2 className="h-4 w-4" />
                            <span>Code</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent
                    value="preview"
                    className="p-4 sm:p-6 lg:p-8 min-h-[200px] sm:min-h-[240px]"
                >
                    <div className="w-full flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-border/50 bg-zinc-50 hover:border-border transition-colors">
                        <div className="scale-90 sm:scale-95 lg:scale-100 origin-center">
                            {preview}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="code" className="p-4 sm:p-5 lg:p-6">
                    <CodeBlock code={code} />
                </TabsContent>
            </Tabs>
        </Card>
    );
};