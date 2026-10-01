import type { Metadata } from "next";
import FeatureImage from "@/components/FeatureImage";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import TechChips from "@/components/TechChips";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blood on the Clocktower | Laurin Maurice Liebhart",
  description:
    "Android-App zur Unterstützung von Spielleitern bei Blood on the Clocktower: digitales Grimoire, Skriptverwaltung, Online-Skriptsuche und JSON-Import.",
};

const technologies = [
  "Kotlin",
  "Jetpack Compose",
  "Material Design 3",
  "REST-API",
  "JSON",
  "Python",
  "BeautifulSoup",
];

interface FeatureSection {
  title: string;
  paragraphs: string[];
  images: { src: string; alt: string; caption: string }[];
}

const featureSections: FeatureSection[] = [
  {
    title: "Skriptauswahl und -verwaltung",
    paragraphs: [
      "Vor jeder Spielrunde muss der Spielleiter ein Skript auswählen. Dabei handelt es sich um eine definierte Zusammenstellung von Rollen, die in dieser Partie verfügbar sind.",
      "Die App dient als zentrale Bibliothek für alle Skripte. Nutzer können eigene Skripte erstellen und importierte Skripte verwalten und jederzeit auf ihre Sammlung zugreifen.",
      "Die Detailansicht bietet einen umfassenden Überblick über ein Skript. Alle enthaltenen Rollen werden mitsamt ihrer Fähigkeiten, Ausrichtung und ihrem Team angezeigt.",
    ],
    images: [
      {
        src: "/botc/main_screen.png",
        alt: "Hauptbildschirm mit Skriptübersicht",
        caption: "Hauptbildschirm mit Skriptübersicht",
      },
      {
        src: "/botc/script_select.png",
        alt: "Skriptauswahl mit gespeicherten Skripten",
        caption: "Skriptauswahl aus der lokalen Bibliothek",
      },
      {
        src: "/botc/script_info.png",
        alt: "Detailansicht mit allen Rolleninformationen eines Skripts",
        caption: "Skript-Details mit allen enthaltenen Rollen",
      },
    ],
  },
  {
    title: "Online-Skriptsuche und Download",
    paragraphs: [
      "Die App integriert die REST-API von botcscripts.com, einer Community-Plattform mit tausenden nutzergenerierten Skripten. Diese werden als JSON-Daten abgerufen und in der App verarbeitet.",
      "Nutzer können die umfangreiche Skript-Bibliothek durchsuchen und sich Detailinformationen zu jedem Skript anzeigen lassen.",
      "Gefundene Skripte lassen sich mit einem Klick herunterladen und werden automatisch in die lokale Bibliothek importiert, sodass sie auch offline zur Verfügung stehen.",
    ],
    images: [
      {
        src: "/botc/online_search_select.png",
        alt: "Online-Skriptsuche mit Filteroptionen",
        caption: "Online-Suche mit Filteroptionen",
      },
      {
        src: "/botc/online_search.png",
        alt: "Liste der gefundenen Skripte aus der Online-Suche",
        caption: "Suchergebnisse der Online-Skriptsuche",
      },
      {
        src: "/botc/online_search_info.png",
        alt: "Detailansicht eines online gefundenen Skripts",
        caption: "Vorschau eines Skripts vor dem Download",
      },
    ],
  },
  {
    title: "Grimoire – Spielhilfe für Spielleiter",
    paragraphs: [
      "Das Grimoire ist das zentrale Werkzeug für Spielleiter während einer Partie. Hier können alle Spieler mit ihren zugewiesenen Rollen verwaltet werden.",
      "Für jeden Spieler lassen sich wichtige Eigenschaften festlegen: Status (tot/lebendig), Ausrichtung (gut/böse), Erinnerungs-Tokens für spezielle Fähigkeiten und individuelle Tags.",
      "Zusätzlich zeigt die App die skriptspezifischen Abläufe für jede Spielphase an – die Nachtphasen-Übersichten geben genau vor, in welcher Reihenfolge die Rollen aktiviert werden.",
    ],
    images: [
      {
        src: "/botc/grimoire.png",
        alt: "Grimoire-Übersicht mit allen Spielerrollen",
        caption: "Digitales Grimoire mit allen Spielerrollen",
      },
      {
        src: "/botc/first_night.png",
        alt: "Ablauf der ersten Nacht mit Rollenreihenfolge",
        caption: "Ablauf der ersten Nacht",
      },
      {
        src: "/botc/other_nights.png",
        alt: "Ablauf der Folgenächte mit Rollenreihenfolge",
        caption: "Ablauf der Folgenächte",
      },
    ],
  },
  {
    title: "Weitere Funktionen",
    paragraphs: [
      "Skripte können als PDF exportiert werden, um sie vor Spielbeginn an alle Teilnehmer zu verteilen, sodass jeder Spieler einen Überblick über alle möglichen Rollen erhält.",
      "Für fortgeschrittene Nutzer gibt es die Möglichkeit, Skripte direkt über JSON-Dateien zu importieren – praktisch für das schnelle Einbinden von Skripten aus externen Quellen.",
      "Die Spielerverwaltung erlaubt das Festlegen von Spielernamen, der Spieleranzahl und der Sitzordnung. Diese Informationen werden direkt im Grimoire übernommen.",
    ],
    images: [
      {
        src: "/botc/script_pdf.png",
        alt: "PDF-Export eines Skripts",
        caption: "Skript-Export als PDF",
      },
      {
        src: "/botc/json_import.png",
        alt: "JSON-Import-Funktion für Skripte",
        caption: "JSON-Import externer Skripte",
      },
      {
        src: "/botc/player_selection.png",
        alt: "Spielerverwaltung mit Namen und Sitzordnung",
        caption: "Spielerauswahl und Sitzordnung",
      },
    ],
  },
];

