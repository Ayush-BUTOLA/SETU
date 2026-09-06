---
name: motion-framer
description: >-
  Framer Motion / Motion for React animation skill for this Next.js project (framer-motion
  v13, import from "framer-motion"). Covers useScroll, useTransform, useSpring,
  whileInView, layout transitions, gesture physics, and reduced-motion handling.
  Use for all component-level animation — scroll-zoom heroes, hover physics, reveal
  staggering, and shared element transitions. Defer to GSAP only for pinning/scrubbing.
---

# Motion (Framer Motion) — Animation Skill

> Package: `framer-motion@^13` is installed.
> **Import from `"framer-motion"`** (this project's version does not yet use the
> `"motion/react"` re-export path — always check and prefer the installed package name).

```tsx
import { motion, useScroll, useTransform, useSpring,
         useMotionValue, AnimatePresence, LayoutGroup } from "framer-motion";
```

---

## 1. The Motion Contract

- **Use `motion.*` elements** for any element that animates: `<motion.div>`, `<motion.section>`, `<motion.img>` etc.
- **Never use `useState` for continuous values** (scroll progress, pointer position, drag offset). Use `useMotionValue` instead — it bypasses React re-renders.
- **`will-change: transform`** via `style` prop only on elements that will actually animate. Not as a blanket class.
- **Every animation must respect `prefers-reduced-motion`** (see §7).

---

## 2. Scroll-Driven Transforms (useScroll + useTransform)

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ParallaxSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Spring-smooth the raw progress for fluid, non-janky feel
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const y      = useTransform(smooth, [0, 1], ["0%", "-20%"]);
  const scale  = useTransform(smooth, [0, 1], [1, 1.25]);
  const opacity = useTransform(smooth, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[100svh]">
      <motion.div style={{ scale }} className="absolute inset-0">
        {/* background image or gradient */}
      </motion.div>
      <motion.div style={{ y, opacity }} className="relative z-10">
        {/* hero content */}
      </motion.div>
    </section>
  );
}
```

### useScroll offset cheat-sheet

| offset                          | Meaning |
|---------------------------------|---------|
| `["start start", "end start"]`  | Progress 0→1 as section scrolls from top-of-viewport to fully above it |
| `["start end", "end start"]`    | Progress 0→1 as section travels through the full viewport |
| `["start center", "end center"]`| Midpoint-based progress |

---

## 3. Enter-on-Scroll (whileInView)

```tsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  content
</motion.div>
```

### Stagger children

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } },
};

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map(i => <motion.li key={i} variants={item}>{i}</motion.li>)}
</motion.ul>
```

---

## 4. Gesture Physics (hover / tap)

```tsx
// Magnetic hover — track pointer relative to element center
"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * 0.35);
    y.set((e.clientY - rect.top  - rect.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}
```

### Simple hover scale
```tsx
<motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
```

---

## 5. Layout Transitions (shared element / reorder)

```tsx
// Shared element between two states
<motion.div layoutId="card-preview" />   // in state A
<motion.div layoutId="card-preview" />   // in state B — auto-morphs

// List reorder
<motion.li layout key={item.id}>
```

Wrap siblings that share `layoutId` in `<LayoutGroup>` when they live in different component subtrees.

---

## 6. AnimatePresence (mount/unmount transitions)

```tsx
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

Rules:
- Wrap the conditional render, not the parent.
- `key` must be stable and unique.
- `mode="wait"` — exit finishes before enter starts (good for page transitions).
- `mode="popLayout"` — exiting element is `position: absolute`, rest reflows.

---

## 7. Reduced Motion (mandatory)

```tsx
import { useReducedMotion } from "framer-motion";

export function AnimatedCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduce ? 0 : 0.6 }}
    />
  );
}
```

For scroll-driven transforms: gate the hook return early.
```tsx
const { bgScale, bgOpacity } = useScrollZoom(ref);
// Pass `style={{ scale: reduce ? 1 : bgScale }}` to motion elements
```

---

## 8. Easing Presets

| Name            | Cubic bezier              | Use for                        |
|-----------------|---------------------------|--------------------------------|
| Smooth out      | `[0.16, 1, 0.3, 1]`       | Enters, reveals                |
| iOS spring      | `type:"spring", stiffness:300, damping:24` | Buttons, toggles |
| Gentle scroll   | `[0.25, 0.46, 0.45, 0.94]`| Parallax, subtle fades         |
| Snap            | `[0.68, -0.55, 0.27, 1.55]`| Playful bounces               |

---

## 9. Common Mistakes

| Mistake                                   | Fix                                              |
|-------------------------------------------|--------------------------------------------------|
| `useState` for scroll/pointer tracking    | Use `useMotionValue` + `useTransform`            |
| Animating `width` or `height`             | Use `scaleX`/`scaleY` + `transform-origin`       |
| No `key` on `AnimatePresence` child       | Add a stable `key` prop                          |
| Forgetting `"use client"` on motion files | Any file using hooks must be a Client Component  |
| Multiple `<LayoutGroup>` roots            | One `LayoutGroup` per shared-layout subtree      |
| Spring on a non-number value              | Springs only work on numbers and colors          |
