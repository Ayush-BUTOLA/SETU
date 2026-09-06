'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, Briefcase, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EcosystemRole {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  headline: string;
  tagline: string;
  points: string[];
  actionLabel: string;
  actionRole: 'Citizen / Community' | 'University / Faculty' | 'CSR / Industry Partner' | 'Govt / Nodal Officer';
}

const ROLES: EcosystemRole[] = [
  {
    id: 'citizens',
    label: 'Citizens & Communities',
    badge: 'BRING THE PROBLEM',
    icon: Users,
    headline: 'Local voices start the loop.',
    tagline: 'You experience the problem every day. SETU gives your observations a direct bridge to the people and labs equipped to fix them.',
    points: [
      'Report what is actually happening in your village or ward',
      'Upload real-time geotagged photos, videos, and field context',
      'Track the live status of your challenge through every R&D milestone',
      'Confirm directly whether the deployed pilot resolved the issue on the ground',
    ],
    actionLabel: 'Share a Local Challenge',
    actionRole: 'Citizen / Community',
  },
  {
    id: 'universities',
    label: 'Universities & Labs',
    badge: 'BRING KNOWLEDGE & TALENT',
    icon: GraduationCap,
    headline: 'Research anchored in real need.',
    tagline: 'Connect faculty expertise and student talent with validated societal challenges that demand engineering and scientific innovation.',
    points: [
      'Review verified real-world challenges matched to department laboratory capabilities',
      'Form multidisciplinary student teams guided by experienced faculty mentors',
      'Access Solution Copilot tools to draft kickoff briefs, patents, and testing plans',
      'Deploy working prototypes into live community testbeds and publish accredited impact',
    ],
    actionLabel: 'Register University Lab',
    actionRole: 'University / Faculty',
  },
  {
    id: 'industry',
    label: 'Industry & CSR Partners',
    badge: 'BRING EXECUTION CAPACITY',
    icon: Briefcase,
    headline: 'Direct capital to verified outcomes.',
    tagline: 'Fulfill Schedule VII mandates with transparent, audit-grade accountability from grant disbursement to verified field pilot.',
    points: [
      'Sponsor vetted university prototypes ready for real-world pilot execution',
      'Provide corporate engineering mentorship, tooling, and industrial testing facilities',
      'Enable modular manufacturing and regional distribution networks',
      'Receive verifiable VSO certifications and audit trails for CSR reporting',
    ],
    actionLabel: 'Partner as CSR Sponsor',
    actionRole: 'CSR / Industry Partner',
  },
  {
    id: 'government',
    label: 'Government & Nodal Teams',
    badge: 'BRING GOVERNANCE & SCALE',
    icon: Landmark,
    headline: 'Oversight across districts and domains.',
    tagline: 'Govern problem prioritization, resolve regional duplicates, unlock statutory clearances, and monitor verified outcomes statewide.',
    points: [
      'Validate, prioritize, and route community submissions across district jurisdictions',
      'Monitor real-time innovation pipeline velocity and detect stalled projects',
      'Audit multi-party evidence before issuing official Verified Societal Outcome seals',
      'Use evidence-rich solution repositories to inform long-term public policy',
    ],
    actionLabel: 'Enter Nodal Console',
    actionRole: 'Govt / Nodal Officer',
  },
];

interface EcosystemTabsProps {
  onSelectRole: (role: 'Citizen / Community' | 'University / Faculty' | 'CSR / Industry Partner' | 'Govt / Nodal Officer') => void;
}

export function EcosystemTabs({ onSelectRole }: EcosystemTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('citizens');
  const role = ROLES.find((r) => r.id === activeTab) || ROLES[0];
  const Icon = role.icon;

  return (
    <div className="mt-12">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-[#d9ddd5] pb-4">
        {ROLES.map((r) => {
          const TabIcon = r.icon;
          const isActive = activeTab === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setActiveTab(r.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#101312] text-white font-bold shadow-md'
                  : 'bg-white hover:bg-black/5 text-[#59615c] border border-[#d9ddd5]'
              }`}
            >
              <TabIcon className="size-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={role.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-8 p-8 sm:p-10 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#267f68] font-semibold">
              {role.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#101312]">
              {role.headline}
            </h3>
            <p className="text-sm sm:text-base text-[#59615c] leading-relaxed max-w-xl">
              {role.tagline}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onSelectRole(role.actionRole)}
                className="inline-flex items-center gap-2 bg-[#101312] hover:bg-[#267f68] text-white font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md cursor-pointer"
              >
                <span>{role.actionLabel}</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#f5f6f1] p-6 rounded-2xl border border-[#d9ddd5] space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6f7772] font-semibold mb-2">
              Your Role in the Closed Loop:
            </div>
            {role.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#101312] leading-snug">
                <CheckCircle2 className="size-4 text-[#267f68] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EcosystemTabs;
