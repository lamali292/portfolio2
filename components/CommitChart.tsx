import styles from "./CommitChart.module.css";

interface CommitChartProps {
  data: { month: string; commits: number }[];
  caption: string;
}

/** Simple bar chart (plain HTML/CSS, no chart library) of commits per month. */
export default function CommitChart({ data, caption }: CommitChartProps) {
  const max = Math.max(...data.map((d) => d.commits));
  return (
    <figure className={styles.figure}>
      <ul className={styles.bars}>
        {data.map((d) => (
          <li key={d.month} className={styles.bar}>
            <span className={styles.value}>{d.commits}</span>
            <span
              className={styles.fill}
              style={{ height: `${(d.commits / max) * 100}%` }}
            />
            <span className={styles.month}>{d.month}</span>
          </li>
        ))}
      </ul>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
