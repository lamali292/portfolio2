import styles from "./MinorProjectCard.module.css";
import type { MinorProject } from "@/lib/minor-projects";

/**
 * Compact card for a small side project that doesn't warrant a full
 * project page (see issue #7). Smaller/simpler than the full project-page
 * pattern used for the entries in lib/projects.ts.
 */
export default function MinorProjectCard({
  name,
  description,
  tech,
}: MinorProject) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.techList}>
        {tech.map((item) => (
          <li key={item} className={styles.chip}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
