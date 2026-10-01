/**
 * The Downfall data pipeline, as built in lamali292/Downfall-DataGen
 * (.github/workflows/build.yml, dashboard/build.py, dashboard/data.py):
 * mod telemetry -> Postgres on a Hetzner VPS -> GitHub Actions every 3 hours
 * -> static Plotly dashboard on GitHub Pages.
 */
export interface PipelineStep {
  title: string;
  tech: string;
  text: string;
}

export const pipelineSteps: PipelineStep[] = [
  {
    title: "Daten sammeln",
    tech: "Downfall-Mod (C#)",
    text: "Der Mod sendet nach jedem abgeschlossenen Run einen Datensatz. Aber nur, wenn Downfall der einzige aktive Mod-Inhalt ist, sonst wären die Zahlen verfälscht.",
  },
  {
    title: "Speichern und aggregieren",
    tech: "PostgreSQL auf einem Hetzner-VPS",
    text: "Materialized Views fassen die Runs zusammen: Karten, Relikte, Charaktere und die Aktivität pro Tag und Stunde.",
  },
  {
    title: "Automatisch exportieren",
    tech: "GitHub Actions, Python, pandas",
    text: "Alle 3 Stunden liest ein Workflow die Views aus und schreibt vier JSON-Dateien. Das Datenbank-Passwort liegt als Secret im Workflow, nie im Frontend.",
  },
  {
    title: "Veröffentlichen",
    tech: "GitHub Pages, Plotly",
    text: "Ein statisches Dashboard ohne eigenen Server. Der Browser filtert nach Solo oder Multiplayer, Version, Seltenheit und Mindestzahl an Runs.",
  },
];

export const pipelineLinks = [
  {
    href: "https://lamali292.github.io/Downfall-DataGen/",
    label: "Live-Dashboard öffnen",
  },
  {
    href: "https://github.com/lamali292/Downfall-DataGen",
    label: "Quellcode auf GitHub",
  },
];
