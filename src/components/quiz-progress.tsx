import { cn } from "@/lib/utils"

interface QuizProgressProps {
  value: number
  max?: number
  variant?: "primary" | "success" | "error"
  className?: string
}

export function QuizProgress({ value, max = 100, variant = "primary", className }: QuizProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const variantStyles = {
    primary: "bg-primary",
    success: "bg-success",
    error: "bg-destructive",
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", variantStyles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
