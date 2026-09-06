'use client';

import React, { useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  MapPin,
  ThumbsUp,
  Eye,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

const ALL_CHALLENGES = [
  {
    id: 'CH-2025-084',
    title: 'Fluoride and Saline Contamination in Deep Borewell #4',
    category: 'Water & Sanitation',
    location: 'Khandala Village, Satara',
    state: 'Maharashtra',
    households: 340,
    status: 'In R&D',
    claimedBy: 'IIT Delhi CRT',
    votes: 218,
    views: 890,
    daysAgo: '3 days ago',
  },
  {
    id: 'CH-2025-091',
    title: 'Unmetalled 3.2km Village Access Road Impassable in Monsoon',
    category: 'Roads & Infrastructure',
    location: 'Bawada Wadi, Phaltan',
    state: 'Maharashtra',
    households: 180,
    status: 'Field Verified',
    claimedBy: 'Open for Claim',
    votes: 142,
    views: 450,
    daysAgo: '1 week ago',
  },
  {
    id: 'CH-2025-104',
    title: 'Irregular 3-Phase Power Cuts Damaging Irrigation Pumps',
    category: 'Energy & Power',
    location: 'Dhom Canal Zone, Wai',
    state: 'Maharashtra',
    households: 520,
    status: 'Under Review',
    claimedBy: 'Open for Claim',
    votes: 96,
    views: 310,
    daysAgo: 'Yesterday',
  },
  {
    id: 'CH-2025-119',
    title: 'Post-Harvest Citrus Rot Due to Lack of Pre-Cooling Chambers',
    category: 'Agriculture',
    location: 'Katol Orange Belt, Nagpur',
    state: 'Maharashtra',
    households: 750,
    status: 'In R&D',
    claimedBy: 'VNIT Nagpur',
    votes: 312,
    views: 1100,
    daysAgo: '4 days ago',
  },
  {
    id: 'CH-2025-132',
    title: 'Lack of Cold-Chain Vaccine Transport for Primary Health Sub-Centres',
    category: 'Healthcare',
    location: 'Toranmal Tribal Block, Nandurbar',
    state: 'Maharashtra',
    households: 410,
    status: 'Field Verified',
    claimedBy: 'Open for Claim',
    votes: 284,
    views: 920,
    daysAgo: '2 weeks ago',
  },
];

const CATEGORIES = [
  'All Sectors',
  'Water & Sanitation',
  'Roads & Infrastructure',
  'Energy & Power',
  'Agriculture',
  'Healthcare',
];

export default function ExploreChallengesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [challengeList, setChallengeList] = useState(ALL_CHALLENGES);

  const handleUpvote = (id: string) => {
    setChallengeList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );
    toast.success('Your vote has been recorded for this challenge!');
  };

  const filtered = challengeList.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Sectors' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-emerald-400" />
            Discover National Civic Challenges
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Geotagged local problems verified by Block Nodal Officers, awaiting university R&D and CSR pilots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Showing <strong className="text-emerald-400">{filtered.length}</strong> verified problems
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#0d1424] border border-slate-800 p-3 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keywords, village, or challenge ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-750 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ch) => (
          <div
            key={ch.id}
            className="bg-[#0d1424] border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-lg transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400 font-bold">{ch.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {ch.category}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  ch.status === 'In R&D'
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : ch.status === 'Field Verified'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {ch.status}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">{ch.title}</h3>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {ch.location}, {ch.state}
              </span>
              <span>•</span>
              <span>{ch.households} Households</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Claimed By:</span>
              <strong className="text-indigo-300 font-mono">{ch.claimedBy}</strong>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleUpvote(ch.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-750 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-mono transition-all cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{ch.votes}</span>
              </button>

              <span className="text-[11px] text-slate-500 font-mono">{ch.daysAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
