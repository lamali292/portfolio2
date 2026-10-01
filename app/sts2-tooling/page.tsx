import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import TechChips from "@/components/TechChips";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "STS2 Tooling | Laurin Maurice Liebhart",
  description:
    "Werkzeuge für ein Modding-Team: Dialog-Tool für Autor:innen, Lokalisierungs-Formatierer, Rider-Plugin, Bild-Pipeline mit Google-Sheets-Sync, Kunst-Voting im Spiel, Test-Framework und eine eigene API für Downfall.",
};

const technologies = ["C#", "Kotlin", "Google Sheets API", "Gradle", "Caddy"];

const tools = [
  {
    title: "Dialog-Tool für Autor:innen",
    tech: "Eine Webseite, HTML und JavaScript ohne Framework",
    text: "Autor:innen und Künstler:innen schreiben die Dialoge zwischen den Spielfiguren (den Ancients) und jedem der 15 Charaktere auf einer Webseite statt in JSON-Dateien. Eine Live-Vorschau zeigt die Zeilen als Sprechblase mit den Originalfarben. Format-Knöpfe fügen nur gültige Tags ein (Fett, Kursiv, 8 Farben, 4 Effekte), neben jeder Figur steht der Stil der Originalzeilen, und Aufbau und Zeilen-IDs der Begegnungen sind vorgegeben. Heraus kommen fertige Lokalisierungszeilen zum Kopieren, vorhandene Zeilen lassen sich importieren. 359 Zeilen aus dem Basisspiel dienen als Referenz.",
    link: {
      href: "https://api.downfall-sts2.org/tools/architect-voicelines/",
      label: "Beispiel: Architect-Voicelines",
    },
  },
  {
    title: "Lokalisierung ohne Fehlerquellen",
    tech: "C#, eigene Formatierer",
    text: "Die Mod übernimmt, was in jeder Sprache anders ist: Ordnungszahlen mit Geschlecht, Plural-Regeln je Sprache, das Plus bei aufgewerteten Karten und Power-Icons im Text. Übersetzer:innen schreiben nur den Text.",
  },
  {
    title: "Bild-Pipeline mit Google-Sheets-Sync",
    tech: "C#, Google Sheets API",
    text: "Ein Kommandozeilentool packt die Bilder von Karten, Powers, Relikten, Tränken und Enchantments samt Umrandung in Atlanten für das Spiel. Ein Google Sheet zeigt den Künstler:innen farbig, welche Bilder fehlen, nur Platzhalter oder fertig sind.",
  },
  {
    title: "Kunst-Voting im Spiel",
    tech: "C#, Godot-UI, Steam-Login",
    text: "Spieler:innen reichen Kunst für Karten ein und stimmen darüber ab. Auswahl- und Upload-Dialoge, die Steam-Anmeldung und eine Meldefunktion für unpassende Einreichungen sind direkt im Spiel gebaut.",
  },
  {
    title: "Eigene API unter eigener Domain",
    tech: "VPS, Caddy, api.downfall-sts2.org",
    text: "Die Telemetrie der Runs, das Voting und die Web-Tools laufen über eine eigene API, die ich selbst hoste. Ein Reverse-Proxy (Caddy) hält Scraping und Missbrauch fern.",
  },
  {
    title: "Rider-Plugin für Entwickler",
    tech: "Kotlin, IntelliJ Platform SDK",
    text: "Öffnet beim Bearbeiten einer Karten-, Power- oder Relikt-Klasse automatisch den passenden Lokalisierungs-Editor und zeigt, welche Felder noch fehlen. Details weiter unten.",
  },
  {
    title: "Automatische Tests für Karten",
    tech: "C#, eigenes Test-Framework",
    text: "Ein eigenes Framework prüft die Kartenlogik im simulierten Kampf. Pro Test lassen sich Charakter, Gegner und Spielerzahl festlegen. Über 100 Tests sichern die Charaktere ab.",
  },
  {
    title: "Build und Setup",
    tech: "PowerShell, GDScript, Python",
    text: "Skripte für Einrichtung, Asset-Verknüpfung, Tests und das Packen der Mod, damit neue Teammitglieder das Projekt in wenigen Schritten bauen können.",
  },
];

