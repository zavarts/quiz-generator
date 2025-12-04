import { cn } from "@/lib/utils"

interface QuizRadioProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  variant?: "default" | "primary" | "success" | "error"
  label?: string
  className?: string
}

export function QuizRadio({
  checked = false,
  onChange,
  disabled = false,
  variant = "default",
  label,
  className,
}: QuizRadioProps) {
  const variantStyles = {
    default: checked ? "border-primary" : "border-border",
    primary: "border-primary",
    success: checked ? "border-success" : "border-success/50",
    error: checked ? "border-destructive" : "border-destructive/50",
  }

  const dotStyles = {
    default: "bg-primary",
    primary: "bg-primary",
    success: "bg-success",
    error: "bg-destructive",
  }

  return (
    <label
      className={cn("flex items-center gap-2 cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}
    >
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors bg-card",
          variantStyles[variant],
        )}
      >
        {checked && <div className={cn("w-2.5 h-2.5 rounded-full", dotStyles[variant])} />}
      </button>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  )
}
