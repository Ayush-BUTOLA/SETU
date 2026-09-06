'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts (default 0) */
  delay?: number;
  /** Distance to translate from (default 28px) */
  distance?: number;
  /** Custom trigger start offset (default "top 85%") */
  start?: string;
}

/**
 * GSAP ScrollTrigger fade-up wrapper.
 * Respects `prefers-reduced-motion` — on reduced motion, element is immediately visible.
 * Hydration safe: only runs in the browser.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 28,
  start = 'top 85%',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = ref.current;

    // Set initial state
    gsap.set(el, { opacity: 0, y: distance });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay,
          ease: 'power2.out',
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [delay, distance, start]);

  return (
    <div ref={ref} className={className} data-gsap-reveal>
      {children}
    </div>
  );
}
