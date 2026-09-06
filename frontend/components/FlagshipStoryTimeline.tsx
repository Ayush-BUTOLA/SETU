'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, FileCheck, Shield, Award, Building2, MapPin } from 'lucide-react';

interface StoryStep {
  id: string;
  stage: string;
  title: string;
  actor: string;
  desc: string;
  evidence: string;
  badge: string;
  image: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    id: 'step-1',
    stage: '01 / INTAKE',
    title: 'The Citizen Surfaces the Problem',
    actor: 'Panchayat Citizen // West Singhbhum',
    desc: 'Local village council member logs turbid water and metallic taste across three community handpumps. Uploads geo-tagged photos and local water sample test strips.',
    evidence: 'GPS: 22.58°N, 85.81°E • 3 photo attachments • 4,200 villagers affected',
    badge: 'STAGE 1 // PROBLEM VERIFIED',
    image: '/assets/water.jpg',
  },
  {
    id: 'step-2',
    stage: '02 / STRUCTURING',
    title: 'AI Structuring & District Validation',
    actor: 'District Moderator Desk',
    desc: 'SETU normalizes Hindi dialect intake, assesses high iron/arsenic toxicity risk, and confirms 91% semantic clustering with adjacent ward reports. Moderator validates for R&D routing.',
    evidence: 'Toxicity Risk: Level 4 • Cluster: #SETU-1042 • Moderator Signature: Verified',
    badge: 'STAGE 2 // CHALLENGE STRUCTURED',
    image: '/assets/setu-hero.avif',
  },
  {
    id: 'step-3',
    stage: '03 / MATCHING',
    title: 'Capability Match to IIT (ISM) Dhanbad',
    actor: 'University Innovation Hub',
    desc: 'Weighted ranking identifies IIT (ISM) Dhanbad (92% fit) based on active patent for zero-chemical catalytic adsorption and physical deployment proximity (140km).',
    evidence: 'Lab Equipment: ICP-MS Spectrometer • 2 Faculty Mentors • 5 M.Tech Researchers',
    badge: 'STAGE 3 // ACADEMIC OWNERSHIP',
    image: '/assets/community-street.jpg',
  },
  {
    id: 'step-4',
    stage: '04 / CSR ENABLEMENT',
    title: 'Industry CSR Funds Pilot Deployment',
    actor: 'CSR Partner // Schedule VII Grant',
    desc: 'National infrastructure CSR partner commits ₹18.5 Lakhs under rural drinking water mandate to fabricate 5 community-scale modular bio-sand/catalytic filtration kiosks.',
    evidence: 'Grant ID: CSR-2026-W04 • 5 Kiosks Fabricated • NABL Lab Calibration Passed',
    badge: 'STAGE 4 // PILOT VERIFIED',
    image: '/assets/community.jpg',
  },
  {
    id: 'step-5',
    stage: '05 / OUTCOME VERIFIED',
    title: 'Triangle of Trust Certifies VSO +1',
    actor: 'Multi-Party Audit Council',
    desc: 'Turbidity drops from 14 NTU to 0.8 NTU; iron drops below 0.3 mg/L. Community panchayat signs receipt, and state nodal officer issues digital VSO certificate.',
    evidence: 'Beneficiaries: 4,200 • Water Standards: IS 10500 Compliant • Reusable Knowledge Cataloged',
    badge: 'STAGE 5 // VSO CERTIFIED',
    image: '/assets/fields.jpg',
  },
];

export function FlagshipStoryTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STORY_STEPS[activeStep];

  return (
    <div className="bg-[#090b0b] text-[#f5f6f1] rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#9de7cf]">
            FLAGSHIP CASE STUDY // GROUND TO IMPACT
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            West Singhbhum Water Contamination
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-white/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <MapPin className="size-3.5 text-[#9de7cf]" />
          <span>Jharkhand, India</span>
        </div>
      </div>

      {/* Step Navigation Pill Track */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-4 scrollbar-none">
        {STORY_STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(idx)}
            className={`shrink-0 px-4 py-2 rounded-xl font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeStep === idx
                ? 'bg-[#9de7cf] text-[#090b0b] font-bold shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
            }`}
          >
            <span>{s.stage.split(' // ')[0]}</span>
            {activeStep > idx && <CheckCircle2 className="size-3 text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* Dynamic Content Panel */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Narrative Column */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9de7cf] px-3 py-1 rounded-full bg-[#9de7cf]/10 border border-[#9de7cf]/20">
                <span>{step.badge}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                {step.title}
              </h4>

              <div className="flex items-center gap-2 font-mono text-xs text-white/50">
                <Building2 className="size-3.5 text-[#9de7cf]" />
                <span>Actor: {step.actor}</span>
              </div>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                {step.desc}
              </p>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                  Documented Evidence Signals:
                </span>
                <p className="font-mono text-xs text-[#9de7cf]">{step.evidence}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stepper controls */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-lg border border-white/20 text-xs font-mono uppercase tracking-wider text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer"
            >
              ← Previous Phase
            </button>
            <button
              onClick={() => setActiveStep((prev) => Math.min(STORY_STEPS.length - 1, prev + 1))}
              disabled={activeStep === STORY_STEPS.length - 1}
              className="px-5 py-2 rounded-lg bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold text-xs font-mono uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Next Phase</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Right Photo Column */}
        <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover object-center filter contrast-105 saturate-90"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-4 right-4 text-[11px] font-mono text-white/80 flex items-center justify-between">
                <span>VERIFIED FIELD TELEMETRY</span>
                <span className="text-[#9de7cf]">PHOTO LOG</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* End-card banner */}
      <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
        <span className="font-serif italic text-sm text-white/90">
          &ldquo;The problem started with a lived experience. The loop ends with evidence of change.&rdquo;
        </span>
        <span className="text-[#9de7cf] font-bold">VSO #084 ARCHIVED FOR NATIONAL REUSE →</span>
      </div>
    </div>
  );
}

export default FlagshipStoryTimeline;
