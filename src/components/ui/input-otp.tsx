import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------- Context ---------- */
type OTPContextValue = {
  maxLength: number;
  values: string[];
  setAt: (index: number, char: string) => void;
  focusIndex: (index: number) => void;
  registerRef: (index: number, el: HTMLInputElement | null) => void;
  handlePaste: (index: number, text: string) => void;
};
const OTPContext = React.createContext<OTPContextValue | null>(null);
function useOTP() {
  const ctx = React.useContext(OTPContext);
  if (!ctx) throw new Error("InputOTP components must be used inside <InputOTP>");
  return ctx;
}

/* ---------- InputOTP (provider) ---------- */
export type InputOTPProps = {
  maxLength?: number;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const InputOTPInner = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ maxLength = 6, children, ...props }, ref) => {
    const [values, setValues] = React.useState<string[]>(
      () => Array.from({ length: maxLength }).map(() => "")
    );

    // refs for each input slot
    const refs = React.useRef<Array<HTMLInputElement | null>>([]);
    refs.current = refs.current.slice(0, maxLength);

    const registerRef = React.useCallback((index: number, el: HTMLInputElement | null) => {
      refs.current[index] = el;
    }, []);

    const focusIndex = React.useCallback((index: number) => {
      const safe = Math.max(0, Math.min(index, maxLength - 1));
      refs.current[safe]?.focus();
      refs.current[safe]?.select();
    }, [maxLength]);

    const setAt = React.useCallback(
      (index: number, char: string) => {
        setValues((prev) => {
          const copy = [...prev];
          copy[index] = char;
          return copy;
        });
      },
      []
    );

    // handle paste: fill from index forward
    const handlePaste = React.useCallback(
      (index: number, text: string) => {
        const chars = text.split("").slice(0, maxLength - index);
        setValues((prev) => {
          const copy = [...prev];
          for (let i = 0; i < chars.length; i++) {
            copy[index + i] = chars[i];
          }
          return copy;
        });
        const nextFocus = Math.min(maxLength - 1, index + chars.length);
        // focus next (if filled full, focus last)
        setTimeout(() => {
          refs.current[nextFocus]?.focus();
          refs.current[nextFocus]?.select();
        }, 0);
      },
      [maxLength]
    );

    const value: OTPContextValue = React.useMemo(
      () => ({ maxLength, values, setAt, focusIndex, registerRef, handlePaste }),
      [maxLength, values, setAt, focusIndex, registerRef, handlePaste]
    );

      return (
      <OTPContext.Provider value={value}>
        {/* The OTP wrapper, a single horizontal row that does not wrap */}
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-3 flex-nowrap",
            // preserve any caller-supplied classes
            (props as any).className
          )}
          {...props}
        >
          {children}
        </div>
      </OTPContext.Provider>
    );
  }
);
InputOTPInner.displayName = "InputOTP";

/* ---------- InputOTPGroup ---------- */
const InputOTPGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn("inline-flex items-center gap-2", className)}>
      {children}
    </div>
  );
};

/* ---------- InputOTPSeparator ---------- */
const InputOTPSeparator: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return (
    <span
      {...props}
      className={cn(
        // make the wrapper a flex container and vertically center its child
        "flex items-center select-none mx-4",
        className
      )}
      aria-hidden
    >
      {/* brighter, centered hyphen */}
      <span className="block w-6 h-[2px] bg-muted-foreground rounded" />
    </span>
  );
};


/* ---------- InputOTPSlot ---------- */
type InputOTPSlotProps = {
  index: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(({ index, className, ...props }, ref) => {
  const { maxLength, values, setAt, focusIndex, registerRef, handlePaste } = useOTP();

  // local ref merging
  const innerRef = React.useRef<HTMLInputElement | null>(null);
  React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  React.useEffect(() => {
    registerRef(index, innerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, registerRef]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!raw) {
      setAt(index, "");
      return;
    }
    // we accept only the last character typed (typical OTP behavior)
    const char = raw.slice(-1);
    setAt(index, char);
    // move focus to next
    const next = index + 1;
    if (next < maxLength) {
      focusIndex(next);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (values[index]) {
        // clear current
        setAt(index, "");
        // keep focus here
        setTimeout(() => innerRef.current?.focus(), 0);
      } else {
        // move to previous and clear it
        const prev = index - 1;
        if (prev >= 0) {
          setAt(prev, "");
          focusIndex(prev);
        }
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusIndex(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusIndex(index + 1);
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").trim();
    if (!text) return;
    handlePaste(index, text);
  };

  return (
    <input
      ref={innerRef}
      inputMode="numeric"
      type="text"
      pattern="[0-9]*"
      value={values[index] ?? ""}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      maxLength={1}
      {...props}
      className={cn(
        "h-10 w-10 appearance-none rounded-md border border-border bg-transparent text-center text-base placeholder:text-muted-foreground focus:outline-none focus:ring-0",
        className
      )}
      aria-label={`OTP digit ${index + 1}`}
    />
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/* ---------- Preview ---------- */
const InputOTPPreview: React.FC = () => {
  // build a centered demo that shows 3 - 3 with hyphen
  return (
    <div className="w-full flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-md p-4">
        <InputOTPInner maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>

          <InputOTPSeparator />

          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTPInner>
      </div>
    </div>
  );
};

/* ---------- Attach Preview and exports ---------- */
type InputOTPType = typeof InputOTPInner & { Preview: React.FC };
const InputOTP = InputOTPInner as InputOTPType;
InputOTP.Preview = InputOTPPreview;

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
export default InputOTP;
