import Link from "next/link";
import { impactIntro, impactStats } from "@/lib/impact";
import styles from "./ImpactStory.module.css";

/**
 * Homepage stats framed as software development: an intro naming the
 * example project, then the figures with usertime first and largest (same
 * pattern as the M.Sc. in EducationStrip).
 */
export default function ImpactStory() {
  return (
    <section className={styles.section} aria-label={impactIntro.heading}>
      <h2 className={styles.heading}>{impactIntro.heading}</h2>
      <p className={styles.intro}>{impactIntro.text}</p>
      <dl className={styles.stats}>
        {impactStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`${styles.stat} ${i === 0 ? styles.primary : ""}`}
          >
            <dd className={styles.value}>{stat.value}</dd>
            <dt className={styles.label}>{stat.label}</dt>
            <p className={styles.detail}>{stat.detail}</p>
          </div>
        ))}
      </dl>
      <p className={styles.links}>
        <Link href="/sts2-mods">Zu den Mods</Link>
        <Link href="/sts2-data-analysis">Zur Datenanalyse</Link>
      </p>
    </section>
  );
}
