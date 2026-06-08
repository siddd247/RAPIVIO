# Rapivio — Design Document

> **Rapivio** is the marketing website for an AI automation agency that helps service businesses capture leads and follow up instantly. The site is designed as a premium, dark-themed, single-page experience with a dedicated booking flow and legal pages.
>
> Live at: **[rapivio.agency](https://rapivio.agency)**

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Design System](#design-system)
6. [Component Inventory](#component-inventory)
7. [Routing](#routing)
8. [Animation System](#animation-system)
9. [Performance Strategy](#performance-strategy)
10. [SEO & Structured Data](#seo--structured-data)
11. [Build & Deployment](#build--deployment)
12. [Patches & Workarounds](#patches--workarounds)
13. [Conventions & Patterns](#conventions--patterns)

---

## Overview

Rapivio is a **React 19 + TypeScript + Vite** single-page application built as a high-conversion agency landing page. The homepage is a vertically-scrolling narrative composed of distinct sections — each with its own scroll-triggered reveal animations, ambient glow effects, and micro-interactions. A separate multi-step booking form (`/book`) serves as the primary conversion funnel.

### Key Design Goals

| Goal | How It's Achieved |
|---|---|
| **Premium, dark aesthetic** | Full black (`#000000`) background, mauve/violet accent palette, glassmorphism, gradient borders |
| **Motion-rich experience** | Framer Motion for scroll reveals, parallax, layout animations; `shaders` library for hero WebGL background |
| **Fast perceived load** | Lazy-loaded shader, `React.Suspense` boundaries, manual chunk splitting, `preconnect`/`dns-prefetch` for fonts |
| **High conversion** | Prominent "Book a Call" CTAs in navbar, hero, and final CTA section; distraction-free multi-step booking form |
| **SEO-first** | JSON-LD structured data (Organization, WebSite, Service), Open Graph / Twitter cards, canonical URL, sitemap, robots.txt |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.2.x |
| Language | TypeScript | ~6.0 |
| Build Tool | Vite | 8.x |
| Styling | Tailwind CSS 4 + Vanilla CSS | 4.3.x |
| Animation | Framer Motion (`motion`) | 12.x |
| 3D / Shaders | `shaders` (Swirl, ChromaFlow, FlutedGlass) | 2.5.124 |
| WebGL | Three.js + `@react-three/fiber` | 0.184 / 9.6 |
| Routing | React Router DOM | 7.15 |
| Icons | Lucide React | 1.16 |
| Class Utilities | `clsx` + `tailwind-merge` | — |
| Post-install Patches | `patch-package` | 8.x |

---

## Project Structure

```
RAPIVIO/
├── index.html                 # HTML shell with all meta/SEO/structured data
├── vite.config.ts             # Vite + Tailwind + path aliases + chunk splitting
├── tsconfig.json              # TS project references
├── package.json
├── patches/
│   └── shaders+2.5.124.patch  # Keeps shader rendering when window blurs
│
├── public/
│   ├── favicon.jpg / .svg
│   ├── og-image.jpg           # Open Graph share image
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── icons.svg
│   └── images/
│       ├── benefits/          # 1.jpeg – 6.jpeg (benefit detail modals)
│       ├── bespoke-ai.jpg     # Custom AI card image
│       └── workflow-n8n.webp
│
└── src/
    ├── main.tsx               # React root with BrowserRouter + StrictMode
    ├── App.tsx                # Top-level layout: Navbar + Routes + Suspense
    ├── App.css                # Legacy/template styles (mostly unused)
    ├── index.css              # Global design tokens + button/badge/animation styles
    │
    ├── lib/
    │   └── utils.ts           # cn() — clsx + twMerge utility
    │
    ├── hooks/
    │   ├── useScrollAnimation.ts   # useScrollAnimation() + useParallax()
    │   └── use-outside-click.ts    # Click-outside detection for modals
    │
    ├── components/
    │   ├── Navbar.tsx          # Floating pill navbar (desktop) + fullscreen dock (mobile)
    │   ├── Hero.tsx            # WebGL shader background + FlipWords headline + CTAs
    │   ├── Services.tsx        # Bento grid: LeadCapture, FollowUp, Workflow, CustomAI cards
    │   ├── Process.tsx         # 4-step cards with animated SVG arrows
    │   ├── CaseStudies.tsx     # Auto-scrolling horizontal carousel
    │   ├── Benefits.tsx        # Expandable row list with layout-animated modal
    │   ├── Testimonials.tsx    # Desktop: asymmetric grid / Mobile: auto-play carousel
    │   ├── FAQ.tsx             # Accordion with CSS grid expand animation
    │   ├── CTABanner.tsx       # Final conversion CTA section
    │   ├── Footer.tsx          # Multi-column footer with social links + legal pages
    │   └── ui/
    │       ├── RevealWrapper.tsx       # Scroll-triggered reveal (7 variants)
    │       ├── AmbientLight.tsx        # Section-top glow line effect
    │       ├── flip-words.tsx          # Letter-by-letter word rotation
    │       ├── card-spotlight.tsx      # Mouse-following radial spotlight
    │       └── canvas-reveal-effect.tsx # WebGL dot-matrix reveal (Three.js)
    │
    ├── pages/
    │   ├── BookingPage.tsx     # Multi-step lead form (name → email → phone → message)
    │   ├── PrivacyPolicy.tsx
    │   ├── TermsOfService.tsx
    │   └── CookiePolicy.tsx
    │
    └── assets/
        ├── hero.png
        ├── react.svg
        └── vite.svg
```

---

## Architecture

### App Shell

```
main.tsx
  └── StrictMode
      └── BrowserRouter
          └── App
              ├── Navbar (fixed, z-50, hidden on /book)
              └── React.Suspense (loading spinner)
                  └── Routes
                      ├── /         → HomePage
                      ├── /book     → BookingPage
                      ├── /privacy  → PrivacyPolicy
                      ├── /terms    → TermsOfService
                      └── /cookies  → CookiePolicy
```

### HomePage Composition

`HomePage` renders all homepage sections sequentially. A **fixed parallax background** (`radial-gradient` from deep purple to black) sits behind the content at `z-index: -20` and translates at 0.3× scroll speed.

```
HomePage
  ├── motion.div (parallax radial-gradient background)
  ├── Hero
  ├── Services
  ├── Process
  ├── CaseStudies
  ├── Benefits
  ├── Testimonials
  ├── FAQ
  ├── CTABanner
  └── Footer
```

### Global Mouse Tracking

`App` attaches a global `mousemove` listener (desktop only, checked via `(hover: hover)` media query) that sets CSS custom properties `--x` and `--y` on all `.btn-primary` and `.btn-outline` elements. This powers the **radial hover glow** on outline buttons.

### Cross-Page Scroll Targeting

When a nav link is clicked while on a non-homepage route, the target anchor is stored in `sessionStorage.scrollTarget`. On `HomePage` mount, the stored target is read and the page scrolls to it after a 500ms delay (to allow the shader to initialize).

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-blush` | `#FFFFFF` | Primary text |
| `--color-dusty-rose` | `#AAAAAA` | Secondary/body text |
| `--color-mauve` | `#dface8` | **Primary accent** — CTAs, headings, icons, glows |
| `--color-deep-purple` | `#2A114B` | Borders, card outlines, dividers |
| `--color-dark-violet` | `#111111` | Subtle card backgrounds |
| `--color-near-black` | `#000000` | Page background |
| `--color-deeper-black` | `#0d000d` | Deep gradient stops |
| `--bg-color` | `#000000` | Body background |

> **All color decisions orbit the mauve `#dface8` accent**, creating a cohesive rose-purple-black identity.

### Typography

- **Font**: `Plus Jakarta Sans` (weights 300–800), loaded via Google Fonts with `preconnect` and `dns-prefetch`
- **Mobile nav overlay**: `Instrument Serif` (italic), loaded on-demand via `@import` inside the mobile dock component
- **Font smoothing**: `-webkit-font-smoothing: antialiased` + `-moz-osx-font-smoothing: grayscale`
- **Fluid sizing**: Most headings use `clamp()` for responsive scaling (e.g., `clamp(1.8rem, 7vw, 4.5rem)`)

### Button System

Two button classes are defined globally in `index.css`:

#### `.btn-primary`
- Solid fill (`#824D69`) with gradient border mask (`#dface8 → #824D69 → #2A114B`)
- Hover: lifts (`translateY(-2px) scale(1.03)`), brightens, mauve box-shadow glow
- **Label swap animation**: On hover, text slides right and fades out while an icon slides in from the left (`.btn-label` / `.btn-icon` with `cubic-bezier(0.76, 0, 0.24, 1)` transitions)

#### `.btn-outline`
- Transparent fill with gradient border mask (lower opacity)
- Hover: mouse-tracking radial glow via `--x`/`--y` custom properties
- Lift + subtle mauve box-shadow

### Badge

`.badge-pill` — Small pill with mauve border, used for the "AI Automation Agency" tag in the hero.

### Section Dividers

- `.section-fade-bottom` — 120px gradient overlay fading to `#000000` at section bottom
- `.section-fade-top` — Same effect at section top
- `AmbientLight` component — Animated horizontal glow line at section tops (blurred + sharp hairline + center dot)

### Card Effects

- `.service-card-beam` — On hover, animates a sweeping gradient border beam effect (`borderBeam` keyframes at 2.5s)
- Glassmorphism: `backdrop-filter: blur(12px–24px) saturate(180%)`, semi-transparent backgrounds

---

## Component Inventory

### Layout Components

| Component | Description |
|---|---|
| **Navbar** | Fixed floating header. Transparent → glassmorphic pill on scroll (width shrinks, blur + border appear). Desktop: horizontal nav links with active-section highlighting via `IntersectionObserver`. Mobile: fullscreen animated dock with italic serif font. Hidden on `/book`. |
| **Footer** | 5-column grid (brand, services, legal, socials). Custom `FooterLink` / `FooterLegalLink` for hover states and scroll targeting. |

### Section Components

| Component | Key Details |
|---|---|
| **Hero** | Lazy-loaded `shaders` WebGL background (Swirl + ChromaFlow + FlutedGlass). Respects `prefers-reduced-motion`. FlipWords rotates "Leads" / "Clients" / "Deals" with blur transition. Parallax at 20px. `document.hidden` override to prevent shader pause on tab switch. |
| **Services** | Bento grid layout (2-col on desktop, 1-col on mobile). 4 card sub-components: `LeadCaptureCard` (full-width, gradient bg, mock UI), `FollowUpCard`, `WorkflowCard`, `CustomAICard` (with image + animated "Talk to us" CTA). |
| **Process** | 4 cards in a 7-column grid (`1fr auto 1fr auto 1fr auto 1fr`) with animated SVG curved arrows between them. Uses `CardSpotlight` for mouse-following radial highlight + `CanvasRevealEffect` (WebGL dot matrix). |
| **CaseStudies** | Infinite auto-scrolling horizontal carousel via `requestAnimationFrame`. Speed slows on hover. Cards are duplicated for seamless loop. Left/right fade masks. Gradient border cards with glassmorphism. |
| **Benefits** | Row-based list with expandable modal. Uses Framer Motion `layoutId` for shared-element transitions between row and expanded state. Modal shows benefit image + detailed copy. `useOutsideClick` to dismiss. |
| **Testimonials** | Desktop: Asymmetric 4-column × 2-row grid with strategic `gridColumn`/`gridRow` spanning. Mobile: Auto-advancing carousel (3.5s interval) with dot indicators and prev/next arrows. |
| **FAQ** | Accordion using CSS `grid-template-rows: 0fr → 1fr` for smooth height animation. Chevron rotates 180° on open. Staggered scroll reveals. |
| **CTABanner** | Simple centered CTA with headline, subtext, and primary button. |

### UI Primitives

| Component | Description |
|---|---|
| **RevealWrapper** | Scroll-triggered animation wrapper. 7 variants: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale-in`, `slide-up-stagger`, `clip-reveal`. Uses `useInView` with `once: true` and `-60px` margin. Configurable delay. Easing: `[0.25, 0.46, 0.45, 0.94]` over 0.7s. |
| **AmbientLight** | Decorative section-top glow. Three layers: blurred glow line (scaleX from 0), sharp hairline (slightly delayed), center dot (scale + fade). All triggered by `useInView`. |
| **FlipWords** | Word rotation animation. Each word letter-by-letter animates in with blur. Exit: scale up + blur + slide. Spring physics. |
| **CardSpotlight** | Mouse-following radial spotlight overlay using `useMotionValue` + `useMotionTemplate` for CSS mask. On hover, renders `CanvasRevealEffect` inside (lazy-loaded). |
| **CanvasRevealEffect** | WebGL dot-matrix animation rendered via `@react-three/fiber` Canvas. Custom GLSL fragment shader for time-based dot reveal with configurable colors, opacities, dot size, and animation speed. |

### Page Components

| Page | Route | Description |
|---|---|---|
| **BookingPage** | `/book` | Multi-step form wizard (4 steps: name, email, phone, message). Step transitions via `AnimatePresence` with slide animation. Progress bar at bottom. Phone step is skippable. Enter key advances. Success screen with checkmark animation. |
| **PrivacyPolicy** | `/privacy` | Static legal page |
| **TermsOfService** | `/terms` | Static legal page |
| **CookiePolicy** | `/cookies` | Static legal page |

---

## Routing

React Router DOM v7 with `BrowserRouter`. All routes are defined in `App.tsx`:

```
/           → HomePage (all sections)
/book       → BookingPage (multi-step form)
/privacy    → PrivacyPolicy
/terms      → TermsOfService
/cookies    → CookiePolicy
```

**Navigation behavior:**
- In-page anchor links (`#services`, `#process`, etc.) use `scrollIntoView({ behavior: 'smooth' })`
- Cross-page anchor links use `sessionStorage.setItem('scrollTarget', ...)` then `window.location.href = '/'`
- Navbar hides entirely on `/book` route
- `IntersectionObserver` tracks active section for nav highlighting (rootMargin: `-30% 0px -60% 0px`)

---

## Animation System

### Scroll Reveals (RevealWrapper)

All section content is wrapped in `RevealWrapper` with staggered delays:

```
variant="fade-up"    → opacity 0→1, y 40→0
variant="fade-down"  → opacity 0→1, y -40→0
variant="fade-left"  → opacity 0→1, x -50→0
variant="fade-right" → opacity 0→1, x 50→0
variant="scale-in"   → opacity 0→1, scale 0.92→1
variant="clip-reveal" → clipPath inset 100%→0%
```

### Parallax

`useParallax(strength)` hook maps scroll progress `[0,1]` to `[+strength, -strength]` px translation. Used for the hero shader background (20px) and the global radial-gradient background (0.3× scroll).

### Micro-Interactions

| Element | Animation |
|---|---|
| Primary button label | Slides out right, icon slides in from left (500ms cubic-bezier) |
| Outline button glow | Radial gradient follows cursor via `--x`/`--y` CSS vars |
| Navbar pill | Width, border-radius, blur transition on scroll (500ms spring) |
| Service cards | `translateY(-4px)` on hover + animated gradient border beam |
| Process cards | `scale(1.02), y(-8px)` spring on hover |
| Case study carousel | `requestAnimationFrame` loop, speed changes on hover |
| Benefits rows | `scale(1.025)` on hover, `layoutId` transition to expanded modal |
| Testimonial cards | `scale(1.03), y(-6px)` spring on hover |
| FAQ accordion | CSS grid `0fr→1fr` height + opacity/transform |
| Live dot | `pulse-glow` keyframes (scale + box-shadow pulse) |
| Scroll indicator | `bounce` keyframes (translateY 0→10px) |
| "Talk to us" CTA | Background fill scales from left on hover, text/arrow recolor |

### WebGL Effects

1. **Hero shader** (`shaders` library): Swirl + ChromaFlow + FlutedGlass composition. Colors: deep purples (`#111111`, `#000000`, `#522959`, `#2A114B`). Lazy-loaded, skipped if `prefers-reduced-motion`.
2. **CardSpotlight reveal** (`@react-three/fiber`): GLSL dot-matrix with time-based intro animation. Rendered only during hover.

---

## Performance Strategy

### Code Splitting

Vite `rollupOptions.output.manualChunks` splits the bundle into:

| Chunk | Contents |
|---|---|
| `three-shaders` | `three` + `shaders` |
| `motion` | `framer-motion` |
| `router` | `react-router-dom` + `@remix-run` |
| `react-dom` | `react-dom` |
| `react` | `react` core |

### Lazy Loading

| What | How |
|---|---|
| Hero shader | `lazy(() => import('shaders/react'))` |
| `CardSpotlight` | `lazy(() => import('./ui/card-spotlight'))` |
| `CanvasRevealEffect` | `lazy(() => import('./ui/canvas-reveal-effect'))` — only rendered on hover |
| Images | `loading="lazy" decoding="async"` on all `<img>` tags |

### Build Optimization

- **Minifier**: Oxc (`minify: 'oxc'`)
- **Target**: `esnext` (no transpilation overhead)
- **Chunk warning limit**: 2000 KB (raised for Three.js bundle)
- **Post-install**: `patch-package` applies shader fix automatically

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Animation Performance

- `willChange: 'transform'` on animated elements
- `pointer-events: none` on decorative overlays
- `useInView({ once: true })` ensures animations fire only once
- Carousel uses raw `requestAnimationFrame` instead of CSS animation
- Shader patched to never pause rendering (see [Patches](#patches--workarounds))

---

## SEO & Structured Data

### Meta Tags (index.html)

- Title: "Rapivio — AI Automation Agency"
- Description, keywords, author, robots, theme-color, canonical URL
- Open Graph: type, url, title, description, image (1200×630), site_name, locale
- Twitter: summary_large_image card with same content

### Structured Data (JSON-LD)

Three schema types embedded in `<head>`:

1. **Organization**: name, url, logo, description, email, sameAs (Instagram, LinkedIn), serviceType array
2. **WebSite**: name, url
3. **Service**: serviceType "AI Automation", provider (Organization), areaServed "Worldwide", OfferCatalog with 3 services

### Static SEO Files

- `robots.txt`: Allows all crawlers, references sitemap
- `sitemap.xml`: 5 URLs (/, /book, /privacy, /terms, /cookies) with priority and changefreq

---

## Build & Deployment

### Scripts

```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b && vite build (TypeScript check + production bundle)
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

### Post-Install

`patch-package` runs automatically via the `postinstall` script to apply the `shaders` library patch.

### Path Aliases

```ts
// vite.config.ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
}
```

`@/` maps to `src/`, used throughout for imports like `@/components/ui/...`, `@/hooks/...`, `@/lib/...`.

---

## Patches & Workarounds

### `shaders+2.5.124.patch`

**Problem**: The `shaders` library uses an `IntersectionObserver` to detect visibility and pauses the WebGL render loop when the page isn't visible (e.g., user switches tabs or clicks a `mailto:` link). This causes the shader to freeze permanently after any window blur event.

**Fix**: The patch modifies the observer callback to only ever set `isVisible = true`, never `false`. Combined with `document.hidden` override and blur event interception in `Hero.tsx`, this ensures the shader never stops rendering.

```diff
- isVisible = entry.isIntersecting;
+ if (entry.isIntersecting) isVisible = true;
```

**Additional Hero.tsx workarounds:**
- Overrides `document.hidden` to always return `false`
- Intercepts `window.blur` events and immediately re-dispatches `focus`
- After `mailto:` link clicks, re-focuses the canvas element after 200ms

---

## Conventions & Patterns

### Styling Approach

The project uses a **hybrid styling strategy**:

1. **Tailwind CSS 4** for layout utilities and responsive breakpoints (e.g., `grid`, `flex`, `hidden md:flex`, `min-h-screen`)
2. **Inline `style={{}}` objects** for component-specific visual design (colors, gradients, shadows, complex positioning)
3. **Global CSS classes** in `index.css` for reusable button/badge/animation styles
4. **`cn()` utility** (`clsx` + `tailwind-merge`) for conditional class merging

### Component Patterns

- **Section structure**: Each section has `id`, `className="section-fade-bottom"`, background `#000000`, padding `7rem 1.5rem`, `position: relative`, `overflow: visible`. An `<AmbientLight>` sits at the top, content is wrapped in a max-width container.
- **Responsive detection**: Components use `useState` + `window.innerWidth` checks with `resize` listeners (not CSS-only media queries) for layout decisions that affect React rendering logic.
- **Hover states**: Managed via `useState(false)` with `onMouseEnter`/`onMouseLeave` for style changes that can't be achieved with CSS alone.
- **Cards**: Dark gradient backgrounds, semi-transparent borders with mauve tints, subtle glow effects (radial gradients and edge lines), lift-on-hover transforms.

### Naming Conventions

- Components: PascalCase (`Hero.tsx`, `CaseStudies.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollAnimation.ts`, `use-outside-click.ts`)
- CSS classes: kebab-case (`btn-primary`, `section-fade-bottom`, `service-card-beam`)
- Section IDs: kebab-case (`#hero`, `#services`, `#case-studies`)

---

*Last updated: June 2026*
