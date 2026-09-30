"use client";

import Plot from "./Plot";
import type { DownfallDayActivity } from "@/lib/downfall-data";
import styles from "./DownfallChart.module.css";

interface RunsOverTimeChartProps {
  runsOverTime: DownfallDayActivity[];
}

/** Stacked daily runs (solo vs. multiplayer), raw counts per day. */
export default function RunsOverTimeChart({
  runsOverTime,
}: RunsOverTimeChartProps) {
  const days = runsOverTime.map((r) => r.day);
  const solo = runsOverTime.map((r) => r.sp_runs);
  const multi = runsOverTime.map((r) => r.mp_runs);

  return (
    <div className={styles.wrapper}>
      <div className={styles.plotContainer}>
        <Plot
          data={[
            {
              type: "bar",
              name: "Solo",
              x: days,
              y: solo,
              marker: { color: "#0b6e66" },
            },
            {
              type: "bar",
              name: "Multiplayer",
              x: days,
              y: multi,
              marker: { color: "#5fb3a8" },
            },
          ]}
          layout={{
            autosize: true,
            height: 380,
            barmode: "stack",
            margin: { l: 50, r: 20, t: 20, b: 50 },
            xaxis: { title: "Tag" },
            yaxis: { title: "Getrackte Runs" },
            legend: { orientation: "h", y: -0.2 },
          }}
          style={{ width: "100%" }}
          useResizeHandler
          config={{ displaylogo: false, responsive: true }}
        />
      </div>
      <p className={styles.caption}>
        Getrackte Runs pro Tag, aufgeteilt nach Solo- und
        Multiplayer-Sessions (Rohzahlen aus{" "}
        <code>runs_per_day</code>, summiert über Charaktere und
        Versionsgruppen).
      </p>
    </div>
  );
}
