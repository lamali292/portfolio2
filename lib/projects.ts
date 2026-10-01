import spotifyCover from "@/app/spotify/images/search1.png";

/** A real screenshot/figure from the project's own page, used as the card cover. */
export interface ProjectImage {
  src: string;
  /** Optional dark-theme version of the same image. */
  darkSrc?: string;
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
    image: { src: "/sts2-tooling/ancients-tool.png", darkSrc: "/sts2-tooling/ancients-tool-dark.png", alt: "Dialog-Tool für Autor:innen mit Live-Vorschau der Sprechblasen, Format-Knöpfen und Lokalisierungs-IDs", isPublic: true, position: "left top" },
  },
  {
    slug: "masterarbeit",
    href: "/masterarbeit",
    title: "Masterarbeit: Port-Hamiltonian Neural Networks",
    teaser:
      "Neuronale Netze mit eingebauter Physik für Federschwinger und elektrische Schaltkreise. Drei Fragestellungen zu Skalierung, impliziten Lösern und impliziten Systemen, umgesetzt in Python und JAX.",
    tech: ["Python", "JAX", "Numerik"],
    highlight: "Note 1,0",
    image: { src: "/assets/master/scaling_traj.png", alt: "Zustandsverläufe von vier gekoppelten Federschwingern: Testdaten und Vorhersage des neuronalen Netzes", isPublic: true, fit: "contain" },
  },
  {
    slug: "praktikum",
    href: "/praktikum",
    title: "Praktikum: Optionspreisberechnung",
    teaser:
      "Fairer Preis einer amerikanischen Basket-Option: ein selbst in C geschriebener Newton-Krylov-Löser rechnet ihn auf einem Gitter aus, dazu eine interaktive 3D-Grafik.",
    tech: ["C", "Numerik", "GMRES"],
    image: { src: "/praktikum/surface.png", darkSrc: "/praktikum/surface-dark.png", alt: "3D-Fläche: berechneter Optionswert in Abhängigkeit von den Kursen zweier Aktien", isPublic: true },
  },
  {
    slug: "project-euler",
    href: "/project-euler",
    title: "Project Euler",
    teaser:
      "Über 150 mathematische Rätsel gelöst, Top 0,5 % weltweit. Gewinnen kann man sie nicht mit Rechenleistung, sondern mit einer Idee: aus Monaten Rechenzeit werden Sekunden.",
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
    image: { src: "/botc/grimoire.png", alt: "Grimoire der Blood-on-the-Clocktower-App: Spieler im Kreis mit ihren Rollen", isPublic: true, position: "50% 15%" },
  },
  {
    slug: "spotify",
    href: "/spotify",
    title: "Spotify Card Game & SongQuiz",
    teaser:
      "Spotify-integriertes Karten-/Song-Ratespiel mit OAuth2-Anbindung an die Spotify Web API und Wiedergabesteuerung.",
    tech: ["Flask", "Python", "Spotify API"],
    image: { src: spotifyCover.src, alt: "Playlist-Suche im Spotify-Kartenspiel mit Albumcovern", position: "center 5%" },
  },
];
