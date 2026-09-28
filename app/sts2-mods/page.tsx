import type { Metadata } from "next";
import FeatureImage from "@/components/FeatureImage";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import TechChips from "@/components/TechChips";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "STS2 Mods: Downfall & Watcher | Laurin Maurice Liebhart",
  description:
    "Community-Modding-Framework für Slay the Spire 2: der 10-Charaktere-Mod Downfall, der erste jemals veröffentlichte STS2-Charakter-Mod Watcher, und ein Beitrag zum BaseLib-Framework - zusammen über 200.000 Downloads.",
};

const technologies = ["C#", "Godot", "BaseLib", "Slay the Spire 2"];

const downfallImages = [
  {
    src: "/sts2-mods/selection.png",
    alt: "Charakterauswahl mit allen zehn Downfall-Charakteren",
    caption: "Charakterauswahl mit allen zehn Downfall-Charakteren",
  },
  {
    src: "/sts2-mods/automaton.png",
    alt: "Automaton-Charakter in Downfall",
    caption: "Automaton",
  },
  {
    src: "/sts2-mods/encoding.png",
    alt: "Encoding-Fähigkeit des Automaton-Charakters",
    caption: "Automaton – Encoding-Fähigkeit",
  },
  {
    src: "/sts2-mods/awakened.png",
    alt: "Awakened-One-Charakter in Downfall",
    caption: "Awakened One",
  },
  {
    src: "/sts2-mods/champ.png",
    alt: "Champ-Charakter in Downfall",
    caption: "Champ",
  },
  {
    src: "/sts2-mods/collector.png",
    alt: "Collector-Charakter in Downfall",
    caption: "The Collector",
  },
  {
    src: "/sts2-mods/gremlins.png",
    alt: "Gremlins-Charakter in Downfall",
    caption: "Gremlins",
  },
  {
    src: "/sts2-mods/slimeboss.png",
    alt: "Slime-Boss-Charakter in Downfall",
    caption: "Slime Boss",
  },
  {
    src: "/sts2-mods/guardian.png",
    alt: "Guardian-Charakter in Downfall",
    caption: "Guardian",
  },
  {
    src: "/sts2-mods/hermit.png",
    alt: "Hermit-Charakter in Downfall",
    caption: "Hermit",
  },
  {
    src: "/sts2-mods/hexaghost.png",
    alt: "Hexaghost-Charakter in Downfall",
    caption: "Hexaghost",
  },
  {
    src: "/sts2-mods/snecko.png",
    alt: "Snecko-Charakter in Downfall",
    caption: "Snecko",
  },
  {
    src: "/sts2-mods/snecko2.png",
    alt: "Snecko-Charakter in Downfall, zweite Ansicht",
    caption: "Snecko – Encounter-Ansicht",
  },
];

const watcherVideos = [
  {
    src: "https://www.youtube.com/embed/PoqpDPO3UkA",
    title: "Watcher Gameplay – 4-Spieler-Match",
    caption: "Gameplay-Video: 4-Spieler-Match mit dem Watcher",
  },
  {
    src: "https://www.youtube.com/embed/r5F5pL5k218",
    title: "Watcher Gameplay – Video 2",
    caption: "Gameplay-Video 2",
  },
];

export default function Sts2ModsPage() {
  return (
    <ProjectPage>
      <ProjectHero
        title="STS2 Mods: Downfall & Watcher"
        lead="Ein Community-Modding-Framework für Slay the Spire 2: von Watcher, dem ersten jemals veröffentlichten STS2-Charakter-Mod, bis zu Downfall, einer 10-Charaktere-Mod-Suite, inklusive eines Framework-Beitrags zum zugrunde liegenden BaseLib. Zusammen erreichen beide Mods über 200.000 Downloads auf dem Steam Workshop."
      >
        <TechChips items={technologies} />
      </ProjectHero>

      <ProjectSection heading="Downfall">
        <p>
          Downfall implementiert zehn Charaktere aus dem beliebten Slay the
          Spire 1-Mod &bdquo;Downfall&ldquo; neu für Slay the Spire 2 – jeder
          mit eigenem Kartenpool, eigener Mechanik und eigenen Encountern.
          Statt eines einzelnen Mods handelt es sich damit um eine komplette
          Mod-Suite, die den Umfang eines eigenständigen Spielmodus erreicht.
        </p>
        <ul className={styles.stats}>
          <li className={styles.stat}>
            <span className={styles.statValue}>89.872</span>
            <span className={styles.statLabel}>
              aktive Abonnenten (active subscribers)
            </span>
          </li>
          <li className={styles.stat}>
            <span className={styles.statValue}>144.305</span>
            <span className={styles.statLabel}>
              Abonnenten insgesamt (all-time subscribers)
            </span>
          </li>
        </ul>
        <p>
          <a
            href="https://steamcommunity.com/sharedfiles/filedetails/?id=3747508091"
            target="_blank"
            rel="noopener noreferrer"
          >
            Downfall im Steam Workshop
          </a>
        </p>
        <div className={styles.gallery}>
          {downfallImages.map((image) => (
            <FeatureImage key={image.src} {...image} />
          ))}
        </div>
      </ProjectSection>

      <ProjectSection heading="Watcher">
        <p>
          Watcher war der erste jemals veröffentlichte Charakter-Mod für Slay
          the Spire 2 – zu einem Zeitpunkt, an dem es noch kein etabliertes
          Modding-Ökosystem für das Spiel gab. Der Mod implementiert den
          originalen Watcher-Charakter aus Slay the Spire 1 vollständig neu,
          inklusive Stances, Kartenpool und Mechaniken.
        </p>
        <ul className={styles.stats}>
          <li className={styles.stat}>
            <span className={styles.statValue}>77.127</span>
            <span className={styles.statLabel}>
              aktive Abonnenten (active subscribers)
            </span>
          </li>
          <li className={styles.stat}>
            <span className={styles.statValue}>163.511</span>
            <span className={styles.statLabel}>
              Abonnenten insgesamt (all-time subscribers)
            </span>
          </li>
        </ul>
        <div className={styles.videoGrid}>
          {watcherVideos.map((video) => (
            <div key={video.src}>
              <div className={styles.videoWrapper}>
                <div className={styles.videoFrame}>
                  <iframe
                    src={video.src}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className={styles.videoCaption}>{video.caption}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection heading="BaseLib-Beitrag">
        <p>
          Beide Mods bauen auf <code>Alchyr.Sts2.BaseLib</code> auf, dem von
          der Community geteilten Modding-Framework für Slay the Spire 2.
          Über die reine Nutzung hinaus habe ich als Contributor rund{" "}
          <strong>3.000 Zeilen Code</strong> zu BaseLib beigetragen –
          überwiegend eigene Modelle und Framework-Erweiterungen, darunter
          ein Enchantment-System.
        </p>
        <p>
          <a
            href="https://github.com/Alchyr/BaseLib-StS2/pulls?q=is%3Apr+state%3Aclosed+author%3Alamali292"
            target="_blank"
            rel="noopener noreferrer"
          >
            Geschlossene Pull Requests von mir in BaseLib-StS2
          </a>
        </p>
      </ProjectSection>
    </ProjectPage>
  );
}
