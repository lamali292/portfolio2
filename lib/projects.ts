export interface Project {
  slug: string;
  href: string;
  title: string;
  teaser: string;
  tech: string[];
  highlight?: string;
}

/**
 * The site's main project grid, rendered directly on the homepage so a
 * visitor sees real content without clicking through nav links first.
 */
export const projects: Project[] = [
  {
    slug: "sts2-mods",
    href: "/sts2-mods",
    title: "STS2 Mods: Downfall & Watcher",
    teaser:
      "Community-Modding-Framework für Slay the Spire 2 - vom ersten jemals veröffentlichten Charakter-Mod bis zum 10-Charaktere-Mod-Suite, inklusive Beitrag zum zugrunde liegenden BaseLib-Framework.",
    tech: ["C#", "Godot", "BaseLib"],
    highlight: "200.000+ Downloads",
  },
  {
    slug: "sts2-data-analysis",
    href: "/sts2-data-analysis",
    title: "STS2 Data Analysis",
    teaser:
      "SQL- und ML-gestützte Auswertung von Gameplay-Telemetrie aus dem Downfall-Mod - Pick- und Win-Rates, SHAP-Analysen und ein Live-Dashboard.",
    tech: ["SQL", "Python", "SHAP", "LightGBM"],
    highlight: "283.930 getrackte Runs",
  },
  {
    slug: "sts2-tooling",
    href: "/sts2-tooling",
    title: "STS2 Tooling: Rider-Plugin",
    teaser:
      "JetBrains-Rider-Plugin zur automatisierten Verwaltung und Live-Synchronisation von Lokalisierungsdateien während der Mod-Entwicklung.",
    tech: ["Kotlin", "IntelliJ Platform SDK", "Gradle"],
  },
  {
    slug: "masterarbeit",
    href: "/masterarbeit",
    title: "Masterarbeit: Port-Hamiltonian Neural Networks",
    teaser:
      "Physik-informiertes Machine Learning für dynamische Systeme - energieerhaltende, modular kombinierbare neuronale Netze für elektrische Schaltkreise.",
    tech: ["Python", "JAX", "Numerik"],
    highlight: "Note 1,0",
  },
  {
    slug: "praktikum",
    href: "/praktikum",
    title: "Praktikum: Optionspreisberechnung",
    teaser:
      "Numerische Bewertung amerikanischer Basket-Optionen mit einem selbst implementierten Newton-Krylov-GMRES-Löser.",
    tech: ["C", "Numerik", "GMRES"],
  },
  {
    slug: "project-euler",
    href: "/project-euler",
    title: "Project Euler",
    teaser:
      "150+ gelöste algorithmisch-mathematische Probleme - Top 0,5% weltweit. Zahlentheorie, Kombinatorik und Optimierung in Java, Rust und Python.",
    tech: ["Java", "Rust", "Python"],
    highlight: "Top 0,5% weltweit",
  },
  {
    slug: "botc",
    href: "/botc",
    title: "Blood on the Clocktower Tool",
    teaser:
      "Grimoire- und Skriptverwaltungs-App für das Gesellschaftsspiel Blood on the Clocktower - Skriptauswahl, Online-Suche und Spielerverwaltung.",
    tech: ["Kotlin", "Python", "REST"],
  },
  {
    slug: "spotify",
    href: "/spotify",
    title: "Spotify Card Game & SongQuiz",
    teaser:
      "Spotify-integriertes Karten-/Song-Ratespiel mit OAuth2-Anbindung an die Spotify Web API und Wiedergabesteuerung.",
    tech: ["Flask", "Python", "Spotify API"],
  },
];
