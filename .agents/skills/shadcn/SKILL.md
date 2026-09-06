---
name: shadcn
description: >-
  Component installation and customization guide for shadcn/ui in this Next.js project.
  Use this skill whenever adding, styling, or wiring up shadcn/ui components (Button,
  Dialog, Sheet, Tabs, Card, Form, etc.). Covers the correct CLI command, theming via
  CSS variables, and SETU design-token overrides.
---

# shadcn/ui — Component Skill

> shadcn/ui is NOT a package you install — it copies source into your repo.
> Components live in `components/ui/`. You own the code; customize freely.

---

## 1. Project Setup (already done — verify before re-running)

```bash
# Only needed once. Check if components.json exists first.
npx shadcn@latest init
```

Config lives at `components.json` in the project root.
The default alias is `@/components/ui`.

---

## 2. Adding Components

Always use the CLI — never copy-paste from the docs manually:

```bash
npx shadcn@latest add <component-name>
# Examples:
npx shadcn@latest add button
npx shadcn@latest add dialog sheet tabs card badge separator
npx shadcn@latest add form input label textarea select
```

After adding, the source lands in `components/ui/<name>.tsx`.
You can edit it freely — it will not be overwritten.

---

## 3. Theming — CSS Variable Contract

shadcn/ui resolves ALL colors through CSS variables defined in `app/globals.css`.
The variable names follow this pattern:

```css
:root {
  --background: <oklch or hsl>;
  --foreground: <...>;
  --primary: <...>;
  --primary-foreground: <...>;
  --secondary: <...>;
  --secondary-foreground: <...>;
  --accent: <...>;
  --accent-foreground: <...>;
  --muted: <...>;
  --muted-foreground: <...>;
  --card: <...>;
  --card-foreground: <...>;
  --border: <...>;
  --input: <...>;
  --ring: <...>;
  --radius: 0.5rem;
}
.dark { /* same keys, dark-mode values */ }
```

**Never hard-code hex values in shadcn components.** Map to the variable contract instead.

---

## 4. SETU Design Token Overrides

This project uses a custom green-forward palette. When overriding the theme, map:

| Role              | SETU hex  | CSS var to set     |
|-------------------|-----------|--------------------|
| Primary bg (dark) | `#090b0b` | `--background`     |
| Primary text      | `#f5f6f1` | `--foreground`     |
| Accent green      | `#9de7cf` | `--primary`        |
| Accent foreground | `#0c1712` | `--primary-foreground` |
| Muted bg          | `#1a2922` | `--muted`          |
| Border            | `#d9ddd5` | `--border`         |

---

## 5. Variant Patterns

### Button
```tsx
import { Button } from "@/components/ui/button";

// Primary CTA — map to --primary
<Button>Discover How SETU Works</Button>

// Ghost / outline on dark bg
<Button variant="outline">Share a Challenge</Button>

// Destructive
<Button variant="destructive">Remove</Button>
```

### Dialog / Sheet (modal patterns)
```tsx
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
```

### Form (react-hook-form integration built-in)
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// Always pair with zod schema + useForm from react-hook-form
```

---

## 6. Rules

- **Never ship default shadcn styling** — always override tokens to match SETU palette before presenting to the user.
- **One component system per project** — do not mix shadcn/ui with Radix Themes `<Theme>` provider.
- **Dark mode** — this project is dark-forward (`bg-[#090b0b]`). Set `.dark` class on `<html>` or use `next-themes`.
- **Accessibility** — shadcn/ui is built on Radix UI primitives; keep all ARIA props in place. Do not strip `aria-*` attributes when customizing.
- **Import path** — always `@/components/ui/<name>`, never a relative path.

---

## 7. Quick Reference — Component List

| Category    | Components                                               |
|-------------|----------------------------------------------------------|
| Layout      | Card, Separator, ScrollArea, AspectRatio                 |
| Overlay     | Dialog, Sheet, Drawer, Popover, Tooltip, HoverCard       |
| Navigation  | NavigationMenu, Breadcrumb, Pagination, Tabs             |
| Form        | Form, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, DatePicker |
| Feedback    | Alert, AlertDialog, Badge, Progress, Skeleton, Sonner (Toast) |
| Data        | Table, DataTable (TanStack), Carousel, Chart (Recharts) |
| Typography  | Label, Avatar                                            |

Install any of these with `npx shadcn@latest add <name>`.
