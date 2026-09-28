import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <section className={styles.hero}>
      <h1>404</h1>
      <p className={styles.bio}>Diese Seite existiert nicht.</p>
      <Link href="/">Zurück zur Startseite</Link>
    </section>
  );
}
