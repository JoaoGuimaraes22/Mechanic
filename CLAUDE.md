# Mechanic - Revicar Auto Repair Website

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** (PostCSS plugin, inline theme in `globals.css`)
- No external UI libraries — pure Tailwind
- Minimal deps: only next, react, react-dom in production

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config)

## Project Structure

```files
app/
  layout.tsx                  — Root layout (minimal wrapper)
  globals.css                 — Tailwind imports, custom theme colors, utilities
  [locale]/
    layout.tsx                — SEO metadata, JSON-LD schema, static params
    page.tsx                  — Main page (server component, assembles all sections)
  components/
    Navbar/Navbar.tsx         — Scroll-aware nav, mobile menu, locale switcher
    HeroContent/HeroContent.tsx — Animated hero text + CTAs
    About/About.tsx           — Stats, description
    Services/Services.tsx     — 9 service cards (mobile slider + desktop 3x3 grid)
    Reviews/Reviews.tsx       — Customer testimonials grid
    FAQ/FAQ.tsx               — Accordion
    Contact/Contact.tsx       — Form + business info
    Footer/Footer.tsx
    CallBar/CallBar.tsx       — Floating CTA bar
    WhatsApp/WhatsApp.tsx     — WhatsApp button
dictionaries/
  en.json, pt.json            — All UI text (navbar, hero, about, services, reviews, faq, contact, footer, callBar)
i18n-config.ts                — Locales: pt (default), en
get-dictionary.ts             — Dynamic import dictionary loader
public/img/                   — hero.jpg, oficina.jpg, reviews.jpg, services.jpg, services/services1-9.jpg
```

## i18n

- Two locales: `pt` (default), `en`
- Route pattern: `/[locale]/` — dictionaries loaded server-side via `getDictionary()`
- Dictionary keys: navbar, hero, about, services, reviews, faq, contact, footer, callBar

## Design

- Dark theme: slate-900/950 backgrounds, red-500/600 accents, amber for stars
- Fonts: **Oswald** (headings), **Inter** (body) — loaded via Google Fonts in globals.css
- Hero and Reviews sections use CSS `background-attachment: fixed` for parallax
- Service card images hover-zoom via `group-hover:scale-110`
- Intersection Observer animations on most sections

## Conventions

- Server components by default; `"use client"` only when needed (Navbar, HeroContent, Services, Reviews, FAQ, Contact, CallBar, WhatsApp)
- Component pattern: one file per folder (`ComponentName/ComponentName.tsx`)
- Dictionary types defined inline in each component
- `fontFamily: "'Oswald', sans-serif"` applied via inline style on headings
