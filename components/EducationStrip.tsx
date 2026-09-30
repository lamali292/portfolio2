import { education } from "@/lib/cv";
import styles from "./EducationStrip.module.css";

/**
 * Compact education overview for the top of the homepage. Oldest first so
 * the grades read left to right (1,9, 1,6, 1,7) with the thesis grades
 * (1,1 and 1,0) attached to their degree.
 */
export default function EducationStrip() {
  const entries = [...education].reverse();
  return (
    <section id="ausbildung" className={styles.section} aria-label="Ausbildung">
      <h2 className={styles.heading}>Ausbildung</h2>
      <ol className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.degree} className={styles.item}>
            <p className={styles.grade}>
              <span className={styles.gradeValue}>
                {entry.grade.replace("Note ", "")}
              </span>
              <span className={styles.gradeLabel}>Note</span>
            </p>
            <h3 className={styles.degree}>{entry.degree}</h3>
            <p className={styles.meta}>
              {entry.institution}, {entry.period}
            </p>
            {entry.detail && <p className={styles.detail}>{entry.detail}</p>}
            {entry.thesis && (
              <p className={styles.thesis}>
                <span className={styles.thesisGrade}>
                  {entry.thesis.grade}
                </span>
                <span>{entry.thesis.title}</span>
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
