import type { Metadata } from "next";
import CommitChart from "@/components/CommitChart";
import FeatureImage from "@/components/FeatureImage";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import TechChips from "@/components/TechChips";
import { assetPath } from "@/lib/asset-path";
import {
  baseLibFacts,
  characters,
  commitsPerMonth,
  downfallTotals,
  watcherFacts,
} from "@/lib/downfall-facts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "STS2 Mods: Downfall & Watcher | Laurin Maurice Liebhart",
  description:
    "Downfall: Mod-Suite mit 10 Charakteren und über 900 Karten für Slay the Spire 2, dazu der Watcher-Mod und 25 Pull Requests im BaseLib-Framework. Über 200.000 Downloads auf dem Steam Workshop.",
};

const technologies = ["C#", ".NET 10", "Godot", "BaseLib", "Slay the Spire 2"];

const links = [
  {
    href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3747508091",
    label: "Downfall im Steam Workshop",
  },
  { href: "https://github.com/lamali292/Downfall", label: "Downfall auf GitHub" },
  {
    href: "https://github.com/lamali292/WatcherMod",
    label: "WatcherMod auf GitHub",
  },
  {
    href: "https://github.com/Alchyr/BaseLib-StS2/pulls?q=is%3Apr+state%3Aclosed+author%3Alamali292",
    label: "Meine Pull Requests in BaseLib-StS2",
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
        lead="Zwei Mods für Slay the Spire 2, zusammen über 200.000 Downloads auf dem Steam Workshop: Downfall, eine Mod-Suite mit zehn neuen Charakteren, und Watcher, einer der ersten Charakter-Mods für das Spiel. Dazu Beiträge zum Community-Framework BaseLib."
      >
        <TechChips items={technologies} />
      </ProjectHero>

      <ProjectSection heading="Downfall in Zahlen">
        <p className={styles.note}>
          Downfall ist ein Teamprojekt mit Beiträgen aus der Community. Den
          C#-Code habe ich zu rund {downfallTotals.codeSharePercent} %
          geschrieben (gemessen an allen hinzugefügten Zeilen). Alle Zahlen
          stammen aus dem{" "}
          <a
            href="https://github.com/lamali292/Downfall"
            target="_blank"
            rel="noopener noreferrer"
          >
            öffentlichen Repository
          </a>
          .
        </p>
        <ul className={styles.facts}>
          <li className={styles.fact}>
            <span className={styles.factValue}>{downfallTotals.characters}</span>
            <span className={styles.factLabel}>Charaktere</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>{downfallTotals.cards}</span>
            <span className={styles.factLabel}>Karten</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>{downfallTotals.relics}</span>
            <span className={styles.factLabel}>Relikte</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>
              {downfallTotals.linesOfCode}
            </span>
            <span className={styles.factLabel}>Zeilen C#</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>89.872</span>
            <span className={styles.factLabel}>aktive Abonnenten</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>144.305</span>
            <span className={styles.factLabel}>Abonnenten insgesamt</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>
              {downfallTotals.languages}
            </span>
            <span className={styles.factLabel}>
              Sprachen, Japanisch und Chinesisch zu über 97 % übersetzt
            </span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>
              {downfallTotals.commitsTotal.toLocaleString("de-DE")}
            </span>
            <span className={styles.factLabel}>Commits, davon ca. 1.375 von mir</span>
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection heading="Entwicklungstempo">
        <p>
          Jeder Commit steht für ein Stück der Suite. Die Zahl meiner Commits
          pro Monat ist seit dem Start am {downfallTotals.since} jeden Monat
          gestiegen, nicht gesunken.
        </p>
        <CommitChart
          data={commitsPerMonth}
          caption={`Meine Commits in Downfall pro Monat, ${downfallTotals.since} bis ${downfallTotals.until}`}
        />
      </ProjectSection>

      <ProjectSection heading="Zehn Charaktere">
        <p>
          Die Charaktere stammen aus dem bekannten Slay-the-Spire-1-Mod
          &bdquo;Downfall&ldquo; und sind für Slay the Spire 2 neu
          implementiert, jeder mit eigenem Kartenpool, eigenen Relikten und
          eigener Mechanik.
        </p>
        <ul className={styles.characters}>
          {characters.map((c) => (
            <li key={c.slug} className={styles.character}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath(c.image)}
                alt={`${c.name} in Downfall`}
                loading="lazy"
                className={styles.characterImage}
              />
              <div className={styles.characterBody}>
                <h3 className={styles.characterName}>{c.name}</h3>
                <p className={styles.characterMeta}>
                  {c.cards} Karten, {c.relics} Relikte
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.overview}>
          <FeatureImage
            src="/sts2-mods/selection.png"
            alt="Charakterauswahl mit allen zehn Downfall-Charakteren"
            caption="Charakterauswahl mit allen zehn Downfall-Charakteren"
          />
        </div>
        <p className={styles.footnote}>
          Karten: Kartenklassen je Charakter ohne Token-, Status- und
          entfernte Karten, gezählt im Repository.
        </p>
      </ProjectSection>

      <ProjectSection heading="Watcher">
        <p>
          Watcher setzt den Watcher aus Slay the Spire 1 für Slay the Spire 2
          um und erschien, als es für das Spiel noch kaum Modding-Ökosystem
          gab. Ich bin der Hauptentwickler; an dem Mod haben{" "}
          {watcherFacts.contributors} Personen aktiv mitgewirkt, vor allem
          mit Übersetzungen, dazu kommen rund 20 weitere mit kleineren
          Korrekturen. Der Mod liegt in {watcherFacts.languages} Sprachen
          vor, alle zu über 98 % übersetzt.
        </p>
        <ul className={styles.facts}>
          <li className={styles.fact}>
            <span className={styles.factValue}>{watcherFacts.cards}</span>
            <span className={styles.factLabel}>Watcher-Karten</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>{watcherFacts.colorless}</span>
            <span className={styles.factLabel}>farblose Karten</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>{watcherFacts.relics}</span>
            <span className={styles.factLabel}>eigene Relikte</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>
              {watcherFacts.stances.length}
            </span>
            <span className={styles.factLabel}>
              Stances: {watcherFacts.stances.join(", ")}
            </span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>{watcherFacts.languages}</span>
            <span className={styles.factLabel}>Sprachen</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>{watcherFacts.commits}</span>
            <span className={styles.factLabel}>Commits</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>77.127</span>
            <span className={styles.factLabel}>aktive Abonnenten</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>163.511</span>
            <span className={styles.factLabel}>Abonnenten insgesamt</span>
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
          Beide Mods bauen auf <code>Alchyr.Sts2.BaseLib</code> auf, dem
          gemeinsamen Modding-Framework der Community. Dort habe ich{" "}
          {baseLibFacts.pullRequests} Pull Requests eingereicht
          (+{baseLibFacts.linesAdded} / &minus;{baseLibFacts.linesRemoved}{" "}
          Zeilen in {baseLibFacts.commits} Commits), damit auch andere Mods
          die Funktionen nutzen können. Unter anderem:
        </p>
        <ul>
          {baseLibFacts.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ProjectSection>

      <ProjectSection heading="Links">
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </ProjectSection>
    </ProjectPage>
  );
}
