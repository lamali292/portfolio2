/**
 * The homepage stats for the Slay the Spire 2 work, framed as software
 * development. Usertime leads (and is shown largest), followed by the
 * tracked runs it is built from and the subscriber reach.
 *
 * Figures come from CONTEXT.md / docs/content/facts.md (Steam, telemetry).
 * Terminology: active subscribers, tracked runs, usertime (cumulative play
 * time of all tracked runs, on average 52.8 minutes per run). Only runs
 * where Downfall is the sole modded content are tracked, so every figure
 * here is a lower bound.
 */
export const impactIntro = {
  heading: "Softwareentwicklung: meine Projekte in Zahlen",
  text: "Ein Beispiel aus der Praxis: Downfall, eine Erweiterung für das Spiel Slay the Spire 2, veröffentlicht im Steam Workshop. Den Code habe ich zu rund 94 % selbst geschrieben, die Telemetrie der gespielten Runs werte ich mit SQL und ML aus.",
};

export interface ImpactStat {
  value: string;
  label: string;
  detail: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "30+ Jahre",
    label: "Usertime",
    detail: "Summe der Spielzeit aller getrackten Runs, im Schnitt 53 Minuten pro Run",
  },
  {
    value: "304.225",
    label: "getrackte Runs",
    detail: "7. Aug. – 1. Okt. 2026, nur Runs ganz ohne andere Mods",
  },
  {
    value: "166.999+",
    label: "aktive Abonnenten",
    detail: "Downfall und Watcher im Steam Workshop",
  },
];
