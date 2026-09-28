# Downfall telemetry snapshot

`snapshot.json` is a static, aggregated snapshot of real Downfall (Slay the
Spire 2 mod) run telemetry, backing the STS2 Data Analysis page
(`app/sts2-data-analysis/page.tsx`, read via `lib/downfall-data.ts`).

## Provenance

Source: `../sts2mods/Downfall-Data/public/{cards,relics,characters,activity}.json`
(sibling repo, not part of this git history), generated 2026-09-01 by that
repo's GitHub Actions workflow, which queries the production Postgres
(Hetzner-hosted) database every 3 hours and writes JSON snapshots from these
materialized views:

- `card_stats_by_group` (→ `cards.json`)
- `relic_stats` (→ `relics.json`)
- `char_ascension_by_version`, `char_daily_by_version` (→ `characters.json`)
- `runs_per_day`, `runs_per_hour` (→ `activity.json`)

This is real production data, not a fixture — see that repo's `CLAUDE.md`
for the full field-level design rationale.

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
  from `activity.json`'s `day` bucket across all characters/version groups;
  `usertimeYears` is derived as `trackedRuns × avgSessionMinutes`, per the
  site's documented ~45–60 min/run average (see `CONTEXT.md`). This
  snapshot only covers its own window (`windowStart`–`windowEnd`), not the
  full live-site figure used in the static stat banner (issue #10, which
  draws on `docs/content/facts.md`) — the two are different data pulls by
  design.
- **`runsOverTime`** — `activity.json`'s `day` bucket, summed across
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
live-data slice, issue #12). To refresh this snapshot manually against a
newer `Downfall-Data` pull, re-run the aggregation described above against
the updated `public/*.json` files and update `sourceSnapshotDate` /
`windowStart` / `windowEnd` accordingly.
