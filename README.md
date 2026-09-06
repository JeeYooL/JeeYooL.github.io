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

Type: **Spectral** for headings, **IBM Plex Sans** for body, **IBM Plex Mono**
for numbers, dates, venues and chips. Korean falls through to **Noto Serif KR**
and **IBM Plex Sans KR** in the same stacks, and `[lang="ko"]` sets
`word-break: keep-all` so Korean never breaks mid-word.

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
