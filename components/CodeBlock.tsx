import { renderCode } from "@/lib/code";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  lang?: string;
  caption?: string;
}

/**
 * Renders a syntax-highlighted code sample via Shiki (server-rendered at
 * build time). No highlighter JS ships to the client.
 */
export default async function CodeBlock({
  code,
  lang = "c",
  caption,
}: CodeBlockProps) {
  const html = await renderCode(code, lang);
  return (
    <figure className={styles.figure}>
      <div
        className={styles.codeBlock}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
