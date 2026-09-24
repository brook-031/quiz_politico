"use client";

import React, { useState } from "react";
import { CandidateMatchResult } from "@/lib/match-engine";
import { CANDIDATOS_VISUAIS } from "@/data/candidates-meta";
import PoliticalCompass from "./PoliticalCompass";
import StoryCardModal from "./StoryCardModal";
import CandidateDuelModal from "./CandidateDuelModal";
import {
  Share2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Award,
  Sparkles,
  Swords,
} from "lucide-react";

interface QuizResultsProps {
  results: CandidateMatchResult[];
  totalAnswered: number;
  onRestart: () => void;
}

export default function QuizResults({
  results,
  totalAnswered,
  onRestart,
}: QuizResultsProps) {
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [isDuelModalOpen, setIsDuelOpen] = useState<boolean>(false);
  const [selectedDuelCandidates, setSelectedDuelCandidates] = useState<{ a: string; b: string }>({
    a: results[0]?.candidateId || "lula",
    b: results[1]?.candidateId || "flavio_bolsonaro",
  });

  const topMatch = results[0];
  const runnerUp = results[1];
  const thirdPlace = results[2];

  const getCandidateMeta = (id: string) => {
    return (
      CANDIDATOS_VISUAIS[id] || {
        id,
        nome: id,
        partido: "Geral",
        iniciais: id.substring(0, 2).toUpperCase(),
        espectro: "Democrático",
        foto: "/candidates/lula.jpg",
        badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
        badgeText: "text-zinc-300",
        compass: { x: 0, y: 0 },
        propostasChave: [],
      }
    );
  };

  const shareText = `🎯 Meu Match Político 2026:
1º Lugar: ${topMatch?.nome} (${topMatch?.partido}) com ${topMatch?.match}% de afinidade!
2º Lugar: ${runnerUp?.nome} (${runnerUp?.partido}) com ${runnerUp?.match}%
3º Lugar: ${thirdPlace?.nome} (${thirdPlace?.partido}) com ${thirdPlace?.match}%

Faça o teste e descubra suas afinidades por propostas reais:`;

  const handleCopyShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://matchpolitico.com.br";
    const fullMessage = `${shareText}\n${url}`;
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://matchpolitico.com.br";
    const fullMessage = encodeURIComponent(`${shareText}\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${fullMessage}`, "_blank");
  };

  const toggleExpand = (id: string) => {
    setExpandedCandidate(expandedCandidate === id ? null : id);
  };

  const openDuelWith = (candidateId: string) => {
    setSelectedDuelCandidates({
      a: topMatch?.candidateId || candidateId,
      b: candidateId,
    });
    setIsDuelOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6 animate-card-enter">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          Resultado da Análise
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sua Afinidade com os Candidatos
        </h1>
        <p className="text-xs text-zinc-400">
          Calculado com base em <strong className="text-zinc-200">{totalAnswered}</strong> propostas respondidas por você
        </p>
      </div>

      {/* #1 Top Match Highlight Card */}
      {topMatch && (() => {
        const meta = getCandidateMeta(topMatch.candidateId);
        return (
          <div className="rounded-2xl open-card p-6 border border-zinc-700/80 shadow-lg text-center relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-left">
              {/* Candidate Portrait Photo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 shadow-md">
                <img
                  src={meta.foto}
                  alt={topMatch.nome}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-800 text-[11px] font-semibold text-zinc-300 border border-zinc-700">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Maior Afinidade (#1)</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {topMatch.nome}
                </h2>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-zinc-400">
                  <span className="font-semibold text-zinc-200">{meta.partido}</span>
                  <span>·</span>
                  <span>{meta.espectro}</span>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="text-center sm:text-right shrink-0 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  {topMatch.match}%
                </div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Match
                </span>
              </div>
            </div>

            {/* Top Agreements */}
            {topMatch.concordancias.length > 0 && (
              <div className="mt-5 pt-4 border-t border-zinc-800/80 text-left space-y-2 text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Propostas em que vocês concordam:
                </span>
                <ul className="space-y-1.5 pl-4 list-disc text-zinc-300">
                  {topMatch.concordancias.slice(0, 3).map((c) => (
                    <li key={c.id}>
                      <span>{c.texto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })()}

      {/* Primary Action: Instagram Stories 9:16 Card Exporter */}
      <div>
        <button
          onClick={() => setIsStoryModalOpen(true)}
          id="btn-abrir-story-modal"
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-800 to-zinc-800 hover:from-zinc-750 hover:to-zinc-750 text-white font-bold text-xs sm:text-sm border border-zinc-600 shadow-md transition-all cursor-pointer active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Gerar Card para Stories (Instagram / WhatsApp)</span>
        </button>
      </div>

      {/* Secondary Share Actions & Comparator */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          onClick={handleShareWhatsApp}
          id="btn-compartilhar-whatsapp"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold text-xs border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleCopyShare}
          id="btn-copiar-resultado"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
          <span>{copied ? "Copiado!" : "Copiar Texto"}</span>
        </button>

        <button
          onClick={() => setIsDuelOpen(true)}
          id="btn-abrir-duelo"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer active:scale-95"
        >
          <Swords className="w-3.5 h-3.5 text-amber-400" />
          <span>Duelo 1x1</span>
        </button>
      </div>

      {/* 2D Political Compass Integration */}
      <PoliticalCompass
        results={results}
        onSelectCandidate={(id) => openDuelWith(id)}
      />

      {/* Complete Leaderboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span className="font-bold uppercase tracking-wider text-[10px]">
            Ranking Geral de Afinidade (13 Candidatos)
          </span>
          <span>Clique para ver detalhes</span>
        </div>

        <div className="space-y-2">
          {results.map((r, index) => {
            const meta = getCandidateMeta(r.candidateId);
            const isExpanded = expandedCandidate === r.candidateId;

            return (
              <div
                key={r.candidateId}
                className="rounded-xl open-card border border-zinc-800/80 overflow-hidden transition-all duration-150"
              >
                {/* Row */}
                <div
                  onClick={() => toggleExpand(r.candidateId)}
                  className="p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-zinc-850/40"
                  id={`candidato-item-${r.candidateId}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-semibold text-zinc-400 w-5 text-center">
                      #{index + 1}
                    </span>

                    {/* Small Photo Avatar */}
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0">
                      <img
                        src={meta.foto}
                        alt={r.nome}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-zinc-100 truncate">
                        {r.nome}
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        {meta.partido} · {meta.espectro}
                      </div>
                    </div>
                  </div>

                  {/* Percentage & Progress Bar */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm sm:text-base text-zinc-100">
                        {r.match}%
                      </span>
                      <div className="w-16 sm:w-20 h-1 rounded-full bg-zinc-800 overflow-hidden mt-1">
                        <div
                          className="h-full bg-zinc-300"
                          style={{ width: `${r.match}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-zinc-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-zinc-800 bg-zinc-950/70 space-y-3 text-xs">
                    {r.concordancias.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          Concordâncias ({r.concordancias.length}):
                        </span>
                        <ul className="pl-4 space-y-1 list-disc text-zinc-300">
                          {r.concordancias.map((c) => (
                            <li key={c.id}>
                              <span>{c.texto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {r.divergencias.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                          Divergências ({r.divergencias.length}):
                        </span>
                        <ul className="pl-4 space-y-1 list-disc text-zinc-300">
                          {r.divergencias.map((d) => (
                            <li key={d.id}>
                              <span>{d.texto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {r.concordancias.length === 0 && r.divergencias.length === 0 && (
                      <p className="text-zinc-400 italic">
                        Nenhuma proposta específica deste candidato foi apresentada nas questões respondidas.
                      </p>
                    )}

                    {/* Quick Button to Compare 1x1 with this candidate */}
                    <div className="pt-2 border-t border-zinc-850 flex justify-end">
                      <button
                        onClick={() => openDuelWith(r.candidateId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <Swords className="w-3 h-3 text-amber-400" />
                        <span>Comparar no Duelo 1x1</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Restart */}
      <div className="pt-2 text-center">
        <button
          onClick={onRestart}
          id="btn-refazer-quiz"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-800 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Refazer Teste ou Mudar Modo</span>
        </button>
      </div>

      {/* Instagram Stories 9:16 Modal */}
      <StoryCardModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        results={results}
        totalAnswered={totalAnswered}
      />

      {/* Candidate 1x1 Comparator Modal */}
      <CandidateDuelModal
        isOpen={isDuelModalOpen}
        onClose={() => setIsDuelOpen(false)}
        initialCandidateAId={selectedDuelCandidates.a}
        initialCandidateBId={selectedDuelCandidates.b}
        userResults={results}
      />
    </div>
  );
}
