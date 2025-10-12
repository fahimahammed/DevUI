import React, { useMemo, useState, useEffect } from "react"

type Item = { id: string; label: string; [k: string]: any }

type LiveSearchProps = {
  items: Item[]
  onSelect?: (item: Item) => void
  placeholder?: string
  debounceMs?: number
  renderItem?: (item: Item) => React.ReactNode
  noResultsText?: string
  className?: string
}

export default function LiveSearch({
  items,
  onSelect,
  placeholder = "Search...",
  debounceMs = 200,
  renderItem,
  noResultsText = "No results",
  className = "w-full",
}: LiveSearchProps) {
  const [query, setQuery] = useState("")
  const [value, setValue] = useState(query)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  useEffect(() => {
    const t = setTimeout(() => setQuery(value), debounceMs)
    return () => clearTimeout(t)
  }, [value, debounceMs])

  const results = useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter((it) => (it.label || "").toLowerCase().includes(q))
  }, [items, query])

  function handleSelect(item: Item) {
    onSelect?.(item)
    setValue(item.label)
    setFocusedIndex(-1)
  }

  return (
    <div className={`relative ${className}`}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border px-3 py-2"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setFocusedIndex((i) => Math.min(i + 1, results.length - 1))
          } else if (e.key === "ArrowUp") {
            setFocusedIndex((i) => Math.max(i - 1, 0))
          } else if (e.key === "Enter") {
            if (focusedIndex >= 0 && results[focusedIndex]) {
              handleSelect(results[focusedIndex])
            }
          }
        }}
      />

      <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-card shadow-sm">
        {results.length === 0 ? (
          <li className="p-2 text-sm text-muted-foreground">{noResultsText}</li>
        ) : (
          results.map((item, idx) => (
            <li
              key={item.id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setFocusedIndex(idx)}
              className={`cursor-pointer px-3 py-2 text-sm text-foreground ${
                idx === focusedIndex ? "bg-sky-100 dark:bg-sky-900/30" : ""
              }`}
            >
              {renderItem ? renderItem(item) : item.label}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
