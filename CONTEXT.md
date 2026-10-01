# Portfolio Site

A personal job-hunting portfolio site showcasing mathematics/ML/data-analysis/numerics work, with the Slay the Spire 2 modding ecosystem as the flagship "impact at scale" project.

## Language

**Active subscribers**:
The current Steam Workshop subscriber count for a mod, i.e. people currently subscribed right now.
_Avoid_: downloads, users (both ambiguous with all-time totals)

**All-time subscribers**:
The cumulative Steam Workshop subscriber count including people who have since unsubscribed. Always higher than active subscribers.
_Avoid_: total downloads (Steam doesn't expose a true download counter; this is the closest available figure)

**Tracked run**:
One completed or logged Slay the Spire 2 play session recorded by the Downfall telemetry pipeline (Supabase/Postgres), only sent when Downfall is the sole modded content active. On average a run is 52.8 minutes of play (as of 1 Oct 2026).
_Avoid_: session, data point, game

**Usertime**:
Cumulative player-hours across all tracked runs, computed via SQL over the Postgres run data. Used as the site's headline "30+ years of usertime" stat.
_Avoid_: playtime, hours (too generic — usertime specifically means the aggregate derived figure)

**STS2 Mods**:
The project page covering the Downfall mod (10-character suite), the Watcher mod (first-ever STS2 character mod), and the BaseLib framework contribution — the modding/engineering side of the ecosystem.
_Avoid_: Downfall page (too narrow — this page covers more than just Downfall)

**STS2 Data Analysis**:
The project page covering the Downfall-Data pipeline, SQL analytics, and the SHAP/LightGBM balance-analysis work — the data-science side of the ecosystem, kept separate from STS2 Mods because it demonstrates a different skill set.

**STS2 Tooling**:
The project page covering the Rider LocPlugin, a JetBrains IDE plugin for localization-file management used during Downfall/Watcher development.

**BaseLib**:
`Alchyr.Sts2.BaseLib`, the shared community modding framework STS2 mods build on. The author is a contributor (~3,000 LoC, primarily custom model/framework code such as the enchantment system).
_Avoid_: the library, the framework (ambiguous without context)
