import Link from "next/link";
import { impactIntro, impactStats } from "@/lib/impact";
import styles from "./ImpactStory.module.css";

/**
 * Homepage stats for the STS2 mod: one sentence saying what it is, then
 * three equally weighted figures (reach, tracked runs, usertime).
 */
export default function ImpactStory() {
  return (
    <section className={styles.section} aria-label={impactIntro.heading}>
      <h2 className={styles.heading}>{impactIntro.heading}</h2>
      <p className={styles.intro}>{impactIntro.text}</p>
      <dl className={styles.stats}>
        {impactStats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
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
