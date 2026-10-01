# Downfall telemetry snapshot

`snapshot.json` is a static, aggregated snapshot of real Downfall (Slay the
Spire 2 mod) run telemetry, backing the STS2 Data Analysis page
(`app/sts2-data-analysis/page.tsx`, read via `lib/downfall-data.ts`).

## Provenance

Two sources feed this snapshot, both real production data, never fixtures:

- **`cardsByCharacter`, `relicsTop`, `relicsBottom`**: from
  `../sts2mods/Downfall-Data/public/{cards,relics}.json` (sibling repo, not
  part of this git history), generated 2026-09-01 by that repo's GitHub
  Actions workflow, which queries the production Postgres (Hetzner-hosted)
  database every 3 hours and writes JSON snapshots from the
  `card_stats_by_group` and `relic_stats` materialized views. See that
  repo's `CLAUDE.md` for the full field-level design rationale.
- **`summary`, `runsOverTime`**: pulled directly and live from the
  production Postgres `runs_per_day` materialized view via a one-off
  read-only query (the `ci_reader` role, scoped via `GRANT SELECT` to just
  the views this page needs), run 2026-09-28, covering the window
  `windowStart`–`windowEnd` in `summary`. This is a live pull, not a
  `Downfall-Data` static-site export — that pipeline's own snapshot on disk
  was stale (last updated 2026-09-01), so it couldn't supply the current
  runs/usertime figures on its own.

## How `snapshot.json` was built

The source files above are per-(item, version_group) rows containing RAW
COUNTS (e.g. `offered_3c`, `picked_3c`, `runs_acquired`, `wins_acquired`),
never pre-computed rates — averaging pre-computed per-row rates across
versions/characters would be statistically wrong. `snapshot.json` preserves
that invariant: it sums raw counts (across cards/relics and version groups)
down to the granularity this page needs, and lets the page compute rates
from the summed counts (see `lib/downfall-data.ts`).

Aggregations performed:

- **`summary`** — total tracked runs and solo/multiplayer split, summed
  from `runs_per_day`'s `bucket` column across all characters/version
  groups; `usertimeYears` is derived as `trackedRuns × avgSessionMinutes`,
  per the site's documented average session length (see `CONTEXT.md`). This
  snapshot (Aug 9 – Sep 28, 283,930 runs) is older than the homepage
  figures in `docs/content/facts.md` (7 Aug – 1 Oct, 304,225 runs); the two
  are separate data pulls and drift until this snapshot is refreshed.
- **`runsOverTime`** — `runs_per_day`'s `bucket` column, summed across
  character and version_group per calendar day.
- **`cardsByCharacter`** — `cards.json` rows summed across all cards and
  version groups per character, still as raw counts; pick rate and win
  rate are computed in `lib/downfall-data.ts` from these summed counts.
- **`relicsTop` / `relicsBottom`** — `relics.json` rows summed across
  version groups per relic id, filtered to relics with at least
  `relicMinRuns` (200) total runs (mirroring the reference dashboard's
  min-runs noise filter), then ranked by win rate; top 15 and bottom 10
  shown.

No numbers in `snapshot.json` are invented — every figure traces back to a
summed raw count from the source files above.

## Regenerating

There is no build-time regeneration wired up yet (that's part of a future
live-data slice, issue #12). To refresh `cardsByCharacter`/`relicsTop`/
`relicsBottom` manually against a newer `Downfall-Data` pull, re-run the
aggregation described above against the updated `public/*.json` files. To
refresh `summary`/`runsOverTime`, re-run the one-off read-only query
described in Provenance above (a `GRANT SELECT ... TO ci_reader` on
`runs_per_day` plus a query over the desired window) and update
`sourceSnapshotDate`/`windowStart`/`windowEnd` accordingly.
