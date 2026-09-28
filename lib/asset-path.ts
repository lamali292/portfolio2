/**
 * Prefixes a public-folder asset path with the configured base path, so
 * images resolve correctly both locally and under the GitHub Pages
 * sub-path used in production (see next.config.js).
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`;
}
