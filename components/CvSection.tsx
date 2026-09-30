import { education, experience, skillGroups } from "@/lib/cv";
import styles from "./CvSection.module.css";

/**
 * Structured education/experience/skills content folded into the homepage
 * bio (issue #10), sourced from `docs/content/facts.md`. Deliberately
 * excludes home address and phone number, which the owner asked to omit
 * entirely.
 */
export default function CvSection() {
  return (
    <section id="lebenslauf" className={styles.cv}>
      <div className={styles.block}>
        <h2 className={styles.heading}>Ausbildung</h2>
        <ul className={styles.entryList}>
          {education.map((entry) => (
            <li key={entry.degree} className={styles.entry}>
              <div className={styles.entryHead}>
                <span className={styles.entryTitle}>
                  {entry.degree} <span className={styles.grade}>({entry.grade})</span>
                </span>
                <span className={styles.entryPeriod}>{entry.period}</span>
              </div>
              <p className={styles.entryInstitution}>{entry.institution}</p>
              <p className={styles.entryDetail}>{entry.detail}</p>
            </li>
          ))}
        </ul>
      </div>

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

      <div className={styles.block}>
        <h2 className={styles.heading}>Skills</h2>
        <div className={styles.skillGrid}>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.skillGroup}>
              <h3 className={styles.skillCategory}>{group.category}</h3>
              <ul className={styles.skillList}>
                {group.items.map((item) => (
                  <li key={item} className={styles.skillChip}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
