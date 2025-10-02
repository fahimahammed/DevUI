import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";
import { Eye, Code2 } from "lucide-react";

interface ComponentCardProps {
    title: string;
    description: string;
    preview: React.ReactNode;
    code: string;
    category?: string;
}

export const ComponentCard = ({
    title,
    description,
    preview,
    code,
    category
}: ComponentCardProps) => {
    const [activeTab, setActiveTab] = useState("preview");

    return (
        <Card className="group overflow-hidden border-border/50 bg-card/50 dark:bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 card-hover shadow-sm hover:shadow-xl hover:shadow-primary/5">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-border/50 bg-gradient-to-br from-card to-card/50">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                {title}
                            </h3>
                            {category && (
                                <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                                    {category}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Tab Controls */}
                <div className="px-5 sm:px-6 pt-4 bg-gradient-to-br from-card/50 to-background/50">
                    <TabsList className="bg-muted/50 dark:bg-muted/20 h-10 sm:h-11 w-full sm:w-auto backdrop-blur-sm border border-border/50">
                        <TabsTrigger 
                            value="preview" 
                            className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200 focus-ring"
                        >
                            <Eye className="h-4 w-4" />
                            <span>Preview</span>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="code" 
                            className="flex items-center gap-2 text-sm px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200 focus-ring"
                        >
                            <Code2 className="h-4 w-4" />
                            <span>Code</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Preview Tab */}
                <TabsContent 
                    value="preview" 
                    className="p-6 sm:p-8 min-h-[220px] flex items-center justify-center bg-gradient-to-br from-muted/5 to-background/50"
                >
                    <div className="w-full flex items-center justify-center overflow-x-auto">
                        <div className="scale-95 sm:scale-100 origin-center transition-transform duration-300 group-hover:scale-[1.02]">
                            {preview}
                        </div>
                    </div>
                </TabsContent>

                {/* Code Tab */}
                <TabsContent value="code" className="p-5 sm:p-6 bg-gradient-to-br from-muted/5 to-background/50">
                    <CodeBlock code={code} />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
