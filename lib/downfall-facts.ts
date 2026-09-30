/**
 * Figures taken directly from the public repositories (counted from a
 * checkout on 2026-09-30), not from memory:
 *  - lamali292/Downfall      (commit history, file/line counts per folder)
 *  - lamali292/WatcherMod    (README feature list, commit count)
 *  - Alchyr/BaseLib-StS2     (pull requests and commits authored by lamali*)
 * Steam subscriber counts live in docs/content/facts.md.
 *
 * "Karten" counts card classes per character, excluding token, status and
 * removed cards.
 */
export interface CharacterFacts {
  slug: string;
  name: string;
  image: string;
  cards: number;
  relics: number;
}

export const characters: CharacterFacts[] = [
  { slug: "automaton", name: "Automaton", image: "/sts2-mods/automaton.png", cards: 91, relics: 9 },
  { slug: "awakened", name: "Awakened One", image: "/sts2-mods/awakened.png", cards: 91, relics: 10 },
  { slug: "champ", name: "Champ", image: "/sts2-mods/champ.png", cards: 92, relics: 9 },
  { slug: "collector", name: "The Collector", image: "/sts2-mods/collector.png", cards: 129, relics: 9 },
  { slug: "guardian", name: "Guardian", image: "/sts2-mods/guardian.png", cards: 81, relics: 10 },
  { slug: "hermit", name: "Hermit", image: "/sts2-mods/hermit.png", cards: 96, relics: 15 },
  { slug: "hexaghost", name: "Hexaghost", image: "/sts2-mods/hexaghost.png", cards: 92, relics: 9 },
  { slug: "snecko", name: "Snecko", image: "/sts2-mods/snecko.png", cards: 93, relics: 12 },
  { slug: "slimeboss", name: "Slime Boss", image: "/sts2-mods/slimeboss.png", cards: 77, relics: 11 },
  { slug: "gremlins", name: "Gremlins", image: "/sts2-mods/gremlins.png", cards: 76, relics: 14 },
];

export const downfallTotals = {
  characters: 10,
  cards: 918,
  relics: 108,
  linesOfCode: "80.000",
  commitsTotal: 1958,
  commitsMine: 1375,
  since: "14. Apr. 2026",
  until: "30. Sep. 2026",
  stars: 22,
  /** Share of all C# lines added in the history that came from lamali / lamali292. */
  codeSharePercent: 94,
  /** Languages with their own localization folder; ja, zh(s) and fr are above 94 % of the English keys. */
  languages: 11,
};

/** Commits by lamali / lamali292 in Downfall, per calendar month of 2026. */
export const commitsPerMonth: { month: string; commits: number }[] = [
  { month: "Apr", commits: 139 },
  { month: "Mai", commits: 147 },
  { month: "Jun", commits: 172 },
  { month: "Jul", commits: 221 },
  { month: "Aug", commits: 257 },
  { month: "Sep", commits: 439 },
];

export const watcherFacts = {
  cards: 83,
  colorless: 10,
  relics: 8,
  stances: ["Wrath", "Calm", "Divinity"],
  commits: 270,
  stars: 50,
  contributors: 12,
  /** English, German, French, Italian, Polish, Russian, Chinese, Japanese, Korean; all at 98 %+ of the English keys. */
  languages: 9,
};

export const baseLibFacts = {
  pullRequests: 25,
  commits: 27,
  linesAdded: "3.028",
  linesRemoved: "397",
  highlights: [
    "Scry-System inklusive Hover-Tips",
    "Eigene Run-Modifier (CustomModifierModel)",
    "Eigene Rastplatz-Optionen für Mods",
    "Charakterauswahl: Scrollen und Controller-Steuerung",
    "Mod-Credits im Credits-Screen",
    "Konsolen-Autovervollständigung",
    "Lokalisierung: Hover-Tips, Slider-Labels, Deutsch",
  ],
};
