"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./OptionSurfacePlot.module.css";

// Plotly touches `window`/`document` at import time, so it can only be
// loaded on the client. next/dynamic with ssr:false keeps it out of the
// static export build.
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <p className={styles.loading}>Lade Plot…</p>,
});

export interface OptionGridData {
  x: number[];
  y: number[];
  grid: number[][];
  stats: {
    min: number;
    max: number;
    mean: number;
    std: number;
  };
}

export type OptionResolution = "N30" | "N50";

interface OptionSurfacePlotProps {
  data: Record<OptionResolution, OptionGridData>;
}

const RESOLUTIONS: { key: OptionResolution; label: string }[] = [
  { key: "N30", label: "N = 30" },
  { key: "N50", label: "N = 50" },
];

export default function OptionSurfacePlot({ data }: OptionSurfacePlotProps) {
  const [resolution, setResolution] = useState<OptionResolution>("N30");
  const current = data[resolution];

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle} role="group" aria-label="Gitterauflösung">
        {RESOLUTIONS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={resolution === key ? styles.active : styles.button}
            aria-pressed={resolution === key}
            onClick={() => setResolution(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.plotContainer}>
        <Plot
          data={[
            {
              type: "surface",
              x: current.x,
              y: current.y,
              z: current.grid,
              colorscale: "Viridis",
              showscale: true,
            },
          ]}
          layout={{
            autosize: true,
            height: 480,
            margin: { l: 0, r: 0, t: 20, b: 0 },
            scene: {
              xaxis: { title: "S1 (Basiswert 1)" },
              yaxis: { title: "S2 (Basiswert 2)" },
              zaxis: { title: "Optionswert" },
            },
          }}
          style={{ width: "100%" }}
          useResizeHandler
          config={{ displaylogo: false, responsive: true }}
        />
      </div>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt>Minimum</dt>
          <dd>{current.stats.min.toFixed(2)}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Maximum</dt>
          <dd>{current.stats.max.toFixed(2)}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Mittelwert</dt>
          <dd>{current.stats.mean.toFixed(2)}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Std.-Abw.</dt>
          <dd>{current.stats.std.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  );
}
