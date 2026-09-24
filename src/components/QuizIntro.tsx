"use client";

import React, { useState } from "react";
import { QuizModeType, QuizCategoryType, CATEGORIAS_QUIZ } from "@/data/quiz-modes";
import CandidateCarousel from "./CandidateCarousel";
import CandidateDuelModal from "./CandidateDuelModal";
import {
  Zap,
  Flame,
  Trophy,
  Play,
  ShieldCheck,
  Globe,
  TrendingUp,
  Shield,
  Briefcase,
  BookOpen,
  Swords,
} from "lucide-react";

interface QuizIntroProps {
  onStart: (mode: QuizModeType, category: QuizCategoryType) => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategoryType>("all");
  const [selectedMode, setSelectedMode] = useState<QuizModeType>("express");
  const [isDuelOpen, setIsDuelOpen] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="w-3.5 h-3.5 text-amber-400" />;
      case "Shield":
        return <Shield className="w-3.5 h-3.5 text-rose-400" />;
      case "Briefcase":
        return <Briefcase className="w-3.5 h-3.5 text-sky-400" />;
      case "BookOpen":
        return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-zinc-300" />;
    }
  };

  // Ajusta os rótulos de contagem conforme a categoria escolhida
  const activeCatInfo = CATEGORIAS_QUIZ.find((c) => c.id === selectedCategory) || CATEGORIAS_QUIZ[0];
  const expressCount = selectedCategory === "all" ? 26 : Math.min(26, activeCatInfo.count);
  const aprofundadoCount = selectedCategory === "all" ? 52 : Math.min(52, activeCatInfo.count);
  const completoCount = activeCatInfo.count;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6 animate-card-enter">
      {/* Editorial Header */}
      <div className="text-center space-y-2.5 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-300">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Eleições 2026 · Fonte Oficial TSE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Match Político
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Descubra qual candidato à Presidência realmente pensa como você com base em{" "}
          <strong className="text-zinc-200">ações e medidas concretas</strong> dos planos de governo registrados.
        </p>
      </div>

      {/* Category Thematic Filter */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
            1. Escolha o Tema de Foco:
          </label>
          <span className="text-[11px] text-zinc-400">
            {activeCatInfo.count} propostas disponíveis
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIAS_QUIZ.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 select-none ${
                  isSelected
                    ? "bg-zinc-800 border-zinc-400 text-white shadow-sm"
                    : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/50"
                } ${cat.id === "all" ? "col-span-2 sm:col-span-1" : ""}`}
              >
                {getCategoryIcon(cat.iconName)}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold truncate leading-tight">
                    {cat.nome}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {cat.count} propostas
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="space-y-2 pt-1">
        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block text-center sm:text-left">
          2. Escolha a Extensão do Quiz:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Express */}
          <div
            onClick={() => setSelectedMode("express")}
            id="modo-express-btn"
            className={`p-3.5 rounded-xl border cursor-pointer transition-all select-none ${
              selectedMode === "express"
                ? "bg-zinc-800/90 border-zinc-400 shadow-sm"
                : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-200 font-bold text-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Modo Rápido
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {expressCount} perguntas
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              26 propostas (exatamente 2 de cada um dos 13 candidatos, ~3 min).
            </p>
          </div>

          {/* Aprofundado */}
          <div
            onClick={() => setSelectedMode("aprofundado")}
            id="modo-aprofundado-btn"
            className={`p-3.5 rounded-xl border cursor-pointer transition-all select-none ${
              selectedMode === "aprofundado"
                ? "bg-zinc-800/90 border-zinc-400 shadow-sm"
                : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-200 font-bold text-xs flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-zinc-400" />
                Aprofundado
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {aprofundadoCount} perguntas
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              52 propostas (exatamente 4 de cada candidato para raio-X completo, ~6 min).
            </p>
          </div>

          {/* Completo */}
          <div
            onClick={() => setSelectedMode("completo")}
            id="modo-completo-btn"
            className={`p-3.5 rounded-xl border cursor-pointer transition-all select-none ${
              selectedMode === "completo"
                ? "bg-zinc-800/90 border-zinc-400 shadow-sm"
                : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-200 font-bold text-xs flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-zinc-400" />
                Maratona
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {completoCount} perguntas
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Todas as propostas do recorte escolhido.
            </p>
          </div>
        </div>
      </div>

      {/* Start Button & Comparator CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
        <button
          onClick={() => onStart(selectedMode, selectedCategory)}
          id="btn-iniciar-quiz"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-zinc-950 font-bold text-sm shadow-lg transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Começar Teste</span>
        </button>

        <button
          onClick={() => setIsDuelOpen(true)}
          id="btn-abrir-duelo-intro"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
        >
          <Swords className="w-4 h-4 text-amber-400" />
          <span>Comparar Candidatos 1x1</span>
        </button>
      </div>

      <p className="text-[11px] text-zinc-400 text-center -mt-2">
        100% anônimo, neutro e sem necessidade de cadastro.
      </p>

      {/* Candidate Photo Carousel (Positioned BELOW the Start Button) */}
      <div className="space-y-2 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-zinc-400">
            Candidatos Analisados no Quiz:
          </span>
          <span className="text-[11px] text-zinc-400">13 Presidenciáveis</span>
        </div>
        <CandidateCarousel />
      </div>

      {/* Candidate Duel Modal */}
      <CandidateDuelModal
        isOpen={isDuelOpen}
        onClose={() => setIsDuelOpen(false)}
      />
    </div>
  );
}
