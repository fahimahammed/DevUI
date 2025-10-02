"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const lines = code.split("\n")

  return (
    <div className={`group relative overflow-hidden rounded-xl border border-primary/30 bg-card/60 shadow-2xl shadow-black/20 transition-all duration-300 hover:shadow-zinc-900/30 ${className || ""}`}>
      {/* Subtle gradient overlay using primary/accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8" />
      
      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-primary/20 px-5 py-3 backdrop-blur-sm bg-card/70">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-primary/80" />
            <div className="h-3 w-3 rounded-full bg-primary/80" />
            <div className="h-3 w-3 rounded-full bg-primary/80" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 gap-2 px-3 text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Copy code</span>
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <pre className="px-5 py-4">
          <code className="text-[13px] leading-relaxed">
              {showLineNumbers ? (
                <div className="flex gap-6">
                  <div className="select-none font-mono text-primary/80">
                    {lines.map((_, i) => (
                      <div 
                        key={i} 
                        className="h-[22px] text-right transition-colors group-hover:text-primary/60"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 font-mono text-foreground">
                    {lines.map((line, i) => (
                      <div 
                        key={i} 
                        className="h-[22px] whitespace-pre"
                      >
                        {line || " "}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="font-mono text-foreground whitespace-pre">
                  {code}
                </div>
              )}
          </code>
        </pre>
      </div>

      {/* Bottom gradient accent */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  )
}