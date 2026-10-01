import styles from "./FeatureImage.module.css";

interface FeatureImageProps {
  src: string;
  /** Optional dark-theme version of the same image. */
  darkSrc?: string;
  alt: string;
  caption: string;
}

/**
 * A single screenshot with an italic caption, used inside feature sections
 * on project pages. Paths are expected to be root-relative (e.g. "/botc/x.png")
 * and are automatically prefixed with the deploy base path.
 */
export default function FeatureImage({
  src,
  darkSrc,
  alt,
  caption,
}: FeatureImageProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <figure className={styles.figure}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${src}`}
        alt={alt}
        className={`${styles.image}${darkSrc ? " theme-light-only" : ""}`}
        loading="lazy"
      />
      {darkSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${basePath}${darkSrc}`}
          alt=""
          aria-hidden="true"
          className={`${styles.image} theme-dark-only`}
          loading="lazy"
        />
      )}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
