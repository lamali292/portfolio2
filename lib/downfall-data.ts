import rawSnapshot from "@/data/downfall/snapshot.json";

export interface DownfallSummary {
  trackedRuns: number;
  spRuns: number;
  mpRuns: number;
  usertimeHours: number;
  usertimeYears: number;
  avgSessionMinutes: number;
  windowStart: string;
  windowEnd: string;
  sourceSnapshotDate: string;
  note: string;
}

export interface DownfallDayActivity {
  day: string;
  runs: number;
  sp_runs: number;
  mp_runs: number;
}

export interface DownfallCharacterCardStats {
  character: string;
  offered3c: number;
  picked3c: number;
  runsAcquired: number;
  winsAcquired: number;
}

export interface DownfallRelicStats {
  relic: string;
  label: string;
  runsWithRelic: number;
  winsWithRelic: number;
}

export interface DownfallSnapshot {
  summary: DownfallSummary;
  runsOverTime: DownfallDayActivity[];
  cardsByCharacter: DownfallCharacterCardStats[];
  relicsTop: DownfallRelicStats[];
  relicsBottom: DownfallRelicStats[];
  relicMinRuns: number;
}

/**
 * Returns the Downfall telemetry data backing the STS2 Data Analysis page.
 *
 * STATIC implementation: reads the checked-in snapshot at
 * `data/downfall/snapshot.json`, which was derived (see
 * `data/downfall/README.md`) from the real production Postgres materialized
 * views used by the Downfall-Data dashboard (`card_stats_by_group`,
 * `relic_stats`, `char_ascension_by_version`, `char_daily_by_version`,
 * `runs_per_day`) — never fixtures or invented numbers. Per that dashboard's
 * design (see its CLAUDE.md), everything in the snapshot is a RAW COUNT;
 * rates are always derived here from summed counts, never averaged from
 * pre-computed per-row rates.
 *
 * This function is the single seam between "where the data comes from" and
 * "how the page renders it." A future live implementation (blocked on
 * issue #12, which provisions a read-only Postgres credential — a
 * human-only step) can replace this function's body with a `fetch` against
 * a server-side API route such as `/api/downfall-stats` that reads
 * `DATABASE_URL` from the environment, without changing this function's
 * signature, its return type, or any of its callers.
 */
export function getDownfallSnapshot(): DownfallSnapshot {
  return rawSnapshot as DownfallSnapshot;
}

/** Formats a run count using German thousands separators, e.g. "139.881". */
export function formatTrackedRuns(n: number): string {
  return n.toLocaleString("de-DE");
}

/** Formats a fractional year count as German-locale "Jahre", e.g. "14,0 Jahre". */
export function formatUsertimeYears(years: number): string {
  return `${years.toFixed(1).replace(".", ",")} Jahre`;
}

/** Formats a 0..1 rate as a German-locale percentage, e.g. "36,4 %". */
export function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(1).replace(".", ",")} %`;
}

export function pickRate(c: DownfallCharacterCardStats): number {
  return c.offered3c > 0 ? c.picked3c / c.offered3c : 0;
}

export function acquireWinRate(c: DownfallCharacterCardStats): number {
  return c.runsAcquired > 0 ? c.winsAcquired / c.runsAcquired : 0;
}

export function relicWinRate(r: DownfallRelicStats): number {
  return r.runsWithRelic > 0 ? r.winsWithRelic / r.runsWithRelic : 0;
}
