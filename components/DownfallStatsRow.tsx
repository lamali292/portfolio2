import type { DownfallSummary } from "@/lib/downfall-data";
import { formatTrackedRuns, formatUsertimeYears } from "@/lib/downfall-data";
import styles from "./DownfallStatsRow.module.css";

interface DownfallStatsRowProps {
  summary: DownfallSummary;
}

/**
 * Headline stats row for the STS2 Data Analysis page, using the exact
 * "tracked run" / "usertime" terminology defined in CONTEXT.md.
 */
export default function DownfallStatsRow({ summary }: DownfallStatsRowProps) {
  return (
    <dl className={styles.stats}>
      <div className={styles.stat}>
        <dt>Getrackte Runs</dt>
        <dd>{formatTrackedRuns(summary.trackedRuns)}</dd>
      </div>
      <div className={styles.stat}>
        <dt>Usertime</dt>
        <dd>{formatUsertimeYears(summary.usertimeYears)}</dd>
      </div>
      <div className={styles.stat}>
        <dt>Solo / Multiplayer</dt>
        <dd>
          {formatTrackedRuns(summary.spRuns)} / {formatTrackedRuns(summary.mpRuns)}
        </dd>
      </div>
      <div className={styles.stat}>
        <dt>Zeitraum dieses Snapshots</dt>
        <dd>
          {summary.windowStart} – {summary.windowEnd}
        </dd>
      </div>
    </dl>
  );
}
