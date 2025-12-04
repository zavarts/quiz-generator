import { useState, useEffect } from "react"
import { Link } from "react-router"
import { QuizHeader } from "@/components/quiz-header"
import { getAllQuizzes } from "@/lib/quiz-db"
import type { Quiz } from "@/lib/quiz-schema"

export function QuizzesPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadQuizzes() {
            try {
                const data = await getAllQuizzes()
                setQuizzes(data)
            } catch (error) {
                console.error("Failed to load quizzes:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadQuizzes()
    }, [])

    const isEmpty = quizzes.length === 0

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <QuizHeader variant="quizzes" />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Загрузка...</p>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <QuizHeader variant="quizzes" />

            <main className="flex-1 flex flex-col">
                {isEmpty ? (
                    // Empty state
                    <div className="flex-1 flex flex-col items-center justify-center px-4">
                        <div className="max-w-md">
                            <h1 className="text-3xl font-bold text-foreground">У вас нет сохранённых квизов(</h1>
                            <p className="mt-2 text-muted-foreground">Но вы можете добавить!</p>
                            <Link
                                to="/"
                                className="inline-block mt-4 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Добавить квиз
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Quiz list
                    <div className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
                        <h1 className="text-3xl font-bold text-foreground mb-6">Ваши квизы</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {quizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className="flex flex-col p-5 bg-card rounded-xl border border-border hover:shadow-[var(--shadow-e1)] transition-shadow"
                                >
                                    <h3 className="text-base font-semibold text-foreground">{quiz.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground flex-1">{quiz.description}</p>
                                    <div className="flex items-center justify-between mt-4 pt-4">
                                        <span className="text-xs text-muted-foreground">{quiz.questions.length} вопросов</span>
                                        <Link
                                            to={`/quiz/${quiz.id}`}
                                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Пройти
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="py-6 text-center">
                <p className="text-sm text-muted-foreground">Учебный проект 2025</p>
            </footer>
        </div>
    )
}
