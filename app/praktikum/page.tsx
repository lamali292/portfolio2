import Link from "next/link";
import TechChips from "@/components/TechChips";
import OptionSurfacePlot, {
  OptionGridData,
  OptionResolution,
} from "@/components/OptionSurfacePlot";
import CodeBlock from "@/components/CodeBlock";
import optionData from "@/data/american_option_data.json";
import styles from "./page.module.css";

const TECH_CHIPS = [
  "C",
  "Numerische Methoden",
  "Newton-Krylov",
  "GMRES",
  "Sparse Matrices",
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
    <article className={styles.page}>
      <header className={styles.hero}>
        <h1>Numerische Optionspreisberechnung</h1>
        <p className={styles.subtitle}>
          Bewertung amerikanischer Basket-Optionen per Newton-Krylov-Verfahren
          mit GMRES &mdash; Praktikum in numerischer Mathematik
        </p>
        <TechChips items={TECH_CHIPS} />
      </header>

      <section className={styles.section}>
        <h2>Das Problem</h2>
        <p>
          Der faire Wert einer amerikanischen Basket-Option &ndash; einer
          Option auf einen Korb mehrerer Basiswerte, die jederzeit bis zur
          Fälligkeit ausgeübt werden kann &ndash; lässt sich nicht mehr
          geschlossen berechnen. Für europäische Optionen liefert die
          Black-Scholes-Gleichung eine analytische Formel, doch das
          vorzeitige Ausübungsrecht amerikanischer Optionen macht daraus ein
          freies Randwertproblem: Der Optionswert muss zu jedem Zeitpunkt
          sowohl die Black-Scholes-PDE erfüllen als auch mindestens so groß
          sein wie der sofortige Ausübungsgewinn (die Payoff-Funktion).
        </p>
        <p>
          Um dieses Problem numerisch zu lösen, wird die PDE über ein
          Finite-Differenzen-Verfahren auf einem Gitter der Basiswertpreise
          diskretisiert. Für eine Basket-Option mit mehreren Basiswerten
          ergibt sich daraus ein mehrdimensionales Gitter und ein
          entsprechend großes, aber dünn besetztes (sparse) Gleichungssystem
          pro Zeitschritt. Die Nebenbedingung des vorzeitigen Ausübens macht
          dieses System zusätzlich nichtlinear &ndash; es handelt sich um ein
          lineares Komplementaritätsproblem (LCP), das in jedem Zeitschritt
          neu gelöst werden muss.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Interaktive Visualisierung</h2>
        <p>
          Die folgende 3D-Oberfläche zeigt den berechneten Optionswert in
          Abhängigkeit der beiden Basiswertkurse. Zwischen zwei
          Gitterauflösungen (N&nbsp;=&nbsp;30 und N&nbsp;=&nbsp;50 Punkte pro
          Dimension) kann umgeschaltet werden; darunter werden die
          zugehörigen Kennzahlen (Minimum, Maximum, Mittelwert,
          Standardabweichung) angezeigt.
        </p>
        <OptionSurfacePlot data={plotData} />
      </section>

      <section className={styles.section}>
        <h2>Lösungsansatz</h2>
        <p>
          Jeder Zeitschritt wird über ein Newton-Verfahren linearisiert: Aus
          dem nichtlinearen Residuum der diskretisierten PDE inklusive
          Hindernisbedingung wird eine Jacobi-Matrix aufgestellt, und das
          resultierende dünn besetzte lineare System wird mit dem
          Krylov-Unterraumverfahren GMRES (Generalized Minimal Residual)
          gelöst. Damit GMRES bei den hier auftretenden schlecht
          konditionierten, großen Systemen in vertretbar wenigen Iterationen
          konvergiert, kommt ein ARMS-Präkonditionierer (Algebraic Recursive
          Multilevel Solver) zum Einsatz, der die Matrix rekursiv in
          unabhängige Blöcke zerlegt und so die Konditionierung deutlich
          verbessert.
        </p>
        <p>
          Der klassische Lösungsansatz für amerikanische Optionen &ndash; das
          projizierte SOR-Verfahren (PSOR) &ndash; wurde bewusst nicht
          verwendet: PSOR konvergiert für einzelne Basiswerte zuverlässig,
          skaliert aber schlecht mit der Dimension des Basiskorbs und der
          Gitterauflösung, da es sich um ein sequentielles, punktweises
          Verfahren handelt. Newton-Krylov-GMRES mit ARMS-Präkonditionierer
          konvergiert dagegen auch bei größeren, mehrdimensionalen Gittern in
          wenigen Iterationen und lässt sich zudem besser parallelisieren.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Code-Auszüge</h2>
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
      </section>

      <p>
        <Link href="/">Zurück zur Startseite</Link>
      </p>
    </article>
  );
}
