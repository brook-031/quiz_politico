"use client";

import React, { useMemo, useState } from "react";
import { CandidateMatchResult } from "@/lib/match-engine";
import { CANDIDATOS_VISUAIS, CandidateMeta } from "@/data/candidates-meta";
import { Compass, Info } from "lucide-react";

interface PoliticalCompassProps {
  results: CandidateMatchResult[];
  onSelectCandidate?: (id: string) => void;
}

export default function PoliticalCompass({ results, onSelectCandidate }: PoliticalCompassProps) {
  const [hoveredCandidate, setHoveredCandidate] = useState<CandidateMeta | null>(null);

  // Calcula a coordenada ponderada do usuário baseada nas afinidades calculadas
  const userCoords = useMemo(() => {
    if (!results || results.length === 0) return { x: 0, y: 0 };

    let totalWeight = 0;
    let sumX = 0;
    let sumY = 0;

    results.forEach((r) => {
      const meta = CANDIDATOS_VISUAIS[r.candidateId];
      if (!meta) return;

      // Peso quadrático para dar mais força aos candidatos com afinidade mais alta
      const matchScore = Math.max(0, r.match - 20);
      const weight = Math.pow(matchScore, 2);

      sumX += meta.compass.x * weight;
      sumY += meta.compass.y * weight;
      totalWeight += weight;
    });

    if (totalWeight === 0) return { x: 0, y: 0 };
    return {
      x: Math.round(sumX / totalWeight),
      y: Math.round(sumY / totalWeight),
    };
  }, [results]);

  // Determina o quadrante político do usuário
  const userQuadrant = useMemo(() => {
    const { x, y } = userCoords;
    const isDireita = x >= 0;
    const isConservador = y >= 0;

    if (isDireita && isConservador) {
      return {
        titulo: "Direita Conservadora / Ordem",
        descricao: "Defesa de livre iniciativa econômica com foco em segurança pública e ordem legal.",
      };
    } else if (isDireita && !isConservador) {
      return {
        titulo: "Direita Liberal / Reformista",
        descricao: "Privatizações, desregulamentação econômica e liberdades individuais.",
      };
    } else if (!isDireita && isConservador) {
      return {
        titulo: "Esquerda Estatista / Trabalhista",
        descricao: "Forte intervenção do Estado na economia e rigor institucional.",
      };
    } else {
      return {
        titulo: "Esquerda Progressista / Popular",
        descricao: "Serviços públicos universais gratuitos, igualdade social e liberdades civis.",
      };
    }
  }, [userCoords]);

  // Dimensões do gráfico SVG
  const width = 500;
  const height = 440;
  const pad = 44;

  // Função para converter coordenadas [-100, 100] em pixels SVG
  const toSvgX = (x: number) => pad + ((x + 100) / 200) * (width - 2 * pad);
  // Y invertido porque no SVG o zero fica no topo
  const toSvgY = (y: number) => (height - pad) - ((y + 100) / 200) * (height - 2 * pad);

  const userSvgX = toSvgX(userCoords.x);
  const userSvgY = toSvgY(userCoords.y);

  return (
    <div className="rounded-2xl open-card p-5 sm:p-6 border border-zinc-800 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-100">
              Bússola Política 2D
            </h3>
            <p className="text-[11px] text-zinc-400">
              Seu posicionamento no plano cartesiano ideológico comparado aos candidatos
            </p>
          </div>
        </div>

        {/* User Quadrant Pill */}
        <div className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px]">
          <span className="text-zinc-400 font-medium">Seu Perfil: </span>
          <span className="text-emerald-400 font-bold">{userQuadrant.titulo}</span>
        </div>
      </div>

      {/* SVG Canvas Chart */}
      <div className="relative w-full max-w-[500px] mx-auto select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          {/* Fundo dos Quadrantes com bordas sutis */}
          {/* Top Left: Esquerda Estatista */}
          <rect
            x={pad}
            y={pad}
            width={(width - 2 * pad) / 2}
            height={(height - 2 * pad) / 2}
            fill="#1e1b2e"
            fillOpacity="0.35"
            className="transition-all"
          />
          {/* Top Right: Direita Conservadora */}
          <rect
            x={pad + (width - 2 * pad) / 2}
            y={pad}
            width={(width - 2 * pad) / 2}
            height={(height - 2 * pad) / 2}
            fill="#1c2833"
            fillOpacity="0.35"
            className="transition-all"
          />
          {/* Bottom Left: Esquerda Progressista */}
          <rect
            x={pad}
            y={pad + (height - 2 * pad) / 2}
            width={(width - 2 * pad) / 2}
            height={(height - 2 * pad) / 2}
            fill="#17252a"
            fillOpacity="0.35"
            className="transition-all"
          />
          {/* Bottom Right: Direita Liberal */}
          <rect
            x={pad + (width - 2 * pad) / 2}
            y={pad + (height - 2 * pad) / 2}
            width={(width - 2 * pad) / 2}
            height={(height - 2 * pad) / 2}
            fill="#1a252c"
            fillOpacity="0.35"
            className="transition-all"
          />

          {/* Quadrant Watermark Titles */}
          <text
            x={pad + 12}
            y={pad + 20}
            fill="#94a3b8"
            fontSize="10"
            fontWeight="600"
            opacity="0.6"
          >
            ESQUERDA ESTATISTA
          </text>
          <text
            x={width - pad - 12}
            y={pad + 20}
            textAnchor="end"
            fill="#94a3b8"
            fontSize="10"
            fontWeight="600"
            opacity="0.6"
          >
            DIREITA CONSERVADORA
          </text>
          <text
            x={pad + 12}
            y={height - pad - 12}
            fill="#94a3b8"
            fontSize="10"
            fontWeight="600"
            opacity="0.6"
          >
            ESQUERDA PROGRESSISTA
          </text>
          <text
            x={width - pad - 12}
            y={height - pad - 12}
            textAnchor="end"
            fill="#94a3b8"
            fontSize="10"
            fontWeight="600"
            opacity="0.6"
          >
            DIREITA LIBERAL
          </text>

          {/* Moldura Externa */}
          <rect
            x={pad}
            y={pad}
            width={width - 2 * pad}
            height={height - 2 * pad}
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
            rx="8"
          />

          {/* Eixo X (Econômico) */}
          <line
            x1={pad}
            y1={pad + (height - 2 * pad) / 2}
            x2={width - pad}
            y2={pad + (height - 2 * pad) / 2}
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Eixo Y (Social) */}
          <line
            x1={pad + (width - 2 * pad) / 2}
            y1={pad}
            x2={pad + (width - 2 * pad) / 2}
            y2={height - pad}
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Rótulos dos Eixos */}
          {/* Eixo X: Esquerda */}
          <text
            x={pad + 6}
            y={pad + (height - 2 * pad) / 2 - 6}
            fill="#f87171"
            fontSize="10"
            fontWeight="bold"
          >
            ← Esquerda Estatizante
          </text>
          {/* Eixo X: Direita */}
          <text
            x={width - pad - 6}
            y={pad + (height - 2 * pad) / 2 - 6}
            textAnchor="end"
            fill="#60a5fa"
            fontSize="10"
            fontWeight="bold"
          >
            Direita Livre Mercado →
          </text>
          {/* Eixo Y: Topo (Conservador) */}
          <text
            x={width / 2}
            y={pad - 12}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="10"
            fontWeight="bold"
          >
            ▲ Conservador / Ordem Estatal
          </text>
          {/* Eixo Y: Base (Progressista) */}
          <text
            x={width / 2}
            y={height - pad + 22}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="10"
            fontWeight="bold"
          >
            ▼ Progressista / Liberdades Civis
          </text>

          {/* Plotagem dos Candidatos */}
          {Object.values(CANDIDATOS_VISUAIS).map((cand) => {
            const cx = toSvgX(cand.compass.x);
            const cy = toSvgY(cand.compass.y);
            const isHovered = hoveredCandidate?.id === cand.id;

            return (
              <g
                key={cand.id}
                className="cursor-pointer transition-transform duration-150"
                onMouseEnter={() => setHoveredCandidate(cand)}
                onMouseLeave={() => setHoveredCandidate(null)}
                onClick={() => onSelectCandidate?.(cand.id)}
              >
                {/* Halo de hover */}
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill="#38bdf8"
                    fillOpacity="0.25"
                    className="animate-pulse"
                  />
                )}

                {/* Ponto do Candidato */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 9 : 7}
                  fill="#1e293b"
                  stroke={isHovered ? "#38bdf8" : "#94a3b8"}
                  strokeWidth="2"
                />

                {/* Iniciais ou mini sigla */}
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fill="#f1f5f9"
                  fontSize="7"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {cand.iniciais}
                </text>

                {/* Nome do Candidato */}
                <text
                  x={cx}
                  y={cy - 10}
                  textAnchor="middle"
                  fill={isHovered ? "#ffffff" : "#94a3b8"}
                  fontSize="8"
                  fontWeight={isHovered ? "bold" : "normal"}
                  className="pointer-events-none drop-shadow"
                >
                  {cand.nome.split(" ")[0]}
                </text>
              </g>
            );
          })}

          {/* Ponto Marcador do USUÁRIO (VOCÊ) */}
          <g className="cursor-default">
            {/* Halo Pulsante */}
            <circle
              cx={userSvgX}
              cy={userSvgY}
              r="22"
              fill="#10b981"
              fillOpacity="0.2"
              className="animate-ping"
            />
            <circle
              cx={userSvgX}
              cy={userSvgY}
              r="14"
              fill="#10b981"
              fillOpacity="0.4"
            />
            {/* Ponto Central */}
            <circle
              cx={userSvgX}
              cy={userSvgY}
              r="8"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Label "VOCÊ" */}
            <rect
              x={userSvgX - 22}
              y={userSvgY + 12}
              width="44"
              height="16"
              rx="4"
              fill="#064e3b"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text
              x={userSvgX}
              y={userSvgY + 23}
              textAnchor="middle"
              fill="#a7f3d0"
              fontSize="9"
              fontWeight="900"
              letterSpacing="0.5"
            >
              VOCÊ
            </text>
          </g>
        </svg>
      </div>

      {/* Info Box sobre o ponto do usuário e candidato hovered */}
      <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        {hoveredCandidate ? (
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-100">{hoveredCandidate.nome}</span>
            <span className="text-zinc-400">({hoveredCandidate.partido})</span>
            <span className="text-zinc-400">·</span>
            <span className="text-zinc-300">{hoveredCandidate.espectro}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>Passe o mouse ou toque nos pontos para identificar cada candidato.</span>
          </div>
        )}

        <div className="font-mono text-[11px] text-zinc-400 shrink-0">
          Coordenadas: ({userCoords.x > 0 ? `+${userCoords.x}` : userCoords.x}, {userCoords.y > 0 ? `+${userCoords.y}` : userCoords.y})
        </div>
      </div>
    </div>
  );
}
