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
  // log2(log2(x)) of every number; one squaring adds exactly 1.
  const start: number[] = [];
  for (let x = 2; x <= n; x++) start.push(Math_log2(Math_log2(x)));
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
  const loglogAfter1 = start.map((v, i) => v + counts[i]);
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

  return { rows, k, rest, blocks, cycle, start, loglogAfter1, afterPhase1, afterPhase2, final: [...counts], list };
}

const Math_floor = (x: number) => x - (x % 1);
const Math_log2 = (x: number) => globalThis.Math.log2(x);
const de = (x: number, d = 3) => x.toFixed(d).replace(".", ",");

const EX_N = 5;
const EX_M = 21;
const example = simulate822(EX_N, EX_M);
const exampleSum = example.list.reduce((a, b) => a + b, BigInt(0));
const size = EX_N - 1;
const phase2Who = example.rows[example.k * size]?.orig;
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
          Ich rechne die Aufgabe einmal mit kleinen Zahlen durch:{" "}
          <Math tex="n = 5" />, also die Liste <Math tex="[2, 3, 4, 5]" />, und{" "}
          <Math tex={`m = ${EX_M}`} /> Runden. Die ersten {startRows.length}{" "}
          Runden mit den echten Zahlen:
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Runde</th>
                <th>Quadriert wird</th>
                <th>Liste danach</th>
              </tr>
            </thead>
            <tbody>
              {startRows.map((row) => (
                <tr key={row.round} className={styles[`phase${row.phase}`]}>
                  <td>{row.round}</td>
                  <td className={styles.who}>{row.squared}</td>
                  <td>{row.list}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>1. Das Muster</h3>
        <p>
          Nach {example.k * size} Runden war jede Zahl einmal dran. Seitdem
          kommt immer dieselbe Folge: <strong>{example.cycle.join(", ")}</strong>,
          dann wieder von vorn. Nach jeweils {size} Runden hat jede Zahl also
          genau einmal mehr ihr Quadrat gebildet.
        </p>
        <p>
          Der Grund steckt in <Math tex="\log_2(\log_2 x)" />. Das ist eine Zahl
          mit Nachkommastellen, und Quadrieren addiert genau 1 dazu. Nach dem
          Anlauf liegen alle Werte innerhalb eines Abstands von 1 (hier{" "}
          {example.cycle
            .map((x) => de(example.loglogAfter1[x - 2]))
            .join(" ≤ ")}
          ). Die kleinste Zahl ist dran, bekommt +1 und steht danach ganz hinten.
          Dann ist die nächste dran, und so weiter. Nach {size} Runden stehen
          alle wieder in derselben Reihenfolge, also wiederholt sich die Folge.
        </p>

        <h3>2. Die Abkürzung</h3>
        <p>
          Die restlichen Runden müssen nicht einzeln gerechnet werden. Man
          zählt nur, wie oft jede Zahl quadriert wird:
        </p>
        <ol className={styles.points}>
          <li>
            <strong>Anlauf:</strong> {example.k * size} Runden simulieren, bis
            sich der Zyklus zeigt.
          </li>
          <li>
            <strong>Rest:</strong> {EX_M} Runden sind{" "}
            {Math_floor(EX_M / size)} volle Blöcke zu {size} Runden und{" "}
            {example.rest} Runde übrig (<Math tex={`${EX_M} \\bmod ${size} = ${example.rest}`} />
            ). In dieser einen Runde ist die erste Zahl der Folge dran, also
            die {phase2Who} (Runde {example.k * size + 1}). Diese übrigen Runden
            rechnet man direkt nach dem Anlauf einzeln.
          </li>
          <li>
            <strong>Volle Blöcke:</strong> Von den {Math_floor(EX_M / size)}{" "}
            Blöcken sind {example.k} schon im Anlauf gerechnet. Die anderen{" "}
            {example.blocks} überspringt man, jede Zahl bekommt dafür{" "}
            {example.blocks} Quadrierungen dazu.
          </li>
        </ol>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Quadrierungen</th>
                <th>Zahl 2</th>
                <th>Zahl 3</th>
                <th>Zahl 4</th>
                <th>Zahl 5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>nach dem Anlauf</td>
                {example.afterPhase1.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
              <tr>
                <td>nach dem Rest</td>
                {example.afterPhase2.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
              <tr>
                <td>nach den vollen Blöcken (+{example.blocks})</td>
                {example.final.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Eine Zahl <Math tex="x" />, die <Math tex="c" />-mal quadriert wurde,
          ist <Math tex="x^{2^c}" />. Die Summe folgt direkt aus den Zählern:
        </p>
        <Math
          display
          tex={`S(5,${EX_M}) = 2^{2^{${example.final[0]}}} + 3^{2^{${example.final[1]}}} + 4^{2^{${example.final[2]}}} + 5^{2^{${example.final[3]}}} = ${exampleSum.toString()}`}
        />
        <p className={styles.note}>
          Das stimmt mit der kompletten Simulation aller {EX_M} Runden überein.
        </p>

        <h3>3. Im großen Fall</h3>
        <p>
          Für <Math tex="n = 10^4" /> und <Math tex="m = 10^{16}" /> läuft es
          genauso, nur überspringt man rund <Math tex="10^{12}" /> Blöcke. Die
          Zahlen <Math tex="x^{2^c}" /> sind dann riesig, gesucht ist aber nur
          der Rest modulo <Math tex="p = 1234567891" />. Mit dem kleinen Satz
          von Fermat (<Math tex="x^{p-1} \equiv 1 \pmod p" />) genügt es, den
          Exponenten <Math tex="2^c" /> modulo <Math tex="p-1" /> zu kennen.
          Den berechnet man durch wiederholtes Quadrieren in etwa 40 Schritten.
        </p>

        <h3>Code und weitere Aufgaben</h3>
        <details className={styles.details}>
          <summary>Vollständiger Rust-Code zu Aufgabe 822</summary>
          <div className={styles.problem}>
            <p>
              Gegeben in der Aufgabe: <Math tex="S(5,3) = 34" /> und{" "}
              <Math tex="S(10,100) \equiv 845339386 \pmod{1234567891}" />.
              Der Code folgt den vier Phasen von oben.
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
