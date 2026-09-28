import { codeToHtml } from "shiki";

/**
 * Server-side syntax highlighting via Shiki. Runs at build time (static
 * export), so no highlighter JS ships to the client.
 */
export async function renderCode(code: string, lang: string): Promise<string> {
  return codeToHtml(code, {
    lang,
    theme: "github-light",
  });
}
