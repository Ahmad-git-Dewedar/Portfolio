# Ahmad Dewedar — Portfolio

Premium 3D portfolio for **Ahmad Dewedar, Frontend Developer**. Desktop first, bilingual (English default, full Arabic RTL).

## Stack

- [Next.js 16](https://nextjs.org) App Router, React 19, TypeScript (strict)
- [React Three Fiber](https://r3f.docs.pmnd.rs) for the hero model (no drei: the few helpers needed live in `components/three`)
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
    sections/          Hero, Work, About, Roadmap, Skills, YouTube, Faq, Contact
    projects/          ProjectShowcase, ProjectCard, ProjectFrame
    motion/            Reveal (scroll-in), Tilt (pointer 3D tilt with glare), SpotlightTracker
    decor/             AmbientBackground (color fields, grid, grain), ScrollProgress, TechMarquee
    three/             3D hero (see "Hero scene" below)
  config/              site.ts (identity, email, socials), navigation.ts (sections, nav)
  content/             projects, skills, roadmap and faq (typed, localized data)
  i18n/                Locale config, path helpers, typed dictionaries (en, ar)
  hooks/               Reduced motion, in-view, WebGL support
  styles/              tokens.css (design tokens) and globals.css
```

## Extending

- **Copy**: edit `src/i18n/dictionaries/en.ts`; `ar.ts` is type-checked against it, so missing keys fail the build.
- **New locale**: add it to `locales` and `localeMeta` in `src/i18n/config.ts`, then add a dictionary and register it in `src/i18n/dictionaries/index.ts`.
- **Projects**: add an entry to `src/content/projects.ts` and its screenshot to `public/projects/`. Set `featured: true` for the large card and `accent` to the project's brand color, which drives its hover glow and highlights. Cards pick it up automatically; images are shown at 16:9, so use covers of that ratio (about 1600x900).
- **Roadmap**: add or edit years in `src/content/roadmap.ts`; set `current: true` on the year in progress.
- **FAQ**: add questions to `src/content/faq.ts` (English and Arabic side by side).
- **Socials / YouTube**: links live in `src/config/site.ts`; adding one there updates Contact and the footer.
- **Section order and numbers**: `sectionIds`, `sectionNumbers` and the header/footer nav lists in `src/config/navigation.ts`.
- **Light/dark theme**: light values override the tokens under `:root[data-theme="light"]` in `tokens.css`. Use `--rgb-contrast` (not white) for translucent fills so they flip with the theme. The theme is set before paint by the inline script in `src/lib/theme.ts`.
- **Skills**: edit groups and items in `src/content/skills.ts`. Tool names are plain strings (kept left-to-right in Arabic); practices take `{ en, ar }`.
- **Navigation**: add a section id and nav item in `src/config/navigation.ts` plus a label under `nav.links` in the dictionaries.
- **3D model**: the hero model lives in `components/three/models/InterfaceSculpture/`, one file per part. Swap a part (or the whole model) for a GLTF (`useGLTF`) without touching the canvas, camera, lighting or interaction.
- **Theme**: all colors, type, spacing, radii, shadows and motion live in `src/styles/tokens.css`. Add `data-spotlight` to any card to get the cursor-following border glow (tint it with `--spot-rgb`). Use the channel tokens for translucency (`rgb(var(--rgb-accent) / 0.2)`), `--surface-card` + `--shadow-card` for new cards, and `<Eyebrow>` / `<SectionHeading>` for section intros.

## Hero scene

```
components/three/
  config.ts              All tunables: loop length, framing, pointer strength, DPR caps
  HeroStage/             Full-bleed stage: lazy-loads the canvas, CSS poster fallback,
                         layers page copy on top; <HeroFocusArea /> marks where the model sits
  core/                  LoopClock (shared seamless phase), loop math, framing, PerformanceGovernor, PixelBudget
  interaction/           usePointerTarget: mouse tilt, touch drag with spring-back
  scene/                 HeroScene (canvas, quality), CameraRig, ModelRig, StudioLighting + StudioEnvironment
  models/InterfaceSculpture/
    layout.ts            Resting placement of every part
    motion.ts            Pure loop choreography per part
    materials.ts         Shared physical materials
    Display, GlassCard, Orb, AccentPill, Satellites
  effects/               SoftShadow (world-anchored contact shadow), BackGlow, FloorGlow
  textures/ geometry/    Procedural canvas textures and rounded-rect geometry
```

- **Seamless loop**: every animated value is a pure function of one shared phase (`LoopClock`), built from integer-harmonic waves. One-shot effects (the screen sheen) reset while invisible. Pose at phase 0 equals pose at phase 1, so repeats never jump.
- **Interaction**: mouse and pen tilt the model and add camera parallax (damped). On touch, a horizontal drag turns the model and it springs back on release; vertical swipes scroll the page (`touch-action: pan-y`).
- **Framing**: the camera fits the model into `<HeroFocusArea />` for any viewport, so the layout decides where and how large the model appears.
- **Performance**: rendering pauses offscreen, the pixel ratio fits a per-tier pixel budget and drops when the frame rate does (`PerformanceGovernor`), lighting is an environment baked once from emissive panels (no HDR download or loaders), and shadows are textured quads instead of shadow maps.
- **Reduced motion**: the loop holds a still pose, interaction is off and the canvas renders on demand only.

## Maintenance notes

- `three` is pinned to `~0.182`: from r183 three.js logs a `THREE.Clock` deprecation warning that React Three Fiber 9 still triggers. Lift the pin once R3F moves to `THREE.Timer`.
- Filled buttons use `--color-accent-fill` (not the brighter `--color-accent`) so white labels meet WCAG AA contrast.
- The hero canvas renders at the highest pixel ratio that fits `pixelBudget` in `components/three/config.ts`, and drops a tier when the frame rate falls.

## RTL notes

Layout uses CSS logical properties throughout (`margin-inline`, `inset-inline-start`, `text-align: start`). Directional icons carry `flip-rtl` automatically; Latin-only content (emails, tech tags) is pinned to `dir="ltr"`. Arabic resets letter-spacing and relaxes line-height via `:root:lang(ar)` token overrides.
