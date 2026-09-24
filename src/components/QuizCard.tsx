"use client";

import React, { useState, useEffect, useRef } from "react";
import { Question } from "@/lib/match-engine";
import { getExplicacaoSimples } from "@/data/explicacoes-propostas";
import {
  ThumbsDown,
  ThumbsUp,
  SkipForward,
  ArrowLeft,
  Lightbulb,
  FileText,
  ChevronDown,
  ChevronUp,
  MoveHorizontal
} from "lucide-react";

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (resposta: 1 | -1 | 0) => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
}

export default function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onPrevious,
  canGoPrevious,
}: QuizCardProps) {
  const [animClass, setAnimClass] = useState<string>("animate-card-enter");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  // Estados de gesto de arrasto (Swipe)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Reinicia animação ao mudar questão
  useEffect(() => {
    setAnimClass("animate-card-enter");
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setIsProcessing(false);
  }, [question.id]);

  const handleVote = (resposta: 1 | -1 | 0) => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (resposta === 1) {
      setAnimClass("animate-card-right");
    } else if (resposta === -1) {
      setAnimClass("animate-card-left");
    } else {
      setAnimClass("animate-card-skip");
    }

    setTimeout(() => {
      onAnswer(resposta);
    }, 180);
  };

  // Gerenciadores de ponteiro para Swipe táctil
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isProcessing) return;
    // Não inicia swipe se o clique foi na sanfona de explicação
    if ((e.target as HTMLElement).closest(".prevent-swipe")) return;

    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    if (cardRef.current) {
      cardRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isProcessing) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (cardRef.current) {
      try {
        cardRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignora erro se ponteiro já foi solto
      }
    }

    const { x, y } = dragOffset;
    const swipeThreshold = 85;

    if (x > swipeThreshold) {
      // Arrastou para a direita -> Concordo
      handleVote(1);
    } else if (x < -swipeThreshold) {
      // Arrastou para a esquerda -> Discordo
      handleVote(-1);
    } else if (y < -swipeThreshold && Math.abs(x) < 50) {
      // Arrastou para cima -> Pular
      handleVote(0);
    } else {
      // Soltou sem alcançar o limite -> Volta ao centro
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isProcessing) return;
      if (e.key === "ArrowRight" || e.key === "3" || e.key.toLowerCase() === "c") {
        handleVote(1);
      } else if (e.key === "ArrowLeft" || e.key === "1" || e.key.toLowerCase() === "d") {
        handleVote(-1);
      } else if (e.key === "ArrowDown" || e.key === "2" || e.key.toLowerCase() === "p") {
        handleVote(0);
      } else if ((e.key === "ArrowUp" || e.key === "Backspace" || e.key.toLowerCase() === "z") && canGoPrevious) {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question.id, isProcessing, canGoPrevious]);

  const explicacao = getExplicacaoSimples(question.id, question.texto);
  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Rotação dinâmica do cartão enquanto é arrastado
  const cardRotation = dragOffset.x * 0.08;
  const isSwipingRight = dragOffset.x > 25;
  const isSwipingLeft = dragOffset.x < -25;
  const isSwipingUp = dragOffset.y < -35 && Math.abs(dragOffset.x) < 30;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-between min-h-[580px] p-4 select-none">
      {/* Top Header & Progress */}
      <div className="w-full space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            {canGoPrevious && (
              <button
                onClick={onPrevious}
                id="btn-voltar"
                disabled={isProcessing}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer text-[11px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>
            )}
            <span className="font-mono text-zinc-300 font-semibold text-xs">
              Proposta {currentIndex + 1} de {totalQuestions}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
            <span>{progressPercentage}% concluído</span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-zinc-900 border border-zinc-800/80 overflow-hidden">
          <div
            className="h-full bg-zinc-200 transition-all duration-200 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Proposal Card (com Suporte a Touch Swipe) */}
      <div className="flex-1 flex items-center justify-center my-2 relative">
        <div
          ref={cardRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          id="card-proposta"
          style={{
            transform: isDragging
              ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${cardRotation}deg)`
              : undefined,
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none"
          }}
          className={`w-full rounded-2xl open-card p-6 sm:p-7 shadow-xl relative transition-transform ${
            isDragging ? "transition-none" : "duration-200"
          } ${animClass}`}
        >
          {/* Carimbo Visual de Swipe (CONCORDO) */}
          {isSwipingRight && (
            <div className="absolute top-6 right-6 pointer-events-none px-3 py-1 rounded-lg border-2 border-emerald-400 bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase tracking-wider rotate-12 z-20">
              Concordo
            </div>
          )}

          {/* Carimbo Visual de Swipe (DISCORDO) */}
          {isSwipingLeft && (
            <div className="absolute top-6 left-6 pointer-events-none px-3 py-1 rounded-lg border-2 border-red-400 bg-red-500/20 text-red-300 font-black text-xs uppercase tracking-wider -rotate-12 z-20">
              Discordo
            </div>
          )}

          {/* Carimbo Visual de Swipe (PULAR) */}
          {isSwipingUp && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-lg border-2 border-amber-400 bg-amber-500/20 text-amber-300 font-black text-xs uppercase tracking-wider z-20">
              Pular
            </div>
          )}

          {/* Category Pill & Source */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 tracking-wide uppercase">
              {question.categoria}
            </span>
            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
              <FileText className="w-3 h-3 text-zinc-400" />
              Plano de Governo Oficial
            </span>
          </div>

          {/* Proposal Text */}
          <div className="py-2 min-h-[110px] flex items-center">
            <p className="text-lg sm:text-xl font-medium text-zinc-100 leading-snug tracking-tight">
              &ldquo;{question.texto}&rdquo;
            </p>
          </div>

          {/* Facilitador: O Que Significa na Prática? */}
          <div className="mt-5 pt-4 border-t border-zinc-800/80 prevent-swipe">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowExplanation(!showExplanation);
              }}
              className="flex items-center justify-between text-xs font-semibold text-amber-300/90 cursor-pointer select-none hover:text-amber-200 transition-colors py-1"
            >
              <div className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>O que isso significa na prática?</span>
              </div>
              <button type="button" className="text-zinc-400 hover:text-zinc-200">
                {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showExplanation && (
              <div className="mt-2 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 leading-relaxed animate-card-enter">
                {explicacao}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tactile Colored Action Buttons (Red, Amber, Green) */}
      <div className="w-full pt-3 space-y-2">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {/* Discordo (Negativo - Vermelho) */}
          <button
            onClick={() => handleVote(-1)}
            id="btn-discordo"
            disabled={isProcessing}
            className="group flex flex-col sm:flex-row items-center justify-center gap-2 py-3.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 shadow-sm transition-all cursor-pointer font-semibold text-xs sm:text-sm select-none active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <ThumbsDown className="w-3.5 h-3.5" />
            </div>
            <span>Discordo</span>
          </button>

          {/* Pular (Neutro - Amarelo/Âmbar) */}
          <button
            onClick={() => handleVote(0)}
            id="btn-pular"
            disabled={isProcessing}
            className="group flex flex-col sm:flex-row items-center justify-center gap-2 py-3.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-500/60 shadow-sm transition-all cursor-pointer font-semibold text-xs sm:text-sm select-none active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <SkipForward className="w-3.5 h-3.5" />
            </div>
            <span>Pular</span>
          </button>

          {/* Concordo (Positivo - Verde Esmeralda) */}
          <button
            onClick={() => handleVote(1)}
            id="btn-concordo"
            disabled={isProcessing}
            className="group flex flex-col sm:flex-row items-center justify-center gap-2 py-3.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 shadow-sm transition-all cursor-pointer font-semibold text-xs sm:text-sm select-none active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <ThumbsUp className="w-3.5 h-3.5" />
            </div>
            <span>Concordo</span>
          </button>
        </div>

        {/* Mobile Swipe Hint + Keyboard Hint */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
          <span className="sm:hidden flex items-center gap-1">
            <MoveHorizontal className="w-3 h-3 text-zinc-400" />
            Dica: Você também pode arrastar o card para os lados!
          </span>
          <span className="hidden sm:inline">
            Teclado: <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">←</kbd> Discordo &nbsp;·&nbsp; <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">↓</kbd> Pular &nbsp;·&nbsp; <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">→</kbd> Concordo
          </span>
        </div>
      </div>
    </div>
  );
}
