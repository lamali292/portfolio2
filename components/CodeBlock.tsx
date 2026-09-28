import { renderCode } from "@/lib/code";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  lang: string;
}

/**
 * Renders a syntax-highlighted code sample via Shiki (server-rendered at
 * build time). No highlighter JS ships to the client.
 */
export default async function CodeBlock({ code, lang }: CodeBlockProps) {
  const html = await renderCode(code, lang);
  return (
    <div
      className={styles.codeBlock}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
