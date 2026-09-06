'use client';

import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, Award, Users, BarChart3, FileCheck2 } from 'lucide-react';

export default function ImpactVSOPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Activity className="w-6 h-6 text-teal-400" />
          Impact & Village Social Officer (VSO) Audits
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Independent 3rd-party field verification, social ROI metrics, and statutory utilization certificates.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl">
          <div className="text-xs text-slate-400 mb-1">Total Verified Lives</div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">24,800+</div>
          <div className="text-[11px] text-teal-400 font-mono mt-1">Direct rural beneficiaries</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl">
          <div className="text-xs text-slate-400 mb-1">Clean Water Supplied</div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">1.2M L</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">WHO-standard potable output</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl">
          <div className="text-xs text-slate-400 mb-1">Agri Loss Prevented</div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">410 Tonnes</div>
          <div className="text-[11px] text-amber-400 font-mono mt-1">Onion & citrus perishables</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl">
          <div className="text-xs text-slate-400 mb-1">VSO Field Audits</div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">100%</div>
          <div className="text-[11px] text-indigo-400 font-mono mt-1">Geotagged digital signoff</div>
        </div>
      </div>

      {/* VSO Audit Logs Table */}
      <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Recent VSO Field Verification Audits
          </h3>
          <span className="text-[10px] font-mono text-slate-400">All signoffs signed via Aadhaar eSign</span>
        </div>

        <div className="divide-y divide-slate-800/80 text-xs">
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-white">Borewell #4 Nano-Filtration Pilot • Khandala Village</div>
              <div className="text-slate-400 text-[11px]">Auditor: VSO Sunita Kulkarni • Satara District Administration</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold self-start sm:self-auto">
              Passed Audit (TDS reduced from 1840 to 195ppm)
            </span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-white">Melghat Solar Micro-Grid Electrification • 400 Huts</div>
              <div className="text-slate-400 text-[11px]">Auditor: VSO Deepak Meshram • Amravati Social Welfare Officer</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold self-start sm:self-auto">
              Passed Audit (24/7 Power to Vaccine Cooler & School)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
