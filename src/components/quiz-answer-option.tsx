import { Check, X, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export type AnswerState = "default" | "selected" | "correct" | "incorrect" | "disabled" | "missed"

interface QuizAnswerOptionProps {
    text: string
    state: AnswerState
    type: "single" | "multiple"
    message?: string
    onClick?: () => void
    disabled?: boolean
}

export function QuizAnswerOption({ text, state, type, message, onClick, disabled = false }: QuizAnswerOptionProps) {
    const isClickable =
        !disabled && state !== "disabled" && state !== "correct" && state !== "incorrect" && state !== "missed"

    const containerStyles: Record<AnswerState, string> = {
        default: "border-border bg-card hover:border-primary/50",
        selected: "border-primary bg-card",
        correct: "border-success bg-success/5",
        incorrect: "border-destructive bg-destructive/5",
        disabled: "border-border/50 bg-card opacity-50",
        missed: "border-primary bg-card",
    }

    const textStyles: Record<AnswerState, string> = {
        default: "text-foreground",
        selected: "text-foreground",
        correct: "text-success",
        incorrect: "text-destructive",
        disabled: "text-muted-foreground",
        missed: "text-primary",
    }

    const renderIcon = () => {
        if (type === "single") {
            // Checkbox style for single choice
            if (state === "correct") {
                return (
                    <div className="w-5 h-5 rounded border-2 border-success bg-card flex items-center justify-center">
                        <Check size={14} className="text-success" />
                    </div>
                )
            }
            if (state === "incorrect") {
                return (
                    <div className="w-5 h-5 rounded border-2 border-destructive bg-card flex items-center justify-center">
                        <X size={14} className="text-destructive" />
                    </div>
                )
            }
            if (state === "selected") {
                return (
                    <div className="w-5 h-5 rounded border-2 border-primary bg-primary flex items-center justify-center">
                        <Check size={14} className="text-primary-foreground" />
                    </div>
                )
            }
            // Default/disabled checkbox
            return (
                <div
                    className={cn(
                        "w-5 h-5 rounded border-2 bg-card",
                        state === "disabled" ? "border-border/50" : "border-border",
                    )}
                />
            )
        } else {
            // Radio style for multiple choice
            if (state === "correct") {
                return (
                    <div className="w-5 h-5 rounded-full border-2 border-success bg-card flex items-center justify-center">
                        <Check size={14} className="text-success" />
                    </div>
                )
            }
            if (state === "incorrect") {
                return (
                    <div className="w-5 h-5 rounded-full border-2 border-destructive bg-card flex items-center justify-center">
                        <X size={14} className="text-destructive" />
                    </div>
                )
            }
            if (state === "missed") {
                return (
                    <div className="w-5 h-5 rounded-full border-2 border-primary bg-card flex items-center justify-center">
                        <Circle size={10} className="text-primary" />
                    </div>
                )
            }
            if (state === "selected") {
                return (
                    <div className="w-5 h-5 rounded-full border-2 border-primary bg-card flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                )
            }
            // Default/disabled radio
            return (
                <div
                    className={cn(
                        "w-5 h-5 rounded-full border-2 bg-card",
                        state === "disabled" ? "border-border/50" : "border-border",
                    )}
                />
            )
        }
    }

    return (
        <div className="flex flex-col">
            <button
                type="button"
                onClick={isClickable ? onClick : undefined}
                disabled={!isClickable}
                className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-colors text-left",
                    containerStyles[state],
                    isClickable && "cursor-pointer",
                    !isClickable && "cursor-default",
                )}
            >
                {renderIcon()}
                <span className={cn("text-sm", textStyles[state])}>{text}</span>
            </button>
            {message && <p className="mt-1 ml-8 text-xs text-muted-foreground">{message}</p>}
        </div>
    )
}
