'use client';

import React from 'react';
import { Building2, Award, DollarSign, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';

const INDUSTRY_PARTNERS = [
  {
    name: 'Tata Sustainability Foundation',
    mandate: 'Schedule VII Item (iv) — Water, Environment & Clean Energy',
    deployedCapital: '₹1.84 Cr',
    pilotsFunded: 6,
    activeRegions: 'Satara, Amravati, Vidarbha, Konkan',
  },
  {
    name: 'Mahindra Rural Tech Initiative',
    mandate: 'Schedule VII Item (x) — Post-Harvest Agri-Mechanization',
    deployedCapital: '₹95.0 Lakh',
    pilotsFunded: 4,
    activeRegions: 'Nashik, Pune Rural, Marathwada',
  },
  {
    name: 'Infosys Science & Development Foundation',
    mandate: 'Schedule VII Item (ii) — Digital Rural Classroom & STEM Hubs',
    deployedCapital: '₹1.20 Cr',
    pilotsFunded: 5,
    activeRegions: 'Palghar, Gadchiroli, Nandurbar',
  },
];

export default function IndustryCSRPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Building2 className="w-6 h-6 text-amber-400" />
          Industry & CSR Partners Directory
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Corporate donors and foundations deploying Schedule VII capital into audited, field-proven university prototypes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INDUSTRY_PARTNERS.map((p, i) => (
          <div
            key={i}
            className="bg-[#0d1424] border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-lg space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white leading-tight">{p.name}</h3>
              <p className="text-xs text-amber-300 font-mono">{p.mandate}</p>
              <div className="text-xs text-slate-400 pt-1">
                Active Districts: <span className="text-slate-300">{p.activeRegions}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">{p.deployedCapital} Deployed</span>
              <span className="text-slate-400">{p.pilotsFunded} Pilots Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
