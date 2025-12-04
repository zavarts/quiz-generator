import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import {BrowserRouter, Route, Routes} from "react-router";
import {GeneratorPage} from "@/pages/generator.tsx";
import {QuizzesPage} from "@/pages/quizzes.tsx";
import {QuizPage} from "@/pages/quiz.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<GeneratorPage />} />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
          </Routes>
          </BrowserRouter>
  </React.StrictMode>,
)
