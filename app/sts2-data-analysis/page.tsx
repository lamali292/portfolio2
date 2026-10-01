import type { Metadata } from "next";
import TechChips from "@/components/TechChips";
import DownfallStatsRow from "@/components/DownfallStatsRow";
import RunsOverTimeChart from "@/components/RunsOverTimeChart";
import CardRatesChart from "@/components/CardRatesChart";
import RelicWinRateChart from "@/components/RelicWinRateChart";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import PipelineFlow from "@/components/PipelineFlow";
import { pipelineLinks } from "@/lib/pipeline";
import { getDownfallSnapshot } from "@/lib/downfall-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "STS2 Data Analysis | Laurin Maurice Liebhart",
  description:
    "SQL-gestützte Auswertung von Gameplay-Telemetrie aus dem Slay the Spire 2 Mod Downfall: Pick- und Win-Rates, Relic-Balance und Run-Aktivität über die Zeit.",
};

const TECH_CHIPS = ["SQL", "PostgreSQL", "Python", "Plotly", "GitHub Actions"];

export default function Sts2DataAnalysisPage() {
  const { summary, runsOverTime, cardsByCharacter, relicsTop, relicsBottom, relicMinRuns } =
    getDownfallSnapshot();

  return (
    <ProjectPage>
      <ProjectHero
        title="STS2 Data Analysis"
        lead="Datenanalyse der Gameplay-Telemetrie des Slay-the-Spire-2-Mods Downfall – SQL-Auswertung über Postgres-Materialized-Views mit einem Dashboard, das sich alle drei Stunden automatisch aktualisiert."
      >
        <TechChips items={TECH_CHIPS} />
      </ProjectHero>

      <ProjectSection heading="So funktioniert die Pipeline">
        <p>
          Aus dem Spiel kommen die Daten, nach wenigen automatischen Schritten
          landen sie in einem Dashboard, das sich alle drei Stunden von selbst
          aktualisiert. Ich habe alle vier Schritte selbst gebaut und
          betreibe sie.
        </p>
        <PipelineFlow />
        <p className={styles.callout}>
          <strong>Nur Rohzahlen, nie fertige Raten.</strong> Exportiert werden
          Angebote, Picks, Runs und Siege. Eine Pick- oder Win-Rate über
          mehrere Versionen oder Modi zu mitteln wäre statistisch falsch.
          Stattdessen addiert der Browser zuerst die Rohzahlen und teilt erst
          danach.
        </p>
        <ul className={styles.links}>
          {pipelineLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </ProjectSection>

      <ProjectSection heading="Kennzahlen">
        <p className={styles.note}>
          Die Kennzahlen und Diagramme darunter stammen aus einem Snapshot der
          Produktionsdaten ({summary.windowStart} bis {summary.windowEnd}). Das
          Live-Dashboard oben wird alle drei Stunden neu erzeugt.
        </p>
        <DownfallStatsRow summary={summary} />
      </ProjectSection>

      <ProjectSection heading="Run-Aktivität über die Zeit">
        <p>
          Getrackte Runs pro Tag im Snapshot-Zeitraum, aufgeteilt nach Solo-
          und Multiplayer-Sessions.
        </p>
        <RunsOverTimeChart runsOverTime={runsOverTime} />
      </ProjectSection>

      <ProjectSection heading="Karten: Pick-Rate & Win-Rate je Charakter">
        <p>
          Für jeden Charakter aufsummiert über alle seine Karten und
          Versionsgruppen: Wie oft wird eine angebotene Karte tatsächlich
          gepickt, und wie oft gewinnt ein Run, in dem eine Karte des
          Charakters erworben wurde?
        </p>
        <CardRatesChart cardsByCharacter={cardsByCharacter} />
      </ProjectSection>

      <ProjectSection heading="Relics: Win-Rate-Ranking">
        <p>
          Win-Rate je Relic (Runs mit mindestens {relicMinRuns} Vorkommen,
          um Ausreißer bei seltenen Relics zu vermeiden) &ndash; nützlich, um
          über- oder unterdurchschnittlich starke Relics für die
          Balance-Analyse zu identifizieren.
        </p>
        <RelicWinRateChart
          relicsTop={relicsTop}
          relicsBottom={relicsBottom}
          minRuns={relicMinRuns}
        />
      </ProjectSection>
    </ProjectPage>
  );
}
