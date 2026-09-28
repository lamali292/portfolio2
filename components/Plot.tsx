"use client";

import dynamic from "next/dynamic";
import styles from "./Plot.module.css";

// Plotly touches `window`/`document` at import time, so it can only be
// loaded on the client. next/dynamic with ssr:false keeps it out of the
// static export build (see app/praktikum's OptionSurfacePlot for the same
// pattern).
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <p className={styles.loading}>Lade Plot…</p>,
});

export default Plot;
