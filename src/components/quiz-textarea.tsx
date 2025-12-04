import { useState } from "react"
import { cn } from "@/lib/utils"

interface QuizTextareaProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  state?: "default" | "filled" | "focused" | "error"
  className?: string
}

export function QuizTextarea({
  label = "Ваш JSON",
  placeholder = '{\n  "title": "Placeholder",\n  "questions": []\n}',
  value,
  onChange,
  error,
  state = "default",
  className,
}: QuizTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)

  const currentState = error ? "error" : isFocused ? "focused" : value ? "filled" : state

  const stateStyles = {
    default: "border-border bg-card",
    filled: "border-border bg-card",
    focused: "border-primary bg-primary/5 ring-2 ring-primary/20",
    error: "border-destructive bg-destructive/5",
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full min-h-[200px] px-4 py-3 text-sm font-mono rounded-lg border transition-all resize-y text-foreground",
          "placeholder:text-muted-foreground",
          stateStyles[currentState],
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
