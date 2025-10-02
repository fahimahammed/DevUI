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
        <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary">
            <div className="p-4 sm:p-5 lg:p-6 border-b border-border">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">{title}</h3>
                        {category && (
                            <span className="inline-block px-2 py-0.5 sm:py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20">
                                {category}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{description}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4 sm:px-5 lg:px-6 pt-3 sm:pt-4 border-b border-border bg-secondary/30">
                    <TabsList className="bg-secondary/50 h-9 sm:h-10">
                        <TabsTrigger value="preview" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">Preview</span>
                        </TabsTrigger>
                        <TabsTrigger value="code" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                            <Code2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">Code</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="preview" className="p-4 sm:p-5 lg:p-6 min-h-[180px] sm:min-h-[200px] flex items-center justify-center">
                    <div className="w-full flex items-center justify-center overflow-x-auto">
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
