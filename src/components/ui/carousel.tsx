import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

type CarouselOptions = {
  loop?: boolean
  autoplay?: boolean
  intervalMs?: number
}

type CarouselContextValue = {
  activeIndex: number
  count: number
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarouselContext() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("Carousel components must be used within <Carousel>")
  return ctx
}

type CarouselProps = React.ComponentProps<"div"> & {
  options?: CarouselOptions
}

function Carousel({ className, children, options, ...props }: CarouselProps) {
  const { loop = true, autoplay = false, intervalMs = 5000 } = options ?? {}

  const items = React.Children.toArray(children)
  const count = items.length
  const [activeIndex, setActiveIndex] = React.useState(0)

  const goTo = React.useCallback(
    (index: number) => {
      if (count === 0) return
      if (loop) {
        const nextIndex = (index + count) % count
        setActiveIndex(nextIndex)
      } else {
        const clamped = Math.max(0, Math.min(index, count - 1))
        setActiveIndex(clamped)
      }
    },
    [count, loop]
  )

  const next = React.useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = React.useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  // Autoplay
  React.useEffect(() => {
    if (!autoplay || count <= 1) return
    const id = window.setInterval(() => {
      next()
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [autoplay, count, intervalMs, next])

  // Keyboard navigation
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    el.addEventListener("keydown", onKey)
    return () => el.removeEventListener("keydown", onKey)
  }, [next, prev])

  // Touch / drag swipe
  const startX = React.useRef<number | null>(null)
  const deltaX = React.useRef(0)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    startX.current = e.clientX
    deltaX.current = 0
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current == null) return
    deltaX.current = e.clientX - startX.current
  }
  const onPointerUp = () => {
    const threshold = 56 // px
    if (deltaX.current > threshold) prev()
    if (deltaX.current < -threshold) next()
    startX.current = null
    deltaX.current = 0
  }

  return (
    <CarouselContext.Provider value={{ activeIndex, count, next, prev, goTo }}>
      <div
        ref={rootRef}
        data-slot="carousel"
        className={cn("group relative select-none outline-none", className)}
        tabIndex={0}
        {...props}
      >
        <div
          data-slot="carousel-viewport"
          className="overflow-hidden rounded-xl"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div
            data-slot="carousel-track"
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {React.Children.map(items, (child, idx) => (
              <div
                data-slot="carousel-item"
                className="min-w-full shrink-0"
                aria-hidden={activeIndex !== idx}
                role="group"
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
          <CarouselPrevious className="pointer-events-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <CarouselNext className="pointer-events-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {count > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                aria-pressed={activeIndex === i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 w-2 rounded-full border",
                  activeIndex === i
                    ? "bg-primary border-primary"
                    : "bg-muted border-border"
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </CarouselContext.Provider>
  )
}

type NavProps = React.ComponentProps<typeof Button>

const CarouselNext = React.forwardRef<HTMLButtonElement, NavProps>(
  ({ className, ...props }, ref) => {
    const { next, count } = useCarouselContext()
    if (count <= 1) return null
    return (
      <Button
        ref={ref}
        size="icon"
        variant="outline"
        className={cn("rounded-full bg-background/70 backdrop-blur-sm", className)}
        aria-label="Next slide"
        onClick={next}
        {...props}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Button>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, NavProps>(
  ({ className, ...props }, ref) => {
    const { prev, count } = useCarouselContext()
    if (count <= 1) return null
    return (
      <Button
        ref={ref}
        size="icon"
        variant="outline"
        className={cn("rounded-full bg-background/70 backdrop-blur-sm", className)}
        aria-label="Previous slide"
        onClick={prev}
        {...props}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path d="M16 4L8 12l8 8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Button>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"

export { Carousel, CarouselNext, CarouselPrevious }


