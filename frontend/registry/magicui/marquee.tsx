import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional, additional class names to add to the container
   */
  className?: string;
  /**
   * Whether to reverse the animation direction (when vertical: moves DOWN instead of UP)
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * The number of times to repeat the children
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:30s] [--gap:1.25rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      <style>{`
        @keyframes magicuiMarqueeHorizontal {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap, 1.25rem))); }
        }
        @keyframes magicuiMarqueeHorizontalReverse {
          from { transform: translateX(calc(-100% - var(--gap, 1.25rem))); }
          to { transform: translateX(0); }
        }
        @keyframes magicuiMarqueeVerticalUp {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap, 1.25rem))); }
        }
        @keyframes magicuiMarqueeVerticalDown {
          from { transform: translateY(calc(-100% - var(--gap, 1.25rem))); }
          to { transform: translateY(0); }
        }

        .anim-marquee-horizontal {
          animation: magicuiMarqueeHorizontal var(--duration, 30s) linear infinite;
        }
        .anim-marquee-horizontal-reverse {
          animation: magicuiMarqueeHorizontalReverse var(--duration, 30s) linear infinite;
        }
        .anim-marquee-vertical-up {
          animation: magicuiMarqueeVerticalUp var(--duration, 30s) linear infinite;
        }
        .anim-marquee-vertical-down {
          animation: magicuiMarqueeVerticalDown var(--duration, 30s) linear infinite;
        }

        .marquee-pause-active:hover {
          animation-play-state: paused !important;
        }
      `}</style>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "flex-row": !vertical,
              "flex-col": vertical,
              "anim-marquee-horizontal": !vertical && !reverse,
              "anim-marquee-horizontal-reverse": !vertical && reverse,
              "anim-marquee-vertical-up": vertical && !reverse,
              "anim-marquee-vertical-down": vertical && reverse,
              "marquee-pause-active": pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

export default Marquee;
