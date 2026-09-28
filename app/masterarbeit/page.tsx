import type { Metadata } from "next";
import Link from "next/link";
import { assetPath } from "@/lib/asset-path";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Masterarbeit – Port-Hamiltonian Neural Networks",
  description:
    "Masterarbeit von Laurin Maurice Liebhart: Port-Hamiltonian Neural Networks – physik-informiertes Machine Learning für dynamische Systeme.",
};

const technologies = [
  "Python",
  "JAX",
  "NumPy",
  "Matplotlib",
  "Machine Learning",
  "Numerical Methods",
  "Runge-Kutta-Verfahren",
];

interface FigureProps {
  src: string;
  alt: string;
  caption: string;
}

function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className={styles.figure}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={assetPath(src)} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function MasterarbeitPage() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Zurück zur Startseite
      </Link>

      <header className={styles.hero}>
        <h1>Port-Hamiltonian Neural Networks</h1>
        <p>
          Masterarbeit: Physik-informiertes Machine Learning für dynamische
          Systeme
        </p>
      </header>

      <section className={styles.section}>
        <h2>Verwendete Technologien</h2>
        <ul className={styles.chips}>
          {technologies.map((tech) => (
            <li key={tech} className={styles.chip}>
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Worum geht es?</h2>
        <p>
          Meine Masterarbeit kombiniert <strong>Physik und Machine
          Learning</strong>, um komplexe dynamische Systeme wie elektrische
          Schaltkreise oder mechanische Schwingungen datenbasiert zu
          modellieren. Dabei bleiben wichtige physikalische Eigenschaften wie
          Energieerhaltung erhalten.
        </p>
        <p>
          Das Besondere: Einzelne Teilsysteme können separat trainiert und
          dann modular zu größeren Netzwerken kombiniert werden, ähnlich wie
          Lego-Bausteine.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Die Herausforderung</h2>
        <p>
          Traditionelle Machine-Learning-Ansätze ignorieren oft physikalische
          Gesetze wie Energieerhaltung. Das führt zu unrealistischen
          Vorhersagen, besonders bei langfristigen Simulationen.
        </p>
        <p>
          <strong>Der Ansatz:</strong> Port-Hamiltonian Neural Networks
          (pHNNs) kodieren physikalische Struktur direkt ins neuronale Netz.
          So bleiben Energieerhaltung und andere wichtige Eigenschaften
          automatisch gewahrt.
        </p>
        <div className={styles.paperBox}>
          <p className={styles.paperMeta}>Diese Arbeit basiert auf dem Paper:</p>
          <p className={styles.paperTitle}>
            „Compositional Learning of Dynamical System Models Using
            Port-Hamiltonian Neural Networks“
          </p>
          <p className={styles.paperMeta}>C. Neary &amp; U. Topcu (2022)</p>
          <a
            className={styles.paperLink}
            href="https://arxiv.org/pdf/2212.00893"
            target="_blank"
            rel="noopener noreferrer"
          >
            Paper lesen (arXiv)
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Kernbeiträge meiner Arbeit</h2>
        <div className={styles.contributions}>
          <div className={styles.contribution}>
            <h3>Modulare Skalierung</h3>
            <p>
              Kleine Systeme separat trainieren und zu großen Netzwerken
              kombinieren, ohne Neutraining des Gesamtsystems
            </p>
          </div>
          <div className={styles.contribution}>
            <h3>Energieerhaltung</h3>
            <p>
              Spezielle numerische Verfahren garantieren physikalisch korrekte
              Vorhersagen über lange Zeiträume
            </p>
          </div>
          <div className={styles.contribution}>
            <h3>Reale Anwendungen</h3>
            <p>
              Erfolgreich getestet an elektrischen Schaltkreisen, Filtern und
              mechanischen Systemen
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.example}`}>
        <h2>Praktisches Beispiel</h2>
        <p className={styles.exampleIntro}>
          Hoch- und Tiefpassfilter modular trainieren und kombinieren
        </p>

        <div className={styles.step}>
          <h3>Was sind Hoch- und Tiefpassfilter?</h3>
          <div className={styles.stepFlex}>
            <p>
              Elektronische Filter sind grundlegende Bausteine der
              Signalverarbeitung. Sie bestehen aus denselben Komponenten
              (Widerstand, Kondensator, Spannungsquelle), unterscheiden sich
              aber in ihrer <strong>Verschaltung</strong>:
              <br />
              <br />
              <strong>Tiefpassfilter:</strong> R → C — lässt tiefe Frequenzen
              durch, dämpft hohe
              <br />
              <strong>Hochpassfilter:</strong> C → R — lässt hohe Frequenzen
              durch, blockiert tiefe
            </p>
            <Figure
              src="/assets/master/hoti_sep.png"
              alt="Schaltkreise von Hoch- und Tiefpassfiltern"
              caption="Oben: Tiefpass | Unten: Hochpass"
            />
          </div>
        </div>

        <div className={styles.step}>
          <h3>Schritt 1: Einzelne Filter separat trainieren</h3>
          <p>
            Zunächst werden beide Filter <strong>unabhängig
            voneinander</strong> auf jeweils 100 Trajektorien trainiert. Die
            gestrichelten Linien zeigen die Vorhersagen des pHNN, die
            durchgezogenen Linien die Originaldaten.
          </p>
          <div className={styles.stepGrid}>
            <Figure
              src="/assets/master/tief_traj.png"
              alt="Tiefpassfilter Training"
              caption="Tiefpass: Hohe Frequenzen werden unterdrückt"
            />
            <Figure
              src="/assets/master/hoch_traj.png"
              alt="Hochpassfilter Training"
              caption="Hochpass: Tiefe Frequenzen werden unterdrückt"
            />
          </div>
          <p className={styles.callout}>
            Perfekte Übereinstimmung: pHNN lernt beide Filtercharakteristiken
            präzise
          </p>
        </div>

        <div className={styles.step}>
          <h3>Schritt 2: Generalisierung auf unbekannte Signale</h3>
          <p>
            Kritischer Test: Ein <strong>völlig neues Eingangssignal</strong>{" "}
            (Überlagerung von 10 Sinuswellen), das während des Trainings nie
            vorkam.
          </p>
          <div className={styles.stepGrid}>
            <Figure
              src="/assets/master/func.png"
              alt="Test-Eingangssignal"
              caption="Eingangssignal (unbekannt)"
            />
            <Figure
              src="/assets/master/tief.png"
              alt="Tiefpass-Ausgabe"
              caption="Tiefpass: Hohe Frequenzen gefiltert"
            />
            <Figure
              src="/assets/master/hoch.png"
              alt="Hochpass-Ausgabe"
              caption="Hochpass: Tiefe Frequenzen gefiltert"
            />
          </div>
          <p className={styles.callout}>
            Perfekte Generalisierung: Beide Filter funktionieren korrekt auf
            unbekannten Signalen
          </p>
        </div>

        <div className={styles.step}>
          <h3>Schritt 3: Systeme modular kombinieren</h3>
          <p>
            Jetzt kommt der entscheidende Schritt: Die beiden separat
            trainierten Filter werden über einen <strong>Kondensator</strong>{" "}
            verbunden. Dies erzeugt eine Kopplungsstruktur in der
            Differentialgleichung. Das verbundene System kann perfekt
            nachgebildet werden — <strong>ohne Neutraining</strong>!
          </p>
          <div className={styles.stepFlex}>
            <Figure
              src="/assets/master/hoti_sep.png"
              alt="Separate Filter"
              caption="Vorher: Zwei unabhängige Systeme"
            />
            <div className={styles.arrow}>→</div>
            <Figure
              src="/assets/master/hoch_tief_rlc.png"
              alt="Kombinierte Filter"
              caption="Nachher: Über Kondensator gekoppelt"
            />
          </div>
          <div className={styles.stepGrid} style={{ marginTop: "1.25rem" }}>
            <Figure
              src="/assets/master/hoch_tief_loss.png"
              alt="Verlustfunktion"
              caption="Trainingsverlust: Einzelsysteme + Gesamtsystem"
            />
            <Figure
              src="/assets/master/hoch_tief_traj.png"
              alt="Kombinierte Trajektorien"
              caption="Testdaten (dunkel) vs. Vorhersage (hell)"
            />
          </div>
          <p className={styles.callout}>
            Modulare Kombination erfolgreich, ohne Neutraining!
          </p>
        </div>

        <div className={styles.summaryBox}>
          <h3>Was zeigt dieses Beispiel?</h3>
          <ul className={styles.summaryList}>
            <li>
              <span className={styles.summaryNum}>1.</span>
              <span>
                <strong>Modulares Lernen:</strong> Kleine Systeme separat
                trainieren spart Zeit und Ressourcen
              </span>
            </li>
            <li>
              <span className={styles.summaryNum}>2.</span>
              <span>
                <strong>Generalisierung:</strong> Gelernte Modelle
                funktionieren auch auf völlig neuen Eingangsdaten
              </span>
            </li>
            <li>
              <span className={styles.summaryNum}>3.</span>
              <span>
                <strong>Kompositionsfähigkeit:</strong> Systeme lassen sich
                wie Lego-Bausteine kombinieren, die physikalische Struktur
                bleibt erhalten
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.conclusion}`}>
        <h2>Fazit</h2>
        <p>
          Port-Hamiltonian Neural Networks sind ein <strong>vielversprechender
          Ansatz</strong> für die datenbasierte Modellierung physikalischer
          Systeme. Die Arbeit zeigt, dass sich physikalisches Wissen und
          Machine Learning erfolgreich kombinieren lassen, mit Vorteilen für
          Genauigkeit, Interpretierbarkeit und Skalierbarkeit.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Tool-Entwicklung: RLC-Schaltkreis-Editor</h2>
        <div className={styles.toolFlex}>
          <div className={styles.toolText}>
            <p>
              Ich habe einen <strong>grafischen Editor</strong> mit PyQt5
              entwickelt, mit dem elektrische Schaltkreise visuell
              zusammengestellt werden können. Das System übersetzt den
              Schaltplan automatisch in mathematische Modelle (Matrizen E, J,
              R, G), die dann trainiert werden.
            </p>
            <p>
              Der Editor nutzt einen <strong>Node-basierten Ansatz</strong>:
              Widerstände, Kondensatoren, Spulen und Quellen werden per Drag
              &amp; Drop verbunden. Die Inzidenzmatrix des entstehenden
              Graphen wird automatisch berechnet.
            </p>
          </div>
          <div className={styles.toolFigure}>
            <Figure
              src="/assets/master/editor.png"
              alt="RLC-Schaltkreis-Editor"
              caption="Grafischer Node-Editor für RLC-Schaltkreise"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
