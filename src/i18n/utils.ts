import { LOCALES, DEFAULT_LANG, type Lang } from './ui';

const base = () => (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/** Which language is this URL? Korean is served from the root, English from /en/. */
export function getLang(url: URL): Lang {
  const path = url.pathname.replace(base(), '');
  const seg = path.split('/').filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(seg ?? '') && seg !== DEFAULT_LANG
    ? (seg as Lang)
    : DEFAULT_LANG;
}

/**
 * Build an internal link for a language.
 * `path` is always the canonical, language-free path: '/', '/research/', …
 */
export function localePath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '');
  const withLang = lang === DEFAULT_LANG ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
  return (base() + withLang).replace(/\/{2,}/g, '/') || '/';
}

/** Strip the language prefix back off, so the switcher can stay on the same page. */
export function canonicalPath(url: URL): string {
  let path = url.pathname.replace(base(), '') || '/';
  for (const l of LOCALES) {
    if (l === DEFAULT_LANG) continue;
    if (path === `/${l}` || path.startsWith(`/${l}/`)) {
      path = path.slice(l.length + 1) || '/';
      break;
    }
  }
  return path.endsWith('/') ? path : path + '/';
}

/** Content ids are stored as `<lang>/<slug>`; this splits them apart. */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [maybeLang, ...rest] = id.split('/');
  return (LOCALES as readonly string[]).includes(maybeLang ?? '')
    ? { lang: maybeLang as Lang, slug: rest.join('/') }
    : { lang: DEFAULT_LANG, slug: id };
}

export { LOCALES, DEFAULT_LANG, type Lang };
