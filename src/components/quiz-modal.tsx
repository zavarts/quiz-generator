

import { cn } from "@/lib/utils"
import { QuizButton } from "./quiz-button"

interface QuizModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  variant?: "success" | "partial" | "failure"
  score?: { correct: number; total: number }
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  className?: string
}

export function QuizModal({
  open,
  onClose,
  title,
  description,
  variant = "success",
  score,
  primaryAction,
  secondaryAction,
  className,
}: QuizModalProps) {
  if (!open) return null

  const variantStyles = {
    success: "border-success",
    partial: "border-primary",
    failure: "border-destructive",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />

      <div
        className={cn(
          "relative w-full max-w-md mx-4 p-6 bg-card rounded-xl border-2 shadow-[var(--shadow-e3)]",
          variantStyles[variant],
          className,
        )}
      >
        <h2 className="text-xl font-bold text-foreground">{title}</h2>

        {score && (
          <p className="mt-2 text-sm text-muted-foreground">
            Вы ответили правильно на {score.correct} из {score.total} вопросов
          </p>
        )}

        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}

        <div className="flex items-center gap-3 mt-6">
          {primaryAction && (
            <QuizButton
              variant={variant === "success" ? "success" : variant === "partial" ? "primary" : "destructive"}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </QuizButton>
          )}
          {secondaryAction && (
            <QuizButton variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </QuizButton>
          )}
        </div>
      </div>
    </div>
  )
}
