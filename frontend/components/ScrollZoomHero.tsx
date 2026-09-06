'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook to get scroll-zoom transform values for a given section ref.
 * Attach containerRef to the hero <section>, then bind the returned
 * motion values to the background and content layers.
 */
export function useScrollZoom(containerRef: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring for fluid, non-janky feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Background image zooms 1 ? 1.25 as section scrolls away
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.25]);
  // Background dims as user scrolls
  const bgOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0.5]);
  // Hero content floats upward
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  // Hero content fades out before section exits
  const contentOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);

  return { bgScale, bgOpacity, contentY, contentOpacity };
}
