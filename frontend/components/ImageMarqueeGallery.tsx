'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/registry/magicui/marquee';

export interface ImageCardProps {
  img: string;
  height?: number;
  className?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ img, height = 300, className }) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-black/10 shadow-md bg-[#090b0b] select-none',
        className
      )}
      style={{ height: `${height}px` }}
    >
      <img
        src={img}
        alt="SETU Field Imagery"
        loading="lazy"
        draggable={false}
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
};

// Curated authentic field images from public/assets
const COL1_IMAGES = [
  '/assets/water.jpg',
  '/assets/cycle.jpg',
  '/assets/community-street.jpg',
  '/assets/rishabh-jain-fq_RHvUrcLE-unsplash.jpg',
  '/assets/aby-zachariah-GsTLiE1xrUg-unsplash.jpg',
  '/assets/eugene-nelmin-0O7K77HOe7U-unsplash.jpg',
  '/assets/eugene-nelmin-nmWUBqK6Pyk-unsplash.jpg',
  '/assets/raajit-sharma-o5srLSYLD8c-unsplash.jpg',
];

const COL2_IMAGES = [
  '/assets/harvest.jpg',
  '/assets/fields.jpg',
  '/assets/valley.jpg',
  '/assets/ravi-sharma-rqff9afgp_E-unsplash.jpg',
  '/assets/annie-spratt-HI4akp3A0oA-unsplash.jpg',
  '/assets/eugene-nelmin-Czyk0z5ZBjA-unsplash.jpg',
  '/assets/gyan-shahane-LXN-3NWe3ws-unsplash.jpg',
  '/assets/ravi-sharma-PiLrdPL6Y_A-unsplash.jpg',
];

const COL3_IMAGES = [
  '/assets/community.jpg',
  '/assets/landscape.jpg',
  '/assets/dewang-gupta-EBSqgzj93sQ-unsplash.jpg',
  '/assets/brijender-dua-_NXmtndrAbo-unsplash.jpg',
  '/assets/ayrus-hill-vSBqzZ6tQuA-unsplash.jpg',
  '/assets/eugene-nelmin-O5cMJCUCyvo-unsplash.jpg',
  '/assets/mayuri-kasurde-1R_8bqDZQOA-unsplash.jpg',
  '/assets/ravi-sharma-oPxAvjtFk78-unsplash.jpg',
];

const HEIGHTS_COL1 = [320, 260, 360, 280, 340, 290, 350, 270];
const HEIGHTS_COL2 = [270, 350, 280, 340, 260, 360, 290, 330];
const HEIGHTS_COL3 = [340, 280, 350, 270, 330, 290, 360, 260];

export interface ImageMarqueeGalleryProps {
  className?: string;
  duration1?: string;
  duration2?: string;
  duration3?: string;
}

export function ImageMarqueeGallery({
  className,
  duration1 = '44s',
  duration2 = '38s',
  duration3 = '48s',
}: ImageMarqueeGalleryProps) {
  return (
    <div
      className={cn(
        'relative flex h-[720px] w-full flex-row items-center justify-center gap-5 overflow-hidden px-2 sm:px-4 select-none',
        className
      )}
    >
      {/* Column 1: Moves UP smoothly without pausing on hover */}
      <Marquee
        vertical
        repeat={3}
        className="flex-1 h-full max-w-[440px]"
        style={{ '--duration': duration1 } as React.CSSProperties}
      >
        {COL1_IMAGES.map((img, idx) => (
          <ImageCard key={`c1-${idx}`} img={img} height={HEIGHTS_COL1[idx % HEIGHTS_COL1.length]} />
        ))}
      </Marquee>

      {/* Column 2 (Middle): Moves DOWN (reverse) smoothly without pausing on hover */}
      <Marquee
        reverse
        vertical
        repeat={3}
        className="flex-1 h-full max-w-[440px]"
        style={{ '--duration': duration2 } as React.CSSProperties}
      >
        {COL2_IMAGES.map((img, idx) => (
          <ImageCard key={`c2-${idx}`} img={img} height={HEIGHTS_COL2[idx % HEIGHTS_COL2.length]} />
        ))}
      </Marquee>

      {/* Column 3: Moves UP smoothly without pausing on hover */}
      <Marquee
        vertical
        repeat={3}
        className="hidden md:flex flex-1 h-full max-w-[440px]"
        style={{ '--duration': duration3 } as React.CSSProperties}
      >
        {COL3_IMAGES.map((img, idx) => (
          <ImageCard key={`c3-${idx}`} img={img} height={HEIGHTS_COL3[idx % HEIGHTS_COL3.length]} />
        ))}
      </Marquee>

      {/* Top and Bottom soft gradient fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f5f6f1] via-[#f5f6f1]/90 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f5f6f1] via-[#f5f6f1]/90 to-transparent z-10" />
    </div>
  );
}

export default ImageMarqueeGallery;
