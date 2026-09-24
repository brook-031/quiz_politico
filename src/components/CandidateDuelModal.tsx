"use client";

import React, { useState } from "react";
import { CANDIDATOS_VISUAIS, CandidateMeta } from "@/data/candidates-meta";
import { CandidateMatchResult } from "@/lib/match-engine";
import {
  X,
  Swords,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Shield,
  Briefcase,
  Building2,
  Sparkles
} from "lucide-react";

interface CandidateDuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCandidateAId?: string;
  initialCandidateBId?: string;
  userResults?: CandidateMatchResult[];
}

export default function CandidateDuelModal({
  isOpen,
  onClose,
  initialCandidateAId = "lula",
  initialCandidateBId = "flavio_bolsonaro",
  userResults = [],
}: CandidateDuelModalProps) {
  const allCandidates = Object.values(CANDIDATOS_VISUAIS);

  const [candAId, setCandAId] = useState<string>(initialCandidateAId);
  const [candBId, setCandBId] = useState<string>(initialCandidateBId);

  if (!isOpen) return null;

  const candA = CANDIDATOS_VISUAIS[candAId] || allCandidates[0];
  const candB = CANDIDATOS_VISUAIS[candBId] || allCandidates[1];

  const matchA = userResults.find((r) => r.candidateId === candA.id);
  const matchB = userResults.find((r) => r.candidateId === candB.id);

  // Calcula a distância euclidiana ideológica entre os dois candidatos no plano compass
  const dx = candA.compass.x - candB.compass.x;
  const dy = candA.compass.y - candB.compass.y;
  const ideologicalDistance = Math.round(Math.sqrt(dx * dx + dy * dy));

  const getDistanceLabel = (dist: number) => {
    if (dist < 30) return { text: "Visões Muito Próximas", color: "text-emerald-400" };
    if (dist < 75) return { text: "Divergência Moderada", color: "text-amber-400" };
    return { text: "Polarização Extrema", color: "text-rose-400" };
  };

  const distInfo = getDistanceLabel(ideologicalDistance);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-card-enter">
      <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-100">
                Comparador 1x1: Duelo de Candidatos
              </h3>
              <p className="text-[11px] text-zinc-400">
                Compare propostas reais lado a lado e veja suas divergências programáticas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Candidate Selectors Header (Side-by-Side) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
            {/* VS Badge in the center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex w-9 h-9 rounded-full bg-zinc-900 border-2 border-zinc-700 items-center justify-center text-xs font-black text-amber-400 shadow-lg">
              VS
            </div>

            {/* Candidate A Card */}
            <div className="p-3 sm:p-4 rounded-xl open-card border border-zinc-800 flex flex-col items-center text-center space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden shadow-md">
                <img
                  src={candA.foto}
                  alt={candA.nome}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Selector */}
              <select
                value={candAId}
                onChange={(e) => setCandAId(e.target.value)}
                className="w-full text-xs font-semibold rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 p-1.5 focus:outline-none focus:border-zinc-500"
              >
                {allCandidates.map((c) => (
                  <option key={c.id} value={c.id} disabled={c.id === candBId}>
                    {c.nome} ({c.partido})
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-zinc-400">
                <span className="font-semibold text-zinc-300">{candA.partido}</span> · {candA.espectro}
              </div>

              {matchA && (
                <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
                  {matchA.match}% seu match
                </div>
              )}
            </div>

            {/* Candidate B Card */}
            <div className="p-3 sm:p-4 rounded-xl open-card border border-zinc-800 flex flex-col items-center text-center space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden shadow-md">
                <img
                  src={candB.foto}
                  alt={candB.nome}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Selector */}
              <select
                value={candBId}
                onChange={(e) => setCandBId(e.target.value)}
                className="w-full text-xs font-semibold rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 p-1.5 focus:outline-none focus:border-zinc-500"
              >
                {allCandidates.map((c) => (
                  <option key={c.id} value={c.id} disabled={c.id === candAId}>
                    {c.nome} ({c.partido})
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-zinc-400">
                <span className="font-semibold text-zinc-300">{candB.partido}</span> · {candB.espectro}
              </div>

              {matchB && (
                <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
                  {matchB.match}% seu match
                </div>
              )}
            </div>
          </div>

          {/* Ideological Gap Indicator */}
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
              Distância no Espectro Político:
            </span>
            <span className={`font-bold ${distInfo.color}`}>
              {distInfo.text} ({ideologicalDistance} pts)
            </span>
          </div>

          {/* Proposals Comparison Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Propostas Concretas Registradas no TSE
            </h4>

            <div className="space-y-3">
              {/* Proposal 1 */}
              <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Economia & Estado</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-850 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{candA.nome.split(" ")[0]}</span>
                    <p className="text-zinc-200 leading-snug">
                      {candA.propostasChave[0]?.texto || "Proposta econômica registrada no plano."}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-850 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{candB.nome.split(" ")[0]}</span>
                    <p className="text-zinc-200 leading-snug">
                      {candB.propostasChave[0]?.texto || "Proposta econômica registrada no plano."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Proposal 2 */}
              <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Segurança Pública & Justiça</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-850 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{candA.nome.split(" ")[0]}</span>
                    <p className="text-zinc-200 leading-snug">
                      {candA.propostasChave[1]?.texto || "Proposta de segurança no plano."}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-850 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{candB.nome.split(" ")[0]}</span>
                    <p className="text-zinc-200 leading-snug">
                      {candB.propostasChave[1]?.texto || "Proposta de segurança no plano."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Proposal 3 */}
              <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Trabalho, Saúde & Sociedade</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-850 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{candA.nome.split(" ")[0]}</span>
                    <p className="text-zinc-200 leading-snug">
                      {candA.propostasChave[2]?.texto || "Proposta social no plano."}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-850 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{candB.nome.split(" ")[0]}</span>
                    <p className="text-zinc-200 leading-snug">
                      {candB.propostasChave[2]?.texto || "Proposta social no plano."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">
            Fonte: Planos de Governo Oficiais registrados no TSE (2026)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs cursor-pointer transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
