import type { ReactNode } from "react";
import styles from "./ProjectPage.module.css";

export default function ProjectPage({ children }: { children: ReactNode }) {
  return <article className={styles.page}>{children}</article>;
}
