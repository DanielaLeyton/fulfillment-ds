# Fulfillment Design System — PoC

Multi-brand design system that feeds 4 digital products from a single source of truth.

```
┌─────────────────────────────────────────────────────────┐
│              packages/tokens  (W3C DTCG JSON)           │
│  core.json → semantic.json → brands/brand-{a,b}.json   │
│              ↓  Style Dictionary                        │
│   CSS vars  ·  JS constants  ·  Dart constants         │
└────────────┬───────────────────────────┬────────────────┘
             │                           │
   packages/ui-web                packages/ui-flutter
   React + TypeScript              Flutter / Dart
   ThemeProvider                   FdsTheme.brandA/B
   Button, Input, Card…            FdsButton, FdsCard…
             │                           │
     ┌───────┴────────┐       ┌──────────┴──────────┐
     │ apps/storybook  │       │  apps/flutter-demo  │
     │ (docs + stories)│       │  (brand selector)   │
     └────────────────┘       └─────────────────────┘
     apps/dashboard-demo
     /admin-a  →  ThemeProvider brand="brand-a"
     /admin-b  →  ThemeProvider brand="brand-b"
```

## Quick start

```bash
# Prerequisites: Node ≥20, pnpm ≥9, Flutter ≥3.19 (for the Flutter package)
npm install -g pnpm

# Install all workspace dependencies
cd fulfillment-ds
pnpm install

# Build design tokens (generates CSS, JS, Dart)
pnpm tokens:build

# Run the dashboard demo (http://localhost:5174)
cd apps/dashboard-demo && pnpm dev

# Run Storybook (http://localhost:6006)
cd apps/storybook && pnpm storybook
```

## Architecture decisions

### Why Style Dictionary?

Style Dictionary (Amazon) is the de-facto standard for token transformation. One `node style-dictionary.config.mjs` command reads the W3C DTCG JSON tokens and emits:
- `dist/brand-a/variables.css` — scoped to `[data-brand="brand-a"]`
- `dist/brand-a/tokens.js` — ES module constants for React
- `dist/flutter/brand_a_tokens.dart` — Dart `const` fields for Flutter

### Why inline CSS-in-JS (not Tailwind/CSS modules)?

The ThemeProvider injects CSS custom properties (`--fds-*`) onto a wrapper `<div>` at runtime. This means:
- Zero build-time configuration per brand
- Works in Storybook, Next.js, Vite, and iframe embeds
- Brand switch is a single prop change: `<ThemeProvider brand="brand-b">`

### Token hierarchy

```
core.json          → raw primitive values (never used directly in components)
semantic.json      → alias tokens named by purpose (color.brand.primary)
brands/brand-a.json → override only the tokens that differ
brands/brand-b.json → override only the tokens that differ
```

## Adding a 3rd brand

1. Create `packages/tokens/src/brands/brand-c.json` — override only the tokens that differ from `semantic.json`.
2. Run `pnpm tokens:build` — CSS, JS and Dart files are generated automatically.
3. Add `brand-c` to `BRAND_TOKENS` in `packages/ui-web/src/theme/tokens.ts`.
4. Add `FdsBrandCTokens` in `packages/ui-flutter/lib/tokens/brand_c_tokens.dart` (or run the Style Dictionary Dart formatter).
5. Add a route `/admin-c` in `apps/dashboard-demo/src/App.tsx`.

**No component code changes required.**

## Project structure

```
fulfillment-ds/
├── packages/
│   ├── tokens/                    ← Single source of truth
│   │   ├── src/
│   │   │   ├── core.json          ← Primitive tokens (palettes, scales)
│   │   │   ├── semantic.json      ← Semantic aliases (purpose-named)
│   │   │   └── brands/
│   │   │       ├── brand-a.json   ← Warehouse Ops overrides
│   │   │       └── brand-b.json   ← Last Mile overrides
│   │   ├── dist/                  ← Generated (git-ignored in prod)
│   │   └── style-dictionary.config.mjs
│   │
│   ├── ui-web/                    ← React component library
│   │   └── src/
│   │       ├── theme/
│   │       │   ├── tokens.ts      ← Typed token interfaces + values
│   │       │   └── ThemeContext.tsx ← ThemeProvider + useTheme
│   │       └── components/
│   │           ├── Button.tsx
│   │           ├── Input.tsx
│   │           ├── Card.tsx
│   │           ├── Badge.tsx
│   │           ├── Modal.tsx
│   │           ├── DataTable.tsx
│   │           └── Navbar.tsx     ← Sidebar + Topbar
│   │
│   └── ui-flutter/                ← Flutter package
│       └── lib/
│           ├── tokens/            ← Generated Dart token classes
│           ├── themes/fds_theme.dart ← ThemeData per brand
│           └── widgets/fds_button.dart
│
└── apps/
    ├── storybook/                 ← Component documentation
    ├── dashboard-demo/            ← Web demo (/admin-a, /admin-b)
    └── flutter-demo/              ← Flutter demo (brand selector)
```

## Consuming a component (< 5 minutes)

### Web (React)

```tsx
import { ThemeProvider, Button, Card, Badge } from '@fds/ui-web';

function MyApp() {
  return (
    <ThemeProvider brand="brand-a">   {/* or "brand-b" */}
      <Card title="Order #001">
        <Badge variant="success" dot>Delivered</Badge>
        <Button variant="primary">View Details</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Flutter

```dart
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

MaterialApp(
  theme: FdsTheme.brandA,  // or FdsTheme.brandB
  home: Scaffold(
    body: FdsButton(
      label: 'View Order',
      onPressed: () {},
    ),
  ),
);
```

## PoC success criteria

| Criterion | Status |
|---|---|
| Cambiar de Brand A a Brand B con UN cambio | ✅ `brand="brand-a"` → `brand="brand-b"` |
| 4 productos distintos pero coherentes | ✅ mismo árbol de componentes, 2 identidades |
| Nuevo token se propaga con un comando | ✅ `pnpm tokens:build` genera CSS + JS + Dart |
| Nuevo dev consume componente en < 5 min | ✅ ver sección "Consuming a component" |

## Storybook features

- **Brand switcher** in toolbar (paintbrush icon) — switches all stories live
- **Tokens/Overview** story — token inspector, compare Brand A vs Brand B
- **Demos/Dashboard Preview** — full dashboard, two brands side by side
- **a11y addon** — WCAG contrast checks on all components

## Deployment

```bash
# Storybook → Chromatic (free public hosting)
cd apps/storybook
npx chromatic --project-token=<your-token>

# Dashboard demo → Vercel
vercel apps/dashboard-demo
```
