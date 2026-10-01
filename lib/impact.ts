/**
 * The homepage stats for the Slay the Spire 2 work. They lead with what the
 * product is (a mod for a card game, published on Steam), then three figures
 * that build on each other: reach, tracked use, total time.
 *
 * Figures come from CONTEXT.md / docs/content/facts.md (Steam, telemetry).
 * Terminology: active subscribers, tracked runs, usertime (cumulative play
 * time of all tracked runs, on average 52.8 minutes per run). Only runs
 * where Downfall is the sole modded content are tracked, so every figure
 * here is a lower bound.
 */
export const impactIntro = {
  heading: "Slay the Spire 2: mein Mod in Zahlen",
  text: "Downfall ist eine Erweiterung für das Kartenspiel Slay the Spire 2, veröffentlicht im Steam Workshop. Den Code habe ich zu rund 94 % selbst geschrieben. Die Telemetrie gespielter Runs werte ich mit SQL und ML aus.",
};

export interface ImpactStat {
  value: string;
  label: string;
  detail: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "166.999+",
    label: "aktive Abonnenten",
    detail: "Downfall und Watcher im Steam Workshop",
  },
  {
    value: "304.225",
    label: "getrackte Runs",
    detail: "7. Aug. – 1. Okt. 2026, nur Runs ganz ohne andere Mods",
  },
  {
    value: "30+ Jahre",
    label: "Usertime",
    detail: "Summe der Spielzeit aller getrackten Runs, im Schnitt 53 Minuten pro Run",
  },
];
