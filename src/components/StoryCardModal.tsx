"use client";

import React, { useRef, useState } from "react";
import { CandidateMatchResult } from "@/lib/match-engine";
import { CANDIDATOS_VISUAIS } from "@/data/candidates-meta";
import { X, Download, Share2, Check, Sparkles, Award } from "lucide-react";

interface StoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: CandidateMatchResult[];
  totalAnswered: number;
}

export default function StoryCardModal({
  isOpen,
  onClose,
  results,
  totalAnswered,
}: StoryCardModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen || !results || results.length === 0) return null;

  const topMatch = results[0];
  const runnerUp = results[1];
  const thirdPlace = results[2];
  const meta = CANDIDATOS_VISUAIS[topMatch.candidateId] || {
    id: topMatch.candidateId,
    nome: topMatch.nome,
    partido: topMatch.partido,
    iniciais: topMatch.nome.substring(0, 2),
    espectro: "Democrático",
    foto: "/candidates/lula.jpg",
    badgeBg: "",
    badgeText: "",
    compass: { x: 0, y: 0 },
    propostasChave: [],
  };

  // Função para desenhar no Canvas em alta definição (1080x1920) e exportar
  const handleDownloadImage = async () => {
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Fundo Gradiente Escuro Sofisticado
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      bgGrad.addColorStop(0, "#090a0f");
      bgGrad.addColorStop(0.5, "#0e111a");
      bgGrad.addColorStop(1, "#07080c");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Moldura decorativa
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 40, 1000, 1840);

      // 2. Header
      ctx.textAlign = "center";
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("ELEIÇÕES 2026 · PLANOS DE GOVERNO OFICIAIS", 540, 160);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 72px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("Match Político", 540, 245);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(`Baseado em ${totalAnswered} propostas reais respondidas`, 540, 300);

      // 3. Moldura e Foto do Candidato Top #1
      const photoSize = 340;
      const photoX = 540 - photoSize / 2;
      const photoY = 400;

      // Círculo com foto
      ctx.save();
      ctx.beginPath();
      ctx.arc(540, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Carregar imagem
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = meta.foto;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      try {
        ctx.drawImage(img, photoX, photoY, photoSize, photoSize);
      } catch (err) {
        // Fallback de cor caso imagem dê erro
        ctx.fillStyle = "#27272a";
        ctx.fillRect(photoX, photoY, photoSize, photoSize);
      }
      ctx.restore();

      // Borda da Foto
      ctx.beginPath();
      ctx.arc(540, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 6;
      ctx.stroke();

      // 4. Badge #1 MAIOR AFINIDADE
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.roundRect(540 - 200, photoY + photoSize + 40, 400, 52, 26);
      ctx.fill();

      ctx.fillStyle = "#000000";
      ctx.font = "900 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("★ 1º LUGAR EM AFINIDADE ★", 540, photoY + photoSize + 76);

      // 5. Nome do Candidato
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(topMatch.nome, 540, 890);

      // Partido e Espectro
      ctx.fillStyle = "#94a3b8";
      ctx.font = "500 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(`${meta.partido}  ·  ${meta.espectro}`, 540, 945);

      // 6. Placa com Porcentagem de Match
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(540 - 350, 1010, 700, 180, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 110px monospace, -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(`${topMatch.match}%`, 540, 1130);

      ctx.fillStyle = "#10b981";
      ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("DE CONCORDÂNCIA PROGRAMÁTICA", 540, 1165);

      // 7. Posições 2º e 3º Lugar
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("OUTROS CANDIDATOS NO SEU PODIUM:", 540, 1260);

      let curY = 1320;
      if (runnerUp) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        ctx.roundRect(540 - 380, curY, 760, 80, 16);
        ctx.fill();

        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillText(`2º ${runnerUp.nome} (${runnerUp.partido})`, 540 - 350, curY + 52);

        ctx.textAlign = "right";
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 34px monospace, sans-serif";
        ctx.fillText(`${runnerUp.match}%`, 540 + 350, curY + 52);
        curY += 100;
      }

      if (thirdPlace) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        ctx.roundRect(540 - 380, curY, 760, 80, 16);
        ctx.fill();

        ctx.textAlign = "left";
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillText(`3º ${thirdPlace.nome} (${thirdPlace.partido})`, 540 - 350, curY + 52);

        ctx.textAlign = "right";
        ctx.fillStyle = "#94a3b8";
        ctx.font = "bold 34px monospace, sans-serif";
        ctx.fillText(`${thirdPlace.match}%`, 540 + 350, curY + 52);
      }

      // 8. Footer Call To Action
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("Qual é o seu Match Político?", 540, 1680);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 38px monospace, sans-serif";
      ctx.fillText("matchpolitico.com.br", 540, 1740);

      ctx.fillStyle = "#64748b";
      ctx.font = "24px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("100% Anônimo, Neutro e Independente", 540, 1785);

      // Exportação da imagem
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsGenerating(false);
          return;
        }

        // Tenta compartilhamento nativo em smartphones
        if (
          navigator.canShare &&
          navigator.canShare({
            files: [new File([blob], "match-politico-2026.png", { type: "image/png" })],
          })
        ) {
          const file = new File([blob], "match-politico-2026.png", { type: "image/png" });
          navigator.share({
            title: "Meu Match Político 2026",
            text: `Meu match deu ${topMatch.nome} com ${topMatch.match}% de afinidade!`,
            files: [file],
          }).catch(() => {
            // Se o usuário cancelar ou falhar, faz download normal
            triggerDownload(blob);
          });
        } else {
          // Download padrão via link
          triggerDownload(blob);
        }

        setIsGenerating(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      }, "image/png");
    } catch (err) {
      console.error("Erro gerando imagem:", err);
      setIsGenerating(false);
    }
  };

  const triggerDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `match-politico-2026-${topMatch.candidateId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-card-enter">
      <div className="relative w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-zinc-100">Card para Stories (9:16)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stories Card Preview (9:16 Aspect Ratio) */}
        <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <div className="w-[260px] h-[462px] rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-4 flex flex-col justify-between text-center shadow-2xl relative select-none">
            {/* Top Branding */}
            <div>
              <div className="text-[8px] font-bold uppercase tracking-wider text-emerald-400">
                Eleições 2026 · TSE
              </div>
              <div className="text-base font-extrabold text-white tracking-tight">
                Match Político
              </div>
            </div>

            {/* Candidate Photo & Match Badge */}
            <div className="space-y-2">
              <div className="relative w-20 h-20 mx-auto rounded-full bg-zinc-800 border-2 border-emerald-400 overflow-hidden shadow-lg">
                <img
                  src={meta.foto}
                  alt={topMatch.nome}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                  <Award className="w-3 h-3" />
                  #1 Maior Afinidade
                </div>
                <div className="font-bold text-xs text-white mt-1 truncate">
                  {topMatch.nome}
                </div>
                <div className="text-[10px] text-zinc-400">
                  {meta.partido} · {meta.espectro}
                </div>
              </div>

              {/* Big Percentage Score */}
              <div className="py-1 px-2 rounded-xl bg-zinc-900/90 border border-zinc-800 inline-block">
                <div className="font-mono font-black text-2xl text-white">
                  {topMatch.match}%
                </div>
                <div className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold">
                  Afinidade
                </div>
              </div>
            </div>

            {/* Podium Runner-Ups */}
            <div className="space-y-1 text-left text-[9px] bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/80">
              <div className="text-zinc-400 font-semibold text-[8px] uppercase">
                Também no seu podium:
              </div>
              {runnerUp && (
                <div className="flex justify-between text-zinc-300">
                  <span className="truncate">2º {runnerUp.nome}</span>
                  <span className="font-mono font-bold text-zinc-200">{runnerUp.match}%</span>
                </div>
              )}
              {thirdPlace && (
                <div className="flex justify-between text-zinc-400">
                  <span className="truncate">3º {thirdPlace.nome}</span>
                  <span className="font-mono">{thirdPlace.match}%</span>
                </div>
              )}
            </div>

            {/* Footer Call to Action */}
            <div className="border-t border-zinc-800/80 pt-1.5 text-[8px] text-zinc-400">
              <div>Faça o teste você também:</div>
              <div className="font-mono text-emerald-400 font-bold text-[10px]">
                matchpolitico.com.br
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-900/50 space-y-2">
          <button
            onClick={handleDownloadImage}
            disabled={isGenerating}
            id="btn-baixar-story-card"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-zinc-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Imagem Gerada com Sucesso!</span>
              </>
            ) : isGenerating ? (
              <span>Gerando imagem HD (1080x1920)...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Baixar Imagem / Postar nos Stories</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-zinc-400">
            Formato vertical ideal para Instagram Stories, WhatsApp Status e TikTok.
          </p>
        </div>
      </div>
    </div>
  );
}
