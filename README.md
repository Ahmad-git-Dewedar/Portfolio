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
    three/             3D hero (see "Hero scene" below)
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
- **3D model**: the hero model lives in `components/three/models/InterfaceSculpture/`, one file per part. Swap a part (or the whole model) for a GLTF (`useGLTF`) without touching the canvas, camera, lighting or interaction.
- **Theme**: all colors, type, spacing, radii and motion live in `src/styles/tokens.css`.

## Hero scene

```
components/three/
  config.ts              All tunables: loop length, framing, pointer strength, DPR caps
  HeroStage/             Full-bleed stage: lazy-loads the canvas, CSS poster fallback,
                         layers page copy on top; <HeroFocusArea /> marks where the model sits
  core/                  LoopClock (shared seamless phase), loop math, framing, disposal helpers
  interaction/           usePointerTarget: mouse tilt, touch drag with spring-back
  scene/                 HeroScene (canvas, quality), CameraRig, ModelRig, StudioLighting
  models/InterfaceSculpture/
    layout.ts            Resting placement of every part
    motion.ts            Pure loop choreography per part
    materials.ts         Shared physical materials
    Display, GlassCard, Orb, AccentPill
  effects/               SoftShadow (world-anchored contact shadow), BackGlow
  textures/ geometry/    Procedural canvas textures and rounded-rect geometry
```

- **Seamless loop**: every animated value is a pure function of one shared phase (`LoopClock`), built from integer-harmonic waves. One-shot effects (the screen sheen) reset while invisible. Pose at phase 0 equals pose at phase 1, so repeats never jump.
- **Interaction**: mouse and pen tilt the model and add camera parallax (damped). On touch, a horizontal drag turns the model and it springs back on release; vertical swipes scroll the page (`touch-action: pan-y`).
- **Framing**: the camera fits the model into `<HeroFocusArea />` for any viewport, so the layout decides where and how large the model appears.
- **Performance**: rendering pauses offscreen, the pixel ratio drops automatically when the frame rate does (`PerformanceMonitor`), lighting is a one-time Lightformer environment (no HDR download), and shadows are textured quads instead of shadow maps.
- **Reduced motion**: the loop holds a still pose, interaction is off and the canvas renders on demand only.

## RTL notes

Layout uses CSS logical properties throughout (`margin-inline`, `inset-inline-start`, `text-align: start`). Directional icons carry `flip-rtl` automatically; Latin-only content (emails, tech tags) is pinned to `dir="ltr"`. Arabic resets letter-spacing and relaxes line-height via `:root:lang(ar)` token overrides.
