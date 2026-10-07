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
    sections/          Journey (3D opening), Hero, Bridge, About, Work, Roadmap, Skills, YouTube, Faq, Contact
    projects/          ProjectScene (one cinematic scene per project), ProjectFrame
    scroll/            ScrollEngine, ScrollScene, SplitText (the cinematic scroll system)
    cursor/            CursorLabel (contextual "View project" style cursor)
    motion/            Reveal (scroll-in), SpotlightTracker
    decor/             AmbientBackground (color fields, grid, grain), ScrollProgress, TechMarquee
    three/             3D journey (see "3D journey" below)
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
- **Light/dark theme**: dark (deep black and graphite, no tinted glows) is the default for every visitor; the toggle stores a light choice. Light values override the tokens under `:root[data-theme="light"]` in `tokens.css`. Use `--rgb-contrast` (not white) for translucent fills so they flip with the theme. The theme is set before paint by the inline script in `src/lib/theme.ts`.
- **Skills**: edit groups and items in `src/content/skills.ts`. Tool names are plain strings (kept left-to-right in Arabic); practices take `{ en, ar }`.
- **Navigation**: add a section id and nav item in `src/config/navigation.ts` plus a label under `nav.links` in the dictionaries.
- **3D model**: the hero model lives in `components/three/models/InterfaceSculpture/`, one file per part. Swap a part (or the whole model) for a GLTF (`useGLTF`) without touching the canvas, camera, lighting or interaction.
- **Theme**: all colors, type, spacing, radii, shadows and motion live in `src/styles/tokens.css`. Add `data-spotlight` to any card to get the cursor-following border glow (tint it with `--spot-rgb`). Use the channel tokens for translucency (`rgb(var(--rgb-accent) / 0.2)`), `--surface-card` + `--shadow-card` for new cards, and `<Eyebrow>` / `<SectionHeading>` for section intros.

## Cinematic scroll system

The page plays as one sequence: 3D journey (Hero → statement → About) → Projects (one scene each) → Roadmap → Skills → YouTube → FAQ → Contact.

- **ScrollEngine** (mounted once) gives every `[data-scene]` element a smoothed `--p` from 0 to 1. One rAF loop: read all geometry, then write, and only while something is moving.
- **ScrollScene** is a tall track with a pinned, viewport-sized stage. Everything inside reads `--p`; CSS turns it into scale, parallax, masks and opacity. `length` sets how long a scene lasts (in viewport heights).
- `data-scene="view"` (used by Hero, Bridge and Contact) gives progress through the viewport without pinning.
- **SplitText** splits a sentence into words (never letters, so Arabic stays joined) for word-by-word highlight or masked rises.
- **Motion styles are opt-in**: base CSS is a calm static layout; cinematic rules live under `:root[data-scroll="on"]`, which a head script sets before paint unless the visitor prefers reduced motion. No JavaScript or reduced motion = static layout.
- Phase variables (`--in`, `--info`, `--out`, ...) are registered with `@property` in `src/styles/motion-properties.css` so style recalculation stays cheap. Register new ones there.
- **Project scenes**: set `scene.variant` (`zoom`, `slit`, `rise`, `lift`), `scene.background` and `scene.tone` per project in `src/content/projects.ts`. Each scene's exit fades into the next scene's background, so there are no gaps.
- **Cursor**: add `data-cursor="Label"` to any element to show a labelled cursor over it (mouse and trackpad only).

## 3D journey

The opening is one continuous scene: a single canvas pinned behind Hero, the statement (Bridge) and About, with the model, camera and 3D typography all driven by scroll.

```
components/three/
  config.ts              Tunables: camera, model bounds, pointer strength, scroll damping, DPR caps
  journey/
    JourneyStage         Sticky full-screen layer: lazy-loads the canvas, sets data-stage3d="ready"
    JourneyScene         Canvas, quality, lighting; composes the parts below
    keyframes.ts         The choreography: poses (position, size, rotation, dolly, orbit, type) at scroll distances, wide and portrait
    JourneyDriver        Reads scroll distance (in viewport heights), eases it, samples the keyframes
    JourneyRig           Applies the pose to the model and camera, plus a light pointer tilt
    DepthType            The statement as 3D type planes at different depths around the model
  core/                  LoopClock (choreography phase, from scroll), loop math, PerformanceGovernor, PixelBudget
  scene/                 StudioLighting + StudioEnvironment
  models/InterfaceSculpture/
    layout.ts            Resting placement of every part
    motion.ts            Part choreography as a pure function of the phase
    materials.ts         Shared physical materials
    Display, GlassCard, Orb, AccentPill, Satellites
  effects/               SoftShadow (contact shadow), BackGlow, FloorGlow (neutral graphite), Dust
  textures/ geometry/    Procedural canvas textures (interface, text) and rounded-rect geometry
```

- **Scroll is the timeline**: nothing moves on a timer. Scroll distance through the journey picks a pose between keyframes (smoothstep), and also drives the part choreography (`LoopClock` phase), so scrolling back plays everything in reverse. Edit `keyframes.ts` to restage the scene.
- **Layout**: on load the model sits on the far side of the hero copy (mirrored in Arabic), slides out of frame so the statement plays on its own, rises back in beside About and finally lifts away. Portrait screens use their own keyframes (the model leaves upward and returns above the text). Off-screen, the model travels around the frame, never across it.
- **Real depth**: the statement is drawn as text planes at alternating depths in the scene, so its lines separate with true parallax as the camera dollies and orbits. The HTML copy stays in the page for screen readers and for the no-WebGL fallback.
- **Interaction**: mouse and pen add a small tilt and camera parallax (damped). Touch only scrolls.
- **Performance**: renders on demand (only while scroll or pointer is moving), pauses offscreen, fits a per-tier pixel budget and drops a tier when the frame rate does (`PerformanceGovernor`); lighting is baked once from emissive panels and shadows are textured quads.
- **Fallbacks**: without WebGL a CSS poster stands in and the statement shows as page text; with reduced motion the scene holds a still pose and the sections are a static layout.

## Maintenance notes

- `three` is pinned to `~0.182`: from r183 three.js logs a `THREE.Clock` deprecation warning that React Three Fiber 9 still triggers. Lift the pin once R3F moves to `THREE.Timer`.
- Filled buttons use `--color-accent-fill` (not the brighter `--color-accent`) so white labels meet WCAG AA contrast.
- The journey canvas renders at the highest pixel ratio that fits `pixelBudget` in `components/three/config.ts`, and drops a tier when the frame rate falls.

## RTL notes

Layout uses CSS logical properties throughout (`margin-inline`, `inset-inline-start`, `text-align: start`). Directional icons carry `flip-rtl` automatically; Latin-only content (emails, tech tags) is pinned to `dir="ltr"`. Arabic resets letter-spacing and relaxes line-height via `:root:lang(ar)` token overrides.
