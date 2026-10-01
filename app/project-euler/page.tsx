import type { Metadata } from "next";
import Math from "@/components/Math";
import CodeBlock from "@/components/CodeBlock";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import PipelineFlow from "@/components/PipelineFlow";
import TechChips from "@/components/TechChips";
import styles from "./page.module.css";
import "katex/dist/katex.min.css";

const TECH_CHIPS = ["Java", "Rust", "Python", "Mathematica", "Matlab"];

const skills = [
  {
    title: "Problem in Mathematik übersetzen",
    text: "Aus einer Textaufgabe wird ein sauberes Modell: Wahrscheinlichkeiten, Zahlentheorie oder Kombinatorik.",
  },
  {
    title: "Passende Methode wählen",
    text: "Geschlossene Formel, Sieb, dynamische Programmierung oder modulare Arithmetik, je nachdem, was die Struktur hergibt.",
  },
  {
    title: "Effizient programmieren",
    text: "Die Idee wird in schnellen Code übersetzt (Java, Rust, Python), damit die Antwort in Sekunden da ist.",
  },
];

const exampleSteps = [
  {
    title: "Das Problem",
    tech: "Warum Ausprobieren scheitert",
    text: "10¹⁶ Runden zu simulieren dauert selbst bei einer Milliarde Runden pro Sekunde fast vier Monate. Und durch das Quadrieren werden die Zahlen riesig.",
  },
  {
    title: "Die Idee",
    tech: "Logarithmus des Logarithmus",
    text: "Statt der Zahlen selbst merke ich mir log₂(log₂(x)). Quadrieren erhöht diesen Wert genau um 1, und die Reihenfolge der Zahlen bleibt erhalten.",
  },
  {
    title: "Das Muster",
    tech: "Zyklus erkennen",
    text: "Nach einer Anlaufphase wiederholt sich die Reihenfolge, in der die Zahlen quadriert werden. Ich simuliere nur die Anlaufphase, den Rest liefert der Zyklus.",
  },
  {
    title: "Das Ergebnis",
    tech: "Kleiner Satz von Fermat",
    text: "Die riesigen Exponenten werden mit dem kleinen Satz von Fermat verkleinert. Rechenzeit: etwa 0,3 Sekunden statt Monaten.",
  },
];

export const metadata: Metadata = {
  title: "Project Euler | Laurin Maurice Liebhart",
  description:
    "Über 150 mathematische Rätsel gelöst, Top 0,5 % weltweit. Wie aus Monaten Rechenzeit Sekunden werden, erklärt an einem Beispiel.",
};

const RUST_SAMPLE = `use my_macros::problem;
use crate::util::modulo::pow;

#[problem(822)]
fn solve() -> u64 {
    // Berechne S(10^4, 10^16) mod 1234567891
    // Problem: Liste [2,3,...,n], in jeder Runde wird das kleinste Element quadriert
    g(10u64.pow(4), 10u64.pow(16))
}

const MOD: u64 = 1234567891;

/// Berechnet S(n, m): Summe der Liste nach m Runden
///
/// Hauptidee: Statt die Zahlen selbst zu speichern (die riesig werden),
/// speichern wir log2(log2(x)). Bei Quadrierung: x -> x^2 wird daraus einfach +1
fn g(n: u64, m: u64) -> u64 {
    let f = 2.0f64.log2();
    let mut list: Vec<f64> = (2..=n)
        .map(|x| f64::log2(f64::log2(x as f64)) / f)
        .collect();
    let mut count = vec![0; (n - 1) as usize];
    let mut k = 0;

    // ===== PHASE 1: Pattern-Erkennung =====
    loop {
        for _ in 0..n - 1 {
            let mut smallest = f64::INFINITY;
            let mut min_idx = 0;
            for i in 0..list.len() {
                if list[i] < smallest {
                    smallest = list[i];
                    min_idx = i;
                }
            }
            count[min_idx] += 1;
            list[min_idx] += 1.0;
        }
        k += 1;
        if count.iter().all(|&x| x > 0) {
            break;
        }
    }

    // ===== PHASE 2: Rest-Runden =====
    for _ in 0..(m % (n - 1)) {
        let mut smallest = f64::INFINITY;
        let mut min_idx = 0;
        for i in 0..list.len() {
            if list[i] < smallest {
                smallest = list[i];
                min_idx = i;
            }
        }
        count[min_idx] += 1;
        list[min_idx] += 1.0;
    }

    // ===== PHASE 3: Wiederholungen =====
    let r = m / (n - 1) - k;

    // ===== PHASE 4: Endergebnis =====
    (2..=n)
        .enumerate()
        .map(|(i, x)| n_pow_2k_mod(x, count[i] + r, MOD))
        .fold(0u64, |acc, c| (acc + c) % MOD)
}

/// Berechnet x^(2^k) mod p effizient
fn n_pow_2k_mod(n: u64, k: u64, p: u64) -> u64 {
    if n % p == 0 {
        return 0;
    }
    let phi = p - 1;
    let mut e = 1u64;
    let mut base = 2u64;
    let mut exp = k;
    while exp > 0 {
        if exp % 2 == 1 {
            e = (e as u128 * base as u128 % phi as u128) as u64;
        }
        base = (base as u128 * base as u128 % phi as u128) as u64;
        exp /= 2;
    }
    pow(n, e, p)
}
`;

