'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import { ArrowRight, ArrowUpRight, Search, MapPin, Tag, Clock, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthModal } from '@/context/AuthModalContext';

const ILLUSTRATIVE_CHALLENGES = [
  {
    id: 'wc-01',
    title: 'Seasonal water scarcity in village areas',
    location: 'Rural district (illustrative)',
    category: 'Water & Sanitation',
    status: 'Open',
    summary:
      'Community members experience water shortages during dry months, affecting daily needs and small-scale agriculture.',
    note: 'Illustrative challenge',
  },
  {
    id: 'wc-02',
    title: 'Post-harvest losses affecting smallholder farmers',
    location: 'Agricultural area (illustrative)',
    category: 'Agriculture & Livelihoods',
    status: 'Open',
    summary:
      'Farmers report significant losses due to lack of storage, transport access, and market information before produce reaches buyers.',
    note: 'Illustrative challenge',
  },
  {
    id: 'wc-03',
    title: 'Accessibility barriers in public spaces',
    location: 'Urban neighbourhood (illustrative)',
    category: 'Infrastructure & Access',
    status: 'In Progress',
    summary:
      'Residents with mobility difficulties describe challenges navigating damaged footpaths, missing ramps, and poor lighting in shared public areas.',
    note: 'Illustrative challenge',
  },
];

const CATEGORIES = [
  'All categories',
  'Water & Sanitation',
  'Agriculture & Livelihoods',
  'Infrastructure & Access',
  'Health',
  'Education',
  'Environment',
];

const STATUSES = ['All statuses', 'Open', 'In Progress', 'Piloting', 'Verified'];

const LOCATIONS = ['All locations', 'Rural', 'Urban', 'Peri-urban'];

