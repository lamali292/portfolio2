import { education } from "@/lib/cv";
import styles from "./EducationStrip.module.css";

/**
 * Compact education overview for the top of the homepage. Newest degree
 * first and largest, with the thesis grades (1,0 and 1,1) attached to
 * their degree.
 */
export default function EducationStrip() {
  // Newest degree first, so the eye lands on the M.Sc.
  const entries = education;
  return (
    <section id="ausbildung" className={styles.section} aria-label="Ausbildung">
      <h2 className={styles.heading}>Ausbildung</h2>
      <ol className={styles.list}>
        {entries.map((entry, i) => (
          <li
            key={entry.degree}
            className={`${styles.item} ${i === 0 ? styles.primary : ""}`}
          >
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
