'use client';

import { useRef, useEffect, useState, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Local useGSAP hook (avoids @gsap/react dependency)
function useGSAP(fn: () => (() => void) | void, opts?: { scope?: React.RefObject<any>; dependencies?: any[] }) {
  useEffect(() => {
    return fn() || undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, opts?.dependencies ?? []);
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  tag?: ElementType;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag: Tag = 'p',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      // Manually split text into spans
      let units: string[] = [];
      if (splitType === 'words') {
        units = text.split(' ');
      } else if (splitType === 'lines') {
        units = text.split('\n');
      } else {
        units = text.split('');
      }

      el.innerHTML = units
        .map((u, i) => {
          const display = u === ' ' ? '&nbsp;' : u;
          const gap = splitType === 'words' && i < units.length - 1 ? '&nbsp;' : '';
          return `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="rb-split-unit" style="display:inline-block">${display}</span></span>${gap}`;
        })
        .join('');

      const unitEls = el.querySelectorAll<HTMLElement>('.rb-split-unit');

      gsap.set(unitEls, from);

      ScrollTrigger.create({
        trigger: el,
        start: `top bottom${rootMargin}`,
        once: true,
        onEnter: () => {
          gsap.to(unitEls, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            onComplete: onLetterAnimationComplete,
          });
        },
      });
    },
    { scope: ref, dependencies: [text, fontsLoaded, delay, duration, ease, splitType] }
  );

  return (
    <Tag
      ref={ref as React.Ref<any>}
      className={className}
      style={{ textAlign: textAlign as React.CSSProperties['textAlign'], willChange: 'transform' }}
      aria-label={text}
    />
  );
}
