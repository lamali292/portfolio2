import type { ReactNode } from "react";
import styles from "./ProjectSection.module.css";

interface ProjectSectionProps {
  heading?: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * Shared section wrapper for project pages: consistent heading style and
 * vertical rhythm, so every page's sections look like part of the same
 * site instead of each page inventing its own spacing.
 */
export default function ProjectSection({
  heading,
  children,
  className,
  "aria-label": ariaLabel,
}: ProjectSectionProps) {
  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
      aria-label={ariaLabel ?? heading}
    >
      {heading && <h2>{heading}</h2>}
      {children}
    </section>
  );
}
