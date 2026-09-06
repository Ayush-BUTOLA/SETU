'use client';

import React from 'react';
import { Briefcase, Building2, GraduationCap, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';

const PILOT_PROJECTS = [
  {
    id: 'PRJ-2025-01',
    title: 'Phase-Change Material (PCM) Micro Cold Room for Smallholders',
    leadUniversity: 'IIT Delhi CRT',
    csrSponsor: 'Mahindra Rural Tech',
    location: 'Satara APMC Market Yard',
    status: 'Field Trial (TRL-7)',
    progress: 75,
    impact: '410 metric tonnes onion saved • 620 farmers',
  },
  {
    id: 'PRJ-2025-02',
    title: 'Solar Micro-Grid for Off-Grid Tribal Hamlets',
    leadUniversity: 'VNIT Nagpur',
    csrSponsor: 'Tata Sustainability Foundation',
    location: 'Melghat, Amravati',
    status: 'Commissioning (TRL-8)',
    progress: 90,
    impact: '400 households electrified • 1,840 villagers',
  },
  {
    id: 'PRJ-2025-03',
    title: 'Gravity Subsurface Drip Irrigation & Soil Moisture Telemetry',
    leadUniversity: 'IIT Bombay CTARA',
    csrSponsor: 'Open for Schedule VII Co-Sponsor',
    location: 'Man Taluka, Satara',
    status: 'Prototype Validation (TRL-6)',
    progress: 55,
    impact: '42% irrigation water conservation',
  },
];

export default function ProjectsPilotsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Briefcase className="w-6 h-6 text-indigo-400" />
          Active Projects & Field Pilots
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Tracking engineered solutions from university labs through live village deployment and CSR sponsorship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PILOT_PROJECTS.map((p) => (
          <div
            key={p.id}
            className="bg-[#0d1424] border border-slate-800 p-5 rounded-2xl shadow-lg space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 font-bold">{p.id}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {p.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">{p.title}</h3>
              <div className="text-xs text-slate-300 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-indigo-300">
                  <GraduationCap className="w-3.5 h-3.5" /> {p.leadUniversity}
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Building2 className="w-3.5 h-3.5" /> {p.csrSponsor}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5" /> {p.location}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Progress</span>
                <span className="text-indigo-400 font-bold">{p.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
              <div className="text-[11px] text-teal-400 font-mono font-medium pt-1">
                {p.impact}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
