'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollZoom } from '@/components/ScrollZoomHero';
import StaggeredMenu from '@/components/StaggeredMenu';
import HeroSlideshow from '@/components/HeroSlideshow';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import SplitText from '@/components/SplitText';
import ClickSpark from '@/components/ClickSpark';
import { STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useAuthModal } from '@/context/AuthModalContext';
import { HaveAProblemCTA } from '@/components/HaveAProblemCTA';

// ─── Ticker Marquee Strip ─────────────────────────────────────────────────────
function TickerMarquee() {
  const items = [
    'Problem to Engineering Project',
    '✳',
    'AI-Assisted Structuring',
    '✳',
    'University–Community Match',
    '✳',
    'Field-Tested Pilots',
    '✳',
    'Verified Societal Outcomes',
    '✳',
    'CSR & Industry Partners',
    '✳',
    'Not a Complaint Portal',
    '✳',
    'Closed-Loop Impact',
    '✳',
  ];
  const track = [...items, ...items];
  return (
    <div className="border-y border-[#d9ddd5] overflow-hidden py-3.5 bg-[#f5f6f1]" aria-hidden="true">
      <div
        className="flex gap-0 w-max"
        style={{ animation: 'setu-ticker 28s linear infinite' }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap px-7 font-bold text-lg sm:text-xl tracking-tight ${
              item === '✳' ? 'text-[#267f68]' : 'text-[#101312]'
            }`}
            style={{ fontFamily: 'var(--font-heading), sans-serif' }}
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes setu-ticker { to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

// ─── Stats Counter ────────────────────────────────────────────────────────────
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            let cur = 0;
            const step = Math.max(1, Math.floor(value / 32));
            const interval = setInterval(() => {
              cur += step;
              if (cur >= value) { cur = value; clearInterval(interval); }
              setCount(cur);
            }, 35);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-r border-[#d9ddd5] last:border-r-0 px-6 py-7">
      <div
        className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold tracking-[-0.03em] leading-none text-[#101312]"
        style={{ fontFamily: 'var(--font-heading), sans-serif' }}
      >
        {count}
        <span className="text-[#267f68] text-[0.55em] align-super">{suffix}</span>
      </div>
      <p className="mt-2.5 text-sm text-[#59615c]">{label}</p>
    </div>
  );
}

// ─── Process Steps (scroll-spy) ───────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    num: '01',
    name: 'Report',
    headline: 'A real problem enters the system.',
    body: 'Citizens, NGOs, and panchayats submit local challenges with location, photo evidence, and context. Problems don\'t disappear into a form — they become structured cases ready for action.',
    meta: 'Stage 1 · Citizen Submission',
  },
  {
    num: '02',
    name: 'Structure',
    headline: 'AI turns a complaint into an engineering brief.',
    body: 'SETU\'s AI layer analyses each submission — clarifying scope, extracting constraints, and producing a structured challenge brief that technical teams can immediately act on.',
    meta: 'Stage 2 · AI-Assisted Structuring',
  },
  {
    num: '03',
    name: 'Match',
    headline: 'The right institution receives the brief.',
    body: 'Each structured challenge is matched to universities, research labs, or industry teams based on capability, domain, and geography — not who happens to be browsing.',
    meta: 'Stage 3 · Capability Matching',
  },
  {
    num: '04',
    name: 'Build',
    headline: 'Student teams build in the field, not the lab.',
    body: 'Faculty-led student teams develop and iterate on solutions directly with the community. The pilot lives where the problem lives — not in a conference room presentation.',
    meta: 'Stage 4 · Engineering Sprint',
  },
  {
    num: '05',
    name: 'Verify',
    headline: 'The community confirms what changed.',
    body: 'Outcomes are reviewed with field evidence and direct confirmation from the people who reported the problem. A challenge is only marked resolved when the community agrees it is.',
    meta: 'Stage 5 · Community Verification',
  },
];

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const vMid = window.innerHeight * 0.45;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vMid && rect.bottom >= vMid) {
          setActiveStep(i);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section-shell py-0 pb-24 sm:pb-32" aria-label="SETU Process">
      <div className="flex justify-between items-end flex-wrap gap-5 pt-16 sm:pt-24 pb-8 sm:pb-12 border-b border-[#d9ddd5]">
        <div>
          <p className="eyebrow text-[#267f68] flex items-center gap-2.5 mb-3">
            <span className="inline-block w-5 h-px bg-[#267f68]" />
            N°03 — How It Works
          </p>
          <h2
            className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-[#101312] uppercase"
            style={{ fontFamily: 'var(--font-heading), sans-serif' }}
          >
            From report to result.
          </h2>
        </div>
        <span className="text-[#6f7772] font-mono text-xs tracking-wider uppercase">(05 stages — no shortcuts)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 pt-10">
        {/* Sticky left */}
        <div className="lg:col-span-2 lg:sticky lg:top-28 h-max pb-8">
          <p className="text-sm sm:text-base text-[#59615c] leading-relaxed max-w-sm">
            Problems don&apos;t end at a complaint. SETU runs a closed loop — from first report to engineering brief to field-tested pilot to community-verified outcome.
          </p>
          <div
            className="mt-10 font-extrabold tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-heading), sans-serif', fontSize: 'clamp(3.2rem,6.5vw,5.4rem)' }}
          >
            <span className="text-[#267f68]">{String(activeStep + 1).padStart(2, '0')}</span>
            <span className="text-[#d9ddd5] text-[0.45em] align-middle">/ 05</span>
            <div className="mt-2 font-mono text-[0.22em] tracking-[0.12em] uppercase text-[#6f7772] font-normal">
              — {PROCESS_STEPS[activeStep].name}
            </div>
          </div>
        </div>

        {/* Scroll-spy steps */}
        <div ref={containerRef} className="lg:col-span-3 space-y-0">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`border-t border-[#d9ddd5] pt-9 pb-11 grid grid-cols-[80px_1fr] gap-4 transition-opacity duration-500 ${
                activeStep === i ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <span className="font-mono text-[13px] text-[#267f68] pt-1">STEP {step.num}</span>
              <div>
                <h3
                  className="text-[clamp(1.3rem,2.6vw,1.9rem)] font-bold tracking-tight mb-3"
                  style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                >
                  {step.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#59615c] leading-relaxed max-w-prose">{step.body}</p>
                <div className="mt-4 font-mono text-[11px] text-[#6f7772] uppercase tracking-wider">{step.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Accordion Capabilities ───────────────────────────────────────────────────
const CAPABILITIES = [
  {
    num: '01',
    name: 'Citizen Problem Submission',
    desc: 'Any citizen, NGO, or panchayat submits a local challenge with location, supporting evidence, and context. The problem enters the system as a structured case — not a ticket that disappears.',
    chips: ['Mobile submission', 'Photo evidence', 'Location tagging', 'NGOs & panchayats'],
  },
  {
    num: '02',
    name: 'AI-Assisted Structuring',
    desc: 'SETU\'s AI analyses each submission, identifies the core technical constraint, and produces an engineering-ready challenge brief. Human reviewers validate before it moves forward.',
    chips: ['AI structuring', 'Constraint extraction', 'Human oversight', 'Brief generation'],
  },
  {
    num: '03',
    name: 'Institutional Capability Matching',
    desc: 'The structured brief is matched to universities, research labs, and industry partners based on domain expertise and geographic proximity — not availability or convenience.',
    chips: ['University matching', 'CSR partners', 'Industry labs', 'Domain-based routing'],
  },
  {
    num: '04',
    name: 'Field Pilot Development',
    desc: 'Faculty and student teams build and deploy a solution directly at the site of the problem. Iteration happens in the field with the community — not in simulation.',
    chips: ['Faculty-led teams', 'On-site deployment', 'Community co-design', 'Rapid iteration'],
  },
  {
    num: '05',
    name: 'Community-Verified Outcome',
    desc: 'A challenge is marked resolved only when field evidence and direct community confirmation agree. Outcome data is transparent, linked to the original submission, and never inflated.',
    chips: ['Field evidence', 'Community sign-off', 'Transparent tracking', 'Linked to submission'],
  },
];

function CapabilitiesAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-[#f5f6f1]" aria-label="SETU Capabilities">
      <div className="section-shell py-0">
        <div className="flex justify-between items-end flex-wrap gap-5 pt-16 sm:pt-24 pb-8 sm:pb-12 border-b border-[#d9ddd5]">
          <div>
            <p className="eyebrow text-[#267f68] flex items-center gap-2.5 mb-3">
              <span className="inline-block w-5 h-px bg-[#267f68]" />
              N°04 — Capabilities
            </p>
            <h2
              className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-[#101312] uppercase"
              style={{ fontFamily: 'var(--font-heading), sans-serif' }}
            >
              The full stack.
            </h2>
          </div>
          <span className="text-[#6f7772] font-mono text-xs tracking-wider uppercase">(end-to-end — not just a portal)</span>
        </div>

        <div className="pb-20 sm:pb-28">
          {CAPABILITIES.map((cap, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={cap.num} className="border-b border-[#d9ddd5]">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={`w-full grid grid-cols-[56px_1fr_40px] items-center gap-4 py-6 text-left transition-all duration-300 group ${
                    isOpen ? 'pl-3' : 'hover:pl-3'
                  }`}
                >
                  <span className="font-mono text-xs text-[#6f7772]">{cap.num}</span>
                  <span
                    className={`text-[clamp(1.2rem,2.8vw,2rem)] font-bold tracking-tight transition-colors duration-300 ${
                      isOpen ? 'text-[#267f68]' : 'text-[#101312] group-hover:text-[#267f68]'
                    }`}
                    style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                  >
                    {cap.name}
                  </span>
                  <span
                    className={`w-9 h-9 border rounded-full flex items-center justify-center ml-auto transition-all duration-500 ${
                      isOpen
                        ? 'bg-[#267f68] border-[#267f68] rotate-[135deg]'
                        : 'border-[#d9ddd5] group-hover:border-[#267f68]'
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <line x1="6.5" y1="0" x2="6.5" y2="13" stroke={isOpen ? '#fff' : '#101312'} strokeWidth="1.5" />
                      <line x1="0" y1="6.5" x2="13" y2="6.5" stroke={isOpen ? '#fff' : '#101312'} strokeWidth="1.5" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-7 pl-[72px] max-w-2xl">
                      <p className="text-sm sm:text-base text-[#59615c] leading-relaxed">{cap.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {cap.chips.map((chip) => (
                          <span
                            key={chip}
                            className="font-mono text-[10.5px] uppercase tracking-wider border border-[#d9ddd5] rounded-full px-3 py-1.5 text-[#59615c]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Dark Stacked Cards (Who it serves) ──────────────────────────────────────
const IMPACT_CARDS = [
  {
    idx: '01 / COMMUNITY',
    year: '2025',
    title: 'Every local problem deserves an engineering solution.',
    desc: 'Across India, real community problems go unaddressed — not because solutions don\'t exist, but because no system connects the two. SETU gives citizens a direct line to the institutions capable of solving what they experience daily.',
    tags: ['Rural Communities', 'Urban Voices', 'NGOs & Panchayats'],
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
    top: '96px',
  },
  {
    idx: '02 / INSTITUTIONS',
    year: '2025',
    title: 'Student R&D that ships to the field.',
    desc: 'Faculty and students receive structured, validated challenge briefs — not vague requests. They build solutions grounded in real constraints, deploy them on-site, and generate evidence that survives peer review.',
    tags: ['Universities', 'Research Institutions', 'Faculty + Students'],
    img: 'https://images.unsplash.com/photo-1567168544646-208fa5d408fb?w=900&auto=format&fit=crop&q=80',
    top: '112px',
  },
  {
    idx: '03 / OUTCOMES',
    year: '2025',
    title: 'Verified by the community. Not a committee.',
    desc: 'A challenge closes only when field evidence and direct community confirmation agree that something changed. Outcome data is linked to the original submission — transparent, traceable, and impossible to inflate.',
    tags: ['Field Evidence', 'Community Sign-Off', 'Transparent Tracking'],
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=80',
    top: '128px',
  },
];

function ImpactCardsSection() {
  return (
    <section className="bg-[#090b0b] text-[#f5f6f1]" aria-label="Who SETU serves">
      <div className="section-shell py-0">
        <div className="flex justify-between items-end flex-wrap gap-5 pt-16 sm:pt-24 pb-10 sm:pb-14 border-b border-white/10">
          <div>
            <p className="eyebrow text-[#9de7cf] flex items-center gap-2.5 mb-3">
              <span className="inline-block w-5 h-px bg-[#9de7cf]" />
              N°02 — Who it serves
            </p>
            <h2
              className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-white uppercase"
              style={{ fontFamily: 'var(--font-heading), sans-serif' }}
            >
              Three actors. One loop.
            </h2>
          </div>
          <span className="text-white/40 font-mono text-xs tracking-wider uppercase">(citizens → institutions → outcomes)</span>
        </div>

        <div className="pb-20 sm:pb-28 space-y-6 pt-8">
          {IMPACT_CARDS.map((card, i) => (
            <article
              key={i}
              className="sticky bg-[#1b1813] border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[480px] lg:min-h-[580px] transition-transform will-change-transform"
              style={{ top: card.top }}
            >
              <div className="p-8 sm:p-11 flex flex-col gap-5 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[13px] text-[#9de7cf]">{card.idx}</span>
                  <span className="font-mono text-xs text-white/40">{card.year}</span>
                </div>
                <h3
                  className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-extrabold tracking-[-0.03em] leading-[0.94] text-white"
                  style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                >
                  {card.title}
                </h3>
                <p className="text-[#89918c] text-sm sm:text-base max-w-prose leading-relaxed">{card.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] uppercase tracking-wider border border-white/15 rounded-full px-3 py-1.5 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/how-it-works"
                  className="mt-auto inline-flex items-center gap-2.5 font-semibold text-[15px] text-[#f5f6f1] hover:text-[#9de7cf] transition-colors group w-fit"
                >
                  <span>See how the loop works</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
              <div className="relative overflow-hidden min-h-[240px] order-first lg:order-last">
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#090b0b] opacity-0 pointer-events-none" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Quote ────────────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <section className="bg-[#e9e4d8] border-y border-[#d9ddd5]" aria-label="Testimonial">
      <div className="section-shell py-20 sm:py-32">
        <p className="eyebrow text-[#267f68] flex items-center gap-2.5 mb-8">
          <span className="inline-block w-5 h-px bg-[#267f68]" />
          N°05 — From the Field
        </p>
        <ScrollReveal>
          <blockquote
            className="text-[clamp(1.6rem,4vw,3.2rem)] font-semibold tracking-[-0.02em] leading-[1.14] text-[#101312] max-w-[22ch]"
            style={{ fontFamily: 'var(--font-heading), sans-serif' }}
          >
            &ldquo;We reported the problem expecting nothing. SETU turned it into a{' '}
            <em className="not-italic text-[#267f68]">student project with a working prototype.</em>&rdquo;
          </blockquote>
          <div className="flex items-center gap-4 mt-10">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#d9ddd5] flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80"
                alt="Community member"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div>
              <div className="font-semibold text-[#101312] text-sm">Community Representative</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mt-0.5">
                Water Access Challenge — Rajasthan
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { bgScale, bgOpacity, contentY, contentOpacity } = useScrollZoom(heroRef);
  const { openAuth } = useAuthModal();

  return (
    <div className="relative min-h-screen bg-[#f5f6f1] text-[#101312] selection:bg-[#9de7cf] selection:text-[#090b0b]">

      {/* ── Navigation ── */}
      <StaggeredMenu
        position="right"
        items={STAGGERED_MENU_ITEMS}
        socialItems={STAGGERED_SOCIAL_ITEMS}
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

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 h-[76px] z-30 flex items-center justify-between px-6 sm:px-12 pointer-events-none">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-wider text-sm text-white pointer-events-auto drop-shadow-md hover:opacity-90 transition-opacity"
          aria-label="SETU home"
        >
          <span className="w-8 h-8 rounded-full bg-white text-black font-serif flex items-center justify-center text-base font-normal shadow-sm">
            S
          </span>
          <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
        </Link>
        <div className="flex items-center gap-3 pointer-events-auto mr-16 sm:mr-24">
          <button
            type="button"
            onClick={() => openAuth()}
            className="flex items-center gap-2 bg-white text-[#101312] hover:bg-[#9de7cf] transition-all px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold shadow-lg hover:shadow-xl cursor-pointer"
            aria-label="Login to SETU"
          >
            <span>Login</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </header>

      <main id="top">
        {/* =================================================================
            SECTION 01: HERO — DO NOT EDIT
            ================================================================= */}
        <section
          ref={heroRef}
          className="relative min-h-[100svh] flex flex-col justify-between pt-36 pb-12 px-6 sm:px-12 text-white overflow-hidden"
          aria-label="SETU hero"
        >
          <motion.div
            className="absolute inset-0 will-change-transform pointer-events-none"
            style={{ scale: bgScale, opacity: bgOpacity }}
          >
            <HeroSlideshow />
          </motion.div>

          <ClickSpark
            sparkColor="#9de7cf"
            sparkSize={12}
            sparkRadius={20}
            sparkCount={8}
            duration={400}
            className="relative z-10 flex flex-col justify-between flex-1"
          >
            <motion.div
              className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center"
              style={{ y: contentY, opacity: contentOpacity }}
            >
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-[0.14em] text-white/90 mb-8">
                <span className="inline-block w-2 h-2 rounded-full bg-[#51cb9e] shadow-[0_0_0_4px_rgba(81,203,158,0.3)]" />
                <span>Problem → Engineering Brief → Verified Outcome</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.98] text-white drop-shadow-md" aria-label="Every local problem has an engineering solution.">
                <SplitText
                  text="Every local problem has"
                  className="block"
                  splitType="words"
                  from={{ opacity: 0, y: 32 }}
                  to={{ opacity: 1, y: 0 }}
                  delay={60}
                  duration={0.9}
                  ease="power3.out"
                  threshold={0.01}
                  rootMargin="0px"
                />
                <SplitText
                  text="an engineering solution."
                  className="block font-serif italic font-normal text-[#b9f2df] tracking-tight"
                  splitType="words"
                  from={{ opacity: 0, y: 32 }}
                  to={{ opacity: 1, y: 0 }}
                  delay={60}
                  duration={0.9}
                  ease="power3.out"
                  threshold={0.01}
                  rootMargin="0px"
                />
              </h1>

              {/* Lede */}
              <p className="mt-7 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-white/85 font-light leading-relaxed">
                SETU turns community challenges into structured engineering projects — matched to universities, built by student teams, deployed in the field, and verified by the people who reported them.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold px-6 sm:px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
                >
                  <span>See How the Loop Works</span>
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/contact?reason=share-challenge"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white font-medium px-6 sm:px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all"
                >
                  <span>Submit a Problem</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            {/* Bottom meta bar */}
            <motion.div
              className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono tracking-[0.16em] uppercase text-white/70 border-t border-white/15 pt-5"
              style={{ opacity: contentOpacity }}
            >
              <span className="text-[#9de7cf] font-semibold">CITIZEN FIRST</span>
              <span>PROBLEM → BRIEF → PILOT → VERIFIED</span>
              <span className="hidden md:inline">COMMUNITY → UNIVERSITY → INDUSTRY → OUTCOME</span>
            </motion.div>
          </ClickSpark>
        </section>

        {/* =================================================================
            TICKER MARQUEE
            ================================================================= */}
        <TickerMarquee />

        {/* =================================================================
            SECTION 02: MANIFESTO + STATS
            ================================================================= */}
        <section id="about" className="bg-[#f5f6f1]" aria-label="About SETU">
          <div className="section-shell py-0">
            <div className="flex justify-between items-end flex-wrap gap-5 pt-16 sm:pt-24 pb-8 sm:pb-12 border-b border-[#d9ddd5]">
              <div>
                <p className="eyebrow text-[#267f68] flex items-center gap-2.5 mb-3">
                  <span className="inline-block w-5 h-px bg-[#267f68]" />
                  N°01 — The Problem
                </p>
                <h2
                  className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-[#101312] uppercase"
                  style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                >
                  Problems don&apos;t need more portals.
                </h2>
              </div>
              <span className="text-[#6f7772] font-mono text-xs tracking-wider uppercase">(01 / 05)</span>
            </div>

            <ScrollReveal className="pb-0 pt-10 sm:pt-14">
              <p
                className="text-[clamp(1.5rem,3.5vw,2.9rem)] font-semibold leading-[1.15] tracking-[-0.02em] max-w-[22ch] text-[#101312]"
                style={{ fontFamily: 'var(--font-heading), sans-serif' }}
              >
                India has complaint systems. It doesn&apos;t have a system that turns complaints into{' '}
                <span className="text-[#267f68]">engineering projects,</span> deploys them in the field, and{' '}
                <span className="underline decoration-[#267f68] decoration-[3px]">verifies the outcome.</span>
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#d9ddd5] mt-12 sm:mt-16 mb-16 sm:mb-24">
              <AnimatedStat value={5} suffix="" label="Pipeline stages — report, structure, match, build, verify" />
              <AnimatedStat value={3} suffix="" label="Stakeholder groups — citizens, universities, industry" />
              <AnimatedStat value={100} suffix="%" label="Outcomes confirmed by community, not a dashboard" />
              <AnimatedStat value={0} suffix="" label="Unverified impact claims. Not one." />
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 03: THREE ACTORS — DARK STACKED CARDS
            ================================================================= */}
        <ImpactCardsSection />

        {/* =================================================================
            SECTION 04: CAPABILITIES ACCORDION
            ================================================================= */}
        <CapabilitiesAccordion />

        {/* =================================================================
            SECTION 05: PROCESS SCROLL-SPY
            ================================================================= */}
        <ProcessSection />

        {/* =================================================================
            SECTION 06: QUOTE
            ================================================================= */}
        <QuoteSection />

        {/* =================================================================
            SECTION 07: FINAL CTA
            ================================================================= */}
        <HaveAProblemCTA
          eyebrow="DON'T JUST REPORT IT — SOLVE IT"
          headlineLine1="Have a problem"
          headlineLine2="worth engineering?"
          primaryButtonText="Submit a Problem"
          primaryButtonHref="/contact?reason=share-challenge"
          secondaryButtonText="See How the Loop Works"
          secondaryButtonHref="/how-it-works"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
