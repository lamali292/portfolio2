import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Hauptnavigation">
      <Link href="/" className={styles.brand}>
        {siteConfig.name}
      </Link>
      <div className={styles.right}>
        <ul className={styles.list}>
          <li>
            <Link href="/#projekte">Projekte</Link>
          </li>
          <li>
            <Link href="/#lebenslauf">Lebenslauf</Link>
          </li>
          <li>
            <a href={`mailto:${siteConfig.links.email}`}>Kontakt</a>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
