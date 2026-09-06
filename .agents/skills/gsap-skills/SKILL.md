---
name: gsap-skills
description: >-
  GSAP 3 animation skill for this Next.js project. Covers ScrollTrigger, timeline
  orchestration, SplitText, Flip, and pinning patterns. Use for scroll-driven
  storytelling, sticky stacks, horizontal pans, and complex sequence animations
  that go beyond what framer-motion handles well. Always defer to motion/react for
  simple whileInView reveals; use GSAP when pinning, scrubbing, or timeline
  orchestration is actually needed.
---

# GSAP 3 — Animation Skill

> GSAP is already installed: `"gsap": "^3.15.0"` in package.json.
> Always import plugins and register them inside `useEffect` or a module-level guard.

---

## 1. Plugin Registration (mandatory pattern)

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ONCE at module level (not inside useEffect)
gsap.registerPlugin(ScrollTrigger);
```

Additional plugins (import as needed):
```tsx
import { Flip } from "gsap/Flip";
import { TextPlugin } from "gsap/TextPlugin";
// gsap.registerPlugin(Flip, TextPlugin);
```

> **SplitText is a Club GSAP plugin** — do NOT import it unless the user has a Club license.
> For text split effects, use a manual word/char split or a lightweight alternative.

---

## 2. Golden Rules

1. **Always wrap GSAP in `gsap.context()`** — for proper React cleanup.
2. **Always return `ctx.revert()`** in `useEffect` cleanup — avoids ScrollTrigger zombie instances.
3. **Always check `useReducedMotion`** — skip or instant-play if true.
4. **`start: "top top"`** for pinned sections — NOT `"top center"`.
5. **Never animate layout properties** (`width`, `height`, `top`, `left`) — only `transform` and `opacity`.
6. **`invalidateOnRefresh: true`** on any ScrollTrigger that calculates dynamic distances.

---

## 3. Canonical Patterns

### 3.A Scroll-Reveal Stagger (simple enter on scroll)

> Prefer `motion/react whileInView` for this. Only use GSAP if the component already has a GSAP context.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".reveal-item", {
      opacity: 0, y: 40, stagger: 0.08, duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: ".reveal-wrap", start: "top 80%" },
    });
  }, containerRef);
  return () => ctx.revert();
}, []);
```

### 3.B Sticky Stack (cards pin and shrink as next enters)

```tsx
useEffect(() => {
  if (reduce || !ref.current) return;
  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: cards[cards.length - 1],
        end: "top top",
        pin: true,
        pinSpacing: false,
      });
      gsap.to(card, {
        scale: 0.92, opacity: 0.55, ease: "none",
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    });
  }, ref);
  return () => ctx.revert();
}, [reduce]);
```

### 3.C Horizontal Pan (scroll-hijack side-scroll)

```tsx
useEffect(() => {
  if (reduce || !wrap.current || !track.current) return;
  const ctx = gsap.context(() => {
    const dist = track.current!.scrollWidth - window.innerWidth;
    gsap.to(track.current, {
      x: -dist, ease: "none",
      scrollTrigger: {
        trigger: wrap.current,
        start: "top top",
        end: () => `+=${dist}`,
        pin: true, scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, wrap);
  return () => ctx.revert();
}, [reduce]);
```

### 3.D Timeline Sequence (page-load orchestration)

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-eyebrow", { opacity: 0, y: -12, duration: 0.5 })
      .from(".hero-h1", { opacity: 0, y: 24, duration: 0.7 }, "-=0.2")
      .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.3")
      .from(".hero-cta", { opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.2");
  }, heroRef);
  return () => ctx.revert();
}, []);
```

### 3.E Flip Transition (layout-aware morph between states)

```tsx
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

// Before state change:
const state = Flip.getState(".flip-target");
// After state change (DOM update):
Flip.from(state, { duration: 0.5, ease: "power2.inOut", absolute: true });
```

---

## 4. ScrollTrigger Debugging

```tsx
// Visualize all triggers (development only)
ScrollTrigger.defaults({ markers: process.env.NODE_ENV === "development" });

// Force refresh after dynamic content loads
ScrollTrigger.refresh();
```

---

## 5. Performance Checklist

- [ ] `will-change: transform` on elements that will animate (set via `gsap.set`)
- [ ] `gsap.ticker.lagSmoothing(0)` if smooth-scrub feels sticky
- [ ] `ScrollTrigger.normalizeScroll(true)` for consistent mobile scroll
- [ ] Batch small DOM queries: `gsap.utils.toArray()` once, not inside the animation loop
- [ ] `invalidateOnRefresh: true` on any end function that depends on `window.innerWidth`

---

## 6. Reduced Motion (mandatory)

```tsx
import { useReducedMotion } from "framer-motion"; // or "motion/react"

const reduce = useReducedMotion();

useEffect(() => {
  if (reduce) return; // Skip all GSAP entirely
  const ctx = gsap.context(() => { /* animations */ }, ref);
  return () => ctx.revert();
}, [reduce]);
```

---

## 7. When to Use GSAP vs motion/react

| Scenario                             | Use           |
|--------------------------------------|---------------|
| Simple opacity/y enter on scroll     | motion/react whileInView |
| Spring hover / magnetic micro-physics | motion/react useMotionValue |
| Pinned sticky sections               | GSAP ScrollTrigger |
| Horizontal scroll-hijack             | GSAP ScrollTrigger |
| Timeline sequencing with overlaps    | GSAP timeline |
| Shared element / layout transition   | motion/react layoutId |
| Text split / character animation     | GSAP TextPlugin (or manual) |
| Flip layout morphing                 | GSAP Flip |
