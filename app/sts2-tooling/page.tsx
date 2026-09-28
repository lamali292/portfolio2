import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import TechChips from "@/components/TechChips";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "STS2 Tooling: Rider LocPlugin | Laurin Maurice Liebhart",
  description:
    "Ein selbst entwickeltes JetBrains-Rider-Plugin zur Verwaltung von Lokalisierungsdateien für die Slay the Spire 2-Mods Downfall und Watcher – internes Entwickler-Tooling zur Unterstützung eines größeren Modding-Projekts.",
};

const technologies = ["Kotlin", "IntelliJ Platform SDK", "Gradle"];

export default function Sts2ToolingPage() {
  return (
    <ProjectPage>
      <ProjectHero
        title="STS2 Tooling: Rider LocPlugin"
        lead="Ein selbst entwickeltes JetBrains-Rider-Plugin, das die Lokalisierungsdateien der Slay the Spire 2-Mods Downfall und Watcher direkt in der IDE validiert und synchron hält. Entstanden als internes Werkzeug während der Entwicklung, um manuelle, fehleranfällige Lokalisierungsarbeit aus dem Workflow zu nehmen."
      >
        <TechChips items={technologies} />
      </ProjectHero>

      <ProjectSection heading="Das Problem">
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

      <ProjectSection heading="Die Lösung">
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

      <ProjectSection heading="Installation & Konfiguration">
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

      <ProjectSection heading="Technische Umsetzung">
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
        <p className={styles.note}>
          Bekannte Einschränkung: In seltenen Fällen können
          Lokalisierungsdateien beim Autosave zurückgesetzt werden, wenn das
          Plugin noch nicht vollständig geladen ist. Da es sich um ein
          persönliches Produktivitäts-Tool handelt, wurde dies bewusst nicht
          priorisiert behoben.
        </p>
      </ProjectSection>
    </ProjectPage>
  );
}
