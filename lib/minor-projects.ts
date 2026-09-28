export interface MinorProject {
  name: string;
  description: string;
  tech: string[];
}

/**
 * Small side projects that don't warrant a full project page (see issue #7).
 * Rendered as compact cards in the "Weitere Projekte" section, unlike the
 * full case-study pages linked from lib/nav-links.ts.
 */
export const minorProjects: MinorProject[] = [
  {
    name: "Factorio Mods",
    description:
      "Zwei kleine Lua-Mods für Factorio: behemoth-enemies und pentapod-egg-stomper-mod.",
    tech: ["Lua", "Factorio Modding API"],
  },
];
