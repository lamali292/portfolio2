import Link from "next/link";
import { impactStages } from "@/lib/impact";
import styles from "./ImpactStory.module.css";

/**
 * The STS2 work as a four-step sequence (build, ship, play, analyse), one
 * figure per step. The steps really are a sequence, so they are numbered
 * and joined by a line.
 */
export default function ImpactStory() {
  return (
    <section className={styles.section} aria-label="Slay the Spire 2 in Zahlen">
      <h2 className={styles.heading}>Von der Mod zur Datenanalyse</h2>
      <p className={styles.intro}>
        Ich baue Mods für Slay the Spire 2, veröffentliche sie, sehe über
        Telemetrie wie sie gespielt werden und werte das mit SQL und ML aus.{" "}
        <Link href="/sts2-mods">Mods</Link>,{" "}
        <Link href="/sts2-data-analysis">Datenanalyse</Link>.
      </p>
      <ol className={styles.stages}>
        {impactStages.map((stage, i) => (
          <li key={stage.title} className={styles.stage}>
            <span className={styles.marker} aria-hidden="true">
              {i + 1}
            </span>
            <h3 className={styles.title}>{stage.title}</h3>
            <p className={styles.value}>{stage.value}</p>
            <p className={styles.label}>{stage.label}</p>
            <p className={styles.detail}>{stage.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
