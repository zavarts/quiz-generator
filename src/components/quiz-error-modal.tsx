import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuizButton } from "./quiz-button"

interface QuizErrorModalProps {
    open: boolean
    onClose: () => void
    title: string
    message: string
    className?: string
}

export function QuizErrorModal({ open, onClose, title, message, className }: QuizErrorModalProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />

            <div
                className={cn(
                    "relative w-full max-w-md mx-4 p-6 bg-card rounded-xl border-2 border-destructive shadow-[var(--shadow-e3)]",
                    className,
                )}
            >
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-destructive/10">
                        <AlertCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-foreground">{title}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <QuizButton variant="destructive" onClick={onClose}>
                        Понятно
                    </QuizButton>
                </div>
            </div>
        </div>
    )
}
