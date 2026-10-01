import spotifyCover from "@/app/spotify/images/spotify.png";

/** A real screenshot/figure from the project's own page, used as the card cover. */
export interface ProjectImage {
  src: string;
  alt: string;
  /** "cover" crops to fill; "contain" shows the whole figure on a light backdrop. */
  fit?: "cover" | "contain";
  position?: string;
  /** Prefix with the deploy base path (public-folder assets only). */
  isPublic?: boolean;
}

export interface Project {
  slug: string;
  href: string;
  title: string;
  teaser: string;
  tech: string[];
  highlight?: string;
  /** Omit when there is no real image; the card falls back to a typographic cover. */
  image?: ProjectImage;
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
      "Community-Modding-Framework für Slay the Spire 2 - von Watcher, einem der ersten Charakter-Mods, bis zur 10-Charaktere-Mod-Suite Downfall, inklusive Beitrag zum zugrunde liegenden BaseLib-Framework.",
    tech: ["C#", "Godot", "BaseLib"],
    highlight: "200.000+ Downloads",
    image: { src: "/sts2-mods/selection.png", alt: "Charakterauswahl der Downfall-Mod in Slay the Spire 2", isPublic: true, position: "center 35%" },
  },
  {
    slug: "sts2-data-analysis",
    href: "/sts2-data-analysis",
    title: "STS2 Data Analysis",
    teaser:
      "SQL-gestützte Auswertung von Gameplay-Telemetrie aus dem Downfall-Mod - Pick- und Win-Rates, Relic-Balance und ein Dashboard.",
    tech: ["SQL", "PostgreSQL", "Python", "Plotly"],
    highlight: "304.225 getrackte Runs",
    image: { src: "/sts2-data/dashboard-draft.webp", alt: "Dashboard mit Streudiagramm zu Pick-Rate und Win-Rate aller Karten sowie Runs pro Tag und Stunde", isPublic: true, position: "left top" },
  },
  {
    slug: "sts2-tooling",
    href: "/sts2-tooling",
    title: "STS2 Tooling: Werkzeuge für ein Modding-Team",
    teaser:
      "Dialog-Tool für Autor:innen, Lokalisierungs-Formatierer, Rider-Plugin, Bild-Pipeline mit Google-Sheets-Sync, Kunst-Voting im Spiel und ein Test-Framework.",
    tech: ["C#", "Kotlin", "Google Sheets API"],
  },
  {
    slug: "masterarbeit",
    href: "/masterarbeit",
    title: "Masterarbeit: Port-Hamiltonian Neural Networks",
    teaser:
      "Neuronale Netze mit eingebauter Physik für Federschwinger und elektrische Schaltkreise. Drei Fragestellungen zu Skalierung, impliziten Lösern und impliziten Systemen, umgesetzt in Python und JAX.",
    tech: ["Python", "JAX", "Numerik"],
    highlight: "Note 1,0",
    image: { src: "/assets/master/hoti_sep.png", alt: "Schaltkreis-Diagramme aus der Masterarbeit", isPublic: true, fit: "contain" },
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
    image: { src: "/botc/main_screen.png", alt: "Startbildschirm der Blood-on-the-Clocktower-App", isPublic: true, position: "top" },
  },
  {
    slug: "spotify",
    href: "/spotify",
    title: "Spotify Card Game & SongQuiz",
    teaser:
      "Spotify-integriertes Karten-/Song-Ratespiel mit OAuth2-Anbindung an die Spotify Web API und Wiedergabesteuerung.",
    tech: ["Flask", "Python", "Spotify API"],
    image: { src: spotifyCover.src, alt: "Spotify-Anmeldung im Kartenspiel" , position: "top" },
  },
];
