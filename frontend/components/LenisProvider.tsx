'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * LenisProvider — mounts a single Lenis instance for the whole app.
 * Drop this inside RootLayout (client component boundary).
 * Exposes the instance on window.__lenis for GSAP ScrollTrigger integration.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Expose for GSAP ScrollTrigger raf sync
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
