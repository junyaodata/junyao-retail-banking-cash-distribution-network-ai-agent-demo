# Analysis validation: ticket SLA first

## Scenario and evidence

The supplied design brief defines Greybirch Bank & Trust as a fictional bank. Its reference scope is 780 ATMs, 420 branches, four carriers, 20 tables, and approximately 1.75 million rows over 2024–2025. These are **reference specifications**, not database counts independently verified in this change. Present this as a portfolio teaching scenario, not confidential client work or measured operational savings.

The supplied resume matrix explicitly requires rerunning key SQL before using its precise figures. Its 95.0% ticket SLA, 70.3% incident SLA, and 37.6-hour incident P90 are reference expectations, not results verified here. Do not copy them into a results section until independently reproduced.

The reference queries use SQLite. The deployed application's `DbMixin.engine` uses PostgreSQL in every environment. Do not paste `JULIANDAY`, `strftime`, or SQLite temporary-view setup into the agent's SQL tool. Migrate and validate each query separately.

## First reproducible baseline

Run [`sql/01_ticket_sla_by_quarter.sql`](../sql/01_ticket_sla_by_quarter.sql) against the project's PostgreSQL schema using a read-only database connection or approved database client. Configure the schema/search path locally; never put connection credentials in evidence files.

The query follows the supplied Q1 definition:

| Decision | Definition | Why it matters |
| --- | --- | --- |
| Unit | One ticket | Several tickets can represent one continuous outage |
| Eligible reasons | `is_cash_outage = 1` and `sla_applies = 1` | Avoid hard-coded reason IDs and non-SLA maintenance |
| Eligible status | `resolved_at IS NOT NULL` | Unresolved tickets are excluded and must be reported separately |
| Period | Opening date's year and quarter | A resolution in a later quarter does not move the ticket |
| Attainment | Sum of stored `sla_met_flag` / eligible ticket count | Reproduces the recorded ticket KPI; does not independently validate the flag |
| Recovery | Average stored `restore_hours` | Does not measure elapsed time across merged tickets |

Before accepting an output, check uniqueness of `dim_ticket_reason.reason_id` and `dim_date.date_key`, and check that all eligible tickets match both dimensions. Otherwise joins can multiply or silently drop tickets. Check that resolved eligible tickets have non-null recovery hours and a binary, non-null SLA flag. A null flag would silently contribute nothing to the numerator while still being counted in the denominator.

Compare stored SLA flags with the recorded restoration duration and per-ticket SLA threshold, after checking the field types and intended rule. Record any mismatch rather than silently correcting it.

## Capture evidence

For each run save: query path and Git commit SHA, execution timestamp, schema name (no credentials), date coverage, metric definition, output CSV, and validation notes. Record the overall SLA as `100 * total met / total eligible`; do not average quarterly percentages without ticket-count weights. Keep raw customer or credential data out of public artifacts.

A live home page loading is not evidence that chat, database connectivity, or these metrics work. Those need separate checks.

## Next analysis tasks

- [ ] Confirm the live schema, table counts, date coverage, and join quality.
- [ ] Run Q1 on PostgreSQL and archive the output with its definition.
- [ ] Convert Q3 sessionization to PostgreSQL timestamp arithmetic.
- [ ] Define deterministic ordering for equal opening timestamps and evaluate overlapping tickets.
- [ ] Specify handling of unresolved incidents, contract changes, and threshold sensitivity (for example 12/24/48 hours).
- [ ] Agree on the P90 definition; SQLite's ordered-offset reference and PostgreSQL's continuous percentile need not agree.
- [ ] Compare ticket and incident SLA on the same population and period.
- [ ] Validate peak-day and carrier/region breakdowns before adding result charts.
- [ ] Compare selected agent answers to these deterministic SQL baselines.

## Agent evaluation prompts

Use these after running the baseline; ask for the exact SQL and metric definition with each answer.

1. “Show closed, SLA-applicable cash-outage ticket counts and ticket SLA attainment by opening quarter for 2024 and 2025.”
2. “What is the overall ticket SLA attainment? Weight the quarters by their eligible ticket counts.”
3. “Explain why ticket SLA attainment can differ from incident SLA attainment. Distinguish verified query results from hypotheses.”

A correct first answer must match the archived baseline, use the stated filters, and label the unit as tickets. A correct second answer must not take an unweighted mean of percentages. The third must not invent an incident result that has not been queried.
