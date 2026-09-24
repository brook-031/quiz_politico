"use client";

import React from "react";
import { CANDIDATOS_VISUAIS } from "@/data/candidates-meta";

export default function CandidateCarousel() {
  const candidates = Object.values(CANDIDATOS_VISUAIS);
  // Duplica para garantir loop contínuo infinito
  const doubledCandidates = [...candidates, ...candidates];

  return (
    <div className="w-full overflow-hidden py-3 select-none relative">
      {/* Subtle fade on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#090a0f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#090a0f] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex gap-3 w-max animate-marquee hover:[animation-play-state:paused]">
        {doubledCandidates.map((c, index) => (
          <div
            key={`${c.id}-${index}`}
            className="w-24 sm:w-28 flex-shrink-0 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-sm group transition-all duration-200 hover:border-zinc-600"
          >
            {/* Candidate Photo */}
            <div className="relative w-full h-28 sm:h-32 bg-zinc-950 overflow-hidden flex items-center justify-center">
              <img
                src={c.foto}
                alt={c.nome}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Party Tag Pill on image */}
              <div className="absolute top-1.5 left-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-950/90 text-zinc-200 border border-white/10 uppercase tracking-wider">
                  {c.partido}
                </span>
              </div>
            </div>

            {/* Candidate Info */}
            <div className="p-2 text-center bg-zinc-900">
              <h4 className="font-bold text-[11px] text-zinc-100 truncate tracking-tight">
                {c.nome}
              </h4>
              <p className="text-[9px] text-zinc-400 truncate mt-0.5">
                {c.espectro}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
