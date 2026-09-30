import { skillGroups } from "@/lib/cv";
import styles from "./SkillsStrip.module.css";

/** Compact skills overview, placed right below the education strip. */
export default function SkillsStrip() {
  return (
    <section id="skills" className={styles.section} aria-label="Skills">
      <h2 className={styles.heading}>Skills</h2>
      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <div key={group.category} className={styles.group}>
            <h3 className={styles.category}>{group.category}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
