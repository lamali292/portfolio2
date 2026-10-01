import ProjectPage from "@/components/ProjectPage";
import ProjectHero from "@/components/ProjectHero";
import PipelineFlow from "@/components/PipelineFlow";
import ProjectSection from "@/components/ProjectSection";
import styles from "./page.module.css";
import TechChips from "@/components/TechChips";
import OptionSurfacePlot, {
  OptionGridData,
  OptionResolution,
} from "@/components/OptionSurfacePlot";
import CodeBlock from "@/components/CodeBlock";
import optionData from "@/data/american_option_data.json";

const TECH_CHIPS = [
  "C",
  "Numerische Methoden",
  "Newton-Krylov",
  "GMRES",
  "Sparse Matrices",
];

const steps = [
  {
    title: "Gitter bauen",
    tech: "Finite Differenzen",
    text: "Die Kurse beider Aktien werden in ein Gitter gelegt (bis zu 50 × 50 Punkte). Die Preisgleichung (Black-Scholes) wird auf diesem Gitter umgesetzt.",
  },
  {
    title: "Linearisieren",
    tech: "Newton-Verfahren",
    text: "Das nichtlineare Problem wird in jedem Zeitschritt durch eine Folge linearer Probleme angenähert.",
  },
  {
    title: "Gleichungssystem lösen",
    tech: "GMRES mit ARMS-Präkonditionierer",
    text: "Das große, dünn besetzte System löst GMRES. Ein Präkonditionierer macht es handlicher, damit wenige Iterationen genügen.",
  },
  {
    title: "Ausübung beachten",
    tech: "Projektion auf das Hindernis",
    text: "Nach jedem Schritt wird der Wert nach unten auf den Gewinn bei sofortiger Ausübung begrenzt.",
  },
];

const DATA_STRUCTURE_CODE = `/* CSR-Speicherung (Compressed Sparse Row) fuer den
   diskretisierten Black-Scholes-Operator. */
typedef struct {
    int n;          /* Anzahl Zeilen/Unbekannte            */
    int nnz;        /* Anzahl Nichtnull-Eintraege          */
    int    *ia;     /* Zeilenzeiger, Laenge n+1            */
    int    *ja;     /* Spaltenindizes, Laenge nnz          */
    double *a;      /* Werte, Laenge nnz                   */
} SparseMatrix;

typedef struct {
    int    n1, n2;      /* Gitteraufloesung je Basiswert (N)   */
    double *S1, *S2;    /* Kursgitter der beiden Basiswerte     */
    double *V;          /* aktuelle Iterierte des Optionswerts  */
    double *payoff;     /* Ausuebungsgewinn (Hindernis/Obstacle)*/
    SparseMatrix J;      /* Jacobi-Matrix der diskreten PDE      */
} OptionGrid;`;

const SOLVER_CODE = `/* Ein Newton-Schritt: Linearisierung des diskreten nichtlinearen
   Komplementaritaetsproblems, geloest mit GMRES + ARMS-Praekonditionierer. */
int newton_step(OptionGrid *grid, double tol, int max_gmres_iter) {
    double *F = compute_residual(grid);        /* PDE- + Hindernis-Residuum */
    assemble_jacobian(grid, &grid->J);          /* duenn besetzte Jacobi-Matrix, CSR */

    ARMSMat *precon = arms2_setup(&grid->J);    /* algebraischer rekursiver
                                                    Mehrebenen-Praekonditionierer */

    int n = grid->n1 * grid->n2;
    double *delta = calloc(n, sizeof(double));
    int iters = gmres_solve(&grid->J, precon, F, delta,
                             tol, max_gmres_iter);

    for (int i = 0; i < n; i++) {
        grid->V[i] -= delta[i];
        grid->V[i] = fmax(grid->V[i], grid->payoff[i]);  /* Projektion aufs Hindernis */
    }

    arms2_free(precon);
    free(F);
    free(delta);
    return iters;
}`;

interface OptionDataset {
  N30: OptionGridData;
  N50: OptionGridData;
}

const typedOptionData = optionData as unknown as OptionDataset;
const plotData: Record<OptionResolution, OptionGridData> = {
  N30: typedOptionData.N30,
  N50: typedOptionData.N50,
};

