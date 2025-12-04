import { useState } from "react"
import { useNavigate } from "react-router"
import { QuizHeader } from "@/components/quiz-header"
import { QuizTextarea } from "@/components/quiz-textarea"
import { QuizButton } from "@/components/quiz-button"
import { QuizErrorModal } from "@/components/quiz-error-modal"
import { validateQuizJson } from "@/lib/quiz-schema"
import { saveQuiz } from "@/lib/quiz-db"

export function GeneratorPage() {
    const [jsonValue, setJsonValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<{ title: string; message: string } | null>(null)
    const navigate = useNavigate()

    const handleGenerate = async () => {
        if (!jsonValue.trim()) {
            setError({
                title: "Ошибка валидации",
                message: "Введите JSON для создания квиза.",
            })
            return
        }

        setIsLoading(true)

        const result = validateQuizJson(jsonValue)

        if (!result.success) {
            setError({
                title: "Ошибка парсинга JSON",
                message: result.error,
            })
            setIsLoading(false)
            return
        }

        try {
            await saveQuiz(result.data)
            navigate("/quizzes")
        } catch (err) {
            setError({
                title: "Ошибка сохранения",
                message: "Не удалось сохранить квиз. Попробуйте ещё раз.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <QuizHeader variant="home" onViewSaved={() => navigate("/quizzes")} />

            <main className="flex flex-col items-center justify-center px-4 py-24">
                <div className="w-full max-w-[700px]">
                    <h1 className="text-[32px] font-bold text-foreground mb-2">Генератор квизов</h1>
                    <p className="text-muted-foreground mb-8">Вставьте JSON...</p>

                    <QuizTextarea
                        label="Ваш JSON"
                        placeholder={
                            '{\n  "title": "Название квиза",\n  "description": "Описание",\n  "questions": [\n    {\n      "id": 1,\n      "text": "Вопрос?",\n      "type": "single",\n      "options": [\n        { "id": 1, "text": "Ответ 1", "correct": true, "message": "Пояснение" },\n        { "id": 2, "text": "Ответ 2", "correct": false, "message": "Пояснение" }\n      ]\n    }\n  ]\n}'
                        }
                        value={jsonValue}
                        onChange={setJsonValue}
                        className="mb-6"
                    />

                    <QuizButton variant="primary" size="lg" onClick={handleGenerate} disabled={isLoading}>
                        {isLoading ? "Сохранение..." : "Сгенерировать"}
                    </QuizButton>
                </div>
            </main>

            <QuizErrorModal
                open={error !== null}
                onClose={() => setError(null)}
                title={error?.title || ""}
                message={error?.message || ""}
            />
        </div>
    )
}
