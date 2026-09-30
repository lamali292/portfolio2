import Link from "next/link";
import { impactSteps, usertime } from "@/lib/impact";
import styles from "./ImpactStory.module.css";

/**
 * Homepage headline: the usertime figure first, then the three steps it is
 * derived from (subscribers, tracked runs, usertime). The steps really are
 * a sequence, so they are numbered and joined by a line.
 */
export default function ImpactStory() {
  return (
    <section className={styles.section} aria-label="Slay the Spire 2 in Zahlen">
      <div className={styles.lead}>
        <p className={styles.number}>
          <span>{usertime.value}</span> {usertime.unit}
        </p>
        <h2 className={styles.heading}>{usertime.label}</h2>
        <p className={styles.detail}>{usertime.detail}</p>
        <p className={styles.links}>
          <Link href="/sts2-mods">Die Mods</Link>
          <Link href="/sts2-data-analysis">Die Datenanalyse</Link>
        </p>
      </div>
      <ol className={styles.steps}>
        {impactSteps.map((step, i) => (
          <li key={step.label} className={styles.step}>
            <span className={styles.marker} aria-hidden="true">
              {i + 1}
            </span>
            <p className={styles.value}>{step.value}</p>
            <p className={styles.label}>{step.label}</p>
            <p className={styles.stepDetail}>{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
