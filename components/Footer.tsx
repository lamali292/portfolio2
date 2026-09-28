import styles from "./Footer.module.css";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {CURRENT_YEAR} Laurin Maurice Liebhart</p>
    </footer>
  );
}
