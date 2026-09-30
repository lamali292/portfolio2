export interface Video {
  /** YouTube video id (the part after ?v=). */
  id: string;
  /** Start offset in seconds. */
  start?: number;
  title: string;
  caption?: string;
}

/**
 * Gameplay videos of the Slay the Spire 2 mods. Add `caption` once the
 * content of a video is known; titles default to a neutral label.
 */
export const watcherVideos: Video[] = [
  {
    id: "PoqpDPO3UkA",
    title: "Watcher Gameplay – 4-Spieler-Match",
    caption: "4-Spieler-Match mit dem Watcher",
  },
  { id: "r5F5pL5k218", title: "Watcher Gameplay – Video 2", caption: "Gameplay-Video 2" },
];

export const modVideos: Video[] = [
  { id: "niQdw1PcCJM", title: "Slay the Spire 2 Mods – Video 1" },
  { id: "q_b1cmqsHhY", title: "Slay the Spire 2 Mods – Video 2" },
  { id: "efF2a3eyU-Q", start: 6, title: "Slay the Spire 2 Mods – Video 3" },
  { id: "mkX15KVU8Yo", start: 310, title: "Slay the Spire 2 Mods – Video 4" },
  { id: "31vCs8ZY0oQ", start: 5, title: "Slay the Spire 2 Mods – Video 5" },
];
