import katex from "katex";

/**
 * Server-side LaTeX rendering via KaTeX. Runs at build time (static
 * export), so no math-rendering JS ships to the client.
 */
export function renderMath(tex: string, displayMode = false): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    output: "html",
  });
}
