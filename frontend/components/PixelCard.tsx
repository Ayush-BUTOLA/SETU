'use client';

import { useEffect, useRef } from 'react';

interface PixelCardProps {
  variant?: 'default' | 'blue' | 'yellow' | 'pink' | 'red';
  gap?: number;
  speed?: number;
  colors?: string[];
  noFocus?: boolean;
  className?: string;
  children?: React.ReactNode;
}

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

const VARIANTS: Record<string, string[]> = {
  default: ['#f8fafc', '#f1f5f9', '#cbd5e1'],
  blue: ['#CBDCF8', '#89b4f7', '#629cf3'],
  yellow: ['#FEFCE8', '#FEF08A', '#FDE047'],
  pink: ['#FAF0F2', '#FEC8D8', '#FFACBB'],
  red: ['#FFF0F0', '#FFCCC8', '#FFBBBB'],
};

function getEffectiveColors(variant: string, colors?: string[]) {
  if (colors && colors.length > 0) return colors;
  return VARIANTS[variant] ?? VARIANTS.default;
}

export default function PixelCard({
  variant = 'default',
  gap = 5,
  speed = 35,
  colors,
  noFocus = false,
  className = '',
  children,
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const timePreviousRef = useRef(performance.now());
  const isRunningRef = useRef(false);

  const initPixels = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const effectiveColors = getEffectiveColors(variant, colors);
    const pixels: Pixel[] = [];
    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const color = effectiveColors[Math.floor(Math.random() * effectiveColors.length)];
        const dx = x - canvas.width / 2;
        const dy = y - canvas.height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const delay = dist;
        pixels.push(new Pixel(canvas, ctx, x, y, color, speed, delay));
      }
    }
    pixelsRef.current = pixels;
  };

  const doAnimate = (fnName: 'appear' | 'disappear') => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    isRunningRef.current = true;
    const animate = (timestamp: number) => {
      const delta = timestamp - timePreviousRef.current;
      timePreviousRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      pixelsRef.current.forEach((px) => {
        px[fnName]();
        if (!px.isIdle) allIdle = false;
      });

      if (allIdle) {
        isRunningRef.current = false;
        return;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleEnter = () => {
    cancelAnimationFrame(animationRef.current);
    initPixels();
    doAnimate('appear');
  };

  const handleLeave = () => {
    cancelAnimationFrame(animationRef.current);
    doAnimate('disappear');
  };

  useEffect(() => {
    initPixels();
    return () => cancelAnimationFrame(animationRef.current);
  }, [gap, speed, variant, colors]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={noFocus ? undefined : handleEnter}
      onBlur={noFocus ? undefined : handleLeave}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />
      {children}
    </div>
  );
}