/**
 * Exact simulation of problem 822 for small n and m (BigInt), used to build
 * the worked example: in every round the smallest number is squared (first
 * one on ties). It also reproduces the phases of the fast algorithm and
 * checks at build time that the squaring order really is a repeating cycle.
 */
function simulate822(n: number, m: number) {
  const size = n - 1;
  const list: bigint[] = [];
  for (let x = 2; x <= n; x++) list.push(BigInt(x));
  const counts = new Array<number>(size).fill(0);
  const rows: {
    round: number;
    block: number;
    orig: number;
    squared: string;
    list: string;
    counts: number[];
    phase: 1 | 2 | 3;
  }[] = [];

  let round = 0;
  const step = (phase: 1 | 2 | 3) => {
    let idx = 0;
    for (let i = 1; i < size; i++) if (list[i] < list[idx]) idx = i;
    const before = list[idx];
    list[idx] = before * before;
    counts[idx] += 1;
    round += 1;
    rows.push({
      round,
      block: Math_floor((round - 1) / size) + 1,
      orig: idx + 2,
      squared: `${before} → ${list[idx]}`,
      list: `[${list.join(", ")}]`,
      counts: [...counts],
      phase,
    });
  };

  // Phase 1: blocks of n-1 rounds until every number was squared at least once.
  let k = 0;
  do {
    for (let i = 0; i < size; i++) step(1);
    k += 1;
  } while (counts.some((c) => c === 0));
  const afterPhase1 = [...counts];
  const cycle = rows.slice(-size).map((r) => r.orig);

  // Phase 2: the remaining m mod (n-1) rounds.
  const rest = m % size;
  for (let i = 0; i < rest; i++) step(2);
  const afterPhase2 = [...counts];

  // Phase 3: the remaining full blocks. Each one squares every number exactly
  // once; the example simulates them to show that, the real algorithm skips them.
  const blocks = Math_floor(m / size) - k;
  for (let b = 0; b < blocks * size; b++) step(3);

  // Build-time check: from the end of phase 1 on, the order repeats the cycle.
  rows.slice(k * size).forEach((r, j) => {
    if (r.orig !== cycle[j % size]) {
      throw new Error("Problem 822 example: squaring order is not cyclic");
    }
  });

  return { rows, k, rest, blocks, cycle, afterPhase1, afterPhase2, final: [...counts], list };
}

const Math_floor = (x: number) => x - (x % 1);

const EX_N = 5;
const EX_M = 21;
const example = simulate822(EX_N, EX_M);
const exampleSum = example.list.reduce((a, b) => a + b, BigInt(0));
const startRows = example.rows.filter((r) => r.phase !== 3);

