export interface HeadlineStat {
  label: string;
  value: string;
  detail?: string;
}

/**
 * Static headline numbers for the homepage stat banner (issue #10).
 *
 * These are a hardcoded, point-in-time snapshot (see `docs/content/facts.md`)
 * — not live data. Live wiring for the numbers that matter most happens on
 * the STS2 Data Analysis page (issue #11/#12), which is the source of truth
 * for the tracked-run figure used here: 283.930 matches the currently
 * published `data/downfall/snapshot.json` snapshot (Aug 9 - Sep 28 2026
 * window), which is a more recently refreshed pull than the 287.930 still
 * quoted in facts.md's prose for the same window.
 *
 * Terminology follows CONTEXT.md exactly: "active subscribers" (aktive
 * Abonnenten), "tracked run" (getrackte Runs), "usertime".
 */
export const headlineStats: HeadlineStat[] = [
  {
    label: "Aktive Abonnenten",
    value: "166.999+",
    detail: "Downfall & Watcher, Steam Workshop",
  },
  {
    label: "Getrackte Runs",
    value: "283.930",
    detail: "9. Aug. – 28. Sep. 2026",
  },
  {
    label: "Usertime",
    value: "25+ Jahre",
    detail: "kumulierte Spielzeit aller getrackten Runs",
  },
  {
    label: "Meilensteine",
    value: "Erster STS2-Charakter-Mod",
    detail: "BaseLib-Mitentwickler (~3.000 LoC)",
  },
];
