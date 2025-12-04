

import { useState } from "react"
import { Link } from "react-router"
import { Menu, X } from "lucide-react"

interface QuizHeaderProps {
    variant?: "desktop" | "mobile" | "home" | "quizzes"
    onAddQuiz?: () => void
    onViewSaved?: () => void
}

export function QuizHeader({ variant = "desktop", onAddQuiz }: QuizHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    if (variant === "quizzes") {
        return (
            <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
                <Link to="/" className="text-primary text-3xl font-bold">
                    Q
                </Link>
                <Link
                    to="/"
                    className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Добавить квиз
                </Link>
            </header>
        )
    }

    if (variant === "home") {
        return (
            <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
                <Link to="/" className="text-primary text-3xl font-bold">
                    Q
                </Link>
                <Link
                    to="/quizzes"
                    className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                    Посмотреть сохранённые квизы
                </Link>
            </header>
        )
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
            <Link to="/" className="text-primary text-3xl font-bold">
                Q
            </Link>

            {variant === "desktop" ? (
                <div className="flex items-center gap-3">
                    <Link
                        to="/quizzes"
                        className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        Посмотреть сохранённые квизы
                    </Link>
                    <button
                        onClick={onAddQuiz}
                        className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Добавить квиз
                    </button>
                </div>
            ) : (
                <>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-primary">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {mobileMenuOpen && (
                        <div className="absolute top-16 left-0 right-0 bg-card border-b border-border p-4 flex flex-col gap-3 z-50">
                            <Link
                                to="/quizzes"
                                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg text-center"
                            >
                                Посмотреть сохранённые квизы
                            </Link>
                            <button
                                onClick={onAddQuiz}
                                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg"
                            >
                                Добавить квиз
                            </button>
                        </div>
                    )}
                </>
            )}
        </header>
    )
}
