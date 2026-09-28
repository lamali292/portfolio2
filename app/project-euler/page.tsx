import type { Metadata } from "next";
import Math from "@/components/Math";
import CodeBlock from "@/components/CodeBlock";
import styles from "./page.module.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "Project Euler | Laurin Maurice Liebhart",
  description:
    "150+ gelöste Project-Euler-Probleme, Top 0,5% weltweit - algorithmische Mathematik in Java, Rust, Python, Mathematica und Matlab.",
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

export default function ProjectEulerPage() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <h1>Project Euler</h1>
        <p className={styles.tagline}>
          150+ gelöste Probleme &middot; Top 0,5% weltweit &middot;
          algorithmische Mathematik
        </p>
        <ul className={styles.chips}>
          <li>Java</li>
          <li>Rust</li>
          <li>Python</li>
          <li>Mathematica</li>
          <li>Matlab</li>
        </ul>
      </header>

      <section className={styles.section}>
        <h2>Was ist Project Euler?</h2>
        <p>
          <a
            href="https://projecteuler.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Euler
          </a>{" "}
          ist eine Sammlung mathematisch-algorithmischer Probleme, die reines
          Ausprobieren gezielt bestraft: Eine naive Lösung braucht oft
          Jahrhunderte Rechenzeit, eine mathematisch fundierte Lösung
          dagegen wenige Sekunden. Jedes Problem verlangt daher, zuerst die
          zugrunde liegende Struktur zu verstehen - Zahlentheorie,
          Kombinatorik, Analysis - und sie dann in effizienten Code zu
          übersetzen.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Warum das hierher gehört</h2>
        <p>
          Ich habe über 150 Project-Euler-Probleme gelöst und liege damit
          unter den <strong>Top 0,5% weltweit</strong>. Das ist für mich
          kein Selbstzweck, sondern trainiertes Handwerk: die Fähigkeit,
          ein unscharfes Problem in ein sauberes mathematisches Modell zu
          überführen, die richtige Methode zu wählen (geschlossene Formel,
          Sieb, Dynamische Programmierung, modulare Arithmetik) und das
          Ergebnis in performanten Code zu gießen. Genau diese Kombination
          aus mathematischer Tiefe und algorithmischem Pragmatismus nutze
          ich auch in Numerik, ML und Datenanalyse.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Beispielaufgaben</h2>

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
            Gesucht: <Math tex="R(10\\,000\\,000!)" /> modulo{" "}
            <Math tex="10^9 + 7" />.
          </p>
        </div>

        <div className={styles.problem}>
          <h3>Problem 822 - Square the Smallest</h3>
          <p>
            Eine Liste enthält anfangs die Zahlen{" "}
            <Math tex="2, 3, \\ldots, n" />. In jeder Runde wird die{" "}
            <strong>kleinste Zahl</strong> der Liste durch ihr{" "}
            <strong>Quadrat</strong> ersetzt (bei mehreren gleich kleinen
            Zahlen nur eine). Beispiel für <Math tex="n=5" />:
          </p>
          <Math
            display
            tex="[2,3,4,5] \\to [4,3,4,5] \\to [4,9,4,5] \\to [16,9,4,5]"
          />
          <p>
            <Math tex="S(n,m)" /> ist die Summe aller Zahlen nach{" "}
            <Math tex="m" /> Runden. Gegeben: <Math tex="S(5,3) = 34" />,{" "}
            <Math tex="S(10,100) \\equiv 845339386 \\pmod{1234567891}" />.
          </p>
          <p>
            Gesucht: <Math tex="S(10^4, 10^{16})" /> modulo{" "}
            <Math tex="1234567891" /> - naiv simuliert wären das{" "}
            <Math tex="10^{16}" /> Runden, also praktisch unmöglich.
          </p>
          <p>
            Der Trick: Statt die (schnell riesig werdenden) Zahlen selbst zu
            speichern, wird nur{" "}
            <Math tex="\\log_2(\\log_2(x))" /> verfolgt - eine Quadrierung{" "}
            <Math tex="x \\to x^2" /> erhöht diesen Wert einfach um{" "}
            <Math tex="1" />, und die Sortierreihenfolge bleibt erhalten.
            Nach anfänglichem Chaos stabilisiert sich die Reihenfolge, in
            der Elemente quadriert werden, zu einem sich wiederholenden
            Zyklus, sodass sich <Math tex="10^{16}" /> Runden auf wenige
            hundert simulierte Runden plus eine geschlossene Formel für den
            Rest reduzieren. Für die finale modulare Exponentiation mit
            astronomisch großen Exponenten sorgt der kleine Satz von Fermat
            dafür, dass sich der Exponent modulo <Math tex="p-1" />{" "}
            reduzieren lässt. Der folgende Ausschnitt (Rust) zeigt die
            vollständige Lösung:
          </p>
          <CodeBlock code={RUST_SAMPLE} lang="rust" />
        </div>
      </section>
    </article>
  );
}
