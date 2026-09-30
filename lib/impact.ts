/**
 * The homepage headline for the STS2 work. The one figure that matters to a
 * non-gamer is how much time people have spent with the product, so usertime
 * leads and the two figures it is derived from follow as the explanation.
 *
 * Figures come from CONTEXT.md / docs/content/facts.md (Steam, telemetry).
 * Terminology: active subscribers, tracked runs, usertime (cumulative play
 * time of all tracked runs, each roughly 45-60 minutes).
 */
export const usertime = {
  value: "25+",
  unit: "Jahre",
  label: "Spielzeit auf meinem Produkt",
  detail:
    "Summe der Spielzeit aller getrackten Runs von Downfall, meinem Mod für Slay the Spire 2.",
};

export interface ImpactStep {
  value: string;
  label: string;
  detail: string;
}

export const impactSteps: ImpactStep[] = [
  {
    value: "166.999+",
    label: "aktive Abonnenten",
    detail: "Downfall und Watcher im Steam Workshop",
  },
  {
    value: "283.930",
    label: "getrackte Runs",
    detail: "9. Aug. – 28. Sep. 2026, jeder Run etwa 45–60 Minuten",
  },
  {
    value: "25+ Jahre",
    label: "Usertime",
    detail: "Ausgewertet mit SQL, SHAP und LightGBM",
  },
];