export default function PraktikumPage() {
  return (
    <ProjectPage>
      <ProjectHero
        title="Numerische Optionspreisberechnung"
        lead="Praktikum in numerischer Mathematik: Ich habe in C einen Löser geschrieben, der den fairen Preis einer amerikanischen Basket-Option berechnet."
      >
        <TechChips items={TECH_CHIPS} />
        <ul className={styles.facts}>
          <li className={styles.fact}>
            <span className={styles.factValue}>C</span>
            <span className={styles.factLabel}>Löser selbst implementiert</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>2</span>
            <span className={styles.factLabel}>Aktien im Korb</span>
          </li>
          <li className={styles.fact}>
            <span className={styles.factValue}>2.500</span>
            <span className={styles.factLabel}>
              Gitterpunkte pro Zeitschritt (feinste Auflösung, 50 × 50)
            </span>
          </li>
        </ul>
      </ProjectHero>

      <ProjectSection heading="Worum geht es?">
        <p>
          Eine Option ist ein Vertrag, der das Recht gibt, später etwas zu
          einem festen Preis zu kaufen oder zu verkaufen. Eine{" "}
          <strong>Basket-Option</strong> bezieht sich auf einen Korb mehrerer
          Aktien, hier auf zwei. Bei einer <strong>amerikanischen</strong>{" "}
          Option darf man jederzeit bis zum Ablauf ausüben, bei einer
          europäischen nur am Ende. Die Frage: Was ist so ein Vertrag heute
          fairerweise wert?
        </p>
        <p>
          Für europäische Optionen gibt es dafür eine Formel
          (Black-Scholes). Das Recht auf vorzeitige Ausübung macht es
          schwerer: Der Wert muss in jedem Moment mindestens so hoch sein wie
          der Gewinn bei sofortiger Ausübung. Eine geschlossene Formel gibt
          es dann nicht mehr, man muss rechnen: Kurse in ein Gitter legen und
          Zeitschritt für Zeitschritt vorgehen. Pro Zeitschritt entsteht ein
          großes, dünn besetztes und zusätzlich nichtlineares
          Gleichungssystem.
        </p>
      </ProjectSection>

      <ProjectSection heading="Mein Lösungsweg in vier Schritten">
        <PipelineFlow steps={steps} />
      </ProjectSection>

      <ProjectSection heading="Ergebnis: der Optionswert als Fläche">
        <p>
          Die Fläche zeigt den berechneten Optionswert in Abhängigkeit von den
          Kursen der beiden Aktien. Je niedriger beide Kurse sind, desto höher
          der Wert (die Spitze), zu hohen Kursen hin fällt er auf fast null.
          Zwischen zwei Gitterauflösungen (30 und 50 Punkte pro Dimension)
          kann umgeschaltet werden, die Grafik lässt sich drehen und zoomen.
        </p>
        <OptionSurfacePlot data={plotData} />
      </ProjectSection>

      <ProjectSection heading="Für Interessierte: Details und Code">
        <details className={styles.details}>
          <summary>Warum Newton-Krylov mit GMRES statt PSOR?</summary>
          <p>
            Der klassische Ansatz für amerikanische Optionen ist das
            projizierte SOR-Verfahren (PSOR). Es arbeitet Punkt für Punkt
            nacheinander und wird bei mehreren Aktien und feinen Gittern
            langsam. Newton-Krylov-GMRES mit ARMS-Präkonditionierer
            (Algebraic Recursive Multilevel Solver, zerlegt die Matrix
            rekursiv in unabhängige Blöcke) eignet sich besser für größere,
            mehrdimensionale Gitter und lässt sich leichter parallelisieren.
          </p>
        </details>
        <details className={styles.details}>
          <summary>C-Code: Datenstrukturen und ein Newton-Schritt</summary>
          <h3>Datenstrukturen</h3>
          <CodeBlock
            code={DATA_STRUCTURE_CODE}
            caption="Sparse-Matrix (CSR) und Gitterzustand für die diskretisierte Basket-Option."
          />
          <h3>Newton-Krylov-Solver</h3>
          <CodeBlock
            code={SOLVER_CODE}
            caption="Ein Newton-Schritt: Jacobi-Matrix aufstellen, mit GMRES + ARMS lösen, auf das Hindernis projizieren."
          />
        </details>
      </ProjectSection>
    </ProjectPage>
  );
}
