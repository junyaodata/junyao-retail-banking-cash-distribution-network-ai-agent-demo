-- Baseline: closed, SLA-applicable cash-outage tickets, grouped by opening quarter.
-- Adapted from Q1 in the user-supplied Greybirch SQL reference.
-- Use the application schema's search_path; this query does not change data.
-- This reproduces the ticket KPI, not merged incident recovery performance.
SELECT d.calendar_year,
       d.calendar_quarter,
       COUNT(*) AS cash_tickets,
       ROUND(100.0 * SUM(t.sla_met_flag) / COUNT(*), 2) AS ticket_sla_pct,
       ROUND(CAST(AVG(t.restore_hours) AS NUMERIC), 2) AS avg_restore_h
FROM outage_ticket AS t
JOIN dim_ticket_reason AS r ON r.reason_id = t.reason_id
JOIN dim_date AS d ON d.date_key = t.opened_date_key
WHERE r.is_cash_outage = 1
  AND r.sla_applies = 1
  AND t.resolved_at IS NOT NULL
GROUP BY d.calendar_year, d.calendar_quarter
ORDER BY d.calendar_year, d.calendar_quarter;
