

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  variant?: "default" | "primary" | "success" | "error"
  label?: string
  className?: string
}

export function QuizCheckbox({
  checked = false,
  onChange,
  disabled = false,
  variant = "default",
  label,
  className,
}: QuizCheckboxProps) {
  const variantStyles = {
    default: checked ? "bg-primary border-primary" : "bg-card border-border",
    primary: checked ? "bg-primary border-primary" : "bg-card border-primary",
    success: checked ? "bg-success border-success" : "bg-card border-success",
    error: checked ? "bg-destructive border-destructive" : "bg-card border-destructive",
  }

  return (
    <label
      className={cn("flex items-center gap-2 cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "w-5 h-5 rounded flex items-center justify-center border-2 transition-colors",
          variantStyles[variant],
        )}
      >
        {checked && <Check size={14} className="text-primary-foreground" />}
      </button>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  )
}
