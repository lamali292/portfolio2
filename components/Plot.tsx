"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlotParams } from "react-plotly.js";
import styles from "./Plot.module.css";

// Plotly touches `window`/`document` at import time, so it can only be
// loaded on the client. next/dynamic with ssr:false keeps it out of the
// static export build (see app/praktikum's OptionSurfacePlot for the same
// pattern).
const PlotlyPlot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <p className={styles.loading}>Lade Plot…</p>,
});

/** True when the active theme is dark (site toggle wins over the system setting). */
function useDarkTheme(): boolean {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const forced = root.getAttribute("data-theme");
      setDark(forced === "dark" || (forced !== "light" && media.matches));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    media.addEventListener("change", update);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, []);

  return dark;
}

type PlotProps = PlotParams;
type Layout = PlotParams["layout"];
type AnyRecord = Record<string, unknown>;

/** Fills in theme colours (transparent background, readable text and grid) without overriding the chart's own settings. */
function themedLayout(layout: Layout | undefined, dark: boolean): Layout {
  const text = dark ? "#e9f0ec" : "#0f2321";
  const grid = dark ? "rgba(233,240,236,0.16)" : "rgba(15,35,33,0.12)";
  const axis = { gridcolor: grid, zerolinecolor: grid, linecolor: grid, color: text };
  const base = (layout ?? {}) as AnyRecord;
  const scene = (base.scene ?? {}) as AnyRecord;
  const sceneAxis = (key: string) => ({
    ...axis,
    showbackground: false,
    ...((scene[key] as AnyRecord) ?? {}),
  });

  return {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    ...base,
    font: { color: text, ...((base.font as AnyRecord) ?? {}) },
    xaxis: { ...axis, ...((base.xaxis as AnyRecord) ?? {}) },
    yaxis: { ...axis, ...((base.yaxis as AnyRecord) ?? {}) },
    ...(base.scene
      ? {
          scene: {
            ...scene,
            xaxis: sceneAxis("xaxis"),
            yaxis: sceneAxis("yaxis"),
            zaxis: sceneAxis("zaxis"),
          },
        }
      : {}),
    legend: { font: { color: text }, ...((base.legend as AnyRecord) ?? {}) },
  } as Layout;
}

export default function Plot(props: PlotProps) {
  const dark = useDarkTheme();
  return <PlotlyPlot {...props} layout={themedLayout(props.layout, dark)} />;
}
