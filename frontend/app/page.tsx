'use client';

import React, { useState } from 'react';
import StaggeredMenu, { MenuItem, SocialItem } from '@/components/StaggeredMenu';
import SlideNavbarAuth, { UserRole } from '@/components/SlideNavbarAuth';
import HeroSlideshow from '@/components/HeroSlideshow';
import EcosystemTabs from '@/components/EcosystemTabs';
import AiDecisionCard from '@/components/AiDecisionCard';
import FlagshipStoryTimeline from '@/components/FlagshipStoryTimeline';
import FaqAccordion from '@/components/FaqAccordion';
import { KpiCounters } from '@/components/KpiCounters';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Building2,
  Users2,
  FileCheck2,
  Layers,
  Database,
  Award,
  BookOpen,
  TrendingUp,
  Share2,
  Lock,
  Globe,
  Radio,
  Check,
} from 'lucide-react';

const menuItems: MenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#top' },
  { label: 'The Problem', ariaLabel: 'See the gap SETU addresses', link: '#problem' },
  { label: 'The Loop', ariaLabel: 'Explore the 9-stage closed loop', link: '#the-loop' },
  { label: 'How It Works', ariaLabel: 'Learn how SETU pipeline works', link: '#how-it-works' },
  { label: 'Ecosystem', ariaLabel: 'See who participates in SETU', link: '#ecosystem' },
  { label: 'Human AI', ariaLabel: 'Explore human-governed AI', link: '#ai-governance' },
  { label: 'Verification', ariaLabel: 'Explore Triangle of Trust and VSO badges', link: '#verification' },
  { label: 'Flagship Story', ariaLabel: 'Read the West Singhbhum case study', link: '#flagship-story' },
  { label: 'Reusable Repo', ariaLabel: 'Explore solution repository', link: '#reuse' },
  { label: 'Impact', ariaLabel: 'See SETU impact metrics', link: '#impact' },
  { label: 'Why SETU', ariaLabel: 'Explore why SETU is different', link: '#why-setu' },
  { label: 'FAQ', ariaLabel: 'Read frequently asked questions', link: '#faq' },
];

