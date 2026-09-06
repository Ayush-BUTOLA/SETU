'use client';

import React, { useState } from 'react';
import {
  Building2,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  FileCheck2,
  Download,
  PieChart,
  Globe,
  Star,
  ChevronRight,
  Sparkles,
  Search,
  X,
  Target,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

interface PilotOpportunity {
  id: string;
  title: string;
  university: string;
  location: string;
  scheduleVII: string;
  totalGrantAsk: string;
  disbursedSoFar: string;
  beneficiariesCount: number;
  readinessLevel: string; // TRL
  vsoAudited: boolean;
  summary: string;
  matchScore: number;
}

const PILOT_OPPORTUNITIES: PilotOpportunity[] = [
  {
    id: 'PLT-2025-019',
    title: 'Decentralized Solar Micro-Grid for Off-Grid Hamlets (400 Households)',
    university: 'VNIT Nagpur — Energy Systems Dept',
    location: 'Melghat Tribal Belt, Amravati',
    scheduleVII: 'Item (iv): Environmental Sustainability & Renewable Energy',
    totalGrantAsk: '₹18,50,000',
    disbursedSoFar: '₹6,00,000 (Pledged)',
    beneficiariesCount: 1840,
    readinessLevel: 'TRL-7 (Field Tested)',
    vsoAudited: true,
    summary: 'Containerized lithium-ferro battery micro-grid with smart prepaid energy metering. Powers 400 huts, primary school computers, and village vaccine refrigerator.',
    matchScore: 98,
  },
  {
    id: 'PLT-2025-024',
    title: 'Gravity-Fed Subsurface Drip Irrigation & Soil Moisture Telemetry',
    university: 'IIT Bombay — CTARA & Civil Engg',
    location: 'Man Taluka Drought Corridor, Satara',
    scheduleVII: 'Item (x): Rural Development & Water Conservation',
    totalGrantAsk: '₹14,20,000',
    disbursedSoFar: '₹0 (Open for Funding)',
    beneficiariesCount: 920,
    readinessLevel: 'TRL-6 (Prototype Validated)',
    vsoAudited: true,
    summary: 'Reduces irrigation water loss by 42% for smallholder pomegranate and onion farmers. Uses locally repairable ceramic emitters.',
    matchScore: 94,
  },
  {
    id: 'PLT-2025-031',
    title: 'Mobile Automated Cervical & Oral Cancer Screening Cart for Rural PHCs',
    university: 'KEM Hospital & IIT Bombay Biomedical Lab',
    location: 'Sindhudurg Coastal Belt, Konkan',
    scheduleVII: 'Item (i): Promoting Healthcare & Preventive Medicine',
    totalGrantAsk: '₹22,00,000',
    disbursedSoFar: '₹11,00,000 (Co-Funded)',
    beneficiariesCount: 4200,
    readinessLevel: 'TRL-7 (Clinical Trials Completed)',
    vsoAudited: true,
    summary: 'AI-assisted colposcope and digital tele-pathology unit operated by trained Accredited Social Health Activists (ASHA).',
    matchScore: 91,
  },
];

interface ActivePortfolioItem {
  id: string;
  project: string;
  institute: string;
  grantApproved: string;
  disbursed: string;
  trancheStatus: string;
  impactMetrics: string;
  vsoReportStatus: string;
}

const ACTIVE_PORTFOLIO: ActivePortfolioItem[] = [
  {
    id: 'CSR-TATA-08',
    project: 'Solar Micro-Cold Storage for Onion Farmers',
    institute: 'IIT Delhi CRT',
    grantApproved: '₹16.0 Lakh',
    disbursed: '₹12.0 Lakh (Tranche 2/3)',
    trancheStatus: 'Milestone 2 Verified by VSO',
    impactMetrics: '410 metric tonnes saved • ₹28L extra farmer income',
    vsoReportStatus: 'Audited & MCA Form CSR-1 Attached',
  },
  {
    id: 'CSR-TATA-04',
    project: 'Arsenic-Safe Piped Drinking Water Plants',
    institute: 'IIT Kharagpur Water Lab',
    grantApproved: '₹28.5 Lakh',
    disbursed: '₹28.5 Lakh (Completed)',
    trancheStatus: 'Pilot Completed & Handed to Panchayat',
    impactMetrics: '6,200 villagers with safe drinking water',
    vsoReportStatus: 'Final Utilization Certificate Cleared',
  },
];

export default function CSRDashboard() {
  const [opportunities, setOpportunities] = useState<PilotOpportunity[]>(PILOT_OPPORTUNITIES);
  const [portfolio, setPortfolio] = useState<ActivePortfolioItem[]>(ACTIVE_PORTFOLIO);
  const [pledgeModalItem, setPledgeModalItem] = useState<PilotOpportunity | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState('');

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeModalItem) return;

    const amount = pledgeAmount || pledgeModalItem.totalGrantAsk;

    // Add to active portfolio
    const newPort: ActivePortfolioItem = {
      id: `CSR-TATA-${Math.floor(10 + Math.random() * 90)}`,
      project: pledgeModalItem.title,
      institute: pledgeModalItem.university,
      grantApproved: amount,
      disbursed: `₹${(parseInt(amount.replace(/[^0-9]/g, ''), 10) * 0.4 || 500000).toLocaleString('en-IN')} (Tranche 1)`,
      trancheStatus: 'Tranche 1 Disbursed • MOU Executed',
      impactMetrics: `${pledgeModalItem.beneficiariesCount} Estimated Citizens Impacted`,
      vsoReportStatus: 'VSO Monitoring Officer Assigned',
    };

    setPortfolio([newPort, ...portfolio]);
    setPledgeModalItem(null);
    setPledgeAmount('');
    toast.success(`Grant pledge of ${amount} confirmed under Schedule VII! Notified university and Gram Panchayat.`);
  };

  const handleDownloadReport = () => {
    toast.success('Generated MCA Schedule VII CSR Impact Certificate (FY 2024-25) with VSO digital signatures.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ────────────────── CSR HERO BANNER ────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold">
              <Building2 className="w-3.5 h-3.5" /> Corporate CSR & Industry Partner Desk
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Vikramaditya Singhania
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
              Tata Sustainability Foundation / Schedule VII Council • Discover audited, field-proven university prototypes ready for industrial pilot funding.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadReport}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-900/40 hover:from-amber-400 hover:to-orange-500 transition-all cursor-pointer flex-shrink-0"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            Download MCA CSR Report
          </button>
        </div>
      </div>

      {/* ────────────────── CSR STATS CARDS ────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Capital Deployed</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">₹1.84 Cr</div>
          <div className="text-[11px] text-amber-400 mt-1 font-mono">100% Schedule VII compliant</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Audited Beneficiaries</span>
            <Users className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">24,800</div>
          <div className="text-[11px] text-teal-400 mt-1">Verified by Village Social Officers</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active Pilot Grants</span>
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">{portfolio.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Across Maharashtra & Vidarbha</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Audit & MCA Compliance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">100%</div>
          <div className="text-[11px] text-emerald-400 mt-1">Independent 3rd party audited</div>
        </div>
      </div>

      {/* ────────────────── MAIN GRID: READY PILOTS & MY PORTFOLIO ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High-Readiness Pilots Open for Funding */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>High-Readiness Pilots for CSR Co-Funding</span>
                  <span className="text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    TRL 6-7 Verified
                  </span>
                </h2>
                <p className="text-xs text-slate-400">All opportunities are backed by university lab results and signed Panchayat MOUs</p>
              </div>
            </div>

            {/* Pilot Cards */}
            <div className="divide-y divide-slate-800/80 mt-2">
              {opportunities.map((plt) => (
                <div
                  key={plt.id}
                  className="py-4.5 first:pt-3 last:pb-1 group hover:bg-slate-900/40 px-2 rounded-xl transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">{plt.id}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {plt.readinessLevel}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {plt.matchScore}% Match
                        </span>
                        {plt.vsoAudited && (
                          <span className="text-[11px] font-mono text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-teal-500/20">
                            <ShieldCheck className="w-3 h-3 text-teal-400" /> VSO Audited
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm md:text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {plt.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {plt.summary}
                      </p>

                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                        <div className="text-amber-300 font-mono text-[11px]">
                          <strong>Schedule VII Eligibility:</strong> {plt.scheduleVII}
                        </div>
                        <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                          <span>Lead Institute: <strong className="text-white">{plt.university}</strong></span>
                          <span>Location: <strong className="text-slate-300">{plt.location}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">Total Pilot Ask: <strong className="text-white font-mono text-sm">{plt.totalGrantAsk}</strong></span>
                          <span className="text-slate-500">|</span>
                          <span className="text-emerald-400 font-semibold">{plt.beneficiariesCount} Beneficiaries</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setPledgeModalItem(plt)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-orange-500 transition-all cursor-pointer shadow-md shadow-amber-950"
                        >
                          <Target className="w-3.5 h-3.5" />
                          Pledge Pilot Grant
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Active CSR Portfolio & Compliance Checklist */}
        <div className="space-y-6">
          {/* Active Portfolio */}
          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Active CSR Grants</h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase">Tata Council</span>
            </div>

            <div className="space-y-3.5">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{item.id}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.grantApproved}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">{item.project}</h4>

                  <div className="text-[11px] text-slate-300">
                    Institute: <strong>{item.institute}</strong>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/60 text-[11px] text-amber-300 font-mono">
                    {item.trancheStatus}
                  </div>

                  <div className="text-[11px] text-teal-400 font-medium">
                    {item.impactMetrics}
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <FileCheck2 className="w-3 h-3 text-emerald-400" /> {item.vsoReportStatus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule VII Compliance Box */}
          <div className="bg-gradient-to-br from-slate-900 via-[#0d1424] to-amber-950/40 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              MCA Schedule VII Guarantee
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              All SETU project agreements include mandatory Village Social Officer (VSO) audits, utilization certificates, and geotagged impact evidence for direct insertion into your annual board report.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-slate-300">
                <span>Form CSR-1 Verified:</span>
                <strong className="text-emerald-400">Yes</strong>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-slate-300">
                <span>Direct Beneficiary Audit:</span>
                <strong className="text-emerald-400">100% Geotagged</strong>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-slate-300">
                <span>Statutory Tax Exemption:</span>
                <strong className="text-amber-300">80G Certified</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────── PLEDGE GRANT MODAL ────────────────── */}
      {pledgeModalItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-750 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setPledgeModalItem(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Target className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Pledge CSR Pilot Grant</h2>
                <p className="text-xs text-slate-400 font-mono">{pledgeModalItem.id}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 mb-4 space-y-1.5 text-xs">
              <div className="font-bold text-white text-sm">{pledgeModalItem.title}</div>
              <div className="text-slate-400">{pledgeModalItem.university} • {pledgeModalItem.location}</div>
              <div className="text-amber-400 font-mono font-semibold">
                Asking Grant: {pledgeModalItem.totalGrantAsk} ({pledgeModalItem.beneficiariesCount} Beneficiaries)
              </div>
            </div>

            <form onSubmit={handlePledgeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Grant Commitment Amount
                </label>
                <input
                  type="text"
                  placeholder={pledgeModalItem.totalGrantAsk}
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl text-xs text-amber-200 leading-relaxed">
                By pledging, a tri-partite MOU draft will be sent to your legal desk with university lead investigator and District Collector office.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPledgeModalItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-950 cursor-pointer"
                >
                  Confirm CSR Grant Pledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
