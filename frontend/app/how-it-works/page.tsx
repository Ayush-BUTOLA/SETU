'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { HOW_IT_WORKS_STEPS, STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import TextPressure from '@/components/TextPressure';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorksPage() {
  const { openAuth } = useAuthModal();
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const stepEls = stepsRef.current?.querySelectorAll('[data-step]');
    if (!stepEls) return;

    stepEls.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );
    });

    // Animate progress line on desktop
    if (progressLineRef.current) {
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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

      {/* Sticky header for inner pages */}
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
        {/* ── Page Hero ── */}
        <section
          className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-12 text-white overflow-hidden"
          aria-label="How SETU works"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/assets/valley.jpg"
              alt="Valley landscape representing the breadth of communities SETU connects"
              fill
              priority
              className="object-cover object-center filter contrast-[1.04] saturate-[0.75]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0b]/80 via-[#090b0b]/45 to-[#090b0b]/20" />
          </div>

          <div className="relative z-10 max-w-[1180px] mx-auto w-full">
            <div className="mb-4">
              <TextPressure
                text="THE SETU PROCESS"
                fontFamily="Inter"
                fontUrl=""
                width={true}
                weight={true}
                italic={false}
                alpha={true}
                scale={false}
                textColor="#9de7cf"
                className=""
                minFontSize={11}
              />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-white drop-shadow-md max-w-2xl">
              From a real problem
              <br />
              <em
                className="font-normal text-[#b9f2df]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                to a verified outcome.
              </em>
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed font-light">
              SETU has five stages. Each one moves a community challenge forward — from the
              first description to a tested, confirmed solution.
            </p>
          </div>
        </section>

        {/* ── 5 Steps ── */}
        <section
          className="py-24 sm:py-32"
          aria-label="Five-step process"
        >
          <div className="section-shell">
            {/* Desktop: two-column with vertical progress line */}
            <div ref={stepsRef} className="relative">
              {/* Progress line (desktop only) */}
              <div
                className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-[2px] bg-[#d9ddd5] origin-top"
                aria-hidden="true"
              >
                <div
                  ref={progressLineRef}
                  className="w-full h-full bg-[#267f68] origin-top scale-y-0"
                />
              </div>

              <div className="space-y-20 sm:space-y-28">
                {HOW_IT_WORKS_STEPS.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={step.number}
                      data-step
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center ${
                        isEven ? '' : 'lg:[&>*:first-child]:order-2'
                      }`}
                    >
                      {/* Text side */}
                      <div className={`space-y-5 ${isEven ? '' : 'lg:order-2'}`}>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-[#267f68] font-bold tracking-[0.18em] uppercase">
                            {step.number}
                          </span>
                          <span className="w-5 h-[1px] bg-[#d9ddd5]" aria-hidden="true" />
                          <span className="font-mono text-[11px] text-[#6f7772] tracking-widest uppercase">
                            Step {step.number}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                          <span className="text-[#267f68]">{step.verb}</span>
                        </h2>

                        <p className="text-xl sm:text-2xl font-semibold text-[#101312] leading-snug">
                          {step.headline}
                        </p>

                        <p className="text-sm sm:text-base text-[#59615c] leading-relaxed max-w-sm">
                          {step.body}
                        </p>
                      </div>

                      {/* Image side */}
                      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e7e2] shadow-md ${isEven ? 'lg:order-2' : ''}`}>
                        <Image
                          src={step.image}
                          alt={step.imageAlt}
                          fill
                          className="object-cover object-center filter saturate-[0.85] contrast-[1.04]"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Step number overlay */}
                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#090b0b]/70 backdrop-blur-sm text-[#9de7cf] font-mono text-[10px] font-bold tracking-widest uppercase">
                          {step.verb}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress indicator (mobile) */}
            <div className="lg:hidden mt-14 flex items-center justify-center gap-2" aria-hidden="true">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="w-6 h-[2px] rounded-full bg-[#267f68]"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Summary Banner ── */}
        <section className="bg-[#090b0b] py-20 sm:py-28 px-6 sm:px-12" aria-label="Process summary">
          <div className="max-w-[1180px] mx-auto">
            <ScrollReveal>
              <p className="eyebrow text-[#9de7cf] mb-6 text-center">THE FIVE STEPS</p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-0">
                {HOW_IT_WORKS_STEPS.map((step, i) => (
                  <React.Fragment key={step.number}>
                    <div className="text-center px-4 py-2">
                      <div className="font-mono text-[10px] text-[#6f7772] tracking-widest uppercase mb-1">
                        {step.number}
                      </div>
                      <div className="font-mono text-sm font-bold text-white">{step.verb}</div>
                    </div>
                    {i < HOW_IT_WORKS_STEPS.length - 1 && (
                      <div className="hidden sm:flex items-center text-[#267f68] font-bold text-lg px-1" aria-hidden="true">
                        →
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 sm:py-28 section-shell text-center" aria-label="Call to action">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#101312]">
              Ready to bring a challenge forward?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#59615c] max-w-lg mx-auto leading-relaxed">
              SETU is designed for communities, institutions, and anyone who wants to help
              local problems find practical solutions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?reason=share-challenge"
                className="inline-flex items-center gap-2 bg-[#267f68] hover:bg-[#18372e] text-white px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md"
              >
                <span>Share a Challenge</span>
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/explore-challenges"
                className="inline-flex items-center gap-2 border border-[#d9ddd5] hover:border-[#101312] text-[#101312] px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all"
              >
                <span>Explore Challenges</span>
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
