'use client';

import React from 'react';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { FAQ_ITEMS, STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';

export default function FaqPage() {
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
      <header className="fixed top-0 left-0 right-0 h-[72px] z-30 flex items-center justify-between px-6 sm:px-12 bg-[#f5f6f1]/90 backdrop-blur-md border-b border-[#d9ddd5]">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#101312] hover:opacity-70 transition-opacity"
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

      <main className="pt-[72px]">
        {/* Page intro */}
        <section className="py-16 sm:py-24 section-shell" aria-label="Frequently asked questions">
          <ScrollReveal>
            <p className="eyebrow text-[#6f7772] mb-4">FREQUENTLY ASKED QUESTIONS</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-xl">
              Common questions
              <br />
              <em
                className="font-normal text-[#267f68]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                about SETU.
              </em>
            </h1>
            <p className="mt-4 text-base text-[#59615c] leading-relaxed max-w-lg">
              Short, plain-language answers to the most common questions about what SETU is and how it works.
            </p>
          </ScrollReveal>
        </section>

        {/* FAQ accordion */}
        <section className="section-shell pb-24 sm:pb-32" aria-label="FAQ list">
          <div className="max-w-3xl">
            <ScrollReveal>
              <Accordion className="divide-y divide-[#d9ddd5] border-t border-[#d9ddd5]">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border-none"
                  >
                    <AccordionTrigger
                      className="py-6 text-left group hover:no-underline focus-visible:outline-2 focus-visible:outline-[#267f68] [&[data-state=open]>svg]:rotate-180"
                      aria-label={item.question}
                    >
                      <div className="space-y-1 pr-4">
                        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#6f7772] group-hover:text-[#267f68] transition-colors block">
                          Q{String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg sm:text-xl font-semibold text-[#101312] group-hover:text-[#267f68] transition-colors leading-snug block">
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-sm sm:text-base text-[#59615c] leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#eef0e9] py-16 sm:py-24 section-shell text-center border-t border-[#d9ddd5]" aria-label="More help">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#101312] mb-3">
              Still have a question?
            </h2>
            <p className="text-sm sm:text-base text-[#59615c] max-w-md mx-auto leading-relaxed mb-8">
              If you did not find what you were looking for, reach out directly or explore how SETU works in more detail.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#101312] text-white hover:bg-[#267f68] px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md"
              >
                Contact SETU
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 border border-[#d9ddd5] hover:border-[#101312] text-[#101312] px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all"
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
