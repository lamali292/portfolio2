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

const RUST_SAMPLE = `// Vereinfachter Ausschnitt aus der Lösung von Problem 822
// ("Factorish numbers"): Fac(n) ist der größte Teiler a von n mit
// gcd(a, n / a) = 1. Für Primzahlpotenzen n = p^k gilt Fac(n) = n;
// für zusammengesetzte n mit teilerfremden Faktoren wird a rekursiv
// über die kleinsten Primfaktoren bestimmt.
fn smallest_prime_factors(limit: usize) -> Vec<u32> {
    let mut spf = vec![0u32; limit + 1];
    for i in 2..=limit {
        if spf[i] == 0 {
            let mut j = i;
            while j <= limit {
                if spf[j] == 0 {
                    spf[j] = i as u32;
                }
                j += i;
            }
        }
    }
    spf
}

/// Größter Teiler a von n mit gcd(a, n / a) = 1: das Produkt der
/// Primpotenzen des größten Primfaktors von n.
fn fac(mut n: u64, spf: &[u32]) -> u64 {
    let p = spf[n as usize] as u64;
    let mut a = 1;
    while n % p == 0 {
        a *= p;
        n /= p;
    }
    a
}

fn sum_fac(limit: u64, spf: &[u32]) -> u64 {
    (2..=limit).map(|n| fac(n, spf)).sum()
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
          <h3>Problem 12 - Highly divisible triangular number</h3>
          <p>
            Die n-te Dreieckszahl ist die Summe der ersten n natürlichen
            Zahlen:
          </p>
          <Math display tex="T_n = \\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}" />
          <p>
            Gesucht ist die erste Dreieckszahl mit mehr als 500 Teilern. Der
            Schlüssel ist, die Teileranzahl nicht durch Ausprobieren zu
            zählen, sondern multiplikativ aus der Primfaktorzerlegung
            herzuleiten: Da{" "}
            <Math tex="\\gcd(n, n+1) = 1" />, lassen sich{" "}
            <Math tex="n" /> und <Math tex="n+1" /> getrennt faktorisieren
            und die Teilerzahlen anschließend multiplizieren.
          </p>
        </div>

        <div className={styles.problem}>
          <h3>Problem 187 - Semiprimes</h3>
          <p>
            Eine Zahl <Math tex="n" /> heißt semiprim, wenn sie sich als
            Produkt genau zweier - nicht notwendig verschiedener -
            Primzahlen schreiben lässt:
          </p>
          <Math display tex="n = p \\cdot q, \\qquad p \\le q \\text{ prim}" />
          <p>
            Gefragt ist die Anzahl der Semiprimzahlen unterhalb von{" "}
            <Math tex="10^{8}" />. Statt jede Zahl einzeln zu testen, wird
            für jede Primzahl <Math tex="p \\le \\sqrt{10^{8}}" /> gezählt,
            wie viele Primzahlen <Math tex="q \\ge p" /> die Bedingung{" "}
            <Math tex="p \\cdot q < 10^{8}" /> erfüllen - eine Kombination
            aus Primzahlsieb und Zählargument.
          </p>
        </div>

        <div className={styles.problem}>
          <h3>Problem 822 - Factorish numbers</h3>
          <p>
            Für eine natürliche Zahl <Math tex="n" /> sei{" "}
            <Math tex="\\operatorname{Fac}(n)" /> der größte Teiler{" "}
            <Math tex="a" /> von <Math tex="n" />, für den{" "}
            <Math tex="a" /> und <Math tex="n / a" /> teilerfremd sind:
          </p>
          <Math
            display
            tex="\\operatorname{Fac}(n) = \\max\\{\\, a \\mid n \\;:\\; \\gcd(a,\\, n/a) = 1 \\,\\}"
          />
          <p>
            Gesucht ist{" "}
            <Math tex="S(N) = \\sum_{n=2}^{N} \\operatorname{Fac}(n) \\bmod 10^{9}" />{" "}
            für sehr große <Math tex="N" />. Der praktikable Ansatz nutzt
            ein Sieb der kleinsten Primfaktoren, um{" "}
            <Math tex="\\operatorname{Fac}(n)" /> für jedes{" "}
            <Math tex="n" /> in konstanter Zeit auf dessen größte
            Primzahlpotenz zurückzuführen. Der folgende Ausschnitt (Rust)
            zeigt den Kern dieses Ansatzes:
          </p>
          <CodeBlock code={RUST_SAMPLE} lang="rust" />
        </div>
      </section>
    </article>
  );
}
