'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  FlaskConical,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Lightbulb,
  FileText,
  BarChart2,
  Sparkles,
  Search,
  ChevronRight,
  ShieldCheck,
  Building,
  Target,
  Layers,
  X,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

interface UniversityChallenge {
  id: string;
  title: string;
  location: string;
  departmentMatch: string;
  matchScore: number;
  readinessScore: number;
  studentsInterested: number;
  grantEligible: string;
  deadline: string;
  description: string;
  claimed: boolean;
}

const OPEN_CHALLENGES: UniversityChallenge[] = [
  {
    id: 'CH-2025-084',
    title: 'Solar-Powered Nano-Filtration for High Fluoride Borewell Water',
    location: 'Khandala Village, Satara',
    departmentMatch: 'Environmental & Chemical Engg',
    matchScore: 96,
    readinessScore: 84,
    studentsInterested: 12,
    grantEligible: 'DST / RuTAG Pilot Grant',
    deadline: '15 Nov 2025',
    description: 'Field reports show TDS > 1800ppm and fluoride at 3.4mg/L. Requires low-power membrane filtration unit with gravity assist backwash.',
    claimed: false,
  },
  {
    id: 'CH-2025-099',
    title: 'Low-Cost IoT Acoustic Leak & Flow Sensor for Rural Piped Water',
    location: 'Wai Taluka Canal Belt',
    departmentMatch: 'Electrical & Sensor Systems',
    matchScore: 91,
    readinessScore: 78,
    studentsInterested: 8,
    grantEligible: 'Jal Jeevan Innovation Pool',
    deadline: '28 Nov 2025',
    description: 'Existing underground PVC lines suffer from undetectable friction loss and airlock blocks. Battery-operated LoRaWAN transmitter needed.',
    claimed: false,
  },
  {
    id: 'CH-2025-112',
    title: 'Bio-Enzyme Accelerated Composting for Cotton Crop Residue',
    location: 'Wardha Cotton Belt',
    departmentMatch: 'Biochemical & Agricultural Engg',
    matchScore: 88,
    readinessScore: 72,
    studentsInterested: 15,
    grantEligible: 'ICAR Ag-Tech Fund',
    deadline: '10 Dec 2025',
    description: 'Farmers burn post-harvest cotton stalk causing severe regional smog. Cold-tolerant microbial consortium can reduce breakdown from 90 days to 18 days.',
    claimed: false,
  },
  {
    id: 'CH-2025-067',
    title: 'Smart Fall-Detection & GPS Pendant for Tribal Elderly',
    location: 'Jawhar Hill Taluka, Palghar',
    departmentMatch: 'Biomedical & Embedded Systems',
    matchScore: 82,
    readinessScore: 68,
    studentsInterested: 7,
    grantEligible: 'ICMR Assistive Device Grant',
    deadline: '20 Dec 2025',
    description: 'Isolated hamlets lack cell tower coverage. Mesh-radio panic beacon required that connects to the nearest Auxiliary Nurse Midwife (ANM).',
    claimed: false,
  },
];

interface ActiveProject {
  id: string;
  title: string;
  squadLead: string;
  studentsCount: number;
  currentMilestone: string;
  progress: number;
  csrPartner?: string;
  patentStatus: string;
}

const ACTIVE_PROJECTS: ActiveProject[] = [
  {
    id: 'PRJ-IITD-041',
    title: 'Phase-Change Material (PCM) Micro Cold Room for Smallholders',
    squadLead: 'Rohan Deshmukh (M.Tech Final Year)',
    studentsCount: 6,
    currentMilestone: 'Field Trial in Satara APMC Yard',
    progress: 75,
    csrPartner: 'Mahindra Rural Tech Foundation',
    patentStatus: 'Provisional Patent Filed',
  },
  {
    id: 'PRJ-IITD-029',
    title: 'Briquette Press for Sugarcane Bagasse Biomass Energy',
    squadLead: 'Pooja Iyer (Ph.D. Scholar)',
    studentsCount: 4,
    currentMilestone: 'Thermal Efficiency Validation',
    progress: 90,
    csrPartner: 'Tata Sustainability Council',
    patentStatus: 'Published in Springer Rural Engg',
  },
];

