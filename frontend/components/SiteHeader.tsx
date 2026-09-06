'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/setu-data';
import { ArrowRight } from 'lucide-react';

import { useAuthModal } from '@/context/AuthModalContext';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { openAuth } = useAuthModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[72px] z-30 flex items-center justify-between px-6 sm:px-12 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090b0b]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 font-bold tracking-wider text-sm text-white pointer-events-auto drop-shadow-md hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-white"
        aria-label="SETU home"
      >
        <span className="w-8 h-8 rounded-full bg-white text-black font-serif flex items-center justify-center text-base font-normal shadow-sm">
          S
        </span>
        <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
      </Link>

      {/* Desktop nav — hidden on mobile (StaggeredMenu handles mobile) */}
      <nav
        className="hidden lg:flex items-center gap-7"
        aria-label="Primary navigation"
      >
        {NAV_ITEMS.filter((i) => i.label !== 'Login').map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.ariaLabel}
            className="text-[12px] font-mono uppercase tracking-[0.12em] text-white/75 hover:text-white transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Login CTA */}
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
  );
}
