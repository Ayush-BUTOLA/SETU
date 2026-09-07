'use client';

import React from 'react';

// ============================================================================
// 1. SELF-CONTAINED VERTICAL MARQUEE ENGINE
// (Zero external dependencies — works in Next.js, Vite, CRA, and standard React)
// ============================================================================

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: string;
}

function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 3,
  duration = '35s',
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ '--duration': duration, '--gap': '1.25rem', ...style } as React.CSSProperties}
      className={`group flex overflow-hidden p-2 [gap:var(--gap)] ${
        vertical ? 'flex-col' : 'flex-row'
      } ${className}`}
    >
      <style>{`
        @keyframes marqueeVerticalUp {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap, 1.25rem))); }
        }
        @keyframes marqueeVerticalDown {
          from { transform: translateY(calc(-100% - var(--gap, 1.25rem))); }
          to { transform: translateY(0); }
        }
        .anim-marquee-vertical-up {
          animation: marqueeVerticalUp var(--duration, 35s) linear infinite;
        }
        .anim-marquee-vertical-down {
          animation: marqueeVerticalDown var(--duration, 35s) linear infinite;
        }
        .marquee-pause:hover .anim-marquee-vertical-up,
        .marquee-pause:hover .anim-marquee-vertical-down {
          animation-play-state: paused;
        }
      `}</style>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around [gap:var(--gap)] ${
              vertical ? 'flex-col' : 'flex-row'
            } ${vertical && !reverse ? 'anim-marquee-vertical-up' : ''} ${
              vertical && reverse ? 'anim-marquee-vertical-down' : ''
            } ${pauseOnHover ? 'marquee-pause' : ''}`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// ============================================================================
// 2. IMAGE CARD COMPONENT
// ============================================================================

interface ImageCardProps {
  img: string;
  height?: number;
  alt?: string;
}

function ImageCard({ img, height = 300, alt = 'Field Action Image' }: ImageCardProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-[#090b0b] select-none"
      style={{ height: `${height}px` }}
    >
      <img
        src={img}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="w-full h-full object-cover pointer-events-none filter brightness-90 contrast-105"
      />
    </div>
  );
}

// ============================================================================
// 3. CURATED DEFAULT IMAGERY
// ============================================================================

const DEFAULT_COL1 = [
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
];

const DEFAULT_COL2 = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
];

const DEFAULT_COL3 = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=80',
];

const HEIGHTS_COL1 = [320, 260, 360, 280, 340];
const HEIGHTS_COL2 = [270, 350, 280, 340, 260];
const HEIGHTS_COL3 = [340, 280, 350, 270, 330];

// ============================================================================
// 4. MAIN EXPORTABLE COMPONENT: HaveAProblemCTA
// ============================================================================

export interface HaveAProblemCTAProps {
  eyebrow?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  onPrimaryClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  onSecondaryClick?: () => void;
  imagesCol1?: string[];
  imagesCol2?: string[];
  imagesCol3?: string[];
  className?: string;
}

export function HaveAProblemCTA({
  eyebrow = 'GET STARTED',
  headlineLine1 = 'Have a problem',
  headlineLine2 = 'worth solving?',
  primaryButtonText = 'Share a Challenge',
  primaryButtonHref = '/contact?reason=share-challenge',
  onPrimaryClick,
  secondaryButtonText = 'Learn How It Works',
  secondaryButtonHref = '/how-it-works',
  onSecondaryClick,
  imagesCol1 = DEFAULT_COL1,
  imagesCol2 = DEFAULT_COL2,
  imagesCol3 = DEFAULT_COL3,
  className = '',
}: HaveAProblemCTAProps) {
  return (
    <section
      className={`relative bg-[#090b0b] overflow-hidden text-white select-none ${className}`}
      aria-label="Call to Action"
    >
      {/* ── Background: 3 Vertical Moving Marquee Columns ── */}
      <div className="absolute inset-0 opacity-40 pointer-events-none select-none flex flex-row items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
        {/* Column 1: Flows UP */}
        <Marquee
          vertical
          repeat={3}
          duration="45s"
          className="flex-1 h-full max-w-[420px]"
        >
          {imagesCol1.map((img, idx) => (
            <ImageCard
              key={`c1-${idx}`}
              img={img}
              height={HEIGHTS_COL1[idx % HEIGHTS_COL1.length]}
            />
          ))}
        </Marquee>

        {/* Column 2: Flows DOWN (Reverse) */}
        <Marquee
          vertical
          reverse
          repeat={3}
          duration="38s"
          className="flex-1 h-full max-w-[420px]"
        >
          {imagesCol2.map((img, idx) => (
            <ImageCard
              key={`c2-${idx}`}
              img={img}
              height={HEIGHTS_COL2[idx % HEIGHTS_COL2.length]}
            />
          ))}
        </Marquee>

        {/* Column 3: Flows UP (hidden on mobile, visible on desktop) */}
        <Marquee
          vertical
          repeat={3}
          duration="50s"
          className="hidden md:flex flex-1 h-full max-w-[420px]"
        >
          {imagesCol3.map((img, idx) => (
            <ImageCard
              key={`c3-${idx}`}
              img={img}
              height={HEIGHTS_COL3[idx % HEIGHTS_COL3.length]}
            />
          ))}
        </Marquee>
      </div>

      {/* ── Radial Spotlight Vignette Mask ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(9,11,11,0.52) 0%, rgba(9,11,11,0.94) 76%)',
        }}
      />

      {/* ── Top & Bottom Soft Feather Fades ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090b0b] via-[#090b0b]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090b0b] via-[#090b0b]/80 to-transparent z-10" />

      {/* ── Centered Interactive Hero Content ── */}
      <div className="relative z-20 min-h-[85svh] sm:min-h-[92svh] flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28">
        {/* Eyebrow */}
        <p className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.24em] text-white/70 mb-5 sm:mb-7 font-medium">
          {eyebrow}
        </p>

        {/* Big Impact Headline */}
        <h2 className="text-[clamp(2.5rem,7vw,6.2rem)] font-light tracking-[-0.03em] leading-[1.04] text-white max-w-4xl mx-auto">
          {headlineLine1}
          <br />
          {headlineLine2}
        </h2>

        {/* Dual Call-to-Action Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {/* Primary Button */}
          {onPrimaryClick ? (
            <button
              type="button"
              onClick={onPrimaryClick}
              className="inline-flex items-center gap-2 bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(157,231,207,0.25)] hover:shadow-[0_12px_35px_rgba(157,231,207,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <span>{primaryButtonText}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          ) : (
            <a
              href={primaryButtonHref}
              className="inline-flex items-center gap-2 bg-[#9de7cf] hover:bg-[#85e1c4] text-[#0c1712] font-semibold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(157,231,207,0.25)] hover:shadow-[0_12px_35px_rgba(157,231,207,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <span>{primaryButtonText}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}

          {/* Secondary Button */}
          {onSecondaryClick ? (
            <button
              type="button"
              onClick={onSecondaryClick}
              className="inline-flex items-center gap-2 bg-transparent border border-white/30 hover:border-white text-white/90 hover:text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 hover:bg-white/5 cursor-pointer"
            >
              <span>{secondaryButtonText}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          ) : (
            <a
              href={secondaryButtonHref}
              className="inline-flex items-center gap-2 bg-transparent border border-white/30 hover:border-white text-white/90 hover:text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 hover:bg-white/5 cursor-pointer"
            >
              <span>{secondaryButtonText}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default HaveAProblemCTA;
