# Ahmad Dewedar — Portfolio

Premium 3D portfolio for **Ahmad Dewedar, Frontend Developer**. Desktop first, bilingual (English default, full Arabic RTL).

## Stack

- [Next.js 16](https://nextjs.org) App Router, React 19, TypeScript (strict)
- [React Three Fiber](https://r3f.docs.pmnd.rs) + drei for the hero model
- CSS Modules on top of a single design-token file (no CSS framework)
- `next/font` for Martel (English) and Alan Sans (Arabic)

## Scripts

```bash
npm run dev        # local development on http://localhost:3000
npm run build      # production build (static /en and /ar)
npm run start      # serve the production build
npm run lint       # ESLint (next core-web-vitals + typescript)
npm run typecheck  # generate route types and run tsc
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical and `hreflang` URLs are absolute.

## Structure

```
src/
  app/[locale]/        Root layout (html lang/dir, fonts, metadata) and the home page
  components/
    ui/                Design-system primitives: Button, Container, Section, SectionHeading, Icon
    layout/            SiteHeader, LanguageSwitcher, BrandMark, SiteFooter, SkipLink
    sections/          Page sections: Hero, WorkSection, ContactSection
    projects/          ProjectGrid, ProjectCard, ProjectVisual (CSS 3D device stages)
    three/             HeroStage (lazy loader + fallback), scene/, models/, textures/
  config/              site.ts (identity, email, socials), navigation.ts (sections, nav)
  content/             projects.ts (typed, localized project data)
  i18n/                Locale config, path helpers, typed dictionaries (en, ar)
  hooks/               Reduced motion, in-view, WebGL support
  styles/              tokens.css (design tokens) and globals.css
```

## Extending

- **Copy**: edit `src/i18n/dictionaries/en.ts`; `ar.ts` is type-checked against it, so missing keys fail the build.
- **New locale**: add it to `locales` and `localeMeta` in `src/i18n/config.ts`, then add a dictionary and register it in `src/i18n/dictionaries/index.ts`.
- **Projects**: replace the placeholder entries in `src/content/projects.ts`. Add `href` to show a link, or `visual.image` to swap the abstract device screen for a screenshot.
- **Navigation**: add a section id and nav item in `src/config/navigation.ts` plus a label under `nav.links` in the dictionaries.
- **3D model**: the hero model is `components/three/models/InterfaceSculpture.tsx`, built from primitives. Swap it for a GLTF (`useGLTF`) without touching the canvas, lighting or pointer rig.
- **Theme**: all colors, type, spacing, radii and motion live in `src/styles/tokens.css`.

## RTL notes

Layout uses CSS logical properties throughout (`margin-inline`, `inset-inline-start`, `text-align: start`). Directional icons carry `flip-rtl` automatically; Latin-only content (emails, tech tags) is pinned to `dir="ltr"`. Arabic resets letter-spacing and relaxes line-height via `:root:lang(ar)` token overrides.
