"use client";

import React from "react";
import { X, ShieldCheck, Cpu, Scale, CheckCircle2 } from "lucide-react";

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MethodologyModal({ isOpen, onClose }: MethodologyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-card-enter">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          id="close-methodology-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Metodologia e Neutralidade</h3>
            <p className="text-xs text-zinc-400">Como funciona o cálculo de afinidade eleitoral</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-3.5 text-xs text-zinc-300 max-h-[65vh] overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-zinc-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>1. Fonte Primária Oficial</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Todas as propostas foram extraídas diretamente dos <strong>Planos de Governo oficiais</strong> protocolados pelos candidatos no Tribunal Superior Eleitoral (TSE). Descartamos retórica vazia e focamos estritamente em <strong>ações práticas, reformas e medidas concretas</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-zinc-200">
              <Cpu className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>2. Algoritmo de Afinidade</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Cada proposta é avaliada pelo usuário através de três respostas:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-300">
              <li><strong>Concordo (+1):</strong> Soma pontos para o candidato proponente.</li>
              <li><strong>Discordo (-1):</strong> Subtrai pontos do candidato proponente e soma pontos com quem tem posições opostas.</li>
              <li><strong>Pular (0):</strong> Não afeta o cálculo, sendo desconsiderada da pontuação máxima.</li>
            </ul>
            <div className="p-2 mt-2 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300 text-center">
              Match % = ((score / maxScore) + 1) * 50
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-zinc-200">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>3. Total Imparcialidade</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              A plataforma é independente e estritamente neutra. Não emite julgamentos ideológicos nem favorece qualquer espectro partidário.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl font-semibold text-xs bg-white text-zinc-950 hover:bg-zinc-200 transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
