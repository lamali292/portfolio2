import { experience, skillGroups } from "@/lib/cv";
import styles from "./CvSection.module.css";

/**
 * Experience and skills, sourced from `docs/content/facts.md`. Education has
 * its own strip (EducationStrip) near the top of the homepage. Deliberately
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
