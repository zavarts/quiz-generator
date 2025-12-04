import { useState, useEffect } from "react"
import { useParams, useNavigate, useSearchParams, Link } from "react-router"
import { QuizProgress } from "@/components/quiz-progress"
import { QuizButton } from "@/components/quiz-button"
import { QuizAnswerOption, type AnswerState } from "@/components/quiz-answer-option"
import { QuizModal } from "@/components/quiz-modal"
import { getQuizById } from "@/lib/quiz-db"
import type { Quiz, AnswerOption } from "@/lib/quiz-schema"

export function QuizPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [quiz, setQuiz] = useState<Quiz | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(new Set())
    const [isAnswered, setIsAnswered] = useState(false)
    const [allAnswers, setAllAnswers] = useState<Map<number, { selected: Set<string>; correct: boolean }>>(new Map())
    const [showResultsModal, setShowResultsModal] = useState(false)

    const questionParam = searchParams.get("q")
    const currentQuestionIndex = questionParam ? Math.max(0, Number.parseInt(questionParam, 10) - 1) : 0

    useEffect(() => {
        async function loadQuiz() {
            if (!id) {
                navigate("/quizzes")
                return
            }
            try {
                const data = await getQuizById(id)
                if (!data) {
                    navigate("/quizzes")
                    return
                }
                setQuiz(data)
                if (questionParam) {
                    const qIndex = Number.parseInt(questionParam, 10) - 1
                    if (qIndex < 0 || qIndex >= data.questions.length) {
                        setSearchParams({ q: "1" }, { replace: true })
                    }
                }
            } catch (error) {
                console.error("Failed to load quiz:", error)
                navigate("/quizzes")
            } finally {
                setIsLoading(false)
            }
        }
        loadQuiz()
    }, [id, navigate, questionParam, setSearchParams])

    useEffect(() => {
        const previousAnswer = allAnswers.get(currentQuestionIndex)
        if (previousAnswer) {
            setSelectedAnswers(previousAnswer.selected)
            setIsAnswered(true)
        } else {
            setSelectedAnswers(new Set())
            setIsAnswered(false)
        }
    }, [currentQuestionIndex, allAnswers])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
                    <Link to="/" className="text-primary text-3xl font-bold">
                        Q
                    </Link>
                </header>
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Загрузка...</p>
                </main>
            </div>
        )
    }

    if (!quiz) {
        return null
    }

    const currentQuestion = quiz.questions[currentQuestionIndex]
    const totalQuestions = quiz.questions.length
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1

    const handleSelectAnswer = (answerId: string) => {
        if (isAnswered) return

        if (currentQuestion.type === "single") {
            setSelectedAnswers(new Set([answerId]))
        } else {
            const newSelected = new Set(selectedAnswers)
            if (newSelected.has(answerId)) {
                newSelected.delete(answerId)
            } else {
                newSelected.add(answerId)
            }
            setSelectedAnswers(newSelected)
        }
    }

    const handleSubmitAnswer = () => {
        setIsAnswered(true)

        const correctOptionIds = currentQuestion.options.filter((opt) => opt.correct).map((opt) => opt.id)

        const isCorrect =
            correctOptionIds.length === selectedAnswers.size && correctOptionIds.every((id) => selectedAnswers.has(id))

        setAllAnswers(
            new Map(allAnswers).set(currentQuestionIndex, {
                selected: new Set(selectedAnswers),
                correct: isCorrect,
            }),
        )
    }

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            setShowResultsModal(true)
        } else {
            setSearchParams({ q: String(currentQuestionIndex + 2) })
        }
    }

    const handleRetryQuiz = () => {
        setShowResultsModal(false)
        setAllAnswers(new Map())
        setSelectedAnswers(new Set())
        setIsAnswered(false)
        setSearchParams({ q: "1" })
    }

    const handleGoToQuizList = () => {
        navigate("/quizzes")
    }

    const correctAnswersCount = Array.from(allAnswers.values()).filter((a) => a.correct).length

    const getResultVariant = (): "success" | "partial" | "failure" => {
        const percentage = correctAnswersCount / totalQuestions
        if (percentage >= 0.8) return "success"
        if (percentage >= 0.5) return "partial"
        return "failure"
    }

    const getResultTitle = (): string => {
        const variant = getResultVariant()
        if (variant === "success") return "Тест завершён!"
        if (variant === "partial") return "Хороший результат!"
        return "Не расстраивайтесь!"
    }

    const getResultDescription = (): string => {
        const variant = getResultVariant()
        if (variant === "success") {
            return "Вы отлично справились с тестом — вы уверенно разбираетесь в пользовательских сценариях и концепциях UX-исследования."
        }
        if (variant === "partial") {
            return "Отличная попытка! Вы неплохо понимаете UX-подход, но некоторые темы стоит повторить. Пройдите тест ещё раз, чтобы закрепить знания."
        }
        return `Вы ответили правильно только на ${correctAnswersCount} из ${totalQuestions} вопросов. Не переживайте — ошибки это часть обучения. Вернитесь к теории и пройдите тест снова, чтобы улучшить результат.`
    }

    const getAnswerState = (option: AnswerOption): AnswerState => {
        const isSelected = selectedAnswers.has(option.id)

        if (!isAnswered) {
            return isSelected ? "selected" : "default"
        }

        if (option.correct && isSelected) {
            return "correct"
        }
        if (!option.correct && isSelected) {
            return "incorrect"
        }
        if (option.correct && !isSelected) {
            return "missed"
        }
        return "disabled"
    }

    const getButtonLabel = () => {
        if (!isAnswered) return "Ответить"
        if (isLastQuestion) return "Завершить тест"
        return "Следующий вопрос"
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
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

            <main className="flex-1 flex flex-col items-center px-4 py-12">
                <div className="w-full max-w-2xl">
                    <h1 className="text-2xl font-bold text-foreground">Квиз: {quiz.title}</h1>
                    <p className="mt-2 text-muted-foreground">{quiz.description}</p>

                    <div className="mt-6">
                        <p className="text-sm text-muted-foreground mb-2">
                            Вопрос {currentQuestionIndex + 1} из {totalQuestions}
                        </p>
                        <QuizProgress value={currentQuestionIndex + 1} max={totalQuestions} variant="primary" />
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-foreground">{currentQuestion.text}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {currentQuestion.type === "single"
                                ? "Выберите один вариант ответа"
                                : "Выберите несколько вариантов ответа"}
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        {currentQuestion.options.map((option) => (
                            <QuizAnswerOption
                                key={option.id}
                                text={option.text}
                                state={getAnswerState(option)}
                                type={currentQuestion.type}
                                message={isAnswered ? option.message : undefined}
                                onClick={() => handleSelectAnswer(option.id)}
                            />
                        ))}
                    </div>

                    <div className="mt-6">
                        <QuizButton
                            onClick={isAnswered ? handleNextQuestion : handleSubmitAnswer}
                            disabled={selectedAnswers.size === 0}
                        >
                            {getButtonLabel()}
                        </QuizButton>
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center">
                <p className="text-sm text-muted-foreground">Учебный проект 2025</p>
            </footer>

            <QuizModal
                open={showResultsModal}
                onClose={() => setShowResultsModal(false)}
                title={getResultTitle()}
                description={getResultDescription()}
                variant={getResultVariant()}
                score={{ correct: correctAnswersCount, total: totalQuestions }}
                primaryAction={{ label: "К списку квизов", onClick: handleGoToQuizList }}
                secondaryAction={{ label: "Пройти снова", onClick: handleRetryQuiz }}
            />
        </div>
    )
}
