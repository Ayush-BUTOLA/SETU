import React from 'react';
import Image from 'next/image';

interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  headlineEm?: string; // italic serif emphasis part
  lede?: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional overlay darkness 0–100 (default 65) */
  overlayOpacity?: number;
  children?: React.ReactNode;
}

/**
 * Reusable full-bleed hero for inner pages.
 * Uses a documentary image with dark overlay + eyebrow + headline + optional lede.
 * The italic serif em is rendered in mint-tinted Lora italic.
 */
export default function PageHero({
  eyebrow,
  headline,
  headlineEm,
  lede,
  imageSrc,
  imageAlt,
  overlayOpacity = 65,
  children,
}: PageHeroProps) {
  return (
    <section
      className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-12 text-white overflow-hidden"
      aria-label={headline}
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center filter contrast-[1.04] saturate-[0.8]"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(9,11,11,${overlayOpacity / 100}) 0%, rgba(9,11,11,0.45) 50%, rgba(9,11,11,0.25) 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1180px] mx-auto w-full">
        {eyebrow && (
          <p className="eyebrow text-[#9de7cf] mb-4" aria-hidden="true">
            {eyebrow}
          </p>
        )}

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-white drop-shadow-md max-w-3xl">
          {headline}
          {headlineEm && (
            <>
              <br />
              <em
                className="font-normal tracking-tight text-[#b9f2df]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                {headlineEm}
              </em>
            </>
          )}
        </h1>

        {lede && (
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/80 font-light leading-relaxed">
            {lede}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