export default function ExploreChallengesPage() {
  const { openAuth } = useAuthModal();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [status, setStatus] = useState('All statuses');
  const [location, setLocation] = useState('All locations');

  const filtered = ILLUSTRATIVE_CHALLENGES.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q);
    const matchCat = category === 'All categories' || c.category === category;
    const matchStatus = status === 'All statuses' || c.status === status;
    const matchLocation =
      location === 'All locations' ||
      c.location.toLowerCase().includes(location.toLowerCase());
    return matchSearch && matchCat && matchStatus && matchLocation;
  });

  const hasActiveFilter =
    search ||
    category !== 'All categories' ||
    status !== 'All statuses' ||
    location !== 'All locations';

  const clearFilters = () => {
    setSearch('');
    setCategory('All categories');
    setStatus('All statuses');
    setLocation('All locations');
  };

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
          className="flex items-center gap-2.5 font-bold text-[#101312] hover:opacity-70 transition-opacity"
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
        <section className="py-16 sm:py-24 section-shell" aria-label="Explore challenges">
          <ScrollReveal>
            <p className="eyebrow text-[#6f7772] mb-4">PUBLIC CHALLENGES</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-xl">
              Explore community
              <br />
              <em
                className="font-normal text-[#267f68]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                challenges.
              </em>
            </h1>
            <p className="mt-4 text-base text-[#59615c] leading-relaxed max-w-lg">
              These are real or illustrative local challenges brought forward by communities.
              Browse what is here, and share your own challenge if you see a gap.
            </p>
          </ScrollReveal>

          {/* Notice about sample content */}
          <div className="mt-8 p-4 rounded-xl bg-[#f0f9f5] border border-[#9de7cf]/60 text-sm text-[#267f68] max-w-2xl">
            <strong className="font-mono text-xs uppercase tracking-wider block mb-1">Note</strong>
            The challenges shown below are illustrative examples included to demonstrate the format.
            No real community data, locations, or verified outcomes are displayed.
          </div>
        </section>

        {/* Filters */}
        <section className="section-shell pb-8" aria-label="Filter challenges">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6f7772]" aria-hidden="true" />
              <Input
                placeholder="Search challenges…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white border-[#d9ddd5] focus:border-[#267f68] focus:ring-[#267f68]/20 font-mono text-sm"
                aria-label="Search challenges"
              />
            </div>

            {/* Location filter */}
            <Select value={location} onValueChange={(v) => setLocation(v ?? 'All locations')}>
              <SelectTrigger
                className="w-full sm:w-[180px] bg-white border-[#d9ddd5] font-mono text-sm"
                aria-label="Filter by location"
              >
                <MapPin className="size-3.5 text-[#6f7772] mr-1.5" aria-hidden="true" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((l) => (
                  <SelectItem key={l} value={l} className="font-mono text-sm">
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category filter */}
            <Select value={category} onValueChange={(v) => setCategory(v ?? 'All categories')}>
              <SelectTrigger
                className="w-full sm:w-[200px] bg-white border-[#d9ddd5] font-mono text-sm"
                aria-label="Filter by category"
              >
                <Tag className="size-3.5 text-[#6f7772] mr-1.5" aria-hidden="true" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="font-mono text-sm">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status filter */}
            <Select value={status} onValueChange={(v) => setStatus(v ?? 'All statuses')}>
              <SelectTrigger
                className="w-full sm:w-[160px] bg-white border-[#d9ddd5] font-mono text-sm"
                aria-label="Filter by status"
              >
                <Clock className="size-3.5 text-[#6f7772] mr-1.5" aria-hidden="true" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className="font-mono text-sm">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilter && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9ddd5] text-[#6f7772] hover:text-[#101312] hover:border-[#101312] transition-colors text-[11px] font-mono uppercase tracking-wider"
                aria-label="Clear all filters"
              >
                <X className="size-3.5" />
                Clear
              </button>
            )}
          </div>
        </section>

        {/* Challenge cards */}
        <section className="section-shell pb-24 sm:pb-32" aria-label="Challenge list" aria-live="polite">
          {filtered.length === 0 ? (
            /* Empty state */
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-[#eef0e9] border border-[#d9ddd5] flex items-center justify-center mx-auto mb-6">
                <Search className="size-6 text-[#6f7772]" />
              </div>
              <h2 className="text-xl font-bold text-[#101312] mb-2">No challenges found</h2>
              <p className="text-sm text-[#59615c] max-w-sm mx-auto leading-relaxed mb-6">
                No public challenges match your current filters. Try broadening your search, or be the first to bring a local problem forward.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-mono uppercase tracking-wider text-[#267f68] underline underline-offset-2"
                >
                  Clear filters
                </button>
                <Link
                  href="/contact?reason=share-challenge"
                  className="inline-flex items-center gap-2 bg-[#267f68] text-white px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all"
                >
                  Share a Challenge
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((challenge) => (
                <article
                  key={challenge.id}
                  className="bg-white border border-[#d9ddd5] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Top */}
                  <div>
                    {/* Illustrative label */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0f9f5] border border-[#9de7cf]/50 text-[#267f68] text-[10px] font-mono uppercase tracking-wider font-bold mb-4">
                      {challenge.note}
                    </div>

                    <h2 className="text-base font-bold text-[#101312] leading-snug mb-3">
                      {challenge.title}
                    </h2>

                    <p className="text-xs text-[#59615c] leading-relaxed mb-4">
                      {challenge.summary}
                    </p>
                  </div>

                  {/* Bottom meta */}
                  <div className="pt-4 border-t border-[#d9ddd5] flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#6f7772] uppercase tracking-wider">
                        <MapPin className="size-3" />
                        {challenge.location}
                      </span>
                      <span className="text-[10px] font-mono text-[#6f7772] uppercase tracking-wider">
                        · {challenge.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        challenge.status === 'Open'
                          ? 'bg-[#dff7ee] text-[#267f68]'
                          : challenge.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-[#eef0e9] text-[#6f7772]'
                      }`}
                    >
                      {challenge.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Default empty state if no data at all */}
          {ILLUSTRATIVE_CHALLENGES.length === 0 && (
            <div className="py-32 text-center">
              <h2 className="text-2xl font-bold text-[#101312] mb-3">
                No public challenges are available yet.
              </h2>
              <p className="text-base text-[#59615c] max-w-md mx-auto leading-relaxed mb-8">
                Be the first to bring a local problem forward.
              </p>
              <Link
                href="/contact?reason=share-challenge"
                className="inline-flex items-center gap-2 bg-[#267f68] text-white px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider"
              >
                Share a Challenge
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          )}
        </section>

        {/* CTA banner */}
        <section className="bg-[#090b0b] py-16 sm:py-20 section-shell text-center" aria-label="Share a challenge">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              See something that affects your community?
            </h2>
            <p className="text-sm sm:text-base text-[#89918c] max-w-md mx-auto leading-relaxed mb-8">
              SETU helps communities bring local challenges into a process that connects them with the right people to help.
            </p>
            <Link
              href="/contact?reason=share-challenge"
              className="inline-flex items-center gap-2 bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold px-7 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md"
            >
              Share a Challenge
              <ArrowUpRight className="size-4" />
            </Link>
          </ScrollReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
