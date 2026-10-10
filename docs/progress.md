# Project progress

## 2026-10-09 — Establish an analysis validation baseline

Completed with AI assistance and prepared for the project owner's review:

- Inspected the repository's README, SQL execution path, database connection code, configuration examples, and supplied project reference documents.
- Confirmed that the public demo home page returned HTTP 200. Chat responses and live database metrics were not tested.
- Identified the SQLite reference / PostgreSQL application dialect difference.
- Added a quarterly ticket-SLA query and an evidence checklist that separates reference figures from verified results.
- Verified the baseline query's filtering and arithmetic with a small, temporary SQLite fixture. This does not verify PostgreSQL execution or the deployed dataset.

### Owner learning checkpoint

Before presenting this work, explain:

1. Why a ticket and an incident are different units.
2. Why the KPI uses opening quarter and excludes unresolved tickets.
3. Why 100.0 avoids integer division and why quarter percentages need count weighting.
4. Why a correct-looking answer still needs recorded SQL and data evidence.

### Next session

Run the baseline against the live schema through an approved read-only connection, retain the output, and then migrate incident sessionization. Database credentials stay in the local/deployment secret configuration and are never pasted into notes.

Record future updates only when work actually happens. Add the specific change, evidence, remaining limitation, and a short explanation in your own words; do not prefill future completion dates.
