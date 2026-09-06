'use client';

import React, { useRef } from 'react';
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
import ImageMarqueeGallery from '@/components/ImageMarqueeGallery';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { bgScale, bgOpacity, contentY, contentOpacity } = useScrollZoom(heroRef);
  const { openAuth } = useAuthModal();

  return (
    <div className="relative min-h-screen bg-[#f5f6f1] text-[#101312] selection:bg-[#9de7cf] selection:text-[#090b0b]">

      {/* ── GSAP Staggered Menu Navigation ── */}
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

      {/* ── Floating Sticky Site Header ── */}
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
        {/* =====================================================================
            SECTION 01: HERO (Preserved exactly)
            ===================================================================== */}
        <section
          ref={heroRef}
          className="relative min-h-[100svh] flex flex-col justify-between pt-36 pb-12 px-6 sm:px-12 text-white overflow-hidden"
          aria-label="SETU hero"
        >
          {/* Background layer — zooms in as user scrolls */}
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
            {/* Hero content — rises + fades on scroll */}
            <motion.div
              className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center"
              style={{ y: contentY, opacity: contentOpacity }}
            >
              {/* Live Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-[0.14em] text-white/90 mb-8">
                <span className="inline-block w-2 h-2 rounded-full bg-[#51cb9e] shadow-[0_0_0_4px_rgba(81,203,158,0.3)]" />
                <span>A closed loop for real-world change</span>
              </div>

              {/* Headline — SplitText word-by-word reveal */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.98] text-white drop-shadow-md" aria-label="Where people feel the problem, change should begin.">
                <SplitText
                  text="Where people feel the problem,"
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
                  text="change should begin."
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
                From a village water point to a crowded city street, SETU connects lived
                experiences with the people, knowledge, and resources needed to create lasting solutions.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold px-6 sm:px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Discover How SETU Works</span>
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/contact?reason=share-challenge"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white font-medium px-6 sm:px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all"
                >
                  <span>Share a Challenge</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            {/* Bottom meta bar */}
            <motion.div
              className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono tracking-[0.16em] uppercase text-white/70 border-t border-white/15 pt-5"
              style={{ opacity: contentOpacity }}
            >
              <span className="text-[#9de7cf] font-semibold">LISTEN FIRST</span>
              <span>LOCAL VOICES START THE LOOP</span>
              <span className="hidden md:inline">COMMUNITY → COLLABORATION → CHANGE</span>
            </motion.div>
          </ClickSpark>
        </section>

        {/* =====================================================================
            SECTION 02: SHORT HOMEPAGE INTRO
            ===================================================================== */}
        <section
          id="problem"
          className="py-24 sm:py-36 section-shell"
          aria-label="About SETU"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Left: Headline */}
            <ScrollReveal>
              <p className="eyebrow text-[#6f7772] mb-5">SETU — THE BRIDGE</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Local problems deserve a
                <br />
                <em
                  className="font-normal text-[#267f68] tracking-tight"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  clear path forward.
                </em>
              </h2>
            </ScrollReveal>

            {/* Right: Body copy + CTA */}
            <ScrollReveal delay={0.12}>
              <div className="space-y-6">
                <p className="text-base sm:text-lg text-[#59615c] leading-relaxed">
                  Across communities, people experience real problems every day — and the people
                  with the knowledge and tools to help rarely find out about them.
                </p>
                <p className="text-base sm:text-lg text-[#59615c] leading-relaxed">
                  SETU creates that connection. It helps communities move from a lived problem
                  to collaboration, practical pilots, and verified outcomes — with the right
                  universities, institutions, and partners involved at every step.
                </p>
                <p className="text-base sm:text-lg text-[#59615c] leading-relaxed">
                  The goal is not to collect more feedback. It is to make sure that what
                  communities need actually gets built, tested, and confirmed to work.
                </p>

                <div className="pt-2">
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2.5 bg-[#101312] hover:bg-[#267f68] text-white px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
                    aria-label="Explore how SETU works"
                  >
                    <span>Explore How SETU Works</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Simple divider context strip */}
          <ScrollReveal className="mt-20 sm:mt-24" delay={0.05}>
            <div className="border-t border-[#d9ddd5] pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { label: 'Communities', desc: 'Share challenges with context and evidence.' },
                { label: 'Institutions', desc: 'Connect expertise to real local needs.' },
                { label: 'Outcomes', desc: 'Verify that something genuinely changed.' },
              ].map((item) => (
                <div key={item.label}>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#267f68] font-bold mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[#59615c] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* =====================================================================
            SECTION 03: WHAT IS THE PROBLEM
            ===================================================================== */}
        <section className="bg-[#090b0b] text-[#f5f6f1] py-24 sm:py-32" aria-label="The problem SETU addresses">
          <div className="section-shell">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <ScrollReveal>
                <p className="eyebrow text-[#9de7cf] mb-4">THE GAP</p>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
                  The problem is not a
                  <br />
                  <em
                    className="font-normal text-[#9de7cf] tracking-tight"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                  >
                    lack of ideas.
                  </em>
                </h2>
                <p className="mt-5 text-sm sm:text-base text-[#89918c] leading-relaxed max-w-md">
                  It is the missing bridge between the person who sees the problem
                  and the people who can solve it. Problems get reported and then buried.
                  Solutions get built that never reach the field. SETU is the bridge.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-3">
                  {[
                    'Problems are submitted but never structured for action.',
                    'The right university or technical team never hears about the challenge.',
                    'Prototypes are built without a path to real-world testing.',
                    'Successful solutions never reach the next community that needs them.',
                  ].map((line, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
                    >
                      <span className="font-mono text-[10px] text-[#9de7cf] font-bold tracking-wider mt-0.5 shrink-0">
                        0{i + 1}
                      </span>
                      <p className="text-sm text-[#89918c] leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 04: FINAL CTA
            ===================================================================== */}
        <section className="py-24 sm:py-36 text-center section-shell" aria-label="Call to action">
          <ScrollReveal>
            <p className="eyebrow text-[#6f7772] mb-6">TAKE THE FIRST STEP</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#101312] leading-[1.02]">
              Have a problem
              <br />
              <em
                className="font-normal text-[#267f68]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                worth solving?
              </em>
            </h2>
            <p className="mt-6 max-w-lg mx-auto text-base sm:text-lg text-[#59615c] leading-relaxed">
              SETU gives local challenges a clear path forward. Share what you know,
              and we will help connect it to the people who can act.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?reason=share-challenge"
                className="inline-flex items-center gap-2 bg-[#101312] hover:bg-[#267f68] text-white px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
              >
                <span>Share a Challenge</span>
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 bg-transparent border border-[#d9ddd5] hover:border-[#101312] text-[#101312] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all"
              >
                <span>Learn How It Works</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* =====================================================================
            SECTION 05: FIELD ACTION & MASONRY GALLERY (WITH MARQUEE MIDDLE COLUMN)
            ===================================================================== */}
        <section
          id="field-action"
          className="py-24 sm:py-32 bg-[#f5f6f1] border-t border-[#d9ddd5] relative overflow-hidden"
          aria-label="Ground Evidence & Field Action"
        >
          <div className="section-shell mb-12 sm:mb-16">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <p className="eyebrow text-[#267f68] mb-3">GROUND EVIDENCE & FIELD ACTION</p>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-[#101312]">
                    Field challenges meeting{' '}
                    <br className="hidden sm:inline" />
                    <em
                      className="font-normal text-[#267f68]"
                      style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                    >
                      real-world engineering.
                    </em>
                  </h2>
                </div>
                <div className="max-w-md">
                  <p className="text-sm sm:text-base text-[#59615c] leading-relaxed">
                    A live window into real community challenges, university research squads, and verified societal pilots moving from problem to proof across India.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ImageMarqueeGallery />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
