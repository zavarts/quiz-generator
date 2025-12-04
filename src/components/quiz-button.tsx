import type React from "react"
import { cn } from "@/lib/utils"

interface QuizButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success"
  size?: "sm" | "md" | "lg"
}

export function QuizButton({
  className,
  variant = "primary",
  size = "md",
  disabled,
  children,
  ...props
}: QuizButtonProps) {
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-primary text-primary hover:bg-primary/5",
    ghost: "text-foreground hover:bg-secondary",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    success: "bg-success text-success-foreground hover:bg-success/90",
  }

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
