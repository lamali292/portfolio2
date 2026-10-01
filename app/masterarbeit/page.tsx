import type { Metadata } from "next";
import { assetPath } from "@/lib/asset-path";
import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import TechChips from "@/components/TechChips";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Masterarbeit – Port-Hamiltonian Neural Networks",
  description:
    "Masterarbeit (Note 1,0) an der TU Braunschweig: Neuronale Netze mit eingebauter Physik für Federschwinger und elektrische Schaltkreise. Drei Fragestellungen zu Skalierung, impliziten Lösern und impliziten Systemen, umgesetzt in Python und JAX.",
};

const technologies = [
  "Python",
  "JAX",
  "NumPy",
  "Runge-Kutta",
  "Gauß-Legendre",
  "PyQt5",
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
    <ProjectPage>
      <ProjectHero
        title="Port-Hamiltonian Neural Networks"
        lead="Masterarbeit am Institut für Numerische Mathematik der TU Braunschweig (März 2025). Ich habe untersucht, wie gut neuronale Netze mit eingebauter Physik größere und kompliziertere Systeme lernen: Federschwinger und elektrische Schaltkreise."
      >
        <TechChips items={technologies} />
        <ul className={styles.facts}>
          <li className={styles.fact}>
            <span className={styles.factValue}>1,0</span>
            <span className={styles.factLabel}>Note</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>3</span>
            <span className={styles.factLabel}>Fragestellungen</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>78</span>
            <span className={styles.factLabel}>Seiten</span>
          </li>
        </ul>
      </ProjectHero>

      <ProjectSection heading="Worum geht es?">
        <p>
          Viele technische Systeme tauschen Energie aus: ein Federschwinger,
          ein elektrischer Schwingkreis, ein Filter. Port-Hamiltonsche
          Systeme beschreiben genau diesen Energieaustausch. Ein gewöhnliches
          neuronales Netz kennt solche physikalischen Gesetze nicht und liefert
          bei langen Simulationen schnell unrealistische Ergebnisse.
        </p>
        <p>
          <strong>Port-Hamiltonian Neural Networks (pHNNs)</strong> bauen die
          physikalische Struktur fest in das Netz ein. Außerdem lassen sich
          kleine Teilsysteme getrennt trainieren und danach zu einem größeren
          System verbinden, ähnlich wie Bausteine.
        </p>
        <div className={styles.paperBox}>
          <p className={styles.paperMeta}>Die Arbeit baut auf diesen Veröffentlichungen auf:</p>
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
          <p className={styles.paperMeta}>
            und T. Peters, „Interconnection of port-Hamiltonian systems with
            port-Hamiltonian neural networks“ (PAMM 2024)
          </p>
        </div>
      </ProjectSection>

      <ProjectSection heading="Drei Fragestellungen und was herauskam">
        <ol className={styles.questions}>
          <li className={styles.question}>
            <h3>1. Funktioniert das auch bei größeren Systemen?</h3>
            <p className={styles.answer}>Ja, aber der Fehler wächst mit der Größe.</p>
            <ul className={styles.numbers}>
              <li>
                Getestet an vier gekoppelten Federschwingern (Matrizen der
                Größe 8×8), einmal als zwei große Systeme, einmal aus vier
                einzeln trainierten kleinen Systemen.
              </li>
              <li>
                Verlust der Teilsysteme zwischen 10<sup>-8</sup> und
                10<sup>-7</sup>, des Gesamtsystems etwa 10<sup>-6</sup>. In der Simulation wächst
                die Abweichung auf etwa 0,8, beim kleinen System waren es 0,012.
              </li>
              <li>
                Breitere Netze helfen: 128 statt 32 Neuronen pro Schicht
                brachten ähnlich gute Ergebnisse in 4:20 Minuten wie dreimal so
                viele Trainingsschritte in 13:01 Minuten.
              </li>
            </ul>
            <Figure
              src="/assets/master/scaling_traj.png"
              alt="Zustände von vier gekoppelten Federschwingern: Testdaten und pHNN-Vorhersage"
              caption="Vier gekoppelte Federschwinger: Testdaten (durchgezogen) und pHNN-Vorhersage (gestrichelt). Die Abweichung wächst mit der Zeit."
            />
          </li>

          <li className={styles.question}>
            <h3>2. Helfen implizite Löser statt Runge-Kutta?</h3>
            <p className={styles.answer}>
              Für die Energie ja, für den Aufwand wahrscheinlich nicht.
            </p>
            <ul className={styles.numbers}>
              <li>
                Das Gauß-Legendre-Verfahren habe ich selbst in JAX umgesetzt,
                als differenzierbare Fixpunktiteration, damit das Training
                durch den Löser hindurch ableiten kann.
              </li>
              <li>
                Genauigkeit der Trajektorien: kein nennenswerter Unterschied
                zu RK4 (Abweichung jeweils etwa 0,02).
              </li>
              <li>
                Rechenzeit: 4:11, 5:49 und 6:06 Minuten für Ordnung 2, 4 und 6,
                gegenüber 3:05 Minuten für RK4.
              </li>
              <li>
                Die gelernte Energie bleibt fast exakt erhalten (relativer
                Fehler 10<sup>-10</sup> bei Ordnung 4, 10<sup>-14</sup> bei
                Ordnung 6), die echte Energie aber nicht. Deshalb lohnt sich
                der Mehraufwand möglicherweise nicht.
              </li>
            </ul>
            <Figure
              src="/assets/master/energy_methods.png"
              alt="Vergleich von RK4 und Gauß-Legendre: Testverlust, Phasenraum und relativer Energiefehler"
              caption="RK4 und Gauß-Legendre (gl2, gl4, gl6): Testverlust, Phasenraum und relativer Energiefehler der echten Energie H (unten links) und der gelernten Energie Hθ (unten rechts)."
            />
          </li>

          <li className={styles.question}>
            <h3>3. Lässt sich der Ansatz auf implizite Systeme erweitern?</h3>
            <p className={styles.answer}>
              Ja, mit passender Parametrisierung. Das Verbinden von Systemen
              ist die Schwierigkeit.
            </p>
            <ul className={styles.numbers}>
              <li>
                Implizite Systeme haben zusätzliche algebraische
                Nebenbedingungen, etwa bei elektrischen Schaltkreisen. Sie
                haben die Form E ẋ = (J − R)∇H(x) + G u.
              </li>
              <li>
                Zwei Schwingkreise, über einen Kondensator verbunden: das
                gelingt problemlos, solange die Verbindungsstruktur fest
                bleibt.
              </li>
              <li>
                Gedämpfter Schwingkreis (mit Widerstand): höhere Verluste, mit
                geeigneter Parametrisierung aber gut nachzubilden.
              </li>
              <li>
                Hoch- und Tiefpassfilter mit Steuereingang: der Testverlust
                liegt je nach gelernten Matrizen bei etwa 10<sup>-1</sup>,
                10<sup>-3</sup> oder 10<sup>-6</sup>. Der beste Fall ergibt
                sich, wenn nur die Eingangsmatrix G gelernt wird.
              </li>
            </ul>
          </li>
        </ol>
      </ProjectSection>

      <ProjectSection heading="Fazit der Arbeit" className={styles.conclusion}>
        <p>
          pHNNs sind ein vielversprechender Ansatz, um physikalische Systeme
          aus Daten zu modellieren, und sie lassen sich auf größere und
          implizite Systeme erweitern. Die Arbeit zeigt auch die Grenzen: Die
          Fehler wachsen mit der Systemgröße, implizite Löser kosten
          Rechenzeit, und beim Verbinden von Systemen mit regulärem E
          entscheidet die Parametrisierung über den Erfolg.
        </p>
      </ProjectSection>

      <ProjectSection heading="Beispiel: Hoch- und Tiefpassfilter" className={styles.example}>
        <p className={styles.exampleIntro}>
          Zwei Filter getrennt lernen und danach koppeln
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
              <strong>Tiefpassfilter:</strong> R → C, lässt tiefe Frequenzen
              durch, dämpft hohe
              <br />
              <strong>Hochpassfilter:</strong> C → R, lässt hohe Frequenzen
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
          <h3>Schritt 1: Einzelne Filter lernen</h3>
          <p>
            Beide Filter werden <strong>unabhängig voneinander</strong> auf
            Trajektorien trainiert. Die gestrichelten Linien zeigen die
            Vorhersagen des pHNN, die durchgezogenen die Originaldaten.
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
        </div>

        <div className={styles.step}>
          <h3>Schritt 2: Unbekanntes Eingangssignal</h3>
          <p>
            Test mit einem <strong>neuen Eingangssignal</strong> (Überlagerung
            von 10 Sinuswellen), das im Training nicht vorkam. Beide Modelle
            zeigen das erwartete Filterverhalten.
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
        </div>

        <div className={styles.step}>
          <h3>Schritt 3: Die Filter über einen Kondensator koppeln</h3>
          <p>
            Die beiden getrennt trainierten Filter werden über einen{" "}
            <strong>Kondensator</strong> verbunden. Das Gesamtsystem wird
            dafür nicht noch einmal trainiert, getestet wird es mit neuen
            Daten. Das Ergebnis hängt davon ab, welche Matrizen mitgelernt
            werden:
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
              src="/assets/master/filter_loss_rjg.png"
              alt="Verlust bei Parametrisierung von R, J und G"
              caption="R, J und G gelernt: Testverlust bei etwa 10⁻¹"
            />
            <Figure
              src="/assets/master/filter_loss_rg.png"
              alt="Verlust bei Parametrisierung von R und G"
              caption="R und G gelernt: Testverlust bei etwa 10⁻³"
            />
            <Figure
              src="/assets/master/filter_loss_g.png"
              alt="Verlust bei Parametrisierung nur von G"
              caption="Nur G gelernt: Testverlust bei etwa 10⁻⁶"
            />
          </div>
          <div className={styles.wideFigure}>
            <Figure
              src="/assets/master/filter_traj_g.png"
              alt="Gekoppelte Filter: Testdaten und Vorhersage, nur G gelernt"
              caption="Gekoppelte Filter (nur G gelernt): Testdaten und Vorhersage liegen praktisch übereinander."
            />
          </div>
          <p className={styles.callout}>
            Die Teilsysteme sind in allen Fällen sehr gut gelernt. Beim Koppeln
            über die E-Matrix entscheidet die Parametrisierung über die
            Qualität.
          </p>
        </div>
      </ProjectSection>

      <ProjectSection heading="Umsetzung und Werkzeuge">
        <div className={styles.toolFlex}>
          <div className={styles.toolText}>
            <ul className={styles.numbers}>
              <li>
                Python 3.12 mit JAX 0.4.34 und NumPy 2.1, aufbauend auf einer
                erweiterten Version des Codes von Neary.
              </li>
              <li>
                Sacred protokolliert alle Parameter, Läufe und Systeminfos
                reproduzierbar.
              </li>
              <li>
                Training auf einer GPU (RTX 3070 Ti, WSL2); typische Läufe
                dauern etwa 3 bis 13 Minuten.
              </li>
              <li>
                <strong>RLC-Schaltkreis-Editor:</strong> Ich habe einen
                grafischen Node-Editor mit PyQt5 geschrieben. Per Drag &amp;
                Drop verbundene Bauteile (Widerstand, Kondensator, Spule,
                Quelle) werden automatisch in die Systemmatrizen E, J, R und G
                übersetzt, inklusive Inzidenzmatrix des Schaltkreisgraphen.
              </li>
            </ul>
          </div>
          <div className={styles.toolFigure}>
            <Figure
              src="/assets/master/editor.png"
              alt="RLC-Schaltkreis-Editor"
              caption="Grafischer Node-Editor für RLC-Schaltkreise"
            />
          </div>
        </div>
      </ProjectSection>
    </ProjectPage>
  );
}
