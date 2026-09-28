"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
}

export default function CodeBlock({
  code,
  language = "c",
  caption,
}: CodeBlockProps) {
  return (
    <figure className={styles.figure}>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          borderRadius: "0.5rem",
          fontSize: "0.85rem",
          margin: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
