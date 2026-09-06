'use client';

import React from 'react';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { PARTNER_CAPABILITIES, STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import PixelCard from '@/components/PixelCard';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';

export default function ForUniversitiesIndustryPage() {
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
          eyebrow="For Partners"
          headline="Bring your expertise"
          headlineEm="where it matters."
          lede="SETU connects universities, research institutions, and industry partners with communities working through real local challenges."
          imageSrc="/assets/harvest.jpg"
          imageAlt="People working together in a field context, representing real-world collaboration"
        />

        {/* ── Who This Is For ── */}
        <section className="py-24 sm:py-32 section-shell" aria-label="Who SETU is for">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal>
              <p className="eyebrow text-[#6f7772] mb-5">WHO THIS IS FOR</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                If you have knowledge,
                <br />
                <em
                  className="font-normal text-[#267f68]"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  SETU creates a path.
                </em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-[#59615c] text-base leading-relaxed">
                <p>
                  Universities and research institutions bring domain knowledge, lab capability,
                  and student teams. Industry and CSR partners bring resources, technical mentorship,
                  and the ability to help test solutions in real conditions. Government bodies can
                  provide context, access, and formal pathways to scale.
                </p>
                <p>
                  SETU structures how these contributions connect to specific community challenges —
                  so that expertise goes where it is actually needed, and the work that results is
                  tied to measurable, confirmed outcomes.
                </p>
                <p>
                  Participation is voluntary and not tied to institutional promises, grants,
                  or guaranteed partnerships. SETU is a connection; what you build from it
                  depends on the challenge, the community, and the collaboration.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 5 Ways to Contribute ── */}
        <section className="bg-[#090b0b] py-24 sm:py-32" aria-label="Ways to contribute">
          <div className="section-shell">
            <ScrollReveal>
              <p className="eyebrow text-[#9de7cf] mb-4">FIVE WAYS TO CONTRIBUTE</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white mb-16">
                How partners work
                <br />
                <em
                  className="font-normal text-[#9de7cf]"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
                >
                  with communities.
                </em>
              </h2>
            </ScrollReveal>

            <div className="divide-y divide-white/10">
              {PARTNER_CAPABILITIES.map((cap, i) => (
                <ScrollReveal key={i} delay={i * 0.06} className="py-8 first:pt-0 last:pb-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-start">
                    <div className="lg:col-span-1">
                      <span className="font-mono text-[11px] text-[#9de7cf] font-bold tracking-widest">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white">{cap.title}</h3>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-sm sm:text-base text-[#89918c] leading-relaxed">
                        {cap.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── What This Looks Like ── */}
        <section className="py-24 sm:py-32 section-shell" aria-label="What partnership looks like">
          <ScrollReveal>
            <p className="eyebrow text-[#6f7772] mb-5">WHAT TO EXPECT</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-12">
              Grounded in reality,
              <br />
              <em
                className="font-normal text-[#267f68]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                not promises.
              </em>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                heading: 'Start with a real challenge',
                body:
                  'Every engagement begins with a validated community challenge — not a hypothetical brief. Partners engage with something specific, described by the people who experience it.',
                variant: 'default' as const,
              },
              {
                heading: 'Work toward a pilot',
                body:
                  'The goal is not a report or a prototype presentation. It is a practical solution that can be tested in the field with the community, in real conditions.',
                variant: 'blue' as const,
              },
              {
                heading: 'Confirm outcomes with evidence',
                body:
                  'Progress is tracked and outcomes are confirmed — not by the partner, but by field evidence and community confirmation. Participation creates a verifiable record of contribution.',
                variant: 'yellow' as const,
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <PixelCard variant={item.variant} className="rounded-3xl h-full">
                  <div className="relative z-10 p-8 rounded-3xl bg-white border border-[#d9ddd5] shadow-sm h-full flex flex-col" style={{ position: 'absolute', inset: 0 }}>
                    <h3 className="font-mono text-sm font-bold text-[#267f68] uppercase tracking-wider mb-3">
                      {item.heading}
                    </h3>
                    <p className="text-sm text-[#59615c] leading-relaxed">{item.body}</p>
                  </div>
                </PixelCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#dff7ee] py-20 sm:py-28 section-shell text-center" aria-label="Partner CTA">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#18372e]">
              Ready to bring your expertise?
            </h2>
            <p className="mt-4 text-base text-[#267f68] max-w-md mx-auto leading-relaxed">
              Contact SETU to discuss how your institution, lab, or company can engage with real community challenges.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?reason=university-expertise"
                className="inline-flex items-center gap-2 bg-[#267f68] hover:bg-[#18372e] text-white px-8 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md"
              >
                Bring Your Expertise
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 border border-[#267f68] text-[#267f68] hover:bg-[#267f68] hover:text-white px-8 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all"
              >
                How It Works
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
