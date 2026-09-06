# Hyoung Woo Kwon — portfolio site

Astro + Tailwind CSS v4, deployed to GitHub Pages as a **user site**
(`https://<username>.github.io`), so everything is served from the domain root.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the built output
```

## Deploying

1. Create a repository named `<your-username>.github.io` and push this project to `main`.
2. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and publishes via `.github/workflows/deploy.yml`.

Set `site` in `astro.config.mjs` to your actual Pages URL — it is currently
`https://jeeyool.github.io` and is used for canonical URLs.

Moving to a project repo instead (`<username>.github.io/portfolio`)? Add
`base: '/portfolio'` to `astro.config.mjs`. Every internal link already goes
through the `href()` helper in `src/data/site.ts`, so nothing else changes.

## Languages

Korean is the default and is served from the site root; English lives under
`/en/`. The header carries a switcher that stays on the same page across the
switch, and every page emits `hreflang` alternates.

```
/            /research/            /projects/            /publications/  /cv/     ← 한국어
/en/         /en/research/         /en/projects/         /en/publications/ /en/cv/ ← English
```

- **`src/i18n/ui.ts`** holds every string that reads as prose, in both
  languages — nav, headings, highlights, Recent, the whole CV. Edit here, not in
  the page files.
- **`src/i18n/utils.ts`** resolves the language from the URL and builds links.
  `localePath('/research/', 'en')` → `/en/research/`.
- **`src/views/*.astro`** are the real pages; each takes a `lang` prop. The files
  under `src/pages/` are two-line wrappers that pick the language. To add a page,
  write one view and two wrappers.
- Adding a third language means adding a key to `ui.ts`, a folder under
  `src/content/*/`, and a `src/pages/<lang>/` directory. Nothing else changes.

Bibliographic data — paper titles, author lists, journal names — is **never
translated**. Only the `contribution` summary has a Korean counterpart
(`contributionKo`).

## Where the content lives

Everything editable is Markdown under `src/content/`, which is designed to be
opened directly as an Obsidian vault.

```
src/content/
  publications/*.md   8 papers, one file each — the citation is language
                      independent. `contribution` (EN) and `contributionKo` (KO)
                      are the two summaries.
                      `selfIndex` is the position of your name in `authors` —
                      the list bolds that entry rather than string-matching a
                      name that is spelled three different ways in print.
                      `featured: true` promotes a paper to the cards on top.
  projects/ko/*.md    5 projects per language. Same filenames in both folders,
  projects/en/*.md    so the URL slug is shared and the switcher lands on the
                      matching page. Body uses the fixed four-block template:
                      ## Problem / ## Approach / ## Result / ## Links
  thrusts/ko/*.md     3 research thrusts per language. `projects:` lists project
  thrusts/en/*.md     slugs to cross-link.
```

Language-independent identity — email, GitHub, patent number, last-updated —
lives in `src/data/site.ts`. Everything else lives in `src/i18n/ui.ts`.

Frontmatter is schema-checked in `src/content/config.ts`, so a typo fails the
build rather than rendering a blank field.

## The home page

The home page opens with a dark chapter — hero and degradation story share one
ground — and then returns to the reading theme for the rest. Detail pages are
deliberately quiet; nothing there is scroll-driven.

`src/components/StoryScroll.astro` is the scroll-linked section. Scroll progress
maps to time on the MPPT axis, and the curve draws to that time while the
readouts count and the matching stage lights up.

Three things it guarantees:

- **Every word is on screen before anything scrolls.** Motion changes emphasis,
  never whether text exists. The resting CSS has the trace fully drawn and all
  four stages at full contrast; only once the script attaches does anything dim.
- **Arc length is precomputed per sample**, so the drawn fraction and the time
  readout stay in step. A path drawn by dash offset advances by length, not by
  x, and the two diverge badly where the curve is steep.
- **`prefers-reduced-motion: reduce` collapses it** to a single static panel —
  no sticky track, no dimming, T80 marker visible.

Knobs, all in that one file:

| What | Where |
| --- | --- |
| Scroll length | `.story-track { height: 340vh }` |
| Early-regime dwell | the `Math.pow(…, 1.8)` exponent — burn-in is 60 of 2000 hours and would otherwise flash past |
| Hold at the end | `p / 0.85` — time finishes at 85% so T80 stays up while the last panel is read |
| Stage boundaries | `bounds = [0, 60, 320, t80]`, in hours |
| Stage copy | `home.story.stages` in `src/i18n/ui.ts` |
| Hero stat tiles | `home.stats` in `src/i18n/ui.ts` |

The hero's entrance is a load-time CSS animation, not scroll-triggered, and the
stat tiles carry their final values in the HTML — the count-up only animates
towards numbers that are already correct with JavaScript off.

## Images

Source files live in `src/assets/` and are optimized at build time (WebP,
responsive widths). `public/` is only for files that must be served
byte-for-byte.

```
src/assets/projects/<project-slug>/*.jpg|png|svg
src/assets/publications/*.jpg|png
```

Reference them from frontmatter with a path relative to `src/assets/<kind>/`:

```yaml
thumbnail: "mppt-measurement-system/board.jpg"   # list card, cropped to 3:2
thumbnailAlt: "MPPT measurement board"
images:
  - src: "mppt-measurement-system/board.jpg"
    alt: "MPPT measurement board"                # required
    caption: "Rev 02 single-channel board."
    wide: true                                   # full width instead of 2-up
```

A mistyped filename **fails the build** and prints the available files, so a
broken image never ships. Use the same `src` in the Korean and English files
and translate only `alt` and `caption`.

Markdown images work too — put those files in `public/img/` and write
`![alt](/img/thing.svg)`. Prefer SVG for diagrams.