export default function Sts2ToolingPage() {
  return (
    <ProjectPage>
      <ProjectHero
        title="STS2 Tooling: Werkzeuge für ein Modding-Team"
        lead="Downfall entsteht im Team mit Künstler:innen und Übersetzer:innen, die nicht programmieren. Ich habe die Werkzeuge gebaut, mit denen sie fehlerfrei arbeiten können: Dialog-Tool, Lokalisierungs-Formatierer, ein IDE-Plugin, eine Bild-Pipeline, ein Test-Framework und eine eigene API."
      >
        <TechChips items={technologies} />
      </ProjectHero>

      <ProjectSection heading="Was ich gebaut habe">
        <p className={styles.note}>
          Bild-Pipeline, Kunst-Voting, Lokalisierungs-Formatierer, Tests und
          Build-Skripte liegen im öffentlichen{" "}
          <a
            href="https://github.com/lamali292/Downfall"
            target="_blank"
            rel="noopener noreferrer"
          >
            Downfall-Repository
          </a>{" "}
          und stammen fast vollständig von mir. Das Dialog-Tool und die API
          betreibe ich selbst.
        </p>
        <ul className={styles.tools}>
          {tools.map((tool) => (
            <li key={tool.title} className={styles.tool}>
              <h3>{tool.title}</h3>
              <p className={styles.toolTech}>{tool.tech}</p>
              <p>{tool.text}</p>
              {tool.link && (
                <p>
                  <a
                    href={tool.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tool.link.label}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </ProjectSection>

      <ProjectSection heading="Rider-Plugin: das Problem">
        <p>
          Karten, Kräfte (Powers), Relikte und Charaktere in Downfall und
          Watcher bringen jeweils eigene Texte mit – Titel, Beschreibungen,
          Tooltips – die in separaten JSON-Lokalisierungsdateien gepflegt
          werden müssen. Bei einer Mod-Suite mit zehn Charakteren wächst diese
          Zuordnung zwischen Code-Klassen und Lokalisierungsfeldern schnell zu
          einem Umfang, der sich per Hand kaum noch fehlerfrei pflegen lässt:
          vergessene Felder, falsche Dateien oder inkonsistente Keys sind die
          Folge.
        </p>
      </ProjectSection>

      <ProjectSection heading="Rider-Plugin: die Lösung">
        <p>
          Das LocPlugin öffnet automatisch einen Lokalisierungs-Editor im
          Tool-Fenster, sobald eine Karten-, Kraft-, Relikt- oder
          Charakterklasse im Editor geöffnet wird. Grundlage dafür ist eine
          projektweite Konfigurationsdatei <code>cardloc-presets.json</code>,
          die festlegt, welche eigenen Klassen (&bdquo;Marker&ldquo;) das
          Plugin erkennt und in welche JSON-Datei die jeweiligen
          Lokalisierungsfelder gehören.
        </p>
        <p>
          Damit lassen sich Lokalisierungstexte direkt neben dem Code pflegen,
          statt manuell zwischen Klassendefinition und JSON-Dateien zu
          wechseln – inklusive Live-Abgleich, welche Felder für eine Klasse
          bereits vorhanden, optional oder noch offen sind.
        </p>
      </ProjectSection>

      <ProjectSection heading="Rider-Plugin: Installation & Konfiguration">
        <ul>
          <li>
            Installation über <strong>File → Settings → Plugins</strong>,
            Zahnrad-Icon → <strong>Install Plugin from Disk…</strong> und
            Neustart der IDE
          </li>
          <li>
            Konfiguration über eine <code>cardloc-presets.json</code> im
            Projektstamm mit <code>projectId</code> (Mod-Präfix, z. B.{" "}
            <code>Downfall</code>), <code>localizationBase</code> (Pfad zu den
            Lokalisierungsdateien) und <code>markers</code> (den eigenen
            Klassen je Preset-Typ)
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection heading="Rider-Plugin: technische Umsetzung">
        <div className={styles.techGrid}>
          <div>
            <h3>Plugin-Architektur</h3>
            <ul>
              <li>
                Kotlin-Plugin auf Basis des IntelliJ Platform SDK, gebaut mit
                Gradle
              </li>
              <li>
                Eigenes Tool-Fenster (&bdquo;StS2 Localization
                Editor&ldquo;) mit Vorschau und Feld-für-Feld-Bearbeitung
              </li>
              <li>
                Datei- und Rename-Listener, die den Lokalisierungs-Editor
                automatisch beim Öffnen relevanter Klassen aktualisieren
              </li>
              <li>
                Projektservice zur Verwaltung der geladenen Presets und
                Feld-Zuordnungen
              </li>
            </ul>
          </div>
          <div>
            <h3>Einordnung</h3>
            <ul>
              <li>
                Als Reaktion auf einen konkreten Engpass im
                Downfall/Watcher-Workflow entstanden – Werkzeugbau als
                Nebenprodukt eines größeren Engineering-Aufwands
              </li>
              <li>
                README beschreibt das Plugin explizit als persönliches
                Produktivitäts-Tool, nicht als öffentlich supportetes Produkt
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>
    </ProjectPage>
  );
}
