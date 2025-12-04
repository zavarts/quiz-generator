

import { cn } from "@/lib/utils"
import { QuizCheckbox } from "./quiz-checkbox"

interface QuizCardProps {
  title: string
  description?: string
  questionCount?: number
  variant?: "default" | "highlighted" | "selected" | "error" | "success"
  selected?: boolean
  onSelect?: (selected: boolean) => void
  onAction?: () => void
  actionLabel?: string
  className?: string
}

export function QuizCard({
  title,
  description,
  questionCount,
  variant = "default",
  selected = false,
  onSelect,
  onAction,
  actionLabel = "Пройти квиз",
  className,
}: QuizCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    highlighted: "bg-primary/5 border-primary",
    selected: "bg-card border-primary",
    error: "bg-destructive/5 border-destructive",
    success: "bg-success/5 border-success",
  }

  const checkboxVariant = {
    default: "default" as const,
    highlighted: "primary" as const,
    selected: "primary" as const,
    error: "error" as const,
    success: "success" as const,
  }

  return (
    <div className={cn("flex flex-col p-4 rounded-lg border transition-colors", variantStyles[variant], className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {onSelect && <QuizCheckbox checked={selected} onChange={onSelect} variant={checkboxVariant[variant]} />}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        {questionCount !== undefined && <span className="text-xs text-muted-foreground">{questionCount} вопросов</span>}
        {onAction && (
          <button
            onClick={onAction}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
