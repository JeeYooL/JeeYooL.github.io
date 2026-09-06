/**
 * Single place for identity, links and nav.
 * Anything marked TODO renders as a disabled control rather than a dead link.
 */
export const site = {
  name: 'Hyoung Woo Kwon',
  // Published papers alternate between "Hyoung Woo Kwon" and "Hyoung-Woo Kwon".
  // The site, ORCID and Scholar must all use the same string or the profiles
  // split into two people. Unhyphenated form chosen — it is what the three
  // most recent papers use.
  nameVariants: ['Hyoung Woo Kwon', 'Hyoung-Woo Kwon', 'Hyoungwoo Kwon'],
  role: 'Postdoctoral Researcher',
  affiliation: 'UNIST · LEHMS · Sang Il Seok group',
  affiliationPlain: 'UNIST, LEHMS — Sang Il Seok group',
  location: 'Ulsan, Republic of Korea',
  email: 'hwkwon@unist.ac.kr',
  tagline:
    'Perovskite solar cells, from op-amp to Pareto front.',
  intro:
    'I work across three layers that are usually held by three different people: custom measurement hardware, physics-based degradation models, and machine-learning materials design.',
  repo: 'https://github.com/JeeYooL/Perovskite',
  links: {
    github: 'https://github.com/JeeYooL',
    scholar: '', // TODO: Google Scholar profile URL
    orcid: '', // TODO: ORCID iD URL
    cvPdf: '', // TODO: drop kwon-cv.pdf into /public and set to '/kwon-cv.pdf'
  },
  lastUpdated: '2026-09-06',
} as const;

export const nav = [
  { href: '/research/', label: 'Research', blurb: 'Three thrusts and the loop that closes them' },
  { href: '/projects/', label: 'Projects', blurb: 'Five builds, problem through result' },
  { href: '/publications/', label: 'Publications', blurb: '8 papers, 3 as co-first author' },
  { href: '/cv/', label: 'CV', blurb: 'Positions, education, patent, toolstack' },
] as const;

/** Prefix an internal path with Astro's configured base (root on a user site). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/' || base === '') return path;
  return (base.replace(/\/$/, '') + path).replace(/\/{2,}/g, '/');
}
