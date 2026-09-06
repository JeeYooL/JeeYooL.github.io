/**
 * Language-independent identity: links, repository, dates.
 * Everything that reads as prose lives in src/i18n/ui.ts, per language.
 */
export const site = {
  // Published papers alternate between "Hyoung Woo Kwon" and "Hyoung-Woo Kwon".
  // The site, ORCID and Scholar must all use the same string or the profiles
  // split into two people. Unhyphenated form chosen — it is what the three
  // most recent papers use.
  nameLatin: 'Hyoung Woo Kwon',
  email: 'hwkwon@unist.ac.kr',
  repo: 'https://github.com/JeeYooL/Perovskite',
  links: {
    github: 'https://github.com/JeeYooL',
    githubLabel: 'github.com/JeeYooL',
    scholar: '', // TODO: Google Scholar profile URL
    orcid: '', // TODO: ORCID iD URL
    cvPdf: '', // TODO: drop kwon-cv.pdf into /public and set to '/kwon-cv.pdf'
  },
  patentNumber: 'KR 10-2118728 B1',
  lastUpdated: '2026-09-06',
} as const;

/** Canonical, language-free paths. localePath() adds the /en prefix. */
export const navPaths = [
  { key: 'research', path: '/research/' },
  { key: 'projects', path: '/projects/' },
  { key: 'publications', path: '/publications/' },
  { key: 'cv', path: '/cv/' },
] as const;
