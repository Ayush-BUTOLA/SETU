'use client';

import React from 'react';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { ABOUT_PRINCIPLES, STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import CountUp from '@/components/CountUp';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';

export default function AboutPage() {
  const { openAuth } = useAuthModal();

  return (
    <div className="min-h-screen bg-[#f5f6f1] text-[#101312]">
      <StaggeredMenu
        position="right"
        items={STAGGERED_MENU_ITEMS}
        socialItems={STAGGERED_SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#f5f6f1"
        openMenuButtonColor="#f5f6f1"
        changeMenuColorOnOpen={true}
        colors={['#09130f', '#132820', '#267f68']}
        accentColor="#9de7cf"
        isFixed={true}
      />

      {/* Sticky header */}
      <header className="fixed top-0 left-0 right-0 h-[72px] z-30 flex items-center justify-between px-6 sm:px-12 bg-transparent">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-wider text-sm text-white hover:opacity-80 transition-opacity drop-shadow-md"
          aria-label="Back to SETU home"
        >
          <span className="w-8 h-8 rounded-full bg-white text-black font-serif flex items-center justify-center text-base font-normal shadow-sm">
            S
          </span>
          <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
        </Link>
        <div className="mr-16 sm:mr-24">
          <button
            type="button"
            onClick={() => openAuth()}
            className="flex items-center gap-2 bg-white text-[#101312] hover:bg-[#9de7cf] transition-all px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold shadow-lg cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </header>

      <main>
        {/* ── Page Hero ── */}
        <PageHero
          eyebrow="About SETU"
          headline="Change begins"
          headlineEm="by listening."
          lede="SETU creates a bridge between people who experience problems and the people, institutions, and resources that can help solve them."
          imageSrc="/assets/community.jpg"
          imageAlt="Community members gathered together, representing the start of the SETU process"
        />

        {/* ── What SETU Is ── */}
        <section className="py-24 sm:py-32 section-shell" aria-label="What SETU is">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal>
              <p className="eyebrow text-[#6f7772] mb-5">WHAT SETU IS</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                A connection, not a
                <br />
                <em
                  className="font-normal text-[#267f68]"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  complaint queue.
                </em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-[#59615c] text-base leading-relaxed">
                <p>
                  SETU is not a place to report a problem and wait. It is a process that takes a
                  clearly described community challenge and connects it with the right people,
                  knowledge, and support to move it toward a practical solution.
                </p>
                <p>
                  That means universities with relevant research capability. Industry and CSR
                  partners who can support real-world pilots. Government involvement where needed.
                  And communities who stay involved throughout — because the solution only works
                  if it works for them.
                </p>
                <p>
                  SETU stays with a challenge from the first description to a confirmed outcome,
                  and it does not count a challenge as resolved until there is evidence that
                  something genuinely changed.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Animated Context Numbers ── */}
        <section className="py-16 sm:py-20 border-y border-[#d9ddd5]" aria-label="SETU context numbers">
          <div className="section-shell">
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                {[
                  { to: 28, suffix: '+', label: 'States across India', sub: 'Communities can share challenges from anywhere.' },
                  { to: 5, suffix: '', label: 'Stages in the loop', sub: 'From first description to verified outcome.' },
                  { to: 100, suffix: '%', label: 'Community-first decisions', sub: 'No solution is confirmed without the community.' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="flex items-baseline gap-0.5 text-[#267f68] font-bold tabular-nums" aria-label={`${stat.to}${stat.suffix} ${stat.label}`}>
                      <span className="text-5xl sm:text-6xl tracking-tighter">
                        <CountUp to={stat.to} duration={2.2} delay={i * 0.2} />
                      </span>
                      <span className="text-3xl">{stat.suffix}</span>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#6f7772] font-bold">{stat.label}</p>
                    <p className="text-sm text-[#59615c] leading-snug max-w-[220px]">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 4 Principles ── */}
        <section className="bg-[#090b0b] py-24 sm:py-32" aria-label="SETU principles">
          <div className="section-shell">
            <ScrollReveal>
              <p className="eyebrow text-[#9de7cf] mb-4">FOUR PRINCIPLES</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white mb-16">
                How SETU thinks
                <br />
                <em
                  className="font-normal text-[#9de7cf]"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  about change.
                </em>
              </h2>
            </ScrollReveal>

            <div className="divide-y divide-white/10">
              {ABOUT_PRINCIPLES.map((principle, i) => (
                <ScrollReveal key={principle.number} delay={i * 0.06} className="py-10 first:pt-0 last:pb-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                    <div className="lg:col-span-1">
                      <span className="font-mono text-xs text-[#9de7cf] font-bold tracking-widest">
                        {principle.number}
                      </span>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                        {principle.title}
                      </h3>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-sm sm:text-base text-[#89918c] leading-relaxed">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── What SETU Is Not ── */}
        <section className="py-24 sm:py-32 section-shell" aria-label="What SETU is not">
          <ScrollReveal>
            <p className="eyebrow text-[#6f7772] mb-5">WHAT SETU IS NOT</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-12">
              Not another portal.
              <br />
              <em
                className="font-normal text-[#267f68]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                Not a hackathon.
              </em>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Not a complaint portal',
                desc: 'SETU does not simply record problems and forward them to an administrative queue. It creates an active, structured path to action.',
              },
              {
                label: 'Not a hackathon',
                desc: 'SETU does not stop at a 36-hour prototype. It supports the long path from an idea to a working, tested solution in the field.',
              },
              {
                label: 'Not a donation directory',
                desc: 'SETU does not list projects for funding without accountability. Partners engage with specific, tracked challenges and measurable outcomes.',
              },
              {
                label: 'Not an AI dashboard',
                desc: 'SETU uses technology to help structure and connect — but humans make every decision that matters, and outcomes are confirmed on the ground.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="p-6 rounded-2xl bg-white border border-[#d9ddd5] h-full flex flex-col justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#a16d67] font-bold mb-3">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[#59615c] leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#dff7ee] py-20 sm:py-28 section-shell text-center" aria-label="Call to action">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#18372e]">
              Want to learn how the process works?
            </h2>
            <p className="mt-4 text-base text-[#267f68] max-w-md mx-auto leading-relaxed">
              See the five stages that take a community challenge from first description to a verified outcome.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 bg-[#267f68] hover:bg-[#18372e] text-white px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md"
              >
                <span>How It Works</span>
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#267f68] text-[#267f68] hover:bg-[#267f68] hover:text-white px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all"
              >
                <span>Get in Touch</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
