"use client";

import { useState } from "react";
import type { Video } from "@/lib/videos";
import styles from "./VideoEmbed.module.css";

/**
 * YouTube video that only loads the player after a click. Keeps the page
 * light with many videos and avoids contacting YouTube (privacy-enhanced
 * youtube-nocookie domain) before the visitor chooses to play.
 */
export default function VideoEmbed({
  id,
  start,
  title,
  caption,
  thumbnail,
}: Video & { thumbnail?: string }) {
  const [active, setActive] = useState(false);
  const params = new URLSearchParams({ autoplay: "1", rel: "0" });
  if (start) params.set("start", String(start));

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.play}
            onClick={() => setActive(true)}
            aria-label={`${title} abspielen`}
          >
            {thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail}
                alt=""
                loading="lazy"
                className={styles.thumb}
              />
            )}
            <span className={styles.icon} aria-hidden="true" />
            <span className={styles.hint}>
              Video abspielen. Dabei werden Daten an YouTube übertragen.
            </span>
          </button>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
