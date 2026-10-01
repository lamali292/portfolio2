import Link from "next/link";
import styles from "./ProjectCard.module.css";
import type { Project } from "@/lib/projects";
import { assetPath } from "@/lib/asset-path";

export type CardSize = "feature" | "half" | "third";

/**
 * Clickable project tile for the homepage grid: a cover on top (a real
 * screenshot when the project has one, otherwise a typographic cover made
 * from the project's own headline figure), then title, teaser and tech.
 */
export default function ProjectCard({
  href,
  title,
  teaser,
  tech,
  highlight,
  image,
  size = "third",
}: Project & { size?: CardSize }) {
  return (
    <Link href={href} className={`${styles.card} ${styles[size]}`}>
      <div
        className={`${styles.cover} ${image?.fit === "contain" ? styles.contain : ""}`}
      >
        {image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.isPublic ? assetPath(image.src) : image.src}
              alt={image.alt}
              loading="lazy"
              className={image.darkSrc ? "theme-light-only" : undefined}
              style={{ objectPosition: image.position }}
            />
            {image.darkSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image.isPublic ? assetPath(image.darkSrc) : image.darkSrc}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="theme-dark-only"
                style={{ objectPosition: image.position }}
              />
            )}
          </>
        ) : (
          <div className={styles.typeCover} aria-hidden="true">
            <span>{highlight ?? tech[0]}</span>
          </div>
        )}
        {image && highlight && (
          <span className={styles.highlight}>{highlight}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.teaser}>{teaser}</p>
        <p className={styles.tech}>{tech.join(", ")}</p>
      </div>
    </Link>
  );
}
