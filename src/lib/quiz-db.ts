import type { Quiz, QuizInput } from "./quiz-schema"

const DB_NAME = "quiz-app"
const DB_VERSION = 1
const STORE_NAME = "quizzes"

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" })
            }
        }
    })
}

export async function saveQuiz(quizData: QuizInput): Promise<Quiz> {
    const db = await openDB()

    const quiz = {
        ...quizData,
        id: crypto.randomUUID(),
        description: quizData.description || "",
    }

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.add(quiz)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(quiz as Quiz)
    })
}

export async function getAllQuizzes(): Promise<Quiz[]> {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.getAll()

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
    })
}

export async function getQuizById(id: string): Promise<Quiz | undefined> {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.get(id)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
    })
}

export async function deleteQuiz(id: string): Promise<void> {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.delete(id)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
    })
}
