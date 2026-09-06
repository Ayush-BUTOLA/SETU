'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { IMPACT_STORIES, STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';

export default function ImpactStoriesPage() {
  const { openAuth } = useAuthModal();

  return (
    <div className="min-h-screen bg-[#f5f6f1] text-[#101312]">
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
      <header className="fixed top-0 left-0 right-0 h-[72px] z-30 flex items-center justify-between px-6 sm:px-12 bg-transparent">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white drop-shadow-md hover:opacity-80 transition-opacity"
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
        <section
          className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-12 text-white overflow-hidden"
          aria-label="Impact stories"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/assets/landscape.jpg"
              alt="Wide landscape representing the scope of communities SETU connects"
              fill
              priority
              className="object-cover object-center filter contrast-[1.04] saturate-[0.75]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0b]/85 via-[#090b0b]/50 to-[#090b0b]/20" />
          </div>

          <div className="relative z-10 max-w-[1180px] mx-auto w-full">
            <p className="eyebrow text-[#9de7cf] mb-4">IMPACT STORIES</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-white max-w-2xl">
              What communities
              <br />
              <em
                className="font-normal text-[#b9f2df]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                are working toward.
              </em>
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed font-light">
              These stories are in progress. They describe the challenge, the people who experience it,
              and what a successful pilot would change — honestly, without claiming outcomes that have not happened yet.
            </p>
          </div>
        </section>

        {/* ── Honest Disclaimer ── */}
        <section className="section-shell py-10" aria-label="Content disclaimer">
          <div className="p-4 rounded-xl bg-[#f0f9f5] border border-[#9de7cf]/60 text-sm text-[#267f68] max-w-2xl">
            <strong className="font-mono text-xs uppercase tracking-wider block mb-1">
              About these stories
            </strong>
            All stories shown here are labelled &ldquo;Story in progress.&rdquo; They represent the kinds of challenges
            SETU is designed to support — not confirmed outcomes. No metrics, funding totals, or
            verified impact figures are shown.
          </div>
        </section>

        {/* ── Stories ── */}
        <section className="section-shell pb-24 sm:pb-32" aria-label="Impact story list">
          <div className="space-y-20 sm:space-y-28">
            {IMPACT_STORIES.map((story, index) => {
              const isEven = index % 2 === 0;
              return (
                <article
                  key={story.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:[&>*:first-child]:order-2'
                  }`}
                  aria-label={`Story: ${story.category}`}
                >
                  {/* Image */}
                  <ScrollReveal className={isEven ? '' : 'lg:order-2'}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e7e2] shadow-md">
                      <Image
                        src={story.image}
                        alt={story.imageAlt}
                        fill
                        className="object-cover object-center filter saturate-[0.85] contrast-[1.04]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Status label overlay */}
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#090b0b]/75 backdrop-blur-sm text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                        <Clock className="size-3" />
                        {story.status}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Content */}
                  <ScrollReveal delay={0.1}>
                    <div className="space-y-6">
                      {/* Category badge */}
                      <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-[#267f68] font-bold">
                        {story.category}
                      </span>

                      {/* The Challenge */}
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#101312] leading-snug mb-3">
                          The challenge
                        </h2>
                        <p className="text-sm sm:text-base text-[#59615c] leading-relaxed">
                          {story.challenge}
                        </p>
                      </div>

                      {/* Story structure */}
                      <div className="space-y-4 pt-2 border-t border-[#d9ddd5]">
                        <div>
                          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-1.5 font-semibold">
                            Who experiences it
                          </h3>
                          <p className="text-sm text-[#59615c] leading-relaxed">
                            {story.whoExperiences}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-1.5 font-semibold">
                            What collaboration is needed
                          </h3>
                          <p className="text-sm text-[#59615c] leading-relaxed">
                            {story.collaborationNeeded}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-1.5 font-semibold">
                            What a successful pilot would change
                          </h3>
                          <p className="text-sm text-[#59615c] leading-relaxed">
                            {story.pilotOutcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── More Stories Placeholder ── */}
        <section className="section-shell pb-20 sm:pb-28" aria-label="More stories coming">
          <ScrollReveal>
            <div className="p-10 sm:p-14 rounded-3xl bg-[#eef0e9] border border-[#d9ddd5] text-center">
              <p className="eyebrow text-[#6f7772] mb-3">MORE TO COME</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101312] mb-3">
                Stories are added as challenges progress.
              </h2>
              <p className="text-sm sm:text-base text-[#59615c] max-w-md mx-auto leading-relaxed mb-8">
                Every challenge that moves forward through the SETU process has the potential
                to become a story. New stories will appear here as communities, institutions,
                and partners make progress together.
              </p>
              <Link
                href="/explore-challenges"
                className="inline-flex items-center gap-2 bg-[#101312] text-white hover:bg-[#267f68] px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md"
              >
                Explore Challenges
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
