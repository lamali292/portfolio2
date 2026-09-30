"use client";

import { useState } from "react";
import Plot from "./Plot";
import { relicWinRate, type DownfallRelicStats } from "@/lib/downfall-data";
import styles from "./DownfallChart.module.css";

interface RelicWinRateChartProps {
  relicsTop: DownfallRelicStats[];
  relicsBottom: DownfallRelicStats[];
  minRuns: number;
}

type View = "top" | "bottom";

const VIEWS: { key: View; label: string }[] = [
  { key: "top", label: "Stärkste 15" },
  { key: "bottom", label: "Schwächste 10" },
];

/**
 * Relic win-rate ranking. Win rate is computed from wins_with_relic /
 * runs_with_relic already summed across version groups per relic, filtered
 * to relics with at least `minRuns` total runs to suppress noise from
 * rarely-seen relics (mirrors the reference Downfall-Data dashboard's
 * min-runs filter).
 */
export default function RelicWinRateChart({
  relicsTop,
  relicsBottom,
  minRuns,
}: RelicWinRateChartProps) {
  const [view, setView] = useState<View>("top");
  const rows = view === "top" ? relicsTop : relicsBottom;
  // Plotly horizontal bars render bottom-to-top, so reverse for a
  // top-to-bottom ranked list.
  const ranked = [...rows].reverse();
  const labels = ranked.map((r) => r.label);
  const rates = ranked.map((r) => relicWinRate(r) * 100);
  const runs = ranked.map((r) => r.runsWithRelic);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle} role="group" aria-label="Relic-Ranking">
        {VIEWS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={view === key ? styles.active : styles.button}
            aria-pressed={view === key}
            onClick={() => setView(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.plotContainer}>
        <Plot
          data={[
            {
              type: "bar",
              orientation: "h",
              x: rates,
              y: labels,
              customdata: runs,
              marker: { color: view === "top" ? "#0b6e66" : "#c0392b" },
              hovertemplate:
                "%{y}<br>Win-Rate: %{x:.1f}%<br>Runs: %{customdata}<extra></extra>",
            },
          ]}
          layout={{
            autosize: true,
            height: 420,
            margin: { l: 160, r: 20, t: 20, b: 50 },
            xaxis: { title: "Win-Rate (%)" },
          }}
          style={{ width: "100%" }}
          useResizeHandler
          config={{ displaylogo: false, responsive: true }}
        />
      </div>
      <p className={styles.caption}>
        Win-Rate je Relic (gewonnene Runs / Runs mit diesem Relic), aus{" "}
        <code>relic_stats</code> summiert über Versionsgruppen, gefiltert
        auf Relics mit mindestens {minRuns} Runs insgesamt.
      </p>
    </div>
  );
}
