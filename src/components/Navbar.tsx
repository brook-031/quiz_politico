"use client";

import React, { useState } from "react";
import { Vote, Info, Swords } from "lucide-react";
import MethodologyModal from "./MethodologyModal";
import CandidateDuelModal from "./CandidateDuelModal";

interface NavbarProps {
  onReset?: () => void;
}

export default function Navbar({ onReset }: NavbarProps) {
  const [showMethodology, setShowMethodology] = useState(false);
  const [showDuel, setShowDuel] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#090a0f]/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={onReset}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            id="nav-brand-btn"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100">
              <Vote className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-100 tracking-tight">
                Match Político
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase tracking-wider">
                Eleições 2026
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDuel(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800 transition-colors cursor-pointer"
              id="open-duel-nav-btn"
            >
              <Swords className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Duelo 1x1</span>
            </button>

            <button
              onClick={() => setShowMethodology(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800 transition-colors cursor-pointer"
              id="open-methodology-btn"
            >
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              <span>Metodologia</span>
            </button>
          </div>
        </div>
      </header>

      <MethodologyModal isOpen={showMethodology} onClose={() => setShowMethodology(false)} />
      <CandidateDuelModal isOpen={showDuel} onClose={() => setShowDuel(false)} />
    </>
  );
}
