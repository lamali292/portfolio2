"use client";

import Plot from "./Plot";
import {
  acquireWinRate,
  pickRate,
  type DownfallCharacterCardStats,
} from "@/lib/downfall-data";
import styles from "./DownfallChart.module.css";

interface CardRatesChartProps {
  cardsByCharacter: DownfallCharacterCardStats[];
}

function toTitleCase(id: string): string {
  return id.charAt(0) + id.slice(1).toLowerCase();
}

/**
 * Card pick-rate and win-rate by character. Both rates are computed from
 * counts already summed across every card and version group for that
 * character (offered_3c/picked_3c/runs_acquired/wins_acquired) — never
 * averaged from pre-computed per-card rates.
 */
export default function CardRatesChart({
  cardsByCharacter,
}: CardRatesChartProps) {
  const characters = cardsByCharacter.map((c) => toTitleCase(c.character));
  const pick = cardsByCharacter.map((c) => pickRate(c) * 100);
  const win = cardsByCharacter.map((c) => acquireWinRate(c) * 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.plotContainer}>
        <Plot
          data={[
            {
              type: "bar",
              name: "Pick-Rate",
              x: characters,
              y: pick,
              marker: { color: "#0b6e66" },
              hovertemplate: "%{x}<br>Pick-Rate: %{y:.1f}%<extra></extra>",
            },
            {
              type: "bar",
              name: "Win-Rate",
              x: characters,
              y: win,
              marker: { color: "#e07a3f" },
              hovertemplate: "%{x}<br>Win-Rate: %{y:.1f}%<extra></extra>",
            },
          ]}
          layout={{
            autosize: true,
            height: 380,
            barmode: "group",
            margin: { l: 50, r: 20, t: 20, b: 50 },
            xaxis: { title: "Charakter" },
            yaxis: { title: "Rate (%)" },
            legend: { orientation: "h", y: -0.2 },
          }}
          style={{ width: "100%" }}
          useResizeHandler
          config={{ displaylogo: false, responsive: true }}
        />
      </div>
      <p className={styles.caption}>
        Pick-Rate (Anteil der Dreierauswahl-Angebote, die angenommen
        wurden) und Win-Rate (Anteil gewonnener Runs, in denen die Karte
        erworben wurde) je Charakter, aus <code>card_stats_by_group</code>{" "}
        summiert über alle Karten und Versionsgruppen des Charakters.
      </p>
    </div>
  );
}
