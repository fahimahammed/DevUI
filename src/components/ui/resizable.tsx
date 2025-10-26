import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------- Types ---------- */
type Direction = "horizontal" | "vertical";

type ResizablePanelGroupProps = {
  direction?: Direction;
  className?: string;
  children: React.ReactNode;
};

type ResizablePanelProps = {
  defaultSize?: number; // percent for this panel (0-100)
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type ResizableHandleProps = {
  withHandle?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/* ---------- Group ---------- */
const ResizablePanelGroupInner = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ direction = "horizontal", children, className, ...props }, ref) => {
    // Expect three children: panel, handle, panel
    const childs = React.Children.toArray(children) as React.ReactElement[];

    // read default sizes from first/last panel props if provided
    const leftDefault =
      (childs[0] && (childs[0].props as any)?.defaultSize) ?? 50;
    const rightDefault =
      (childs[2] && (childs[2].props as any)?.defaultSize) ??
      Math.max(0, 100 - leftDefault);

    const [primarySize, setPrimarySize] = React.useState<number>(
      Math.max(0, Math.min(100, leftDefault))
    );

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const draggingRef = React.useRef(false);

    // expose resize function for handle
    const startDrag = React.useCallback(() => {
      draggingRef.current = true;
    }, []);

    const stopDrag = React.useCallback(() => {
      draggingRef.current = false;
    }, []);

    React.useEffect(() => {
      const onPointerMove = (e: PointerEvent) => {
        if (!draggingRef.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        if (direction === "horizontal") {
          const x = e.clientX - rect.left;
          const percent = (x / rect.width) * 100;
          setPrimarySize(Math.max(5, Math.min(95, percent)));
        } else {
          const y = e.clientY - rect.top;
          const percent = (y / rect.height) * 100;
          setPrimarySize(Math.max(5, Math.min(95, percent)));
        }
      };

      const onPointerUp = () => {
        draggingRef.current = false;
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
    }, [direction]);

    // keyboard adjustments for the handle (exposed via context)
    const adjust = React.useCallback(
      (deltaPercent: number) => {
        setPrimarySize((prev) => Math.max(5, Math.min(95, prev + deltaPercent)));
      },
      []
    );

    // Provide a simple context so handle/panels can communicate (optional)
    const ctx = React.useMemo(
      () => ({
        direction,
        primarySize,
        startDrag,
        stopDrag,
        adjust,
      }),
      [direction, primarySize, startDrag, stopDrag, adjust]
    );

    return (
      <ResizableContext.Provider value={ctx}>
        <div
          ref={(el) => {
            containerRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }}
          className={cn(
            direction === "horizontal" ? "inline-flex" : "inline-flex flex-col",
            "items-stretch",
            "overflow-hidden",
            className
          )}
          {...props}
        >
          {/* render children but inject sizes for first and last panel */}
          {React.Children.map(children, (child, idx) => {
            if (!React.isValidElement(child)) return child;
            // first panel: style flex-basis from primarySize
            if (idx === 0) {
              const style =
                direction === "horizontal"
                  ? { flexBasis: `${primarySize}%`, minWidth: 0 }
                  : { flexBasis: `${primarySize}%`, minHeight: 0 };
              return React.cloneElement(child as React.ReactElement<any>, { style });
            }
            // third panel: inverse
            if (idx === 2) {
              const style =
                direction === "horizontal"
                  ? { flexBasis: `${100 - primarySize}%`, minWidth: 0 }
                  : { flexBasis: `${100 - primarySize}%`, minHeight: 0 };
              return React.cloneElement(child as React.ReactElement<any>, { style });
            }
            // handle or other children: render as-is
            return child;
          })}
        </div>
      </ResizableContext.Provider>
    );
  }
);
ResizablePanelGroupInner.displayName = "ResizablePanelGroup";

/* ---------- Context ---------- */
type ResizableContext = {
  direction: Direction;
  primarySize: number;
  startDrag: () => void;
  stopDrag: () => void;
  adjust: (deltaPercent: number) => void;
} | null;

const ResizableContext = React.createContext<ResizableContext>(null);
const useResizable = () => {
  const c = React.useContext(ResizableContext);
  if (!c) throw new Error("Resizable components must be used inside <ResizablePanelGroup>");
  return c;
};

/* ---------- Panel ---------- */
const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ defaultSize = 50, children, className, style, ...props }, ref) => {
    // panel is mostly a styled container; defaultSize is consumed by the group
    return (
      <div
        ref={ref}
        {...props}
        style={style}
        className={cn("min-w-0 min-h-0", className)}
      >
        {children}
      </div>
    );
  }
);
ResizablePanel.displayName = "ResizablePanel";

/* ---------- Handle ---------- */
const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ withHandle = false, className, ...props }, ref) => {
    const { direction, primarySize, startDrag, stopDrag, adjust } = useResizable();

    // pointer down initiates dragging
    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
      // only primary button
      if (e.button !== 0) return;
      (e.target as Element).setPointerCapture?.((e as any).pointerId);
      startDrag();
    };

    const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
      stopDrag();
    };

    // keyboard support: arrow keys move handle
    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      const step = 2; // percent per key press
      if (direction === "horizontal") {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          adjust(-step);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          adjust(step);
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          adjust(-step);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          adjust(step);
        }
      }
    };

    // aria values: show current primary panel size
    const ariaOrientation = direction === "horizontal" ? "horizontal" : "vertical";

    return (
      <div
        ref={ref}
        role="separator"
        tabIndex={0}
        aria-orientation={ariaOrientation}
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(primarySize)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        className={cn(
          // visual separator styling
          direction === "horizontal"
            ? "flex items-center justify-center cursor-col-resize"
            : "flex items-center justify-center cursor-row-resize",
          // small focus ring for keyboard accessibility
          "focus:outline-none focus:ring-2 focus:ring-ring rounded",
          className
        )}
        {...props}
      >
        {/* optional visible handle button */}
        {withHandle ? (
          <div
            className={cn(
              "inline-flex h-8 w-2 items-center justify-center rounded bg-muted/60",
              direction === "horizontal" ? "mx-2" : "my-2"
            )}
          >
            {/* three dots like a grip */}
            <div className="flex flex-col gap-1">
              <span className="h-0.5 w-0.5 rounded bg-muted-foreground block" />
              <span className="h-0.5 w-0.5 rounded bg-muted-foreground block" />
              <span className="h-0.5 w-0.5 rounded bg-muted-foreground block" />
            </div>
          </div>
        ) : (
          // a thin bar for visual separation
          <div
            className={cn(
              direction === "horizontal" ? "h-10 w-[1px] bg-border" : "w-10 h-[1px] bg-border"
            )}
          />
        )}
      </div>
    );
  }
);
ResizableHandle.displayName = "ResizableHandle";

/* ---------- Preview built-in (so components.tsx imports only group) ---------- */
const ResizablePreview: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <ResizablePanelGroupInner
        direction="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px] bg-card"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroupInner>
    </div>
  );
};

/* ---------- Attach preview and exports ---------- */
type RGroup = typeof ResizablePanelGroupInner & { Preview: React.FC };
const ResizablePanelGroup = ResizablePanelGroupInner as RGroup;
ResizablePanelGroup.Preview = ResizablePreview;

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
export default ResizablePanelGroup;