const socialItems: SocialItem[] = [
  { label: 'Citizen Portal', link: '#ecosystem' },
  { label: 'University Hub', link: '#ecosystem' },
  { label: 'CSR Partner Console', link: '#ecosystem' },
  { label: 'Govt Oversight', link: '#ecosystem' },
];

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [initialRole, setInitialRole] = useState<UserRole>('Citizen / Community');

  const openAuth = (role?: UserRole) => {
    if (role) setInitialRole(role);
    setAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f6f1] text-[#101312] selection:bg-[#9de7cf] selection:text-[#090b0b]">
      {/* GSAP Staggered Menu Navigation */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        displayLogo={false}
        menuButtonColor="#f5f6f1"
        openMenuButtonColor="#f5f6f1"
        changeMenuColorOnOpen={true}
        colors={['#09130f', '#132820', '#267f68']}
        logoUrl="/assets/setu-mark.svg"
        accentColor="#9de7cf"
        isFixed={true}
      />

      {/* Floating Sticky Site Header (Single Crisp Logo & Clean Actions) */}
      <header className="fixed top-0 left-0 right-0 h-[76px] z-30 flex items-center justify-between px-6 sm:px-12 pointer-events-none">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-bold tracking-wider text-sm text-white pointer-events-auto drop-shadow-md hover:opacity-90 transition-opacity"
          aria-label="SETU home"
        >
          <span className="w-8 h-8 rounded-full bg-white text-black font-serif flex items-center justify-center text-base font-normal shadow-sm">
            S
          </span>
          <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
        </a>

        {/* Auth CTA Trigger */}
        <div className="flex items-center gap-3 pointer-events-auto mr-24 sm:mr-28">
          <button
            onClick={() => openAuth('Citizen / Community')}
            className="flex items-center gap-2 bg-white text-[#101312] hover:bg-[#9de7cf] transition-all px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </header>

      <main id="top">
        {/* =========================================================================
            SECTION 01: HERO (Storytelling Documentary)
            ========================================================================= */}
        <section className="relative min-h-[100svh] flex flex-col justify-between pt-36 pb-12 px-6 sm:px-12 text-white overflow-hidden">
          <HeroSlideshow />

          <div className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center">
            {/* Live Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-[0.14em] text-white/90 mb-8">
              <span className="inline-block w-2 h-2 rounded-full bg-[#51cb9e] shadow-[0_0_0_4px_rgba(81,203,158,0.3)]" />
              <span>A closed loop for real-world change</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.98] text-white drop-shadow-md">
              Where people feel the problem,
              <br />
              <em className="font-serif italic font-normal text-[#b9f2df] tracking-tight">
                change should begin.
              </em>
            </h1>

            {/* Lede */}
            <p className="mt-7 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-white/85 font-light leading-relaxed">
              From a village water point to a crowded city street, SETU connects lived
              experiences with the people, knowledge, and resources needed to create lasting solutions.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#problem"
                className="inline-flex items-center gap-2 bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold px-6 sm:px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Discover How SETU Works</span>
                <ArrowUpRight className="size-4" />
              </a>
              <button
                onClick={() => openAuth('Citizen / Community')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white font-medium px-6 sm:px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Share a Challenge</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono tracking-[0.16em] uppercase text-white/70 border-t border-white/15 pt-5">
            <span className="text-[#9de7cf] font-semibold">LISTEN FIRST</span>
            <span>LOCAL VOICES START THE LOOP</span>
            <span className="hidden md:inline">SIH 2026 ARCHITECTURE</span>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: THE PROBLEM (The Gap Between Problem and Solution)
            ========================================================================= */}
        <section id="problem" className="py-24 sm:py-32 section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="eyebrow text-[#6f7772] mb-4">THE GAP BETWEEN A PROBLEM AND A SOLUTION</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Great problems deserve
                <br />
                <em className="serif-em text-[#267f68]">more than complaints.</em>
              </h2>
            </div>

            <div className="space-y-6 text-[#59615c] text-base sm:text-lg leading-relaxed">
              <p>
                Across communities, people experience problems every day — unsafe water, difficult public services,
                infrastructure gaps, livelihood challenges, accessibility barriers, and healthcare bottlenecks. The
                problem is often not a lack of ideas. It is the missing bridge between the person who sees the problem
                and the people who can solve it.
              </p>

              {/* The Broken Path Comparison Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#d9ddd5] shadow-sm space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-[#101312] font-bold">
                  Today, the journey breaks in the middle:
                </div>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider p-3 rounded-xl bg-[#f5f6f1] border border-[#d9ddd5]">
                  <span className="text-[#101312] font-semibold">Problem reported</span>
                  <span className="text-zinc-400 font-bold">→</span>
                  <span className="text-[#a16d67] flex items-center gap-1.5 font-bold">
                    Buried &amp; Lost
                    <span className="w-5 h-5 rounded-full border border-[#d7aaa4] inline-flex items-center justify-center text-[10px]">
                      ✕
                    </span>
                  </span>
                </div>
                <ul className="text-xs sm:text-sm text-[#89918c] space-y-1.5 list-disc list-inside">
                  <li>The right university or technical laboratory never sees the challenge.</li>
                  <li>Prototypes are engineered without a pathway to an active real-world pilot.</li>
                  <li>Successful solutions never reach the next community facing the same challenge.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* The Missing Connection Track */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-b border-[#d9ddd5] py-8">
            <p className="eyebrow text-[#89918c] mb-6">THE MISSING CONNECTION</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white border border-[#d9ddd5]">
                <strong className="block text-[#101312] mb-1">Problem</strong>
                <span className="text-[#6f7772]">Community knows what hurts.</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#d9ddd5]">
                <strong className="block text-[#101312] mb-1">Capability</strong>
                <span className="text-[#6f7772]">University knows how to investigate.</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#d9ddd5]">
                <strong className="block text-[#101312] mb-1">Execution</strong>
                <span className="text-[#6f7772]">Faculty &amp; students build solution.</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#d9ddd5]">
                <strong className="block text-[#101312] mb-1">Enablement</strong>
                <span className="text-[#6f7772]">CSR provides funding &amp; testing.</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#d9ddd5]">
                <strong className="block text-[#101312] mb-1">Verification</strong>
                <span className="text-[#6f7772]">Evidence proves real impact.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#dff7ee] border border-[#9de7cf]">
                <strong className="block text-[#18372e] mb-1">Reuse</strong>
                <span className="text-[#267f68]">Prior work helps next community.</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: THE SETU LOOP (The 9 Stages of Closed-Loop Change)
            ========================================================================= */}
        <section id="the-loop" className="py-24 sm:py-32 bg-[#090b0b] text-[#f5f6f1]">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#9de7cf] mb-4">A CLOSED LOOP FOR REAL-WORLD CHANGE</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
                From a lived problem
                <br />
                <em className="serif-em text-[#9de7cf]">to a verified outcome.</em>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#89918c] leading-relaxed">
                SETU connects the people who experience problems with the people, knowledge, infrastructure, and resources needed to solve them.
              </p>
            </div>

            {/* 9-Stage Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { num: '01', verb: 'LISTEN', desc: 'A citizen or community submits a real challenge with context, location, and evidence.' },
                { num: '02', verb: 'STRUCTURE', desc: 'SETU turns an unstructured report into a clear, actionable, multilingual engineering brief.' },
                { num: '03', verb: 'VALIDATE', desc: 'District moderators review evidence, feasibility, semantic duplicates, and priority.' },
                { num: '04', verb: 'MATCH', desc: 'The challenge is matched to capable university departments, faculty patents, and lab equipment.' },
                { num: '05', verb: 'BUILD', desc: 'Faculty mentors and student teams form multidisciplinary projects to build prototypes.' },
                { num: '06', verb: 'ENABLE', desc: 'Industry and CSR partners provide Schedule VII grants, technical mentorship, and testing.' },
                { num: '07', verb: 'PILOT', desc: 'The solution moves from a lab prototype to an active, real-world field deployment.' },
                { num: '08', verb: 'VERIFY', desc: 'Academic evidence, community confirmation, and institutional audit establish outcome proof.' },
                { num: '09', verb: 'REUSE', desc: 'Successful solutions enter a permissioned repository to accelerate solving similar future challenges.' },
              ].map((stage) => (
                <div
                  key={stage.num}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#9de7cf]/50 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#9de7cf] font-bold tracking-widest">{stage.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white/80 transition-colors">
                      STAGE
                    </span>
                  </div>
                  <h3 className="font-mono text-lg font-bold text-white mb-2 group-hover:text-[#9de7cf] transition-colors">
                    {stage.verb}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#89918c] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: HOW SETU WORKS (One Platform. One Accountable Pipeline.)
            ========================================================================= */}
        <section id="how-it-works" className="py-24 sm:py-32 section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#6f7772] mb-4">ONE PLATFORM. ONE ACCOUNTABLE PIPELINE.</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              A problem should never
              <br />
              <em className="serif-em text-[#267f68]">stop at submission.</em>
            </h2>
            <p className="mt-4 text-base text-[#59615c] leading-relaxed">
              Every validated challenge moves through a visible lifecycle with an owner, next action, evidence, and measurable progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: '01',
                title: 'Share the problem',
                summary: 'Submit a challenge using text, photos, video, location, and supporting context.',
                bullets: ['Simple guided intake', 'Hindi / English ready', 'Evidence-first submission', 'Location & urgency tags'],
              },
              {
                step: '02',
                title: 'Validate the challenge',
                summary: 'Moderators review quality and decide whether the challenge is ready to move forward.',
                bullets: ['Completeness checks', 'Duplicate clustering', 'Priority assistance', 'Human-in-the-loop signoff'],
              },
              {
                step: '03',
                title: 'Find the right capability',
                summary: 'SETU ranks institutions using weighted, explainable capability signals.',
                bullets: ['Domain & faculty expertise', 'Labs & specialized equipment', 'Prior project portfolio', 'Geographic deployment proximity'],
              },
              {
                step: '04',
                title: 'Build the solution',
                summary: 'Accepted challenges become structured, university-led engineering projects.',
                bullets: ['Accredited faculty mentor', 'Multidisciplinary student team', 'Solution kickoff copilot', 'Milestone & prototype tracking'],
              },
              {
                step: '05',
                title: 'Enable the pilot',
                summary: 'Industry and CSR partners help move promising projects toward field deployment.',
                bullets: ['Schedule VII grant funding', 'Industrial mentorship', 'Manufacturing guidance', 'Live community testbed access'],
              },
              {
                step: '06',
                title: 'Prove the outcome',
                summary: 'SETU records evidence against defined baselines before calling a deployment verified.',
                bullets: ['Pre-pilot baseline metrics', 'Post-pilot sensor & lab results', 'Community council confirmation', 'Permanent audit trail'],
              },
            ].map((card) => (
              <div
                key={card.step}
                className="p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="font-mono text-xs text-[#267f68] font-bold tracking-widest">{card.step} // PIPELINE</span>
                  <h3 className="text-xl font-bold mt-3 mb-2.5 text-[#101312]">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#59615c] mb-6 leading-relaxed">{card.summary}</p>
                </div>
                <div className="pt-4 border-t border-[#d9ddd5]/60 space-y-2">
                  {card.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#101312]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#267f68]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: BUILT FOR EVERYONE IN THE LOOP (Interactive Personas)
            ========================================================================= */}
        <section id="ecosystem" className="py-24 sm:py-32 bg-[#eef0e9] border-t border-b border-[#d9ddd5]">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#6f7772] mb-4">BUILT FOR EVERYONE IN THE LOOP</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Four actors.
                <br />
                <em className="serif-em text-[#267f68]">One shared mission.</em>
              </h2>
              <p className="mt-4 text-base text-[#59615c] leading-relaxed">
                SETU unites citizens, university talent, corporate CSR capital, and government administrators in a transparent, governed network.
              </p>
            </div>

            <EcosystemTabs onSelectRole={openAuth} />
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: AI THAT ASSISTS. HUMANS THAT DECIDE.
            ========================================================================= */}
        <section id="ai-governance" className="py-24 sm:py-32 bg-[#090b0b] text-[#f5f6f1]">
          <div className="section-shell">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 space-y-6">
                <p className="eyebrow text-[#9de7cf] mb-2">HUMAN-GOVERNED INTELLIGENCE</p>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
                  AI should reduce noise —
                  <br />
                  <em className="serif-em text-[#9de7cf]">not own the decision.</em>
                </h2>
                <p className="text-sm sm:text-base text-[#89918c] leading-relaxed">
                  SETU uses AI where language diversity, duplicate proliferation, and scale make manual workflows slow. The system recommends; authorized human stakeholders retain the final say.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { label: 'Problem Structuring', desc: 'Extracts domain, severity, affected population, and actionable brief from raw voice or text.' },
                    { label: 'Semantic Deduplication', desc: 'Surfaces similar challenges using dialect, location, and topic vectors.' },
                    { label: 'Capability Matching', desc: 'Ranks universities using a weighted, explainable model of faculty, equipment, and track record.' },
                    { label: 'Solution Copilot', desc: 'Assists student and faculty teams to draft research plans and test protocols.' },
                  ].map((item, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                      <strong className="block text-xs font-mono uppercase text-white mb-1">{item.label}</strong>
                      <span className="text-xs text-[#89918c]">{item.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs text-[#9de7cf]">
                  <strong className="block text-white mb-1">Decision Principle:</strong>
                  Recommendation → Confidence → Evidence Signals → Reasoning Factors → Human Accept/Override → Immutable Audit Log.
                </div>
              </div>

              {/* Interactive AI Decision Card Simulator */}
              <div className="lg:col-span-7">
                <AiDecisionCard />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07: TRUST & VERIFICATION (The Triangle of Trust & VSO Badges)
            ========================================================================= */}
        <section id="verification" className="py-24 sm:py-32 section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#6f7772] mb-4">PROVE IT. DON&apos;T JUST CLAIM IT.</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Impact is only meaningful
              <br />
              <em className="serif-em text-[#267f68]">when it can be checked.</em>
            </h2>
            <p className="mt-4 text-base text-[#59615c] leading-relaxed">
              We don&apos;t measure how many problems were submitted. We measure how many were moved toward meaningful, verified change.
            </p>
          </div>

          {/* The Triangle of Trust 3 Pillars */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5] inline-flex items-center justify-center text-[#267f68] mb-6">
                  <FileCheck2 className="size-5" />
                </span>
                <h3 className="text-xl font-bold text-[#101312] mb-3">Academic Evidence</h3>
                <p className="text-xs sm:text-sm text-[#59615c] leading-relaxed">
                  Baseline measurements, post-pilot test results, lab telemetry, and technical deployment reports prepared by university faculty.
                </p>
              </div>
              <span className="mt-6 font-mono text-[11px] uppercase tracking-wider text-[#267f68] font-semibold">
                PILLAR 01 // TECHNICAL RIGOR
              </span>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5] inline-flex items-center justify-center text-[#267f68] mb-6">
                  <Users2 className="size-5" />
                </span>
                <h3 className="text-xl font-bold text-[#101312] mb-3">Community Confirmation</h3>
                <p className="text-xs sm:text-sm text-[#59615c] leading-relaxed">
                  Direct confirmation from the affected village panchayat, hospital staff, or local community representatives that the solution is active.
                </p>
              </div>
              <span className="mt-6 font-mono text-[11px] uppercase tracking-wider text-[#267f68] font-semibold">
                PILLAR 02 // LIVED REALITY
              </span>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5] inline-flex items-center justify-center text-[#267f68] mb-6">
                  <ShieldCheck className="size-5" />
                </span>
                <h3 className="text-xl font-bold text-[#101312] mb-3">Institutional Audit</h3>
                <p className="text-xs sm:text-sm text-[#59615c] leading-relaxed">
                  Independent review and sign-off by authorized government nodal officers or accredited domain auditors validating statutory compliance.
                </p>
              </div>
              <span className="mt-6 font-mono text-[11px] uppercase tracking-wider text-[#267f68] font-semibold">
                PILLAR 03 // STATUTORY AUDIT
              </span>
            </div>
          </div>

          {/* VSO Badge Tiers */}
          <div className="mt-16 p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-[#6f7772] font-semibold block mb-4">
              VSO VERIFICATION BADGE TIERS // &ldquo;NO VSO WITHOUT EVIDENCE&rdquo;
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <strong className="font-mono text-xs uppercase text-[#101312]">Pilot Verified</strong>
                </div>
                <p className="text-xs text-[#59615c] leading-relaxed">
                  The solution has completed prototype benchmarks and is actively operating in a real community or clinical field environment.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <strong className="font-mono text-xs uppercase text-[#101312]">Outcome Verified</strong>
                </div>
                <p className="text-xs text-[#59615c] leading-relaxed">
                  Statistically significant improvement demonstrated against pre-pilot baseline KPIs (e.g. 92% turbidity drop or 65% wait time reduction).
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500" />
                  <strong className="font-mono text-xs uppercase text-[#101312]">Impact Verified</strong>
                </div>
                <p className="text-xs text-[#59615c] leading-relaxed">
                  Longitudinal audit confirming sustained, uninterrupted operation and community benefit after 6+ months of live deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 08: FLAGSHIP STORY (West Singhbhum Case Study)
            ========================================================================= */}
        <section id="flagship-story" className="py-24 sm:py-32 section-shell">
          <FlagshipStoryTimeline />
        </section>

        {/* =========================================================================
            SECTION 09: REUSABLE INNOVATION REPOSITORY (Solve Once. Learn Everywhere.)
            ========================================================================= */}
        <section id="reuse" className="py-24 sm:py-32 bg-[#eef0e9] border-t border-b border-[#d9ddd5]">
          <div className="section-shell">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <p className="eyebrow text-[#6f7772]">SOLVE ONCE. LEARN EVERYWHERE.</p>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                  Every verified solution
                  <br />
                  <em className="serif-em text-[#267f68]">becomes a starting point.</em>
                </h2>
                <p className="text-sm sm:text-base text-[#59615c] leading-relaxed">
                  When a solution succeeds, SETU converts the project into structured, permission-controlled knowledge. A future team facing a similar problem in another district can discover prior work instead of starting from zero.
                </p>

                <div className="space-y-2.5 font-mono text-xs text-[#101312]">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#d9ddd5]">
                    <CheckCircle2 className="size-4 text-[#267f68]" />
                    <span>Search semantically similar challenges nationwide</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#d9ddd5]">
                    <CheckCircle2 className="size-4 text-[#267f68]" />
                    <span>Access verified BOMs, circuit schematics, and pilot protocols</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#d9ddd5]">
                    <CheckCircle2 className="size-4 text-[#267f68]" />
                    <span>Adapt solutions to local geography and regional regulations</span>
                  </div>
                </div>
              </div>

              {/* 3-Tier Access Card */}
              <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#6f7772] font-semibold block">
                  3-TIER PERMISSIONED ACCESS ARCHITECTURE
                </span>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5] flex items-start gap-4">
                    <Globe className="size-5 text-[#267f68] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-sm font-bold text-[#101312]">Public Discovery Layer</strong>
                      <p className="text-xs text-[#59615c] mt-0.5">
                        High-level problem summaries, deployment outcomes, VSO certificates, and geographic heatmaps open to all citizens.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5] flex items-start gap-4">
                    <BookOpen className="size-5 text-[#267f68] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-sm font-bold text-[#101312]">Academic Knowledge Layer</strong>
                      <p className="text-xs text-[#59615c] mt-0.5">
                        Research papers, CAD models, sensor code, and testing benchmarks accessible to verified university faculty and students.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f5f6f1] border border-[#d9ddd5] flex items-start gap-4">
                    <Lock className="size-5 text-[#267f68] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-sm font-bold text-[#101312]">Confidential Transfer Layer</strong>
                      <p className="text-xs text-[#59615c] mt-0.5">
                        Proprietary patents, manufacturing toolpaths, and formal technology transfer agreements governed by institutional NDAs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: IMPACT (From Fragmented Problems to Measurable Outcomes)
            ========================================================================= */}
        <section id="impact" className="py-24 sm:py-32 bg-[#dff7ee] text-[#18372e]">
          <div className="section-shell">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="eyebrow text-[#267f68] mb-4">FROM FRAGMENTED PROBLEMS TO MEASURABLE OUTCOMES</p>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#18372e]">
                  When the loop works,
                  <br />
                  <em className="serif-em text-[#267f68]">everyone moves forward.</em>
                </h2>
                <p className="mt-6 text-xl sm:text-2xl font-serif text-[#267f68]/90 max-w-md leading-snug">
                  Challenges become projects. Projects become pilots. Pilots become verified proof.
                </p>
              </div>

              {/* Demo KPI Display (Animated with NumberFlow) */}
              <KpiCounters />
            </div>

            {/* 6 Systemic Impact Pillars */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Faster Problem Resolution', desc: 'Real challenges reach relevant expertise with more context, structured briefs, and zero duplication.' },
                { title: 'Applied University Innovation', desc: 'Students work on meaningful local problems while faculty guide practical, multidisciplinary R&D.' },
                { title: 'Accountable CSR Impact', desc: 'Corporate capital is connected to defined projects, real-world pilots, and verifiable Schedule VII outcomes.' },
                { title: 'Evidence-Based Governance', desc: 'Program teams monitor innovation velocity, spot bottlenecks, and direct resources where needed.' },
                { title: 'Verified Societal Outcomes', desc: 'Success is tied to audited evidence rather than superficial submission volume.' },
                { title: 'Nationwide Solution Reuse', desc: 'Proven solutions are adapted for adjacent districts, eliminating redundant taxpayer and grant expenditure.' },
              ].map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/60 border border-[#9de7cf]/60">
                  <h3 className="font-mono text-base font-bold text-[#18372e] mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-[#18372e]/80 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: WHY SETU? (Differentiation Matrix)
            ========================================================================= */}
        <section id="why-setu" className="py-24 sm:py-32 section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#6f7772] mb-4">DIFFERENTIATION BY LIFECYCLE</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Not another complaint portal.
              <br />
              <em className="serif-em text-[#267f68]">Not another hackathon.</em>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                conventional: 'Complaint & Grievance Systems',
                drawback: 'Capture problems passively into bureaucratic queues with no R&D or problem-solving capability attached.',
                setuAdvantage: 'Creates an accountable bridge from citizen evidence to equipped university labs and funded pilots.',
              },
              {
                conventional: 'Hackathons & Contests',
                drawback: 'Generate quick 36-hour proof-of-concepts that dissolve after judges leave without a field testing path.',
                setuAdvantage: 'Governs the long-term execution lifecycle from university lab prototype to live community pilot.',
              },
              {
                conventional: 'University Innovation Cells',
                drawback: 'Often build theoretical solutions looking for problems without direct rural or community demand.',
                setuAdvantage: 'Channels validated, prioritized community challenges directly into university laboratories.',
              },
              {
                conventional: 'CSR Donation Directories',
                drawback: 'Disburse funds with fragmented milestone tracking and self-reported marketing summaries.',
                setuAdvantage: 'Provides audit-grade Triangle of Trust verification ensuring funds produce measurable real-world outcomes.',
              },
            ].map((diff, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#a16d67] font-semibold">
                  Conventional: {diff.conventional}
                </div>
                <p className="text-xs sm:text-sm text-[#59615c]">{diff.drawback}</p>

                <div className="pt-4 border-t border-[#d9ddd5] space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#267f68] font-bold">
                    The SETU Difference:
                  </div>
                  <p className="text-xs sm:text-sm text-[#101312] font-medium leading-relaxed">
                    {diff.setuAdvantage}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Mantra Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-[#101312] text-white text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9de7cf] block mb-2 font-bold">
              THE SETU PROMISE
            </span>
            <div className="font-mono text-sm sm:text-base md:text-lg font-bold tracking-wider text-white">
              PROBLEM → CAPABILITY → INNOVATION → EXECUTION → VERIFICATION → REUSE
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: FAQ & CREDIBILITY SECTION
            ========================================================================= */}
        <section id="faq" className="py-24 sm:py-32 bg-[#eef0e9] border-t border-[#d9ddd5]">
          <div className="section-shell">
            <div className="max-w-2xl mb-16">
              <p className="eyebrow text-[#6f7772] mb-4">CRITICAL QUESTIONS &amp; CREDIBILITY</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Answers to hard questions.
              </h2>
              <p className="mt-4 text-base text-[#59615c] leading-relaxed">
                Everything about SETU is designed for transparent governance, data protection, and accountable real-world deployment.
              </p>
            </div>

            <FaqAccordion />
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: FINAL CALL TO ACTION
            ========================================================================= */}
        <section className="py-24 sm:py-36 text-center section-shell">
          <p className="eyebrow text-[#6f7772] mb-6">YOUR CHALLENGE CAN START THE LOOP</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#101312] leading-[1.02]">
            Have a problem
            <br />
            <em className="serif-em text-[#267f68]">worth solving?</em>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-base text-[#59615c] leading-relaxed">
            SETU doesn&apos;t stop when a problem is submitted. It stops when the problem is solved — and verified.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openAuth('Citizen / Community')}
              className="inline-flex items-center gap-2 bg-[#101312] hover:bg-[#267f68] text-white font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <span>Bring it to SETU</span>
              <ArrowRight className="size-4" />
            </button>
            <button
              onClick={() => openAuth('University / Faculty')}
              className="inline-flex items-center gap-2 bg-transparent hover:bg-black/5 text-[#101312] border border-[#d9ddd5] hover:border-[#101312] font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all cursor-pointer"
            >
              <span>Bring Your Expertise</span>
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </section>
      </main>

      {/* =========================================================================
          SECTION 14: FOOTER (Comprehensive Signoff & Portals)
          ========================================================================= */}
      <footer className="border-t border-[#d9ddd5] bg-[#f5f6f1] py-16 px-6 sm:px-12">
        <div className="section-shell">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#d9ddd5]">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#101312] text-[#f5f6f1] font-serif inline-flex items-center justify-center text-sm">
                  S
                </span>
                <span className="font-extrabold tracking-[0.14em] text-sm text-[#101312]">SETU</span>
              </div>
              <p className="text-xs text-[#59615c] leading-relaxed">
                Smart Innovation &amp; Societal Impact Platform. Connecting lived community challenges with university R&amp;D and verified outcomes.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#101312] font-bold block mb-3">
                The Platform
              </span>
              <ul className="space-y-2 text-xs font-mono text-[#59615c]">
                <li><a href="#problem" className="hover:text-[#101312] transition-colors">The Problem</a></li>
                <li><a href="#the-loop" className="hover:text-[#101312] transition-colors">The 9 Stages</a></li>
                <li><a href="#how-it-works" className="hover:text-[#101312] transition-colors">How It Works</a></li>
                <li><a href="#verification" className="hover:text-[#101312] transition-colors">Triangle of Trust</a></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#101312] font-bold block mb-3">
                Portals &amp; Roles
              </span>
              <ul className="space-y-2 text-xs font-mono text-[#59615c]">
                <li><button onClick={() => openAuth('Citizen / Community')} className="hover:text-[#101312] transition-colors cursor-pointer">Citizen Intake</button></li>
                <li><button onClick={() => openAuth('University / Faculty')} className="hover:text-[#101312] transition-colors cursor-pointer">University Hub</button></li>
                <li><button onClick={() => openAuth('CSR / Industry Partner')} className="hover:text-[#101312] transition-colors cursor-pointer">CSR Console</button></li>
                <li><button onClick={() => openAuth('Govt / Nodal Officer')} className="hover:text-[#101312] transition-colors cursor-pointer">Nodal Oversight</button></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#101312] font-bold block mb-3">
                Flagship Demo
              </span>
              <p className="text-xs text-[#59615c] leading-relaxed mb-3">
                West Singhbhum Water Contamination → IIT (ISM) Dhanbad → CSR Pilot → VSO Certified.
              </p>
              <a href="#flagship-story" className="text-xs font-mono text-[#267f68] font-bold hover:underline">
                Explore Case Study →
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-[#7b847d]">
            <span>SETU // FROM PROBLEMS TO IMPACT</span>
            <span>© 2026 SETU • SMART INDIA HACKATHON FLAGSHIP ARCHITECTURE</span>
          </div>
        </div>
      </footer>

      {/* Slide-out Role Authentication Drawer */}
      <SlideNavbarAuth
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialRole={initialRole}
        onAuthenticated={(role, email) => {
          console.log('Authenticated:', role, email);
        }}
        theme="dark"
      />
    </div>
  );
}
