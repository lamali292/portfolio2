import Link from "next/link";
import { navLinks } from "@/lib/nav-links";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Projekte">
      <Link href="/" className={styles.brand}>
        Laurin Maurice Liebhart
      </Link>
      <div className={styles.right}>
        <ul className={styles.list}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
