'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck2, Plus, CheckCircle2, Clock, MapPin, ChevronRight } from 'lucide-react';

export default function MyChallengesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileCheck2 className="w-6 h-6 text-emerald-400" />
            My Registered Challenges
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review status, field verification logs, and active engineering assignments for challenges you submitted.
          </p>
        </div>

        <Link
          href="/dashboard/citizen"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Submit New Challenge
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 font-bold">CH-2025-084</span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              In University R&D
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Fluoride and Saline Contamination in Deep Borewell #4</h3>
          <p className="text-xs text-slate-300">
            Khandala Village, Satara • 340 households affected. Verified by Block Nodal Officer Ramesh Patil. Under development by IIT Delhi CRT.
          </p>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Submitted: 3 days ago</span>
            <span className="text-emerald-400 font-mono">218 Community Upvotes</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 font-bold">CH-2025-091</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Field Verified
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Unmetalled 3.2km Village Access Road Impassable in Monsoon</h3>
          <p className="text-xs text-slate-300">
            Bawada Wadi, Khandala • 180 families cut off during heavy rains. Coordinates geotagged & verified.
          </p>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Submitted: 1 week ago</span>
            <span className="text-emerald-400 font-mono">142 Community Upvotes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
