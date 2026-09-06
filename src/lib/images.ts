/**
 * Image resolution for content files.
 *
 * Markdown frontmatter names an image with a short path relative to
 * src/assets/, e.g. `mppt-measurement-system/board.jpg`. This maps that back
 * to the real module so Astro can optimize it at build time.
 *
 * Anything placed in public/ is served untouched — use that only for files
 * that must keep their exact bytes (a PDF, a favicon).
 */
export type Resolved = { src: ImageMetadata | string; isSvg: boolean };

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif,gif,svg}',
);

/** All keys, for the error message when a filename is mistyped. */
export const knownImages = () => Object.keys(modules).map((k) => k.replace('/src/assets/', ''));

export async function resolveImage(path: string, kind: 'projects' | 'publications'): Promise<Resolved | null> {
  if (!path) return null;
  // An absolute path or URL means "serve as-is from public/" — no optimization.
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/')) {
    return { src: path, isSvg: path.toLowerCase().endsWith('.svg') };
  }
  const key = `/src/assets/${kind}/${path.replace(/^\/+/, '')}`;
  const loader = modules[key];
  if (!loader) {
    throw new Error(
      `Image not found: ${key}\n` +
        `Put the file under src/assets/${kind}/ and check the spelling.\n` +
        `Currently available:\n  ${knownImages().join('\n  ') || '(none yet)'}`,
    );
  }
  const mod = await loader();
  return { src: mod.default, isSvg: key.toLowerCase().endsWith('.svg') };
}
