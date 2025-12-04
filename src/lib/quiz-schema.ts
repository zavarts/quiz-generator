import { z } from "zod"

// Schema for a single answer option
const answerOptionSchema = z.object({
    id: z.string().or(z.number()).transform(String),
    text: z.string().min(1, "Текст ответа не может быть пустым"),
    correct: z.boolean(),
    message: z.string().optional(),
})

// Schema for a single question
const questionSchema = z.object({
    id: z.string().or(z.number()).transform(String),
    text: z.string().min(1, "Текст вопроса не может быть пустым"),
    type: z.enum(["single", "multiple"]).default("single"),
    options: z.array(answerOptionSchema).min(2, "Вопрос должен содержать минимум 2 варианта ответа"),
})

// Schema for the entire quiz
export const quizSchema = z.object({
    title: z.string().min(1, "Название квиза не может быть пустым"),
    description: z.string().optional().default(""),
    questions: z.array(questionSchema).min(1, "Квиз должен содержать минимум 1 вопрос"),
})

// Types derived from schema
export type QuizInput = z.input<typeof quizSchema>
export type Quiz = z.output<typeof quizSchema> & { id: string }
export type Question = z.output<typeof questionSchema>
export type AnswerOption = z.output<typeof answerOptionSchema>

// Validation function
export function validateQuizJson(
    jsonString: string,
): { success: true; data: QuizInput } | { success: false; error: string } {
    // Try to parse JSON
    let parsed: unknown
    try {
        parsed = JSON.parse(jsonString)
    } catch {
        return {
            success: false,
            error: "Невалидный JSON. Проверьте синтаксис и попробуйте снова.",
        }
    }

    // Validate against schema
    const result = quizSchema.safeParse(parsed)

    if (!result.success) {
        const firstError = result.error.errors[0]
        const path = firstError.path.join(".")
        return {
            success: false,
            error: `Ошибка в поле "${path}": ${firstError.message}`,
        }
    }

    return {
        success: true,
        data: result.data,
    }
}
