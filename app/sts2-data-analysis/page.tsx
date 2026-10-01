import type { Metadata } from "next";
import TechChips from "@/components/TechChips";
import DownfallStatsRow from "@/components/DownfallStatsRow";
import RunsOverTimeChart from "@/components/RunsOverTimeChart";
import CardRatesChart from "@/components/CardRatesChart";
import RelicWinRateChart from "@/components/RelicWinRateChart";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
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
        lead="Datenanalyse der Gameplay-Telemetrie des Slay-the-Spire-2-Mods Downfall – SQL-Auswertung über Postgres-Materialized-Views mit einem automatisch aktualisierten Dashboard."
      >
        <TechChips items={TECH_CHIPS} />
      </ProjectHero>

      <ProjectSection heading="Über die Pipeline">
        <p>
          Downfall sendet nach jeder abgeschlossenen Partie einen Run-Datensatz
          an eine Postgres-Datenbank (Hetzner-gehostet) &ndash; vorausgesetzt,
          Downfall ist der einzige aktive modifizierende Inhalt. Ein
          GitHub-Actions-Workflow fragt alle drei Stunden mehrere
          Materialized Views ab (<code>card_stats_by_group</code>,{" "}
          <code>relic_stats</code>, <code>char_ascension_by_version</code>,{" "}
          <code>char_daily_by_version</code>, <code>runs_per_day</code>) und
          schreibt die Ergebnisse als JSON-Snapshots, die ein separates
          Dashboard mit Plotly rendert.
        </p>
        <p>
          Eine wichtige Design-Entscheidung dieser Pipeline: exportiert werden
          immer Rohzahlen (Angebote, Picks, Runs, Siege), niemals bereits
          berechnete Raten. Denn eine Pick- oder Win-Rate über mehrere
          Versionsgruppen oder Modi hinweg zu mitteln, wäre statistisch
          falsch &ndash; stattdessen werden zuerst die Rohzahlen aufsummiert
          und erst danach die Rate gebildet. Diese Seite hält sich an dieselbe
          Regel.
        </p>
        <p className={styles.note}>
          Die Zahlen auf dieser Seite stammen aus einem statischen Snapshot
          der echten Produktionsdaten (siehe{" "}
          <code>data/downfall/README.md</code> im Repository für die genaue
          Herkunft), nicht aus einer Live-Abfrage der Datenbank &ndash; eine
          serverseitige API-Route mit echten Produktions-Zugangsdaten ist
          bewusst nicht Teil dieser Ausbaustufe (separates Issue, da die
          Bereitstellung eines lesenden DB-Zugangs ein menschlicher Schritt
          ist). {summary.note}
        </p>
      </ProjectSection>

      <ProjectSection heading="Kennzahlen">
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
