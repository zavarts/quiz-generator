import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuizButton } from "./quiz-button"

interface QuizBannerProps {
  title: string
  description?: string
  variant?: "error" | "success" | "info"
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  className?: string
}

export function QuizBanner({
  title,
  description,
  variant = "error",
  actionLabel,
  onAction,
  onDismiss,
  className,
}: QuizBannerProps) {
  const variantStyles = {
    error: "bg-destructive/10 border-destructive",
    success: "bg-success/10 border-success",
    info: "bg-primary/10 border-primary",
  }

  const iconColor = {
    error: "text-destructive",
    success: "text-success",
    info: "text-primary",
  }

  return (
    <div className={cn("relative flex flex-col gap-3 p-4 rounded-lg border", variantStyles[variant], className)}>
      {onDismiss && (
        <button onClick={onDismiss} className={cn("absolute top-3 right-3", iconColor[variant])}>
          <X size={20} />
        </button>
      )}

      <div className="pr-8">
        <h4 className={cn("text-sm font-semibold", iconColor[variant])}>{title}</h4>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>

      {actionLabel && onAction && (
        <QuizButton
          variant={variant === "error" ? "destructive" : variant === "success" ? "success" : "primary"}
          size="sm"
          onClick={onAction}
          className="self-start"
        >
          {actionLabel}
        </QuizButton>
      )}
    </div>
  )
}