export default function ProjectEulerPage() {
  return (
    <ProjectPage>
      <ProjectHero
        title="Project Euler"
        lead="Über 150 mathematische Rätsel gelöst, Top 0,5 % weltweit. Gewinnen kann man sie nicht mit mehr Rechenleistung, sondern nur mit einer Idee."
      >
        <TechChips items={TECH_CHIPS} />
        <ul className={styles.facts}>
          <li className={styles.fact}>
            <span className={styles.factValue}>150+</span>
            <span className={styles.factLabel}>gelöste Aufgaben</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>Top 0,5 %</span>
            <span className={styles.factLabel}>weltweit</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>0,3 s</span>
            <span className={styles.factLabel}>
              Laufzeit meiner Lösung zu Aufgabe 822 (naiv: Monate)
            </span>
          </li>
        </ul>
      </ProjectHero>

      <ProjectSection heading="Was ist Project Euler?">
        <p>
          <a
            href="https://projecteuler.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Euler
          </a>{" "}
          ist eine Website mit über 900 Mathe- und Programmieraufgaben. Jede
          Aufgabe hat als Antwort genau eine Zahl.
        </p>
        <p>
          Das Besondere: Die Aufgaben sind so gebaut, dass stures Ausprobieren
          nicht funktioniert. Wer es trotzdem versucht, wartet Jahrhunderte.
          Wer die mathematische Struktur erkennt, bekommt die Antwort in
          Sekunden.
        </p>
      </ProjectSection>

      <ProjectSection heading="Was ich dabei trainiere">
        <ul className={styles.skills}>
          {skills.map((skill) => (
            <li key={skill.title} className={styles.skill}>
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
            </li>
          ))}
        </ul>
        <p>
          Genau diese Kombination aus mathematischer Tiefe und
          algorithmischem Pragmatismus nutze ich auch in Numerik, ML und
          Datenanalyse.
        </p>
      </ProjectSection>

      <ProjectSection heading="Ein Beispiel: Aufgabe 822 in vier Schritten">
        <p>
          <strong>Die Aufgabe:</strong> Eine Liste enthält die Zahlen 2, 3,
          …, 10 000. In jeder Runde wird die kleinste Zahl durch ihr Quadrat
          ersetzt. Wie groß ist die Summe aller Zahlen nach 10 Billiarden
          (10¹⁶) Runden? Gesucht ist die Antwort modulo 1 234 567 891.
        </p>
        <PipelineFlow steps={exampleSteps} />
        <p className={styles.note}>
          Gemessen mit meiner Rust-Lösung als Release-Build auf einem
          Cloud-Rechner. Die Lösung stimmt mit den Beispielwerten der Aufgabe
          überein.
        </p>
      </ProjectSection>

      <ProjectSection heading="Im Detail: Aufgabe 822 mit kleinen Zahlen">
        <p>
          Damit die vier Schritte greifbar werden, rechne ich die Aufgabe
          einmal mit kleinen Zahlen durch: <Math tex="n = 5" />, also die
          Liste <Math tex="[2, 3, 4, 5]" />, und <Math tex={`m = ${EX_M}`} />{" "}
          Runden. Zuerst die ersten Runden mit den echten Zahlen:
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Runde</th>
                <th>Quadriert wird</th>
                <th>Liste danach</th>
                <th>Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>–</td>
                <td>[2, 3, 4, 5]</td>
                <td>Start</td>
              </tr>
              {startRows.map((row) => (
                <tr key={row.round} className={styles[`phase${row.phase}`]}>
                  <td>{row.round}</td>
                  <td>{row.squared}</td>
                  <td>{row.list}</td>
                  <td>{row.phase === 1 ? "1: Anlauf" : "2: Rest"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Ab hier werden die Zahlen schnell riesig (nach Runde {EX_M} hat die
          größte schon {String(example.list[EX_N - 2]).length} Stellen). Deshalb
          zeigt die nächste Tabelle nur noch, <em>welche der ursprünglichen
          Zahlen</em> in jeder Runde quadriert wird. Der Zähler einer Zahl ist, wie
          oft sie schon quadriert wurde. Die dicken Linien trennen Blöcke aus
          je {EX_N - 1} Runden.
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Runde</th>
                <th>Block</th>
                <th>Dran ist</th>
                <th>Zähler 2</th>
                <th>Zähler 3</th>
                <th>Zähler 4</th>
                <th>Zähler 5</th>
                <th>Phase</th>
              </tr>
            </thead>
            <tbody>
              {example.rows.map((row) => (
                <tr
                  key={row.round}
                  className={`${styles[`phase${row.phase}`]} ${
                    (row.round - 1) % (EX_N - 1) === 0 ? styles.blockStart : ""
                  }`}
                >
                  <td>{row.round}</td>
                  <td>{row.block}</td>
                  <td className={styles.who}>{row.orig}</td>
                  {row.counts.map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                  <td>
                    {row.phase === 1 && "1: Anlauf"}
                    {row.phase === 2 && "2: Rest"}
                    {row.phase === 3 && "3: Zyklus"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Was in der Spalte „Dran ist“ auffällt</h3>
        <ul className={styles.points}>
          <li>
            <strong>Anlauf (Runden 1 bis {example.k * (EX_N - 1)}):</strong>{" "}
            Am Anfang geht es unordentlich zu: Die 2 ist schon zweimal dran
            (2 → 4 → 16), bevor die 5 zum ersten Mal an der Reihe ist. Der
            Anlauf endet, sobald jede Zahl einmal dran war.
          </li>
          <li>
            <strong>Danach ein Zyklus:</strong> Ab Runde{" "}
            {(example.k - 1) * (EX_N - 1) + 1} wiederholt sich immer dieselbe
            Folge <strong>{example.cycle.join(", ")}</strong>. In jedem Block
            von {EX_N - 1} Runden ist jede Zahl genau einmal dran, in der
            Reihenfolge ihrer Größe.
          </li>
          <li>
            <strong>Das spart die Arbeit:</strong> Einen vollen Block muss man
            nicht mehr simulieren. Man merkt sich nur, dass jede Zahl einmal
            öfter quadriert wurde.
          </li>
        </ul>

        <h3>Wie der schnelle Algorithmus die {EX_M} Runden zerlegt</h3>
        <ol className={styles.points}>
          <li>
            <strong>Phase 1:</strong> {example.k} Blöcke zu {EX_N - 1} Runden
            simulieren, bis jede Zahl einmal dran war ({example.k * (EX_N - 1)}{" "}
            Runden).
          </li>
          <li>
            <strong>Phase 2:</strong> Die übrigen{" "}
            <Math tex={`m \\bmod (n-1) = ${EX_M} \\bmod ${EX_N - 1} = ${example.rest}`} />{" "}
            Runde{example.rest === 1 ? "" : "n"} simulieren.
          </li>
          <li>
            <strong>Phase 3:</strong> Die restlichen{" "}
            <Math tex={`\\lfloor m/(n-1) \\rfloor - k = ${Math_floor(EX_M / (EX_N - 1))} - ${example.k} = ${example.blocks}`} />{" "}
            Blöcke überspringen: Jede Zahl bekommt dafür einfach{" "}
            {example.blocks} Quadrierungen dazu (in der Tabelle sind das die
            Runden {example.k * (EX_N - 1) + example.rest + 1} bis {EX_M}).
          </li>
        </ol>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Anzahl Quadrierungen</th>
                <th>Zahl 2</th>
                <th>Zahl 3</th>
                <th>Zahl 4</th>
                <th>Zahl 5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>nach Phase 1</td>
                {example.afterPhase1.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
              <tr>
                <td>nach Phase 2</td>
                {example.afterPhase2.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
              <tr>
                <td>nach Phase 3 (+{example.blocks} je Zahl)</td>
                {example.final.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Eine Zahl <Math tex="x" />, die <Math tex="c" />-mal quadriert wurde,
          ist <Math tex="x^{2^c}" />. Die Summe ergibt sich also direkt aus
          den Zählern, ohne dass man die Runden einzeln durchgehen muss:
        </p>
        <Math
          display
          tex={`S(5,${EX_M}) = 2^{2^{${example.final[0]}}} + 3^{2^{${example.final[1]}}} + 4^{2^{${example.final[2]}}} + 5^{2^{${example.final[3]}}}`}
        />
        <p className={styles.note}>
          Ausgerechnet: {exampleSum.toString()}. Das ist genau die Summe der
          Liste nach Runde {EX_M} in der Simulation.
        </p>

        <h3>Und im großen Fall?</h3>
        <p>
          Für <Math tex="n = 10^4" /> und <Math tex="m = 10^{16}" /> läuft es
          genauso. Der Anlauf bleibt kurz, aber Phase 3 überspringt rund{" "}
          <Math tex="10^{12}" /> volle Blöcke auf einmal. Jede Zahl wird also
          etwa <Math tex="10^{12}" />-mal quadriert, und{" "}
          <Math tex="x^{2^{10^{12}}}" /> ist eine unvorstellbar große Zahl.
          Gesucht ist aber nur der Rest modulo <Math tex="p = 1234567891" />.
          Dafür hilft der kleine Satz von Fermat:{" "}
          <Math tex="x^{p-1} \equiv 1 \pmod p" />. Der Exponent{" "}
          <Math tex="2^c" /> muss deshalb nur modulo <Math tex="p-1" />{" "}
          bekannt sein, und den berechnet man durch wiederholtes Quadrieren in
          rund 40 Schritten (denn <Math tex="10^{12} \approx 2^{40}" />).
          Dann bleibt pro Zahl eine einzige schnelle modulare Potenz.
        </p>
        <p className={styles.note}>
          Warum <Math tex="\log_2(\log_2 x)" /> der richtige Blickwinkel ist:
          Es gilt <Math tex="\log_2(\log_2(x^2)) = 1 + \log_2(\log_2 x)" />,
          eine Quadrierung verschiebt die Zahl also genau um 1. Zahlen mit
          kleinerem Wert dort sind dran, und die Reihenfolge ändert sich nicht.
          So lassen sich auch riesige Zahlen vergleichen, ohne sie
          auszuschreiben.
        </p>
      </ProjectSection>

      <ProjectSection heading="Für Interessierte: Details und Code">
        <details className={styles.details}>
          <summary>Aufgabe 822 mathematisch erklärt, mit vollständigem Rust-Code</summary>
          <div className={styles.problem}>
            <p>
              <Math tex="S(n,m)" /> ist die Summe aller Zahlen nach{" "}
              <Math tex="m" /> Runden. Beispiel für <Math tex="n=5" />:
            </p>
            <Math
              display
              tex="[2,3,4,5] \to [4,3,4,5] \to [4,9,4,5] \to [16,9,4,5]"
            />
            <p>
              Gegeben: <Math tex="S(5,3) = 34" />,{" "}
              <Math tex="S(10,100) \equiv 845339386 \pmod{1234567891}" />.
              Gesucht: <Math tex="S(10^4, 10^{16})" /> modulo{" "}
              <Math tex="1234567891" />.
            </p>
            <p>
              Verfolgt wird nur <Math tex="\log_2(\log_2(x))" />: Eine
              Quadrierung <Math tex="x \to x^2" /> erhöht diesen Wert um{" "}
              <Math tex="1" />. Nach anfänglichem Chaos stabilisiert sich die
              Reihenfolge der Quadrierungen zu einem Zyklus. Für die finale
              modulare Exponentiation mit astronomisch großen Exponenten
              lässt sich der Exponent dank des kleinen Satzes von Fermat
              modulo <Math tex="p-1" /> reduzieren.
            </p>
            <CodeBlock code={RUST_SAMPLE} lang="rust" />
          </div>
        </details>

        <details className={styles.details}>
          <summary>Zwei weitere Aufgaben: 938 (Kartenspiel) und 926 (Rundheit)</summary>
        <div className={styles.problem}>
          <h3>Problem 938 - Exhausting a Colour</h3>
          <p>
            Ein Kartendeck enthält <Math tex="R" /> rote und{" "}
            <Math tex="B" /> schwarze Karten. Eine Karte wird zufällig
            gleichverteilt gezogen und entfernt, danach eine zweite Karte
            aus den verbleibenden Karten:
          </p>
          <ul className={styles.rules}>
            <li>Sind beide Karten rot, werden sie verworfen.</li>
            <li>Sind beide Karten schwarz, werden beide zurückgelegt.</li>
            <li>
              Bei unterschiedlichen Farben wird die rote Karte zurückgelegt
              und die schwarze verworfen.
            </li>
          </ul>
          <p>
            Das Spiel endet, sobald alle verbleibenden Karten dieselbe Farbe
            haben. Sei <Math tex="P(R,B)" /> die Wahrscheinlichkeit, dass
            diese Farbe schwarz ist. Gegeben:{" "}
            <Math tex="P(2,2) = 0{,}4666666667" />,{" "}
            <Math tex="P(10,9) = 0{,}4118903397" />,{" "}
            <Math tex="P(34,25) = 0{,}3665688069" />.
          </p>
          <p>
            Gesucht: <Math tex="P(24690, 12345)" />, auf 10
            Nachkommastellen genau.
          </p>
        </div>

        <div className={styles.problem}>
          <h3>Problem 926 - Total Roundness</h3>
          <p>
            Eine <strong>runde Zahl</strong> endet in einer gegebenen Basis
            auf eine oder mehrere Nullen. Die <strong>Rundheit</strong>{" "}
            einer Zahl <Math tex="n" /> in Basis <Math tex="b" /> ist die
            Anzahl der Nullen am Ende der Basis-<Math tex="b" />
            -Darstellung von <Math tex="n" />. Beispiel:{" "}
            <Math tex="20" /> hat Rundheit <Math tex="2" /> in Basis{" "}
            <Math tex="2" /> (<Math tex="10100_2" />).
          </p>
          <p>
            Die <strong>Gesamtrundheit</strong>{" "}
            <Math tex="R(n)" /> ist die Summe der Rundheit von{" "}
            <Math tex="n" /> über alle Basen <Math tex="b > 1" />. Beispiel:{" "}
            <Math tex="R(20) = 6" />. Gegeben:{" "}
            <Math tex="R(10!) = 312" />.
          </p>
          <p>
            Gesucht: <Math tex="R(10\,000\,000!)" /> modulo{" "}
            <Math tex="10^9 + 7" />.
          </p>
        </div>

        </details>
      </ProjectSection>
    </ProjectPage>
  );
}
