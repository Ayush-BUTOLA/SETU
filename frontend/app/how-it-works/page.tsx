'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteFooter from '@/components/SiteFooter';
import { HOW_IT_WORKS_STEPS, STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';
import type Lenis from 'lenis';

// ─── Step data with Omega-style framing ──────────────────────────────────────
const STEPS = [
  {
    num: '01',
    verb: 'REPORT',
    headline: 'A real problem enters the system.',
    body: 'Citizens, NGOs, and panchayats submit local challenges with location, photo evidence, and context. Problems don\'t disappear into a form — they become structured cases ready for action.',
    tag: 'Citizen Submission',
    image: HOW_IT_WORKS_STEPS[0].image,
    imageAlt: HOW_IT_WORKS_STEPS[0].imageAlt,
  },
  {
    num: '02',
    verb: 'STRUCTURE',
    headline: 'AI turns a complaint into an engineering brief.',
    body: 'SETU\'s AI layer analyses each submission — clarifying scope, extracting constraints, and producing a challenge brief that technical teams can immediately act on. Human reviewers validate every brief.',
    tag: 'AI-Assisted Structuring',
    image: HOW_IT_WORKS_STEPS[1].image,
    imageAlt: HOW_IT_WORKS_STEPS[1].imageAlt,
  },
  {
    num: '03',
    verb: 'MATCH',
    headline: 'The right institution receives the brief.',
    body: 'Each structured challenge is matched to universities, research labs, or industry teams based on capability, domain, and geography — not who happens to be browsing the platform.',
    tag: 'Capability Matching',
    image: HOW_IT_WORKS_STEPS[2].image,
    imageAlt: HOW_IT_WORKS_STEPS[2].imageAlt,
  },
  {
    num: '04',
    verb: 'BUILD',
    headline: 'Student teams build in the field, not the lab.',
    body: 'Faculty-led student teams develop and iterate on solutions directly with the community. The pilot lives where the problem lives — tested under real conditions, not in simulation.',
    tag: 'Engineering Sprint',
    image: HOW_IT_WORKS_STEPS[3].image,
    imageAlt: HOW_IT_WORKS_STEPS[3].imageAlt,
  },
  {
    num: '05',
    verb: 'VERIFY',
    headline: 'The community confirms what changed.',
    body: 'Outcomes are reviewed with field evidence and direct confirmation from the people who reported the problem. A challenge is only marked resolved when the community agrees it is.',
    tag: 'Community Verification',
    image: HOW_IT_WORKS_STEPS[4].image,
    imageAlt: HOW_IT_WORKS_STEPS[4].imageAlt,
  },
];

// ─── Horizontal scroller panel ────────────────────────────────────────────────
function HorizontalSteps() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      // Sync Lenis with ScrollTrigger
      const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
      }

      const panelWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -panelWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${panelWidth}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden will-change-transform">
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex"
        style={{ width: `${STEPS.length * 100}vw` }}
      >
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="relative w-screen h-full flex items-center shrink-0"
          >
            {/* Panel */}
            <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2">
              {/* Left: content */}
              <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 bg-[#f5f6f1]">
                {/* Step progress */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#267f68] uppercase">
                    {step.num} / 05
                  </span>
                  <span className="flex-1 h-px bg-[#d9ddd5] max-w-[60px]" />
                  <span className="font-mono text-[10px] tracking-widest text-[#6f7772] uppercase">{step.tag}</span>
                </div>

                {/* Big verb */}
                <div
                  className="text-[clamp(4rem,10vw,9rem)] font-extrabold tracking-[-0.04em] leading-[0.85] text-[#101312] uppercase mb-6"
                  style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                >
                  {step.verb}
                  <span className="text-[#267f68]">.</span>
                </div>

                {/* Headline */}
                <h2
                  className="text-[clamp(1.1rem,2vw,1.6rem)] font-semibold text-[#101312] leading-snug mb-4 max-w-md"
                  style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                >
                  {step.headline}
                </h2>

                {/* Body */}
                <p className="text-sm sm:text-base text-[#59615c] leading-relaxed max-w-sm">
                  {step.body}
                </p>

                {/* Step dots */}
                <div className="flex gap-2.5 mt-10" aria-label="Step progress">
                  {STEPS.map((_, j) => (
                    <div
                      key={j}
                      className={`h-[3px] rounded-full transition-all duration-300 ${
                        j === i
                          ? 'w-8 bg-[#267f68]'
                          : j < i
                          ? 'w-4 bg-[#267f68]/40'
                          : 'w-4 bg-[#d9ddd5]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: image */}
              <div className="relative overflow-hidden bg-[#090b0b]">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover object-center saturate-[0.8] contrast-[1.05] scale-[1.02]"
                  sizes="50vw"
                  priority={i === 0}
                />
                {/* Overlay with step number */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b0b]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <span
                    className="text-[clamp(4rem,8vw,7rem)] font-extrabold text-white/10 leading-none"
                    style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </span>
                  <span className="font-mono text-[11px] text-white/60 uppercase tracking-widest">
                    ← Scroll →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HowItWorksPage() {
  const { openAuth } = useAuthModal();

  return (
    <div className="min-h-screen bg-[#f5f6f1] text-[#101312]">
      {/* Navigation */}
      <StaggeredMenu
        position="right"
        items={STAGGERED_MENU_ITEMS}
        socialItems={STAGGERED_SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#101312"
        openMenuButtonColor="#f5f6f1"
        changeMenuColorOnOpen={true}
        colors={['#09130f', '#132820', '#267f68']}
        accentColor="#9de7cf"
        isFixed={true}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[72px] z-30 flex items-center justify-between px-6 sm:px-12 bg-[#f5f6f1]/90 backdrop-blur-md border-b border-[#d9ddd5]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-wider text-sm text-[#101312] hover:opacity-70 transition-opacity"
          aria-label="Back to SETU home"
        >
          <span className="w-8 h-8 rounded-full bg-[#101312] text-white font-serif flex items-center justify-center text-base font-normal">
            S
          </span>
          <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
        </Link>
        <div className="mr-16 sm:mr-24">
          <button
            type="button"
            onClick={() => openAuth()}
            className="flex items-center gap-2 bg-[#101312] text-white hover:bg-[#267f68] transition-all px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold shadow-md cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </header>

      <main>
        {/* ── PAGE HERO ── */}
        <section
          className="relative h-[80vh] flex flex-col justify-end pb-20 sm:pb-28 px-6 sm:px-12 text-white overflow-hidden"
          aria-label="How SETU works"
        >
          {/* Background */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/assets/valley.jpg"
              alt="Wide valley representing the scale of communities SETU connects"
              fill
              priority
              className="object-cover object-center saturate-[0.7] contrast-[1.06]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0b]/90 via-[#090b0b]/50 to-[#090b0b]/10" />
          </div>

          <div className="relative z-10 max-w-[1180px] mx-auto w-full">
            {/* Eyebrow */}
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9de7cf] mb-5 flex items-center gap-3">
              <span className="inline-block w-5 h-px bg-[#9de7cf]" />
              The SETU Process — 5 Stages
            </p>

            {/* Headline */}
            <h1
              className="text-[clamp(3rem,7vw,7rem)] font-extrabold tracking-[-0.04em] leading-[0.9] text-white uppercase max-w-3xl"
              style={{ fontFamily: 'var(--font-heading), sans-serif' }}
            >
              From report
              <br />
              <span className="text-[#9de7cf]">to result.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base sm:text-lg text-white/75 leading-relaxed font-light">
              Every community challenge that enters SETU follows five stages — from a citizen&apos;s
              first report to a field-tested, community-verified outcome.
              No stage is skipped. No outcome is assumed.
            </p>

            {/* Flow indicator */}
            <div className="mt-10 flex items-center gap-0 flex-wrap">
              {STEPS.map((step, i) => (
                <div key={step.num} className="flex items-center">
                  <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest px-3 py-1.5 border border-white/15 rounded-full">
                    {step.verb}
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className="text-[#267f68] px-1.5 font-bold text-sm">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 right-10 sm:right-16 font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
            <span>Scroll to explore</span>
            <ArrowRight className="size-3" />
          </div>
        </section>

        {/* ── HORIZONTAL SCROLL STEPS ── */}
        <HorizontalSteps />

        {/* ── PIPELINE SUMMARY (dark) ── */}
        <section className="bg-[#090b0b] py-20 sm:py-28" aria-label="Process pipeline summary">
          <div className="section-shell">
            <p className="eyebrow text-[#9de7cf] mb-10 text-center">THE FULL PIPELINE</p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 border border-white/10 rounded-2xl overflow-hidden">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-white/10 last:border-0 flex flex-col gap-3 ${
                    i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#9de7cf] font-bold tracking-[0.18em]">
                    {step.num}
                  </span>
                  <div
                    className="text-xl font-extrabold text-white uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                  >
                    {step.verb}
                  </div>
                  <p className="text-[12px] text-[#89918c] leading-relaxed">{step.headline}</p>
                  <div className="mt-auto">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider border border-white/10 px-2.5 py-1 rounded-full">
                      {step.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO DOES WHAT (stakeholders) ── */}
        <section className="py-20 sm:py-28 bg-[#f5f6f1] border-b border-[#d9ddd5]" aria-label="Stakeholder roles">
          <div className="section-shell">
            <div className="flex justify-between items-end flex-wrap gap-5 pb-10 border-b border-[#d9ddd5] mb-10">
              <div>
                <p className="eyebrow text-[#267f68] flex items-center gap-2.5 mb-3">
                  <span className="inline-block w-5 h-px bg-[#267f68]" />
                  Who participates
                </p>
                <h2
                  className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-[#101312] uppercase"
                  style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                >
                  Three actors.
                </h2>
              </div>
              <span className="text-[#6f7772] font-mono text-xs tracking-wider uppercase">(every loop needs all three)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: 'Citizen / Community',
                  num: '01',
                  color: '#267f68',
                  actions: [
                    'Submit challenges with location & evidence',
                    'Provide context, photos, and witnesses',
                    'Track challenge progress in real time',
                    'Confirm the outcome at the end',
                  ],
                  cta: 'Submit a Problem',
                  href: '/contact?reason=share-challenge',
                },
                {
                  role: 'University / Faculty',
                  num: '02',
                  color: '#101312',
                  actions: [
                    'Discover validated, engineering-ready briefs',
                    'Match challenges to institutional capability',
                    'Lead student-faculty R&D sprints',
                    'Deploy and document field pilots',
                  ],
                  cta: 'Partner with SETU',
                  href: '/for-universities-industry',
                },
                {
                  role: 'CSR / Industry',
                  num: '03',
                  color: '#89918c',
                  actions: [
                    'Fund promising solutions at pilot stage',
                    'Provide technical mentorship to student teams',
                    'Support field deployment and scaling',
                    'Gain verified societal impact reports',
                  ],
                  cta: 'Explore Partnership',
                  href: '/for-universities-industry',
                },
              ].map((actor) => (
                <div
                  key={actor.role}
                  className="border border-[#d9ddd5] rounded-2xl p-7 flex flex-col gap-5 hover:border-[#267f68] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] text-[#6f7772] tracking-wider">{actor.num}</span>
                    <div
                      className="w-2.5 h-2.5 rounded-full mt-1"
                      style={{ background: actor.color }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3
                    className="text-lg font-bold tracking-tight text-[#101312]"
                    style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                  >
                    {actor.role}
                  </h3>
                  <ul className="space-y-2.5 flex-1">
                    {actor.actions.map((action) => (
                      <li key={action} className="flex items-start gap-2.5 text-sm text-[#59615c]">
                        <span className="text-[#267f68] mt-0.5 shrink-0 font-bold">→</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={actor.href}
                    className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#267f68] hover:gap-3 transition-all mt-2 group-hover:underline"
                  >
                    <span>{actor.cta}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 sm:py-32 section-shell text-center" aria-label="Call to action">
          <p className="eyebrow text-[#6f7772] mb-6">DON&apos;T JUST REPORT IT — SOLVE IT</p>
          <h2
            className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-[#101312] uppercase"
            style={{ fontFamily: 'var(--font-heading), sans-serif' }}
          >
            Have a problem
            <br />
            <span
              className="font-normal text-[#267f68] normal-case"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              worth engineering?
            </span>
          </h2>
          <p className="mt-6 max-w-md mx-auto text-base sm:text-lg text-[#59615c] leading-relaxed">
            SETU doesn&apos;t collect feedback. It builds a verified path from your community&apos;s problem to a field-tested solution.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?reason=share-challenge"
              className="inline-flex items-center gap-2 bg-[#267f68] hover:bg-[#18372e] text-white px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
            >
              <span>Submit a Problem</span>
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/explore-challenges"
              className="inline-flex items-center gap-2 border border-[#d9ddd5] hover:border-[#101312] text-[#101312] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Explore Challenges</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
