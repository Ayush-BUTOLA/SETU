---
name: shader-gradient
description: >-
  Shader Gradient v2 integration skill for animated, GPU-rendered mesh/conic/plane
  gradients as section backgrounds in this Next.js project. Covers installation,
  ShaderGradientCanvas usage, preset configuration, performance rules, and reduced-motion
  handling. Use whenever a background needs to feel alive without a video or image asset.
---

# Shader Gradient v2 — Background Skill

> Shader Gradient renders beautiful animated gradients on a WebGL canvas.
> It is a DROP-IN background — wrap it in `absolute inset-0 -z-10` and let sections sit on top.

---

## 1. Installation

```bash
npm install shadergradient
# Peer dep already present: react, react-dom
```

Confirm the package landed in `package.json` before importing.

---

## 2. Core Import Pattern (Next.js / React)

```tsx
"use client"; // required — WebGL runs in the browser

import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
```

> shadergradient v2 requires `@react-three/fiber`, `@react-three/drei`, and `@react-spring/three`
> as peer dependencies. Install them if missing:
> ```bash
> npm install @react-three/fiber @react-three/drei @react-spring/three three
> ```

---

## 3. Minimal Usage — Section Background

```tsx
"use client";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        style={{ width: "100%", height: "100%" }}
      >
        <ShaderGradient
          type="waterPlane"          // "waterPlane" | "plane" | "sphere"
          animate="on"
          uTime={0.2}
          uStrength={2.5}
          uDensity={1.2}
          uSpeed={0.3}
          uFrequency={5.5}
          uAmplitude={0}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          color1="#09130f"           // deep forest dark (SETU base)
          color2="#267f68"           // SETU green mid
          color3="#9de7cf"           // SETU accent mint
          reflection={0.1}
          wireframe={false}
          shader="defaults"
          envPreset="city"
          lightType="3d"
          brightness={1.1}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
```

---

## 4. Key Props Reference

| Prop          | Type                               | Notes                                              |
|---------------|------------------------------------|----------------------------------------------------|
| `type`        | `"waterPlane" \| "plane" \| "sphere"` | `waterPlane` = flowing water feel; `sphere` = blob |
| `animate`     | `"on" \| "off"`                    | Set `"off"` when `prefers-reduced-motion`          |
| `uSpeed`      | `number` (0–1)                     | Animation speed; 0.2–0.4 is tasteful               |
| `uStrength`   | `number`                           | Wave amplitude of the mesh deformation             |
| `uDensity`    | `number`                           | Number of waves / noise density                    |
| `color1/2/3`  | `string` (hex)                     | Three gradient control points                      |
| `brightness`  | `number`                           | Multiplier on output luminance                     |
| `positionX/Y/Z` | `number`                         | Camera / mesh position in scene units              |
| `rotationX/Y/Z` | `number` (degrees)               | Tilt of the gradient plane                         |
| `envPreset`   | `"city" \| "dawn" \| "lobby"`      | Affects lighting environment                       |
| `lightType`   | `"3d" \| "env"`                    | `3d` for directional light, `env` for HDR          |

---

## 5. Preset Palettes for SETU

### Dark Forest Hero
```
color1="#030907"  color2="#0d3527"  color3="#9de7cf"
type="waterPlane" uSpeed={0.25} uStrength={2} brightness={0.9}
```

### Deep Ocean Problem Section
```
color1="#040c1a"  color2="#0a2a4a"  color3="#4fb3d4"
type="waterPlane" uSpeed={0.18} uDensity={1.5} rotationX={40}
```

### Light Mint (content sections on light bg)
```
color1="#dff7ee"  color2="#9de7cf"  color3="#f5f6f1"
type="plane" animate="on" uSpeed={0.15} uStrength={1.2}
```

---

## 6. Reduced Motion (mandatory)

```tsx
"use client";
import { useReducedMotion } from "framer-motion"; // or from "motion/react"

export function GradientBackground() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <ShaderGradientCanvas ...>
        <ShaderGradient
          animate={reduce ? "off" : "on"}
          // ... rest of props
        />
      </ShaderGradientCanvas>
    </div>
  );
}
```

---

## 7. Performance Rules

- **One canvas per page section max.** Multiple WebGL contexts = GPU overload. For multi-section gradients, swap props via state rather than mounting multiple canvases.
- **Always `pointer-events-none`** on the wrapper div — the canvas absorbs clicks otherwise.
- **`aria-hidden="true"`** on the wrapper — gradient is purely decorative.
- **`loading="lazy"`** is not applicable to WebGL. Instead, only mount the canvas when the section enters the viewport using `IntersectionObserver` or Next.js dynamic import with `{ ssr: false }`.

```tsx
// Lazy-mount pattern to avoid loading WebGL on page init
import dynamic from "next/dynamic";
const GradientBackground = dynamic(() => import("./GradientBackground"), { ssr: false });
```

- **Never animate `color1/2/3` or `uSpeed` with React state** on every frame. These are initial config values. Use the built-in `animate="on"` GPU loop.

---

## 8. Fallback for No-WebGL

Wrap in a `<ErrorBoundary>` or provide a CSS gradient fallback:

```tsx
<div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#030907] via-[#0d3527] to-[#267f68]">
  <Suspense fallback={null}>
    <GradientBackground />
  </Suspense>
</div>
```
