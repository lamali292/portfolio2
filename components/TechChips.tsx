import styles from "./TechChips.module.css";

interface TechChipsProps {
  items: string[];
}

/** Small pill list for the tech stack associated with a project page. */
export default function TechChips({ items }: TechChipsProps) {
  return (
    <ul className={styles.chips}>
      {items.map((item) => (
        <li key={item} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
}