export default function BotcPage() {
  return (
    <ProjectPage>
      <ProjectHero
        title="Blood on the Clocktower – Grimoire-App"
        lead="Eine Android-App zur Unterstützung beim Spielen von Blood on the Clocktower. Die App ermöglicht es Spielleitern, Skripte und Rollen zu verwalten, Spieler zu organisieren und den Spielstatus effizient zu verfolgen."
      >
        <TechChips items={technologies} />
      </ProjectHero>

      <ProjectSection heading="Über das Spiel">
        <p>
          Blood on the Clocktower ist aktuell das ausgereifteste Social
          Deduction Game auf dem Markt (ähnlich wie Werwolf). Eine informierte
          Minderheit (die Bösen) tritt gegen eine uninformierte Mehrheit (die
          Guten) an. Die Guten müssen die Bösen identifizieren und
          eliminieren, bevor diese die Kontrolle übernehmen.
        </p>
        <p>
          Im Gegensatz zu Werwolf besitzt jede Person eine Rolle mit
          einzigartigen Fähigkeiten. Ein &bdquo;Skript&ldquo; legt fest, welche
          Rollen in einer Runde verfügbar sind. Diese Rollenzusammenstellungen
          variieren in Schwierigkeitsgrad und Mechaniken, was für hohe
          Wiederspielbarkeit sorgt.
        </p>
        <p>
          Ein Spielleiter kennt alle Rollen und Fähigkeiten und moderiert das
          Spiel durch alle Phasen. Das Grimoire ist dabei sein zentrales
          Werkzeug: Im physischen Spiel eine ausklappbare Box mit Token, um
          Rollen und Spielstatus zu verwalten. Diese App digitalisiert dieses
          Konzept und macht es zugänglicher und einfacher zu handhaben.
        </p>
      </ProjectSection>

      {featureSections.map((feature) => (
        <ProjectSection heading={feature.title} key={feature.title}>
          <div className={styles.featureBody}>
            <div className={styles.featureText}>
              {feature.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.gallery}>
              {feature.images.map((image) => (
                <FeatureImage key={image.src} {...image} phone />
              ))}
            </div>
          </div>
        </ProjectSection>
      ))}

      <ProjectSection heading="Technische Umsetzung">
        <div className={styles.techGrid}>
          <div>
            <h3>Frontend</h3>
            <ul>
              <li>Kotlin mit Jetpack Compose für moderne, deklarative UI</li>
              <li>Material Design 3 für konsistentes Design</li>
            </ul>
          </div>
          <div>
            <h3>Backend & Daten</h3>
            <ul>
              <li>REST-API-Integration mit botcscripts.com</li>
              <li>JSON-Parsing für Skript- und Rollendaten</li>
              <li>
                Rollendaten stammen aus einem separaten Python-Scraper
                (BeautifulSoup), der Skript- und Rolleninformationen als
                JSON aufbereitet
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection heading="Code & Download">
        <p>
          Der Quellcode und die App sind aus urheberrechtlichen Gründen nicht
          öffentlich verfügbar. Das Projekt dient ausschließlich dem privaten
          Gebrauch und der Portfolio-Präsentation. Die Rechte an &bdquo;Blood
          on the Clocktower&ldquo; liegen bei The Pandemonium Institute.
        </p>
      </ProjectSection>
    </ProjectPage>
  );
}
