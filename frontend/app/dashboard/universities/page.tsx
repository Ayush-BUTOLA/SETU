'use client';

import React from 'react';
import { GraduationCap, MapPin, Award, Users, BookOpen, ExternalLink } from 'lucide-react';

const UNIVERSITIES = [
  {
    name: 'Indian Institute of Technology Delhi (IIT Delhi)',
    department: 'Centre for Rural Technology & Dept of Chemical Engg',
    location: 'Hauz Khas, New Delhi',
    activeSquads: 8,
    claimedChallenges: 14,
    specialization: 'Water filtration, cold-chain engineering, decentralized biomass energy',
  },
  {
    name: 'Visvesvaraya National Institute of Technology (VNIT)',
    department: 'Dept of Energy Science & Electrical Engineering',
    location: 'Nagpur, Maharashtra',
    activeSquads: 6,
    claimedChallenges: 11,
    specialization: 'Solar micro-grids, rural tele-metering, agricultural farm automation',
  },
  {
    name: 'Indian Institute of Technology Bombay (IIT Bombay)',
    department: 'Centre for Technology Alternatives for Rural Areas (CTARA)',
    location: 'Powai, Mumbai, Maharashtra',
    activeSquads: 10,
    claimedChallenges: 19,
    specialization: 'Watershed modelling, agro-processing machines, assistive healthcare tools',
  },
  {
    name: 'College of Engineering Pune (COEP Technological University)',
    department: 'Dept of Civil & Environmental Engineering',
    location: 'Shivajinagar, Pune, Maharashtra',
    activeSquads: 5,
    claimedChallenges: 9,
    specialization: 'Low-cost rural road stabilization, rural sanitation structures',
  },
];

export default function UniversitiesDirectoryPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-indigo-400" />
          Partner Universities & Research Labs
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Accredited higher education institutes delivering capstone and R&D solutions for verified civic needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UNIVERSITIES.map((u, i) => (
          <div
            key={i}
            className="bg-[#0d1424] border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-lg space-y-3 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white leading-tight">{u.name}</h3>
                <p className="text-xs text-indigo-400 font-medium">{u.department}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {u.location}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              <strong className="text-slate-400">Key Focus:</strong> {u.specialization}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
              <span className="text-emerald-400">{u.claimedChallenges} Civic Solutions Designed</span>
              <span className="text-slate-400">{u.activeSquads} Student Squads Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
