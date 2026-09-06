'use client';

import { useRef, useEffect, useCallback } from 'react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
}

export default function TextPressure({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  strokeWidth = 2,
  className = '',
  minFontSize = 24,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const chars = text.split('');

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  useEffect(() => {
    if (fontUrl) {
      const style = document.createElement('style');
      style.textContent = `@font-face { font-family: '${fontFamily}'; src: url('${fontUrl}'); }`;
      document.head.appendChild(style);
      return () => { document.head.removeChild(style); };
    }
  }, [fontFamily, fontUrl]);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: w } = containerRef.current.getBoundingClientRect();
    let newSize = w / (text.length * 0.5);
    newSize = Math.max(minFontSize, newSize);
    titleRef.current.style.fontSize = `${newSize}px`;
  }, [text, minFontSize]);

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [setSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mouseRef.current = { x: t.clientX, y: t.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const loop = () => {
      cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) / 15;
      cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) / 15;

      spansRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        const d = dist(cursorRef.current, charCenter);
        const maxDist = 200;
        const t = Math.max(0, 1 - d / maxDist);

        const wght = weight ? Math.floor(100 + 800 * t) : 400;
        const wdth = width ? Math.floor(75 + 100 * t) : 100;
        const ital = italic ? t.toFixed(2) : '0';
        const opac = alpha ? (0.3 + 0.7 * t).toFixed(2) : '1';

        span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
        span.style.opacity = opac;
        if (scale) {
          span.style.transform = `scale(${1 + 0.15 * t})`;
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [alpha, italic, scale, weight, width]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
        }
      `}</style>
      <h2
        ref={titleRef}
        style={{
          fontFamily: `'${fontFamily}', sans-serif`,
          color: textColor,
          WebkitTextStroke: stroke ? `${strokeWidth}px ${strokeColor}` : undefined,
          display: 'flex',
          flexWrap: flex ? 'wrap' : 'nowrap',
          lineHeight: 1,
          userSelect: 'none',
          margin: 0,
          padding: 0,
        }}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => { if (el) spansRef.current[i] = el; }}
            style={{
              display: 'inline-block',
              willChange: 'font-variation-settings, opacity, transform',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
}
