# NEXUS ARENA

A premium, dark-cyberpunk gaming platform front-end. Nine pages, fully responsive, statically rendered.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion 13 · Lucide

## Structure

```
src/
├── app/
│   ├── layout.tsx            Root shell — fonts, metadata, JSON-LD, providers
│   ├── page.tsx              Home (11 sections)
│   ├── games|tournaments|leaderboards|store|news|community|about|contact/
│   ├── opengraph-image.tsx   Build-time 1200×630 social card
│   ├── sitemap.ts robots.ts not-found.tsx
│   └── globals.css           Design tokens + utilities
├── components/
│   ├── layout/               Navbar, Footer, Loader, ParticleField, SearchOverlay,
│   │                         FloatingActions, PageHeader, PageTransition
│   ├── sections/             Homepage sections
│   ├── pages/                Page-specific interactive clients
│   ├── providers/            WishlistProvider
│   └── ui/                   GameCard, GameArt, NewsCard, Counter, Countdown,
│                             LeaderboardRow, NeonButton, Reveal, VideoPreview
└── lib/                      data.ts (content model), motion.ts (variants)
```

## Design system

Tokens live in `@theme` in `globals.css`, so every colour and animation is a real Tailwind
utility (`text-neon-blue`, `animate-gradient-pan`) rather than an arbitrary value.

| Token | Value |
|---|---|
| `neon-blue` | `#00E5FF` |
| `neon-purple` | `#7C3AED` |
| `neon-pink` | `#FF2E88` |
| `neon-lime` | `#B6FF3C` |
| surfaces | `void` `abyss` `carbon` `slate-deep` `edge` |
| text | `ink` `ink-dim` `ink-faint` |

Custom utilities: `glass`, `glass-strong`, `text-gradient`, `neon-border`, `glow-{blue,pink,purple}`,
`clip-corner`, `clip-notch`, `shimmer-text`.

## Notable implementation decisions

**Artwork is procedural.** `GameArt` renders deterministic inline SVG from a seed — layered
gradients, a star field, two parallax ridgelines, and seed-varied geometry. No image requests, so
there is nothing to lazy-load and nothing that can 404. IDs come from `useId()` because the same
title can appear in two sections at once.

**Particles are budgeted.** Density scales with viewport area and caps at 110. The loop stops when
the tab is hidden or the canvas scrolls out of view, and never starts under `prefers-reduced-motion`.

**YouTube uses a facade.** Three real iframes would pull ~1.5MB of third-party JS before anyone
clicks. `VideoPreview` paints a static poster and swaps in the iframe on demand.

**Time is client-only.** `Countdown` renders `--` on first paint rather than a server-computed
value — server and client clocks differ, so anything else guarantees a hydration mismatch. Same
reasoning puts the wishlist's `localStorage` read in an effect.

**Reveal merges its delay into the variant.** Framer Motion gives variant transitions precedence
over the `transition` prop, so a `delay` prop passed alongside a variant would be silently dropped.

## Accessibility

Targets WCAG 2.2 AA. Skip link, one `h1` per page, landmark regions, labelled controls, visible
focus rings, `aria-live` on every filter result count, form errors wired via `aria-describedby`
with focus moved to the first invalid field, and a global `prefers-reduced-motion` override.
Decorative layers are `aria-hidden`; the marquee's duplicated half is hidden from the a11y tree.

## SEO

Per-page metadata and canonicals, Open Graph and Twitter cards, generated OG image, `sitemap.xml`,
`robots.txt`, and JSON-LD: Organization + WebSite with SearchAction (root), `ItemList` of
`VideoGame` (games), `SportsEvent` (tournaments), `Product` (store), `Blog` (news), `ContactPage`.

All 14 routes prerender as static.

## Note

Content is fictional — titles, teams, players, and figures are invented. The Steam/Discord/Twitch
sign-in buttons, contact form, newsletter, and chat widget are front-end placeholders with no
backend; they say so in the UI rather than simulating success silently.
