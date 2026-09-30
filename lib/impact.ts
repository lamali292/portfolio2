import { downfallTotals } from "@/lib/downfall-facts";

export interface ImpactStage {
  title: string;
  value: string;
  label: string;
  detail: string;
}

/**
 * The homepage story for the STS2 work: build it, ship it, watch it being
 * played, learn from the data. Each figure comes from CONTEXT.md /
 * docs/content/facts.md (Steam, telemetry) or lib/downfall-facts.ts (repo).
 * Terminology follows CONTEXT.md: active subscribers, tracked runs, usertime.
 */
export const impactStages: ImpactStage[] = [
  {
    title: "Gebaut",
    value: String(downfallTotals.characters),
    label: "Charaktere in Downfall",
    detail: `${downfallTotals.cards} Karten, ${downfallTotals.relics} Relikte, rund ${downfallTotals.linesOfCode} Zeilen C#`,
  },
  {
    title: "Veröffentlicht",
    value: "166.999+",
    label: "aktive Abonnenten",
    detail: "Downfall und Watcher im Steam Workshop",
  },
  {
    title: "Gespielt",
    value: "283.930",
    label: "getrackte Runs",
    detail: "9. Aug. – 28. Sep. 2026, jeder Run etwa 45–60 Minuten",
  },
  {
    title: "Ausgewertet",
    value: "25+ Jahre",
    label: "Usertime",
    detail: "SQL-Analysen und SHAP/LightGBM für die Balance-Auswertung",
  },
];
