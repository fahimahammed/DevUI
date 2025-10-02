"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: string
}

function Checkbox({ className, label, ...props }: CheckboxProps) {
  const [checked, setChecked] = React.useState<
    boolean | "indeterminate"
  >(props.checked || false)

  const toggle = () => {
    setChecked((prev) =>
      prev === "indeterminate" ? true : !prev
    )
  }

  return (
    <div
      role="checkbox"
      aria-checked={checked === "indeterminate" ? "mixed" : checked} // TypeScript-safe
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          toggle()
        }
      }}
      onClick={toggle}
      className="inline-flex items-center"
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        checked={checked === true} // only true/false for Radix
        onCheckedChange={(val) =>
          setChecked(val ? true : false)
        }
        className={cn(
          "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span className="ml-2">{label}</span>}
    </div>
  )
}

export { Checkbox }
