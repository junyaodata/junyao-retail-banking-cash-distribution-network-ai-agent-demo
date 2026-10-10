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

## 2026-10-10 — Live-agent smoke test and response reconciliation

Completed with AI assistance:

- Published the initial four-file change as a draft PR under the owner's account.
- Checked the deployed backend health endpoint and submitted two ticket-SLA evaluation requests.
- Saved the returned quarterly table, query text, quality checks, and explicit evidence limitations in [the evaluation record](evaluations/2026-10-10/README.md).
- Reconciled quarter counts and independently recomputed attainment arithmetic from the returned counts.
- Added a read-only data-quality query and checked it against a temporary fixture with known defects.

The live agent reported 22,424 eligible closed tickets, 21,304 SLA-met tickets, and zero exceptions in the selected quality checks. These are model-returned values; direct database verification remains pending. No incident SLA or P90 result is claimed.

Owner learning checkpoint: explain why weighted percentages computed from rounded quarterly rates can differ slightly from a rate computed from raw counts, and why a model returning SQL is weaker evidence than a direct database export.
