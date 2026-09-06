'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Check, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

export function AiDecisionCard() {
  const [decisionState, setDecisionState] = useState<'pending' | 'accepted' | 'overridden'>('pending');
  const [overrideReason, setOverrideReason] = useState('');
  const [showOverrideInput, setShowOverrideInput] = useState(false);

  const handleAccept = () => {
    setDecisionState('accepted');
    setShowOverrideInput(false);
  };

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideReason.trim()) return;
    setDecisionState('overridden');
    setShowOverrideInput(false);
  };

  const handleReset = () => {
    setDecisionState('pending');
    setOverrideReason('');
    setShowOverrideInput(false);
  };

  return (
    <div className="bg-[#121615] border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#267f68]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9de7cf] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#9de7cf] font-semibold">
            AI DECISION CARD // DEMO SIMULATOR
          </span>
        </div>
        <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">
          CASE #SETU-1042 • WEST SINGHBHUM
        </span>
      </div>

      {/* Raw Citizen Input */}
      <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1">
          Raw Citizen Intake (Voice &amp; Text)
        </div>
        <div className="font-serif italic text-base text-white/90">
          &ldquo;Peene ke paani me zang aur ganda baalu aa raha hai... bacche bimar pad rahe hain.&rdquo;
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-mono text-[#9de7cf]">
          <span className="px-2 py-0.5 rounded bg-[#9de7cf]/10 border border-[#9de7cf]/20">Auto-Translated: Rust &amp; Turbid Sand in Drinking Water</span>
          <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">GPS: 22.58°N, 85.81°E</span>
        </div>
      </div>

      {/* AI Extraction & Structuring */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
          <span className="block font-mono text-[10px] text-white/40 uppercase">Domain</span>
          <span className="font-semibold text-sm text-white">Water &amp; Sanitation</span>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
          <span className="block font-mono text-[10px] text-white/40 uppercase">Assessed Severity</span>
          <span className="font-semibold text-sm text-amber-400">Level 4 // High Risk</span>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
          <span className="block font-mono text-[10px] text-white/40 uppercase">Affected Pop.</span>
          <span className="font-semibold text-sm text-white">~4,200 Citizens</span>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
          <span className="block font-mono text-[10px] text-white/40 uppercase">Semantic Dedup</span>
          <span className="font-semibold text-sm text-[#9de7cf]">91% Cluster Match</span>
        </div>
      </div>

      {/* Recommendation Engine Box */}
      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-zinc-900/50 border border-[#9de7cf]/20">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#9de7cf]" />
            <span className="font-mono text-xs font-semibold uppercase text-white tracking-wider">
              Capability Match Recommendation
            </span>
          </div>
          <span className="font-mono text-xs text-[#9de7cf] font-bold">92% Match Score</span>
        </div>

        <p className="text-sm text-white/80 leading-relaxed">
          <strong className="text-white">IIT (ISM) Dhanbad</strong> — Dept. of Environmental Science &amp; Mining Engineering.
          Reasoning: 3 published arsenic/iron water filter patents, active NABL water lab, 140km deployment radius.
        </p>

        {/* Confidence meter */}
        <div className="mt-3 flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/40 uppercase">Confidence</span>
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#267f68] to-[#9de7cf] rounded-full w-[92%]" />
          </div>
          <span className="font-mono text-[11px] text-[#9de7cf]">0.92</span>
        </div>
      </div>

      {/* Decision Status State */}
      {decisionState === 'accepted' && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm">
            <Check className="size-5 text-emerald-400" />
            <span>
              <strong>Recommendation Confirmed by Moderator:</strong> Dispatched to IIT (ISM) Coordinator with immutable audit hash.
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs underline font-mono text-white/60 hover:text-white cursor-pointer ml-3 shrink-0"
          >
            Reset
          </button>
        </div>
      )}

      {decisionState === 'overridden' && (
        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm">
            <AlertTriangle className="size-5 text-amber-400 shrink-0" />
            <span>
              <strong>Moderator Override Logged:</strong> &ldquo;{overrideReason}&rdquo; (Recorded in permanent audit ledger).
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs underline font-mono text-white/60 hover:text-white cursor-pointer ml-3 shrink-0"
          >
            Reset
          </button>
        </div>
      )}

      {/* Interactive Controls */}
      {decisionState === 'pending' && (
        <div className="mt-6 pt-5 border-t border-white/10">
          {!showOverrideInput ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <ShieldCheck className="size-4 text-[#9de7cf]" />
                <span>Human-in-the-loop required before routing</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowOverrideInput(true)}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  Override Match
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="px-5 py-2 rounded-lg bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Accept Match</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOverrideSubmit} className="space-y-3">
              <label htmlFor="override-reason" className="block text-xs font-mono text-amber-300">
                Enter Mandatory Override Reason (Logged to Public Audit Trail):
              </label>
              <div className="flex gap-2">
                <input
                  id="override-reason"
                  type="text"
                  required
                  placeholder="e.g. Prioritized NIT Jamshedpur due to existing rural filtration testbed..."
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="flex-1 bg-black/50 border border-white/20 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-mono text-white outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded-lg text-xs font-mono uppercase font-bold cursor-pointer"
                >
                  Commit Override
                </button>
                <button
                  type="button"
                  onClick={() => setShowOverrideInput(false)}
                  className="border border-white/20 text-white/60 hover:text-white px-3 py-2 rounded-lg text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default AiDecisionCard;
