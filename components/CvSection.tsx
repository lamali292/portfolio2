import { experience } from "@/lib/cv";
import styles from "./CvSection.module.css";

/**
 * Experience, sourced from `docs/content/facts.md`. Education and
 * skills have their own strips (EducationStrip, SkillsStrip) near the top of
 * the homepage. Deliberately
 * excludes home address and phone number, which the owner asked to omit
 * entirely.
 */
export default function CvSection() {
  return (
    <section id="lebenslauf" className={styles.cv}>
      <div className={styles.block}>
        <h2 className={styles.heading}>Erfahrung</h2>
        <ul className={styles.entryList}>
          {experience.map((entry) => (
            <li key={entry.role} className={styles.entry}>
              <div className={styles.entryHead}>
                <span className={styles.entryTitle}>{entry.role}</span>
                <span className={styles.entryPeriod}>{entry.period}</span>
              </div>
              <p className={styles.entryInstitution}>{entry.institution}</p>
              <p className={styles.entryDetail}>{entry.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
