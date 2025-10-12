import React, { useState } from "react"
import { toast } from "sonner"

type Color = { name: string; hex: string; tones?: { name: string; hex: string }[] }

type Props = {
  colors: Color[]
  onSelect?: (color: Color) => void
  showCopy?: boolean
  columns?: number
  className?: string
}

export default function ColorSwatchGrid({
  colors,
  onSelect,
  showCopy = true,
  columns = 6,
  className = "",
}: Props) {
  const [selectedHex, setSelectedHex] = useState<string | null>(null)
  const gridCols = `grid-cols-${Math.max(1, Math.min(columns, 12))}`

  async function copyHex(hex: string) {
    try {
      await navigator.clipboard.writeText(hex)
      toast.success(`Copied ${hex}`)
    } catch (e) {
      toast.error("Copy failed")
    }
  }

  return (
    <div className={`grid ${className} gap-2`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {colors.map((c) => (
        <div key={c.hex} className="rounded-md border overflow-hidden">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelectedHex(c.hex)
              onSelect?.(c)
              toast(`${c.name} selected`)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setSelectedHex(c.hex)
                onSelect?.(c)
                toast(`${c.name} selected`)
              }
            }}
            aria-label={`Select ${c.name} ${c.hex}`}
            aria-pressed={selectedHex === c.hex}
            className={`w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 hover:shadow-sm ${
              selectedHex === c.hex ? "ring-2 ring-offset-1 ring-primary" : ""
            }`}
          >
            <div style={{ backgroundColor: c.hex }} className="h-12 w-full" />
            <div className="flex items-center justify-between px-2 py-1 text-xs">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-muted-foreground">{c.hex}</div>
              </div>
              {showCopy && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyHex(c.hex)
                  }}
                  className="ml-2 text-xs rounded px-2 py-1 border"
                >
                  Copy
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
