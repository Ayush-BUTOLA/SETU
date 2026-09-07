'use client';

import React, { useRef, useEffect, useState } from 'react';

export interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

/**
 * ReactBits FadeContent component
 * Fades content into view as it scrolls into the viewport.
 */
export default function FadeContent({
  children,
  blur = false,
  duration = 500,
  easing = 'ease-out',
  threshold = 0.1,
  initialOpacity = 0,
  className = '',
}: FadeContentProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(8px)') : 'none',
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      {children}
    </div>
  );
}
