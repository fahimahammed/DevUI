"use client";

import React, { useState } from "react"; // ✅ Ensure React and useState are imported
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";
import { Eye, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComponentCardProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  category?: string;
  status?: "Stable" | "Beta";
  gradient?: boolean; // ✅ optional boolean prop for gradient
}

export const ComponentCard = ({
  title,
  description,
  preview,
  code,
  category,
  status,
  gradient = false // default false
}: ComponentCardProps) => {
  const [activeTab, setActiveTab] = useState("preview");

    return (
        <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary">
            <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
                        {category && (
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20">
                                {category}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{description}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-4 border-b border-border bg-secondary/30">
                    <TabsList className="bg-secondary/50">
                        <TabsTrigger value="preview" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Preview
                        </TabsTrigger>
                        <TabsTrigger value="code" className="flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Code
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="preview" className="p-6 min-h-[200px] flex items-center justify-center">
                    <div className="w-full flex items-center justify-center">
                        {preview}
                    </div>
                </TabsContent>

                <TabsContent value="code" className="p-6">
                    <CodeBlock code={code} />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
