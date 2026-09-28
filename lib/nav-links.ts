export interface NavLink {
  href: string;
  label: string;
}

/**
 * Planned project pages for the portfolio. Each one is a stub in this
 * vertical slice (walking skeleton) and gets real content in a later slice.
 */
export const navLinks: NavLink[] = [
  { href: "/project-euler", label: "Project Euler" },
  { href: "/masterarbeit", label: "Masterarbeit" },
  { href: "/praktikum", label: "Praktikum" },
  { href: "/botc", label: "Blood on the Clocktower" },
  { href: "/spotify", label: "Spotify" },
  { href: "/sts2-mods", label: "STS2 Mods" },
  { href: "/sts2-data-analysis", label: "STS2 Data Analysis" },
  { href: "/sts2-tooling", label: "STS2 Tooling" },
];
