import type { Metadata } from "next";
import Link from "next/link";
import TechChips from "@/components/TechChips";
import DownfallStatsRow from "@/components/DownfallStatsRow";
import RunsOverTimeChart from "@/components/RunsOverTimeChart";
import CardRatesChart from "@/components/CardRatesChart";
import RelicWinRateChart from "@/components/RelicWinRateChart";
import { getDownfallSnapshot } from "@/lib/downfall-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "STS2 Data Analysis | Laurin Maurice Liebhart",
  description:
    "SQL- und ML-gestützte Auswertung von Gameplay-Telemetrie aus dem Slay the Spire 2 Mod Downfall: Pick- und Win-Rates, Relic-Balance und Run-Aktivität über die Zeit.",
};

const TECH_CHIPS = ["SQL", "Postgres", "Python", "Plotly", "SHAP", "LightGBM"];

export default function Sts2DataAnalysisPage() {
  const { summary, runsOverTime, cardsByCharacter, relicsTop, relicsBottom, relicMinRuns } =
    getDownfallSnapshot();

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <h1>STS2 Data Analysis</h1>
        <p className={styles.subtitle}>
          Datenanalyse der Gameplay-Telemetrie des Slay-the-Spire-2-Mods{" "}
          <em>Downfall</em> &ndash; SQL-Auswertung über Postgres-Materialized-Views
          und ein SHAP/LightGBM-gestützter Balance-Analyse-Pipeline auf
          demselben Datensatz.
        </p>
        <TechChips items={TECH_CHIPS} />
      </header>

      <section className={styles.section}>
        <h2>Über die Pipeline</h2>
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
      </section>

      <section className={styles.section}>
        <h2>Kennzahlen</h2>
        <DownfallStatsRow summary={summary} />
      </section>

      <section className={styles.section}>
        <h2>Run-Aktivität über die Zeit</h2>
        <p>
          Getrackte Runs pro Tag im Snapshot-Zeitraum, aufgeteilt nach Solo-
          und Multiplayer-Sessions.
        </p>
        <RunsOverTimeChart runsOverTime={runsOverTime} />
      </section>

      <section className={styles.section}>
        <h2>Karten: Pick-Rate &amp; Win-Rate je Charakter</h2>
        <p>
          Für jeden Charakter aufsummiert über alle seine Karten und
          Versionsgruppen: Wie oft wird eine angebotene Karte tatsächlich
          gepickt, und wie oft gewinnt ein Run, in dem eine Karte des
          Charakters erworben wurde?
        </p>
        <CardRatesChart cardsByCharacter={cardsByCharacter} />
      </section>

      <section className={styles.section}>
        <h2>Relics: Win-Rate-Ranking</h2>
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
      </section>

      <section className={styles.section}>
        <h2>Weiterführende Analyse</h2>
        <p>
          Auf demselben Rohdatensatz baut zusätzlich eine SHAP/LightGBM-Pipeline
          auf, die den Einfluss einzelner Karten- und Relic-Entscheidungen auf
          den Run-Ausgang modelliert (Feature Importance statt reiner
          Korrelation) &ndash; sie ist hier als Referenz genannt, aber bewusst
          nicht Teil dieser Seite.
        </p>
      </section>

      <p>
        <Link href="/">Zurück zur Startseite</Link>
      </p>
    </article>
  );
}
