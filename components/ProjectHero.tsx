import type { ReactNode } from "react";
import styles from "./ProjectHero.module.css";

interface ProjectHeroProps {
  title: string;
  lead: string;
  children?: ReactNode;
}

/**
 * Shared hero block for every project page: title + lead paragraph, with
 * an optional slot underneath (e.g. tech chips). Centralizing this is what
 * keeps every page's header visually consistent instead of each page
 * reinventing its own spacing/typography.
 */
export default function ProjectHero({ title, lead, children }: ProjectHeroProps) {
  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      {children}
    </header>
  );
}
