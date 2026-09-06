'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    src: '/assets/setu-hero.avif',
    alt: 'Community member documenting local challenge',
  },
  {
    src: '/assets/community.jpg',
    alt: 'Village community gathering discussing water and infrastructure',
  },
  {
    src: '/assets/water.jpg',
    alt: 'Field water testing and local well sampling',
  },
  {
    src: '/assets/fields.jpg',
    alt: 'Agricultural fields and irrigation network in rural district',
  },
];

export function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-[#07130e] overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover object-center filter contrast-[1.06] saturate-[0.75] brightness-[0.82] transition-transform duration-[7000ms] ease-out scale-100"
            sizes="100vw"
          />
        </div>
      ))}
      {/* Subtle cinematic gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030907]/60 via-[#030907]/25 to-[#030907]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(3,9,7,0.6)_100%)]" />
    </div>
  );
}

export default HeroSlideshow;