export default function UniversityDashboard() {
  const [challenges, setChallenges] = useState<UniversityChallenge[]>(OPEN_CHALLENGES);
  const [activeProjects, setActiveProjects] = useState<ActiveProject[]>(ACTIVE_PROJECTS);
  const [selectedDomain, setSelectedDomain] = useState('All Departments');
  const [claimModalChallenge, setClaimModalChallenge] = useState<UniversityChallenge | null>(null);
  const [squadName, setSquadName] = useState('');

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimModalChallenge) return;

    // Mark as claimed
    setChallenges((prev) =>
      prev.map((c) => (c.id === claimModalChallenge.id ? { ...c, claimed: true } : c))
    );

    // Add to active projects
    const newProj: ActiveProject = {
      id: `PRJ-IITD-${Math.floor(100 + Math.random() * 900)}`,
      title: claimModalChallenge.title,
      squadLead: squadName || 'Dr. Ananya Sharma (PI) & Student Squad',
      studentsCount: claimModalChallenge.studentsInterested || 6,
      currentMilestone: 'Milestone 1: Needs Analysis & CAD Model',
      progress: 20,
      csrPartner: 'Pending Matching Pool',
      patentStatus: 'Documentation Initiated',
    };

    setActiveProjects([newProj, ...activeProjects]);
    setClaimModalChallenge(null);
    setSquadName('');
    toast.success(
      `Project claimed! Registered under Centre for Rural Technology, IIT Delhi. Notifying Block Nodal Officer.`
    );
  };

  const filteredChallenges = challenges.filter((c) => {
    if (selectedDomain === 'All Departments') return true;
    return c.departmentMatch.toLowerCase().includes(selectedDomain.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ────────────────── BANNER ────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-semibold">
              <GraduationCap className="w-3.5 h-3.5" /> University & Faculty R&D Console
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Dr. Ananya Sharma
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
              Centre for Rural Technology (CRT), IIT Delhi • 4 open civic challenges match your department lab facilities and student research squads.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-indigo-900/60 border border-indigo-700/50 p-3 rounded-2xl text-center">
              <div className="text-2xl font-black text-white font-mono">96%</div>
              <div className="text-[10px] text-indigo-300 font-mono uppercase">Capability Match</div>
            </div>
            <div className="bg-violet-900/60 border border-violet-700/50 p-3 rounded-2xl text-center">
              <div className="text-2xl font-black text-white font-mono">₹45L</div>
              <div className="text-[10px] text-violet-300 font-mono uppercase">Grant Pool Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────── KPI METRICS ────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active R&D Projects</span>
            <FlaskConical className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">{activeProjects.length}</div>
          <div className="text-[11px] text-indigo-400 mt-1">2 under field validation</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Student Researchers</span>
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">
            {activeProjects.reduce((s, p) => s + p.studentsCount, 0) + 18}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">UG / M.Tech / Ph.D. scholars</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Matched Civic Challenges</span>
            <Target className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">{challenges.length}</div>
          <div className="text-[11px] text-teal-400 mt-1">Verified by Block Nodal Officers</div>
        </div>

        <div className="bg-[#0d1424] border border-slate-800 p-4.5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>CSR Pilot Readiness</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">TRL-6</div>
          <div className="text-[11px] text-amber-400 mt-1">Ready for corporate co-funding</div>
        </div>
      </div>

      {/* ────────────────── MAIN SECTION: MATCHED CHALLENGES & ACTIVE LAB PROJECTS ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Matched Civic Challenges Engine */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Open Civic Challenges — Matched to IIT Delhi</span>
                  <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                    AI Capability Match
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Claim problems to assign Capstone, M.Tech theses, or faculty grant proposals</p>
              </div>

              {/* Department Dropdown Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option>All Departments</option>
                  <option>Chemical</option>
                  <option>Electrical</option>
                  <option>Biochemical</option>
                  <option>Biomedical</option>
                </select>
              </div>
            </div>

            {/* Matched Challenge Items */}
            <div className="divide-y divide-slate-800/80 mt-2">
              {filteredChallenges.map((ch) => (
                <div
                  key={ch.id}
                  className="py-4.5 first:pt-3 last:pb-1 group hover:bg-slate-900/40 px-2 rounded-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          {ch.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold">
                          {ch.departmentMatch}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {ch.matchScore}% Match
                        </span>
                      </div>

                      <h3 className="text-sm md:text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                        {ch.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {ch.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
                        <span className="text-slate-300">{ch.location}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-indigo-400 font-mono">{ch.grantEligible}</span>
                        <span className="text-slate-600">•</span>
                        <span>Deadline: {ch.deadline}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-violet-300">{ch.studentsInterested} students ready</span>
                      </div>

                      {/* Readiness Progress Bar */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className="text-slate-400">Problem Verification & Evidence Score</span>
                          <span className="text-emerald-400 font-bold">{ch.readinessScore}/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                            style={{ width: `${ch.readinessScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      {ch.claimed ? (
                        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setClaimModalChallenge(ch)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all cursor-pointer shadow-md shadow-indigo-950"
                        >
                          <FlaskConical className="w-3.5 h-3.5" />
                          Claim for R&D
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Active Department Projects & Grants */}
        <div className="space-y-6">
          {/* Active Lab Projects */}
          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Active CRT Projects</h3>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 uppercase">IIT Delhi</span>
            </div>

            <div className="space-y-3.5">
              {activeProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{p.id}</span>
                    <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {p.progress}% Complete
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">{p.title}</h4>

                  <div className="text-[11px] text-slate-300">
                    Lead: <strong>{p.squadLead}</strong> ({p.studentsCount} squad members)
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/60 text-[11px] text-emerald-400 font-mono flex items-center justify-between">
                    <span>{p.currentMilestone}</span>
                  </div>

                  {p.csrPartner && (
                    <div className="text-[11px] text-amber-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Sponsor: {p.csrPartner}
                    </div>
                  )}

                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* R&D to CSR Pathway Info */}
          <div className="bg-gradient-to-br from-slate-900 via-[#0d1424] to-indigo-950/40 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Schedule VII CSR Grant Pathway
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              When a university prototype reaches TRL-5 (field test validated), it automatically appears in the SETU CSR Funding Pool for industrial sponsorship and pilot manufacturing.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Avg. Pilot Grant Size:</span>
                <strong className="text-white">₹12L - ₹25L</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Intellectual Property:</span>
                <strong className="text-emerald-400">Retained by Institute</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>VSO Field Audit:</span>
                <strong className="text-indigo-300">Included</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────── CLAIM CHALLENGE MODAL ────────────────── */}
      {claimModalChallenge && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-750 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setClaimModalChallenge(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <FlaskConical className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Claim Problem for University R&D</h2>
                <p className="text-xs text-slate-400 font-mono">{claimModalChallenge.id}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 mb-4 space-y-1 text-xs">
              <div className="font-bold text-white text-sm">{claimModalChallenge.title}</div>
              <div className="text-slate-400">{claimModalChallenge.location}</div>
              <div className="text-indigo-400 font-mono">
                Department: {claimModalChallenge.departmentMatch} ({claimModalChallenge.matchScore}% Match)
              </div>
            </div>

            <form onSubmit={handleClaimSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Research Squad / Lead Student Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Verma (M.Tech) + Water Lab Squad 3"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs text-indigo-200 leading-relaxed">
                By claiming this challenge, your department commits to deliver an initial needs-assessment & prototype timeline within 45 days.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setClaimModalChallenge(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-950 cursor-pointer"
                >
                  Confirm Claim & Notify Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
