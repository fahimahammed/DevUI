
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { CodeBlock } from "@/components/CodeBlock";
import { generateComponentSnippet } from "@/lib/componentSnippetGenerator";

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

export const ComponentSnippetCard = ({
  title,
  description,
  preview,
  code,
  category,
  propsData = [],
  usageNotes,
  installCommand,
  loading = false,
  highlightQuery,
}: ComponentCardProps) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [showDetails, setShowDetails] = useState(false);
  const [variation, setVariation] = useState<
    "default" | "withIcon" | "alternateColor" | "responsive" | "compact" | "withDescription"
  >("default");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  // Generate base snippet for the component
  const generateComponentBaseSnippet = () => {
    const propsString = propsData
      .filter((prop) => prop.required || prop.default)
      .map((prop) => {
        if (prop.type.includes("function") || prop.type.includes("=>")) return ""; // Skip function props for now
        return `${prop.name}="${prop.default || ''}"`.trim();
      })
      .filter(Boolean)
      .join(" ");

    if (["slider", "calendar"].includes(title.toLowerCase())) {
      return `import { ${title === "slider" ? title : title.charAt(0).toUpperCase() + title.slice(1)} } from "@/components/ui/${title.toLowerCase()}"
import { useState } from "react"

export function ${title}Demo() {
  const [${title === "slider" ? "value" : "date"}, set${title === "slider" ? "Value" : "Date"}] = useState(${title === "slider" ? "[50]" : "new Date()"});
  return (
    <${title === "slider" ? title : title.charAt(0).toUpperCase() + title.slice(1)} ${propsString} ${title === "slider" ? "value={value} onValueChange={setValue}" : "selected={date} onSelect={setDate}"} />
  );
}`;
    } else if (["alert-dialog", "dialog", "drawer"].includes(title.toLowerCase())) {
      return `import { 
  ${title === "alert-dialog" ? "AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger" : title === "dialog" ? "Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger" : "Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger"},
  Button 
} from "@/components/ui/${title.toLowerCase()}"

export function ${title}Demo() {
  return (
    <${title === "alert-dialog" ? "AlertDialog" : title === "dialog" ? "Dialog" : "Drawer"}>
      <${title === "alert-dialog" ? "AlertDialogTrigger" : title === "dialog" ? "DialogTrigger" : "DrawerTrigger"} asChild>
        <Button variant="outline">Open ${title.charAt(0).toUpperCase() + title.slice(1)}</Button>
      </${title === "alert-dialog" ? "AlertDialogTrigger" : title === "dialog" ? "DialogTrigger" : "DrawerTrigger"}>
      <${title === "alert-dialog" ? "AlertDialogContent" : title === "dialog" ? "DialogContent" : "DrawerContent"} ${propsString}>
        <${title === "alert-dialog" ? "AlertDialogHeader" : title === "dialog" ? "DialogHeader" : "DrawerHeader"}>
          <${title === "alert-dialog" ? "AlertDialogTitle" : title === "dialog" ? "DialogTitle" : "DrawerTitle"}>${title.charAt(0).toUpperCase() + title.slice(1)} Title</${title === "alert-dialog" ? "AlertDialogTitle" : title === "dialog" ? "DialogTitle" : "DrawerTitle"}>
          <${title === "alert-dialog" ? "AlertDialogDescription" : title === "dialog" ? "DialogDescription" : "DrawerDescription"}>
            This is a ${title} example.
          </${title === "alert-dialog" ? "AlertDialogDescription" : title === "dialog" ? "DialogDescription" : "DrawerDescription"}>
        </${title === "alert-dialog" ? "AlertDialogHeader" : title === "dialog" ? "DialogHeader" : "DrawerHeader"}>
        <${title === "alert-dialog" ? "AlertDialogFooter" : title === "dialog" ? "DialogFooter" : "DrawerFooter"}>
          <${title === "alert-dialog" ? "AlertDialogCancel" : title === "dialog" ? "DialogClose" : "DrawerClose"} asChild>
            <Button variant="outline">Cancel</Button>
          </${title === "alert-dialog" ? "AlertDialogCancel" : title === "dialog" ? "DialogClose" : "DrawerClose"}>
          </${title === "alert-dialog" ? "AlertDialogFooter" : title === "dialog" ? "DialogFooter" : "DrawerFooter"}>
      </${title === "alert-dialog" ? "AlertDialogContent" : title === "dialog" ? "DialogContent" : "DrawerContent"}>
    </${title === "alert-dialog" ? "AlertDialog" : title === "dialog" ? "Dialog" : "Drawer"}>
  );
}`;
    } else if (title.toLowerCase() === "select") {
      return `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select ${propsString}>
      <SelectTrigger className="w-full" aria-label="Choose an option">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  );
}`;
    } else if (title.toLowerCase() === "toast" || title.toLowerCase() === "sonner") {
      return `import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function ${title}Demo() {
  return (
    <div>
      <Button variant="outline" onClick={() => toast("Sample ${title}")}>
        Show ${title.charAt(0).toUpperCase() + title.slice(1)}
      </Button>
    </div>
  );
}`;
    } else {
      return `import { ${title} } from "@/components/ui/${title.toLowerCase()}";

export function ${title}Demo() {
  return (
    <${title} ${propsString}>
      ${title === "Button" ? "Click Me" : title === "Input" ? 'placeholder="Enter text"' : "Content"}
    </${title}>
  );
}`;
    }
  };

  const baseSnippet = generateComponentBaseSnippet();
  const snippet = generateComponentSnippet(title.toLowerCase(), baseSnippet, { variation });

  const renderTitle = () => {
    if (!highlightQuery) return title;
    return title.split(new RegExp(`(${highlightQuery})`, "ig")).map((part, idx) =>
      part.toLowerCase() === highlightQuery.toLowerCase() ? (
        <mark key={idx} className="bg-primary/20 text-primary rounded px-0.5">
          {part}
        </mark>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  const availableVariations: Record<string, string[]> = {
    button: ["default", "withIcon", "alternateColor", "responsive"],
    input: ["default", "withPlaceholder", "responsive"],
    badge: ["default", "alternateColor", "responsive"],
    select: ["default", "withIcon", "alternateColor", "responsive"],
    dialog: ["default", "withIcon", "alternateColor", "responsive"],
    alertdialog: ["default", "withIcon", "alternateColor", "responsive"],
    drawer: ["default", "withIcon", "alternateColor", "responsive"],
    fileupload: ["default", "compact", "responsive"],
    toast: ["default", "withDescription"],
    sonner: ["default", "withDescription"],
    menubar: ["default", "alternateColor", "responsive"],
    sidebar: ["default", "responsive"],
  };

  const variations = availableVariations[title.toLowerCase()] || ["default"];

  return (
    <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <div className="p-4 sm:p-5 lg:p-6 border-b border-border bg-gradient-to-br from-card to-card/50">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {loading ? (
                <Skeleton width="200px" height="1.5rem" />
              ) : (
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {renderTitle()}
                </h3>
              )}
              {!loading && category && (
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  {category}
                </span>
              )}
            </div>
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
        {(propsData.length > 0 || installCommand) && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/50">
            {!loading && propsData.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="h-8 text-xs gap-1.5"
              >
                <Info className="h-3.5 w-3.5" />
                Props & API
                {showDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
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
      {showDetails && propsData.length > 0 && !loading && (
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
        <div className="px-4 sm:px-5 lg:px-6 py-3 border-b border-border">
          <TabsList className={`${isDark ? "bg-zinc-900/30" : "bg-zinc-100"} h-10 sm:h-11 p-1`}>
            <TabsTrigger
              value="preview"
              className={`flex items-center gap-2 text-sm px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm ${loading ? "pointer-events-none opacity-80" : ""}`}
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
              className={`flex items-center gap-2 text-sm px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm ${loading ? "pointer-events-none opacity-80" : ""}`}
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
        <TabsContent value="preview" className="p-4 sm:p-6 lg:p-8 min-h-[200px] sm:min-h-[240px]">
          {loading ? (
            <Skeleton width="100%" height="150px" rounded="xl" className={isDark ? "bg-zinc-700" : "bg-zinc-200"} />
          ) : (
            <div
              className={`w-full flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-border/50 ${
                isDark ? "bg-zinc-900/30" : "bg-zinc-50"
              } hover:border-border transition-colors`}
              suppressHydrationWarning
            >
              {mounted ? (
                <div className="scale-[0.85] sm:scale-[0.9] lg:scale-100 origin-center max-w-full">
                  {preview}
                </div>
              ) : null}
            </div>
          )}
        </TabsContent>
        <TabsContent value="code" className="p-4 sm:p-5 lg:p-6">
          {loading ? (
            <Skeleton width="100%" height="200px" className={isDark ? "bg-zinc-700" : "bg-zinc-200"} />
          ) : (
            <div className="mb-4 p-3 bg-secondary/30 rounded-lg border border-border">
              <h4 className="text-sm font-medium text-foreground mb-2">Copy Code</h4>
              <CodeBlock code={snippet} componentName={title} language="tsx" />
              <div className="flex flex-wrap gap-2 mt-4">
                {variations.map((variant) => (
                  <Button
                    key={variant}
                    variant={variation === variant ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVariation(variant as typeof variation)}
                    className="capitalize"
                  >
                    {variant.replace(/([A-Z])/g, " $1").trim()}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};