Everything except list thumbnails opens in a lightbox on click (Esc, backdrop
click, or the close button dismisses it; keyboard accessible). The lightbox
loads a 1600px WebP, never the original.

`npm run images` reports source images above 2400px; `npm run images -- --fix`
resizes them in place and normalizes EXIF rotation. Run it after adding phone
photos.

## Design system

Tokens are CSS custom properties in `src/styles/global.css`, exposed to Tailwind
through `@theme inline`. Utilities such as `bg-bg`, `text-ink`, `text-accent`
therefore follow the theme automatically — there are no `dark:` variants to keep
in sync.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--c-bg` | `#ECEEED` | `#0F1413` | page ground |
| `--c-ink` | `#141A19` | `#E9EEEC` | body text |
| `--c-ink-2` | `#3B4644` | `#BAC5C2` | secondary prose |
| `--c-muted` | `#6D7A77` | `#8B9995` | captions, mono labels |
| `--c-line` | `#D3D9D7` | `#28312F` | hairline rules |
| `--c-accent` | `#0E5B54` | `#63D2C3` | links, computational thread |
| `--c-signal` | `#8E4E1D` | `#DB9F6C` | data annotations, space & hardware thread |

Type is split by language, because a face that carries English well does not
necessarily carry Hangul at all.

- **English** — Spectral for headings, IBM Plex Sans for body, IBM Plex Mono for
  numbers, dates, venues and chips.
- **Korean** — [Pretendard](https://github.com/orioncactus/pretendard)
  throughout, loaded from jsDelivr as a dynamic subset so only the syllable
  blocks a page uses are downloaded. A serif display face and a Latin-only body
  face both fell apart in Hangul, which is what made the first version hard to
  read. If the CDN is ever unreachable, the stack falls back to Apple SD Gothic
  Neo / Malgun Gothic and the page stays legible.

Two rules keep Korean from breaking:

- `[lang="ko"] { word-break: keep-all }` — Korean never splits mid-word.
- Pretendard sits inside `--font-mono` **after** IBM Plex Mono. Font fallback is
  per-character, so digits and Latin keep the monospace treatment while Hangul
  drops into Pretendard. Without this, a Korean word in a mono label falls back
  to a system face and the 0.13em tracking blows it apart. `[lang="ko"]` also
  resets that tracking on `.mono-label` and `.chip` — and those overrides live
  in the `components` layer, not `base`, because a cascade layer beats
  specificity and a base-layer rule would silently lose.

Technical vocabulary stays in English on the Korean pages — `Burn-in`,
`Light soaking`, `self-healing`, `proton irradiation`, `transport layer`, the
publication tags, the project tags. Only connective prose is translated.

Rules the design depends on:

- One accent, one signal colour. `signal` never lands on prose or UI chrome —
  only on data annotations (the T80 marker, the patent number, "pending" flags).
- Structure comes from 1px rules, never from cards or shadows. The only filled,
  rounded elements are the primary buttons.
- Body measure capped at `max-w-[74ch]`; the hero headline at `max-w-[20ch]`.
- Three theme states are handled: OS light, OS dark, and an explicit choice from
  the header toggle, which is stored in `localStorage`.

## Client-side JavaScript

Three small scripts, no framework:

1. **Header** (`src/components/Nav.astro`) — the four-page list collapses while
   you scroll down and returns when you scroll up, stop scrolling, or reach the
   top. Also runs the theme toggle.

   The list is **absolutely positioned** below the bar, so collapsing it never
   changes the document height. An earlier version animated a flow-affecting
   height: the reflow moved the scroll position, which fired another scroll
   event, which toggled the header again — the whole bar vibrated. Only the bar
   is in the flow now, and it is a constant 54px. The handler also needs 28px of
   travel in one direction before it flips state, so small wheel jitter cannot
   trigger it.
2. **Reading progress** (`src/pages/index.astro`) — a 2px bar. The only scroll
   effect on the site; there are deliberately no entrance animations.
3. **Tag filter** (`src/pages/publications.astro`) — toggles `hidden` on list
   items. No routing, no URL state.

## Hero degradation trace

`src/components/DegradationTrace.astro` generates the curve **at build time**
from a three-exponential model:

```
y(t) = 1 − 0.065(1−e^(−t/9)) + 0.022(1−e^(−t/70))
         − 0.055(1−e^(−t/320)) − 0.20(1−e^(−t/2400))
```

T80 lands at ≈1718 h and the marker is computed, not hardcoded. The caption
declares the curve synthetic, which it must while a model is drawing it.

**To use real data:** drop a two-column CSV (hours, normalized PCE) at
`src/data/mppt.csv`, read it in the component's frontmatter instead of calling
`model()`, and rewrite the caption.

## Still open

- **Result numbers** — every project's Result block is written except the
  figures: cost per channel, current resolution, continuous run time, screening
  hit rate, prediction error. They render as italic copper "pending" notes so
  they are impossible to miss.
- **Images** — no photographs or diagrams yet. Wanted: MPPT board and circuit
  diagram, jig CAD or photo, SDL observability screenshot, two pipeline
  diagrams, three tool screenshots.
- **Graphical abstracts** for the three featured papers. Paper #3 is CC BY 4.0
  and reusable with attribution; papers #1 and #2 are Springer Nature, so check
  reuse terms or redraw the schematic.
- **Résumé PDF** — the Home and CV buttons render disabled until a file exists
  at `public/kwon-cv.pdf` and `site.links.cvPdf` points to `/kwon-cv.pdf`.
- **Scholar and ORCID URLs** — empty in `src/data/site.ts`; those links are
  hidden until filled.
- **Space pipeline disclosure** — the fast-scan hysteresis ↔ radiation hardness
  hypothesis is deliberately **not** on the site. Only the pipeline structure is
  public. Keep it that way until publication.
