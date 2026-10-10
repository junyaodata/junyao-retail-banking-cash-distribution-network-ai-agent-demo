# Live ticket-SLA evaluation — 2026-10-10

## What was observed

The deployed demo's `/api/hello` returned a successful JSON health response. Two requests to `/api/chat` returned HTTP 200 and completed SSE responses. The first supplied the committed quarterly baseline SQL and requested an overall reconciliation and unresolved-ticket count; the second supplied the data-quality SQL. Both responses included the supplied SQL unchanged and claimed successful execution without schema changes.

Evidence collection completed at **2026-10-10T23:11:46.024852+00:00** (UTC). Baseline source commit: `084b3ae94610c28d182ef5be534ac2d486d339d3`. The deployed application revision and database snapshot were not independently attested.

| Agent-reported measure | Observed value |
| --- | ---: |
| Quarters returned | 8 (2024 Q1–2025 Q4) |
| Eligible closed cash-outage tickets | 22,424 |
| Tickets with SLA met | 21,304 |
| Overall ticket SLA, rounded to two decimals | 95.01% |
| Eligible unresolved tickets | 0 |
| First eligible ticket opened | 2024-01-01 12:27:34 |
| Last eligible ticket opened | 2025-12-31 21:49:59 |

The quality response reported zero null/invalid SLA flags, null recovery hours, null SLA thresholds, negative recovery durations, stored SLA-flag mismatches, missing opening-date keys, duplicate reason keys, and duplicate date keys. See the [exact agent answers and SQL](agent-responses.md) and [quarterly response values](quarterly-agent-results.csv).

## Checks performed outside the agent

- Summed the eight returned quarterly ticket counts: **22,424**, matching the returned overall count.
- Recomputed `100 * 21304 / 22424`: **95.0053514092%**, which rounds to **95.01%**.
- Weighted the already rounded quarterly percentages by ticket count: **95.0037740813%**. This differs from the exact overall rate by about **0.00158 percentage points**, within the expected 0.005-point rounding tolerance. Do not round this reconstructed value and expect it to reproduce the exact overall rate; use raw SLA-met counts instead.
- Compared the returned baseline and audit SQL with the supplied queries, ignoring whitespace and comments: unchanged.
- Checked the audit query with a temporary SQLite fixture containing excluded tickets, missing dimension keys, null fields, a contradictory SLA flag, and duplicate dimension keys. It detected those cases as expected. This is not a PostgreSQL integration test.

## Evidence boundary

**This is a successful live-agent smoke test and response-consistency check, not independent ground-truth verification.** SQL text and execution claims were returned by the same model being evaluated. No separate authenticated database connection or server-side tool-result export was available. Consequently the actual execution, dataset counts, data-quality conclusions, and the 95.01% rate remain independently unverified. The website's frontend rendering was not tested here.

Do not treat agreement with the approximate reference ticket-SLA figure as validation of the reference's incident SLA, P90 recovery time, savings, or root-cause narrative. None of those were computed in this evaluation.

## Next reproducible step

Using the existing local secret configuration, execute [the baseline](../../../sql/01_ticket_sla_by_quarter.sql) and [quality checks](../../../sql/02_ticket_sla_data_quality.sql) directly through a read-only PostgreSQL connection. Save raw counts and CSVs with the schema, snapshot/date coverage, execution timestamp, and query commit. Compare them with the agent responses before marking the analysis verified. Credentials and internal reasoning are excluded from public evidence.
