'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
  title?: string;
  category?: string;
  location?: string;
}

export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  marqueeMiddleColumn?: boolean;
  marqueeOppositeColumns?: boolean;
  marqueeSpeedSeconds?: number;
  className?: string;
}

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const matchIndex = queries.findIndex((q) => window.matchMedia(q).matches);
    return matchIndex !== -1 ? values[matchIndex] : defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => window.matchMedia(q).addEventListener('change', handler));
    return () => {
      queries.forEach((q) => window.matchMedia(q).removeEventListener('change', handler));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  marqueeMiddleColumn = true,
  marqueeOppositeColumns = true,
  marqueeSpeedSeconds = 28,
  className = '',
}: MasonryProps) {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 3, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  // When marqueeMiddleColumn is enabled, render multi-column marquee layout
  // Column 1 moves UP, while Columns 0 & 2 move in OPPOSITE direction (DOWN)
  if (marqueeMiddleColumn) {
    const col0Items = items.filter((_, idx) => idx % 3 === 0);
    const col1Items = items.filter((_, idx) => idx % 3 === 1);
    const col2Items = items.filter((_, idx) => idx % 3 === 2);

    const speedUp = marqueeSpeedSeconds;
    const speedDownLeft = Math.round(marqueeSpeedSeconds * 1.25);
    const speedDownRight = Math.round(marqueeSpeedSeconds * 1.15);

    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        {/* Keyframe animations for bidirectional multi-column marquee */}
        <style>{`
          @keyframes marqueeScrollUp {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-50%); }
          }
          @keyframes marqueeScrollDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0%); }
          }
          .animate-marquee-up {
            animation: marqueeScrollUp ${speedUp}s linear infinite;
          }
          .animate-marquee-down-left {
            animation: marqueeScrollDown ${speedDownLeft}s linear infinite;
          }
          .animate-marquee-down-right {
            animation: marqueeScrollDown ${speedDownRight}s linear infinite;
          }
          .column-scroll-group:hover .animate-marquee-up,
          .column-scroll-group:hover .animate-marquee-down-left,
          .column-scroll-group:hover .animate-marquee-down-right {
            animation-play-state: paused;
          }
        `}</style>

        {/* Top and Bottom gentle gradient fades for editorial polish */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f5f6f1] via-[#f5f6f1]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f5f6f1] via-[#f5f6f1]/90 to-transparent z-20" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-h-[740px] overflow-hidden px-2 sm:px-4">
          {/* Column 0: Left Column (Moves DOWN in opposite direction of Col 1) */}
          <div className="relative overflow-hidden h-[740px] rounded-2xl column-scroll-group">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#d9ddd5] border border-white/20 text-[10px] font-mono uppercase tracking-widest font-semibold shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d9ddd5]/80" />
                Ground Challenges
              </span>
            </div>

            <div className={marqueeOppositeColumns ? 'flex flex-col gap-5 animate-marquee-down-left' : 'flex flex-col gap-5'}>
              {col0Items.map((item) => (
                <MasonryCard
                  key={`orig-col0-${item.id}`}
                  item={item}
                  scaleOnHover={scaleOnHover}
                  hoverScale={hoverScale}
                  colorShiftOnHover={colorShiftOnHover}
                />
              ))}
              {marqueeOppositeColumns &&
                col0Items.map((item) => (
                  <MasonryCard
                    key={`dup-col0-${item.id}`}
                    item={item}
                    scaleOnHover={scaleOnHover}
                    hoverScale={hoverScale}
                    colorShiftOnHover={colorShiftOnHover}
                  />
                ))}
            </div>
          </div>

          {/* Column 1: Middle Column (Moves UP) */}
          <div className="relative overflow-hidden h-[740px] rounded-2xl column-scroll-group">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#9de7cf] border border-[#9de7cf]/40 text-[10px] font-mono uppercase tracking-widest font-semibold shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9de7cf] animate-pulse" />
                Active Pilots
              </span>
            </div>

            <div className="flex flex-col gap-5 animate-marquee-up">
              {col1Items.map((item) => (
                <MasonryCard
                  key={`orig-col1-${item.id}`}
                  item={item}
                  scaleOnHover={scaleOnHover}
                  hoverScale={hoverScale}
                  colorShiftOnHover={colorShiftOnHover}
                />
              ))}
              {col1Items.map((item) => (
                <MasonryCard
                  key={`dup-col1-${item.id}`}
                  item={item}
                  scaleOnHover={scaleOnHover}
                  hoverScale={hoverScale}
                  colorShiftOnHover={colorShiftOnHover}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Right Column (Moves DOWN in opposite direction of Col 1) */}
          <div className="hidden md:block relative overflow-hidden h-[740px] rounded-2xl column-scroll-group">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#f9d889] border border-[#f9d889]/40 text-[10px] font-mono uppercase tracking-widest font-semibold shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f9d889]" />
                Verified Outcomes
              </span>
            </div>

            <div className={marqueeOppositeColumns ? 'flex flex-col gap-5 animate-marquee-down-right' : 'flex flex-col gap-5'}>
              {col2Items.map((item) => (
                <MasonryCard
                  key={`orig-col2-${item.id}`}
                  item={item}
                  scaleOnHover={scaleOnHover}
                  hoverScale={hoverScale}
                  colorShiftOnHover={colorShiftOnHover}
                />
              ))}
              {marqueeOppositeColumns &&
                col2Items.map((item) => (
                  <MasonryCard
                    key={`dup-col2-${item.id}`}
                    item={item}
                    scaleOnHover={scaleOnHover}
                    hoverScale={hoverScale}
                    colorShiftOnHover={colorShiftOnHover}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: Standard React Bits GSAP Masonry Grid
  return (
    <StandardReactBitsMasonry
      items={items}
      columns={columns}
      containerRef={containerRef}
      width={width}
      imagesReady={imagesReady}
      duration={duration}
      ease={ease}
      stagger={stagger}
      animateFrom={animateFrom}
      scaleOnHover={scaleOnHover}
      hoverScale={hoverScale}
      blurToFocus={blurToFocus}
      colorShiftOnHover={colorShiftOnHover}
      className={className}
    />
  );
}

// Single Card Component with hover effects and optional tags
function MasonryCard({
  item,
  scaleOnHover,
  hoverScale,
  colorShiftOnHover,
}: {
  item: MasonryItem;
  scaleOnHover: boolean;
  hoverScale: number;
  colorShiftOnHover: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (scaleOnHover && cardRef.current) {
      gsap.to(cardRef.current, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (scaleOnHover && cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all bg-[#090b0b]"
      style={{ minHeight: `${Math.round((item.height || 480) * 0.58)}px` }}
      onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${item.img})` }}
      />

      {/* Dark overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {colorShiftOnHover && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#267f68]/40 to-[#9de7cf]/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}

      {/* Content overlay */}
      {(item.title || item.category || item.location) && (
        <div className="relative z-10 p-5 flex flex-col justify-end h-full min-h-[160px] text-white">
          {item.category && (
            <span className="inline-block self-start text-[10px] font-mono uppercase tracking-widest font-semibold text-[#9de7cf] bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 mb-2">
              {item.category}
            </span>
          )}
          {item.title && (
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-sm">
              {item.title}
            </h4>
          )}
          {item.location && (
            <p className="text-[11px] text-white/80 font-mono mt-1 flex items-center gap-1">
              <span>📍</span> {item.location}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Standard GSAP Grid as specified by React Bits
function StandardReactBitsMasonry({
  items,
  columns,
  containerRef,
  width,
  imagesReady,
  duration,
  ease,
  stagger,
  animateFrom,
  scaleOnHover,
  hoverScale,
  blurToFocus,
  colorShiftOnHover,
  className,
}: any) {
  const getInitialPosition = (item: any) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((child: any) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item: any, index: number) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto',
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full h-[600px] ${className}`}>
      {grid.map((item: any) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-[14px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[14px] bg-gradient-to-tr from-[#267f68]/50 to-[#9de7cf]/50 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
