import Link from "next/link";
import styles from "./StubPage.module.css";

interface StubPageProps {
  title: string;
}

/**
 * Placeholder for a project page planned in a later vertical slice.
 * See issue #1 (walking skeleton) and the sibling slice issues.
 */
export default function StubPage({ title }: StubPageProps) {
  return (
    <section className={styles.stub}>
      <h1>{title}</h1>
      <p>Diese Seite ist in Vorbereitung.</p>
      <Link href="/">Zurück zur Startseite</Link>
    </section>
  );
}
