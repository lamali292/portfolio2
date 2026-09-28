import type { HeadlineStat } from "@/lib/headline-stats";
import styles from "./StatBanner.module.css";

interface StatBannerProps {
  stats: HeadlineStat[];
}

/**
 * Homepage headline stat banner (issue #10) - a prominent row of 3-4
 * numbers shown above the project grid, distinct from the smaller
 * per-project highlight badges in ProjectCard.
 */
export default function StatBanner({ stats }: StatBannerProps) {
  return (
    <dl className={styles.stats}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <dt className={styles.label}>{stat.label}</dt>
          <dd className={styles.value}>{stat.value}</dd>
          {stat.detail && <p className={styles.detail}>{stat.detail}</p>}
        </div>
      ))}
    </dl>
  );
}
