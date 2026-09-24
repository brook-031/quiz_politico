"use client";

import React, { useState } from "react";
import quizDb from "@/data/quiz_db.json";
import { Question, Candidate, CandidateMatchResult, calcularAfinidade } from "@/lib/match-engine";
import { QuizModeType, QuizCategoryType, obterQuestoesPorModo } from "@/data/quiz-modes";
import Navbar from "@/components/Navbar";
import QuizIntro from "@/components/QuizIntro";
import QuizCard from "@/components/QuizCard";
import QuizResults from "@/components/QuizResults";
import confetti from "canvas-confetti";

export default function Home() {
  const [view, setView] = useState<"intro" | "quiz" | "results">("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [matchResults, setMatchResults] = useState<CandidateMatchResult[]>([]);

  // Iniciar Quiz com o modo e recorte temático escolhidos
  const handleStartQuiz = (mode: QuizModeType, category: QuizCategoryType = "all") => {
    const list = obterQuestoesPorModo(mode, category);
    setQuestions(list);
    setCurrentIndex(0);
    setUserAnswers({});
    setMatchResults([]);
    setView("quiz");
  };

  // Processar resposta do usuário (+1, -1, 0)
  const handleAnswer = (resposta: 1 | -1 | 0) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const updatedAnswers = {
      ...userAnswers,
      [currentQ.id]: resposta,
    };
    setUserAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Final do array: Calcula os resultados e renderiza o ranking
      const resultados = calcularAfinidade(
        updatedAnswers,
        quizDb.candidatos as Candidate[],
        questions
      );
      setMatchResults(resultados);
      setView("results");

      // Celebração visual suave
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.65 },
          colors: ["#10b981", "#38bdf8", "#f59e0b", "#ffffff"],
        });
      } catch (err) {
        // Ignora se confetti não estiver disponível
      }
    }
  };

  // Voltar à pergunta anterior
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Reiniciar quiz
  const handleRestart = () => {
    setView("intro");
    setCurrentIndex(0);
    setUserAnswers({});
    setMatchResults([]);
  };

  // Total de questões respondidas com posicionamento (diferente de 0)
  const totalAnsweredNonZero = Object.values(userAnswers).filter((v) => v !== 0).length;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar onReset={handleRestart} />

      <main className="flex-1 flex items-center justify-center py-6 px-2 sm:px-4">
        {view === "intro" && <QuizIntro onStart={handleStartQuiz} />}

        {view === "quiz" && questions.length > 0 && (
          <QuizCard
            question={questions[currentIndex]}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onPrevious={handlePrevious}
            canGoPrevious={currentIndex > 0}
          />
        )}

        {view === "results" && (
          <QuizResults
            results={matchResults}
            totalAnswered={totalAnsweredNonZero}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 text-center text-xs text-zinc-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Match Político 2026 · Plataforma Cívica Independente</span>
          <span>Propostas originais de planos de governo do TSE</span>
        </div>
      </footer>
    </div>
  );
}
