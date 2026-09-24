"use client";

import React, { useState, useMemo } from "react";
import { CandidateMatchResult } from "@/lib/match-engine";
import { CANDIDATOS_VISUAIS, CandidateMeta } from "@/data/candidates-meta";
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
  TrendingUp,
  Shield,
  Briefcase,
  BookOpen,
  UserCheck,
  Compass,
  FileText,
  AlertCircle
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
  const [filterAffinity, setFilterAffinity] = useState<"all" | "high" | "med" | "low">("all");
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

  const getCandidateMeta = (id: string): CandidateMeta => {
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
        visaoPais: "Plano de governo focado no desenvolvimento nacional e modernização pública.",
        perfilResumido: "Candidato registrado nas eleições presidenciais de 2026.",
        diferencial: "Propostas registradas oficialmente no Tribunal Superior Eleitoral.",
        compass: { x: 0, y: 0 },
        propostasChave: [],
      }
    );
  };

  // Diagnóstico aprofundado do perfil do eleitor
  const voterProfile = useMemo(() => {
    if (!results || results.length === 0) {
      return {
        titulo: "Eleitor Plural e Moderado",
        descricao: "Suas respostas refletem equilíbrio pragmático entre demandas sociais e responsabilidade fiscal.",
        prioridades: ["Equilíbrio institucional", "Serviços públicos eficientes"],
      };
    }

    // Calcula médias de concordância em eixos chave a partir dos resultados
    const topScore = topMatch?.match || 50;
    const topMeta = topMatch ? getCandidateMeta(topMatch.candidateId) : null;
    const isDireita = (topMeta?.compass.x || 0) > 0;
    const isConservador = (topMeta?.compass.y || 0) > 0;

    if (isDireita && isConservador) {
      return {
        titulo: "Liberal-Conservador da Ordem e Livre Iniciativa",
        descricao:
          "Você prioriza o combate duro à criminalidade, rigor no cumprimento de penas, responsabilidade fiscal e a redução do peso do Estado na economia através de privatizações e incentivo à livre iniciativa.",
        prioridades: [
          "Endurecimento penal contra facções e reincidência",
          "Privatizações e corte de gastos públicos",
          "Defesa da propriedade privada e liberdade de empreender"
        ],
      };
    } else if (isDireita && !isConservador) {
      return {
        titulo: "Liberal-Reformista / Foco em Desregulamentação",
        descricao:
          "Sua principal preocupação é a desoneração de empresas e trabalhadores, modernização tributária, eficiência da máquina pública e liberdade econômica, mantendo postura moderada ou pragmática nos costumes.",
        prioridades: [
          "Simplificação e corte de impostos (Imposto Único / Desoneração)",
          "Abertura de mercado e desburocratização digital",
          "Gestão pública por metas e corte de privilégios"
        ],
      };
    } else if (!isDireita && isConservador) {
      return {
        titulo: "Trabalhista Nacionalista / Estado Forte",
        descricao:
          "Você defende a proteção e valorização do trabalhador nacional, soberania sobre recursos estratégicos (petróleo e energia) e firmeza institucional do Estado para manter a ordem e a segurança pública.",
        prioridades: [
          "Fortalecimento das estatais estratégicas e soberania energética",
          "Valorização do emprego formal e da produção nacional",
          "Presença do Estado na garantia da ordem e combate ao crime"
        ],
      };
    } else {
      return {
        titulo: "Progressista / Direitos Sociais e Cidadania",
        descricao:
          "Suas respostas demonstram forte compromisso com a justiça distributiva, ampliação de direitos trabalhistas (como o fim da escala 6x1), igualdade salarial, serviços públicos universais e gratuitos (SUS e educação) e garantias civis.",
        prioridades: [
          "Fim da escala 6x1 e aumento real de salários",
          "Tributação de super-ricos para financiar saúde e educação públicas",
          "Defesa irrestrita das liberdades civis e direitos humanos"
        ],
      };
    }
  }, [results, topMatch]);

  // Filtra candidatos na listagem geral
  const filteredCandidates = useMemo(() => {
    if (filterAffinity === "high") return results.filter((r) => r.match >= 65);
    if (filterAffinity === "med") return results.filter((r) => r.match >= 40 && r.match < 65);
    if (filterAffinity === "low") return results.filter((r) => r.match < 40);
    return results;
  }, [results, filterAffinity]);

  const shareText = `🎯 Meu Match Político 2026:
1º Lugar: ${topMatch?.nome} (${topMatch?.partido}) com ${topMatch?.match}% de afinidade!
2º Lugar: ${runnerUp?.nome} (${runnerUp?.partido}) com ${runnerUp?.match}%
3º Lugar: ${thirdPlace?.nome} (${thirdPlace?.partido}) com ${thirdPlace?.match}%

Perfil do Eleitor: ${voterProfile.titulo}
Descubra suas afinidades por propostas reais de governo:`;

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
      {/* Editorial Header */}
      <div className="text-center space-y-1.5">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          Análise Completa de Afinidade Eleitoral
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Seu Relatório de Afinidade 2026
        </h1>
        <p className="text-xs text-zinc-400">
          Cruzamento estatístico de <strong className="text-zinc-200">{totalAnswered}</strong> propostas com a matriz de todos os 13 candidatos
        </p>
      </div>

      {/* #1 TOP MATCH DOSSIÊ CARD */}
      {topMatch && (() => {
        const meta = getCandidateMeta(topMatch.candidateId);
        return (
          <div className="rounded-2xl open-card p-5 sm:p-6 border border-zinc-700/80 shadow-xl space-y-5 relative overflow-hidden">
            {/* Header com Foto, Nome e Score */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-left">
              {/* Foto Oficial */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-zinc-800 border-2 border-emerald-500/40 overflow-hidden shrink-0 shadow-lg">
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

              {/* Informações Principais */}
              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sua Maior Afinidade (#1 Lugar)</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {topMatch.nome}
                </h2>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-zinc-400">
                  <span className="font-bold text-zinc-200">{meta.partido}</span>
                  <span>·</span>
                  <span className="text-zinc-300">{meta.espectro}</span>
                </div>

                <p className="text-xs text-zinc-400 italic leading-relaxed pt-1">
                  &ldquo;{meta.perfilResumido}&rdquo;
                </p>
              </div>

              {/* Match Score Badge */}
              <div className="text-center sm:text-right shrink-0 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-inner">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                  {topMatch.match}%
                </div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Afinidade Geral
                </span>
              </div>
            </div>

            {/* VISÃO DE BRASIL DO CANDIDATO */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-1 text-xs">
              <span className="font-bold text-zinc-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Visão de País no Plano de Governo:
              </span>
              <p className="text-zinc-300 leading-relaxed">
                {meta.visaoPais}
              </p>
            </div>

            {/* RAIO-X POR EIXO TEMÁTICO (% DE AFINIDADE SETORIAL) */}
            <div className="space-y-2.5 pt-1 border-t border-zinc-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">
                  Raio-X de Afinidade por Área
                </span>
                <span className="text-[11px] text-zinc-400">Como você pontua em cada setor</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Economia */}
                <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5 text-[11px] font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                      Economia
                    </span>
                    <span className="font-mono font-bold text-zinc-200">{topMatch.setores?.economia ?? topMatch.match}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${topMatch.setores?.economia ?? topMatch.match}%` }}
                    />
                  </div>
                </div>

                {/* Segurança */}
                <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5 text-[11px] font-medium">
                      <Shield className="w-3.5 h-3.5 text-rose-400" />
                      Segurança
                    </span>
                    <span className="font-mono font-bold text-zinc-200">{topMatch.setores?.seguranca ?? topMatch.match}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-rose-400 transition-all duration-300"
                      style={{ width: `${topMatch.setores?.seguranca ?? topMatch.match}%` }}
                    />
                  </div>
                </div>

                {/* Trabalho */}
                <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5 text-[11px] font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                      Trabalho
                    </span>
                    <span className="font-mono font-bold text-zinc-200">{topMatch.setores?.trabalho ?? topMatch.match}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-sky-400 transition-all duration-300"
                      style={{ width: `${topMatch.setores?.trabalho ?? topMatch.match}%` }}
                    />
                  </div>
                </div>

                {/* Sociedade */}
                <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5 text-[11px] font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      Sociedade
                    </span>
                    <span className="font-mono font-bold text-zinc-200">{topMatch.setores?.sociedade ?? topMatch.match}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-300"
                      style={{ width: `${topMatch.setores?.sociedade ?? topMatch.match}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CONCORDÂNCIAS E DIVERGÊNCIAS DETALHADAS */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80 text-xs">
              {/* Onde vocês concordam */}
              {topMatch.concordancias.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Principais Propostas em que Vocês Concordam ({topMatch.concordancias.length}):
                  </span>
                  <ul className="space-y-1.5 pl-4 list-disc text-zinc-300">
                    {topMatch.concordancias.slice(0, 4).map((c) => (
                      <li key={c.id}>
                        <span>{c.texto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Onde vocês divergem (Transparência Total) */}
              {topMatch.divergencias.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 shrink-0" />
                    Onde Você Diverge Deste Candidato ({topMatch.divergencias.length}):
                  </span>
                  <ul className="space-y-1.5 pl-4 list-disc text-zinc-300">
                    {topMatch.divergencias.slice(0, 3).map((d) => (
                      <li key={d.id}>
                        <span>{d.texto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Diferencial do candidato */}
              <div className="mt-2 p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-850 text-zinc-400 text-[11px]">
                <strong className="text-zinc-200">Diferencial Único: </strong>
                <span>{meta.diferencial}</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* DIAGNÓSTICO DO SEU PERFIL POLÍTICO (O QUE SUAS ESCOLHAS SIGNIFICAM) */}
      <div className="rounded-2xl open-card p-5 sm:p-6 border border-zinc-800 space-y-3.5 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-zinc-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Diagnóstico do Eleitor
            </span>
            <h3 className="font-bold text-base text-zinc-100">
              {voterProfile.titulo}
            </h3>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          {voterProfile.descricao}
        </p>

        <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1.5 text-xs">
          <span className="font-semibold text-zinc-300 text-[11px] block">
            Suas maiores prioridades detectadas:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {voterProfile.prioridades.map((pri, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-200 font-medium"
              >
                ✓ {pri}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AÇÕES DE COMPARTILHAMENTO E STORIES */}
      <div className="space-y-2">
        <button
          onClick={() => setIsStoryModalOpen(true)}
          id="btn-abrir-story-modal"
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-800 to-zinc-800 hover:from-zinc-750 hover:to-zinc-750 text-white font-bold text-xs sm:text-sm border border-zinc-600 shadow-md transition-all cursor-pointer active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Gerar Card para Stories (Instagram / WhatsApp)</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
      </div>

      {/* BÚSSOLA POLÍTICA 2D INTERATIVA */}
      <PoliticalCompass
        results={results}
        onSelectCandidate={(id) => openDuelWith(id)}
      />

      {/* RANKING GERAL COM FILTROS DE AFINIDADE */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-[11px] text-zinc-200">
              Ranking Geral de Afinidade (13 Candidatos)
            </h3>
            <p className="text-[11px] text-zinc-400">
              Clique em qualquer candidato para ver suas propostas e visão de país
            </p>
          </div>

          {/* Filtros de Afinidade */}
          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setFilterAffinity("all")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                filterAffinity === "all" ? "bg-zinc-750 text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Todos (13)
            </button>
            <button
              onClick={() => setFilterAffinity("high")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                filterAffinity === "high" ? "bg-zinc-750 text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Alta (&gt;65%)
            </button>
            <button
              onClick={() => setFilterAffinity("med")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                filterAffinity === "med" ? "bg-zinc-750 text-amber-400" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Média
            </button>
            <button
              onClick={() => setFilterAffinity("low")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                filterAffinity === "low" ? "bg-zinc-750 text-rose-400" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Oposição
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredCandidates.map((r, index) => {
            const meta = getCandidateMeta(r.candidateId);
            const isExpanded = expandedCandidate === r.candidateId;
            const originalIndex = results.findIndex(item => item.candidateId === r.candidateId) + 1;

            return (
              <div
                key={r.candidateId}
                className="rounded-xl open-card border border-zinc-800/80 overflow-hidden transition-all duration-150"
              >
                {/* Linha do Candidato */}
                <div
                  onClick={() => toggleExpand(r.candidateId)}
                  className="p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-zinc-850/40"
                  id={`candidato-item-${r.candidateId}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-semibold text-zinc-400 w-5 text-center">
                      #{originalIndex}
                    </span>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 shadow-sm">
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

                  {/* Porcentagem e Barra */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className={`font-mono font-bold text-sm sm:text-base ${
                        r.match >= 65 ? "text-emerald-400" : r.match >= 45 ? "text-zinc-200" : "text-zinc-400"
                      }`}>
                        {r.match}%
                      </span>
                      <div className="w-16 sm:w-20 h-1.5 rounded-full bg-zinc-800 overflow-hidden mt-1">
                        <div
                          className={`h-full ${
                            r.match >= 65 ? "bg-emerald-400" : r.match >= 45 ? "bg-zinc-300" : "bg-zinc-500"
                          }`}
                          style={{ width: `${r.match}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-zinc-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Detalhes Expandidos (Dossiê e Propostas) */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-3 border-t border-zinc-800 bg-zinc-950/70 space-y-3.5 text-xs animate-card-enter">
                    {/* Visão de País */}
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                      <span className="font-bold text-zinc-300 text-[11px] flex items-center gap-1.5 uppercase">
                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                        Visão de País no Plano de Governo:
                      </span>
                      <p className="text-zinc-300 leading-relaxed text-[11px]">
                        {meta.visaoPais}
                      </p>
                    </div>

                    {/* Breakdown Setorial */}
                    {r.setores && (
                      <div className="space-y-1.5">
                        <span className="font-semibold text-zinc-400 text-[10px] uppercase tracking-wider block">
                          Afinidade por Área:
                        </span>
                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Economia</span>
                            <span className="font-mono font-bold text-zinc-200 text-xs">{r.setores.economia}%</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Segurança</span>
                            <span className="font-mono font-bold text-zinc-200 text-xs">{r.setores.seguranca}%</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Trabalho</span>
                            <span className="font-mono font-bold text-zinc-200 text-xs">{r.setores.trabalho}%</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Sociedade</span>
                            <span className="font-mono font-bold text-zinc-200 text-xs">{r.setores.sociedade}%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Concordâncias */}
                    {r.concordancias.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          Concordâncias ({r.concordancias.length}):
                        </span>
                        <ul className="pl-4 space-y-1 list-disc text-zinc-300 text-[11px]">
                          {r.concordancias.slice(0, 3).map((c) => (
                            <li key={c.id}>
                              <span>{c.texto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Divergências */}
                    {r.divergencias.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                          Divergências ({r.divergencias.length}):
                        </span>
                        <ul className="pl-4 space-y-1 list-disc text-zinc-300 text-[11px]">
                          {r.divergencias.slice(0, 3).map((d) => (
                            <li key={d.id}>
                              <span>{d.texto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ação de Comparação */}
                    <div className="pt-2 border-t border-zinc-850 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400">
                        {meta.diferencial}
                      </span>
                      <button
                        onClick={() => openDuelWith(r.candidateId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ml-2"
                      >
                        <Swords className="w-3 h-3 text-amber-400" />
                        <span>Comparar 1x1</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* REINICIAR TESTE */}
      <div className="pt-2 text-center">
        <button
          onClick={onRestart}
          id="btn-refazer-quiz"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-800 transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-zinc-400" />
          <span>Refazer Teste ou Mudar Modo</span>
        </button>
      </div>

      {/* MODAL STORIES 9:16 */}
      <StoryCardModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        results={results}
        totalAnswered={totalAnswered}
      />

      {/* MODAL DUELO 1x1 */}
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
