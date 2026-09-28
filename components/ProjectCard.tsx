import Link from "next/link";
import styles from "./ProjectCard.module.css";
import type { Project } from "@/lib/projects";

/**
 * Clickable preview card for a full project page, rendered in the
 * homepage's main project grid so visitors see real content up front
 * instead of having to click through nav links first.
 */
export default function ProjectCard({
  href,
  title,
  teaser,
  tech,
  highlight,
}: Project) {
  return (
    <Link href={href} className={styles.card}>
      {highlight && <span className={styles.highlight}>{highlight}</span>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.teaser}>{teaser}</p>
      <ul className={styles.techList}>
        {tech.map((item) => (
          <li key={item} className={styles.chip}>
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
}
