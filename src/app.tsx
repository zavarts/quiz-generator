import { useState } from "react"
import {
  QuizHeader,
  QuizDropdown,
  QuizTextarea,
  QuizCheckbox,
  QuizRadio,
  QuizButton,
  QuizCard,
  QuizProgress,
  QuizBanner,
  QuizModal,
} from "./components"

function App() {
  const [checkboxStates, setCheckboxStates] = useState([false, true, false, true, false, false])
  const [radioValue, setRadioValue] = useState(1)
  const [textareaValue, setTextareaValue] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalVariant, setModalVariant] = useState<"success" | "partial" | "failure">("success")

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Header</h2>
          <div className="space-y-4">
            <QuizHeader variant="desktop" />
            <QuizHeader variant="mobile" />
          </div>
        </div>
      </section>

      {/* Dropdown Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Dropdown</h2>
          <QuizDropdown
            trigger="Добавить квиз"
            items={[
              { label: "Добавить квиз", onClick: () => {} },
              { label: "Сохранённые квизы", onClick: () => {} },
            ]}
          />
        </div>
      </section>

      {/* Textarea Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Textarea (для JSON)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuizTextarea label="Default" state="default" />
            <QuizTextarea label="Filled" value={'{\n  "title": "Пример теста",\n  "questions": []\n}'} />
            <QuizTextarea label="Focused" value={textareaValue} onChange={setTextareaValue} />
            <QuizTextarea
              label="Error"
              value={'{\n  "title": "Пример теста",\n  "questions": []\n}'}
              error="Неверный формат JSON"
            />
          </div>
        </div>
      </section>

      {/* Checkbox & Radio Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Checkbox и Radio</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Box</h3>
              <div className="flex gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <QuizCheckbox
                    key={i}
                    checked={checkboxStates[i]}
                    onChange={(checked) => {
                      const newStates = [...checkboxStates]
                      newStates[i] = checked
                      setCheckboxStates(newStates)
                    }}
                    variant={i === 2 ? "success" : i === 3 ? "error" : i === 4 ? "primary" : "default"}
                    disabled={i === 5}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Radio</h3>
              <div className="flex gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <QuizRadio
                    key={i}
                    checked={radioValue === i}
                    onChange={() => setRadioValue(i)}
                    variant={i === 2 ? "success" : i === 3 ? "success" : i === 4 ? "error" : "default"}
                    disabled={i === 5}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Кнопки</h2>
          <div className="flex flex-wrap gap-3">
            <QuizButton variant="primary">Button</QuizButton>
            <QuizButton variant="secondary">Button</QuizButton>
            <QuizButton variant="outline">Button</QuizButton>
            <QuizButton variant="ghost">Button</QuizButton>
            <QuizButton disabled>Button</QuizButton>
            <QuizButton variant="destructive">Button</QuizButton>
            <QuizButton variant="success">Button</QuizButton>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Card (карточка квиза)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <QuizCard
              title="Заголовок"
              description="Описание"
              questionCount={12}
              variant="default"
              onAction={() => {}}
            />
            <QuizCard
              title="Заголовок"
              description="Описание"
              questionCount={12}
              variant="highlighted"
              onAction={() => {}}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <QuizCard title="Вопрос квиза" variant="default" onSelect={() => {}} className="w-auto min-w-[150px]" />
            <QuizCard
              title="Вопрос квиза"
              variant="selected"
              selected
              onSelect={() => {}}
              className="w-auto min-w-[150px]"
            />
            <QuizCard
              title="Вопрос квиза"
              variant="highlighted"
              selected
              onSelect={() => {}}
              className="w-auto min-w-[150px]"
            />
            <QuizCard
              title="Вопрос квиза"
              variant="error"
              selected
              onSelect={() => {}}
              className="w-auto min-w-[150px]"
            />
            <QuizCard
              title="Вопрос квиза"
              variant="success"
              selected
              onSelect={() => {}}
              className="w-auto min-w-[150px]"
            />
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Progress Bar</h2>
          <div className="space-y-4 max-w-md">
            <QuizProgress value={70} variant="primary" />
            <QuizProgress value={100} variant="success" />
            <QuizProgress value={30} variant="error" />
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Banner (ошибка парсинга JSON)</h2>
          <QuizBanner
            title="Ошибка: не удалось обработать JSON."
            description="Проверьте формат данных и попробуйте снова."
            variant="error"
            actionLabel="Попробовать снова"
            onAction={() => {}}
            onDismiss={() => {}}
          />
        </div>
      </section>

      {/* Modal Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Модалка о прохождении теста</h2>
          <div className="flex gap-3">
            <QuizButton
              variant="success"
              onClick={() => {
                setModalVariant("success")
                setModalOpen(true)
              }}
            >
              Тест завершён!
            </QuizButton>
            <QuizButton
              variant="primary"
              onClick={() => {
                setModalVariant("partial")
                setModalOpen(true)
              }}
            >
              Хороший результат!
            </QuizButton>
            <QuizButton
              variant="destructive"
              onClick={() => {
                setModalVariant("failure")
                setModalOpen(true)
              }}
            >
              Не расстраивайтесь!
            </QuizButton>
          </div>
        </div>
      </section>

      {/* Modal */}
      <QuizModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalVariant === "success"
            ? "Тест завершён!"
            : modalVariant === "partial"
              ? "Хороший результат!"
              : "Не расстраивайтесь!"
        }
        description={
          modalVariant === "success"
            ? "Ваши знания в UX-дизайне на высоте — вы уверенно разбираетесь в пользовательском сценарии и концепциях пользовательского интерфейса."
            : modalVariant === "partial"
              ? "Отличная попытка! Вы неплохо понимаете UX-теорию, но некоторые темы стоит повторить. Пройдите тест ещё раз, чтобы закрепить знания."
              : "Не переживайте — ошибки это часть обучения. Пройдите тест снова, чтобы закрепить материал и улучшить результат."
        }
        variant={modalVariant}
        score={
          modalVariant === "success"
            ? { correct: 10, total: 10 }
            : modalVariant === "partial"
              ? { correct: 7, total: 10 }
              : { correct: 2, total: 10 }
        }
        primaryAction={{ label: "К списку квизов", onClick: () => setModalOpen(false) }}
        secondaryAction={{ label: "Пройти снова", onClick: () => setModalOpen(false) }}
      />
    </div>
  )
}

export default App
