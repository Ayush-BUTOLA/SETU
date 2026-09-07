'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Lenis from 'lenis';

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToMotion(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getMotionSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerMotionSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToMotion,
    getMotionSnapshot,
    getServerMotionSnapshot
  );
}

/**
 * Mount only on this page if not managed globally.
 * If the application already has a global Lenis instance (e.g. window.__lenis),
 * this hook is safely skipped to avoid duplicate scroll loops.
 */
export function usePageLenis(reducedMotion: boolean, enabled: boolean = true) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // If LenisProvider or another Lenis is already active globally, do not instantiate a second one
    if ((window as Window & { __lenis?: Lenis }).__lenis) return;
    if (!enabled || reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    });

    return () => lenis.destroy();
  }, [enabled, reducedMotion]);
}

/**
 * CSS remains fully readable before IntersectionObserver runs.
 * Adds dataset.entered = 'true' once, for purposeful entrance sequences.
 */
export function useEnterOnce<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      element.dataset.entered = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.entered = 'true';
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Updates CSS variable --journey-progress instead of triggering React renders on scroll.
 */
export function useJourneyProgress<T extends HTMLElement = HTMLDivElement>(reducedMotion: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reducedMotion) {
      element.style.setProperty('--journey-progress', '1');
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = Math.max(1, rect.height + viewport * 0.2);
      const progress = Math.min(
        1,
        Math.max(0, (viewport * 0.85 - rect.top) / distance)
      );

      element.style.setProperty('--journey-progress', String(progress));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(schedule) : null;

    resizeObserver?.observe(element);
    update();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return ref;
}
