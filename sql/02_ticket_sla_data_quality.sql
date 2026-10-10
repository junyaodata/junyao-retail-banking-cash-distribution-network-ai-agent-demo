-- Read-only checks for the ticket-SLA baseline population.
WITH eligible AS (
    SELECT t.*
    FROM outage_ticket AS t
    JOIN dim_ticket_reason AS r ON r.reason_id = t.reason_id
    WHERE r.is_cash_outage = 1
      AND r.sla_applies = 1
      AND t.resolved_at IS NOT NULL
)
SELECT COUNT(*) AS eligible_closed_tickets,
       MIN(opened_at) AS first_opened_at,
       MAX(opened_at) AS last_opened_at,
       SUM(CASE WHEN sla_met_flag IS NULL THEN 1 ELSE 0 END) AS null_sla_flags,
       SUM(CASE WHEN sla_met_flag NOT IN (0, 1) THEN 1 ELSE 0 END) AS invalid_sla_flags,
       SUM(CASE WHEN restore_hours IS NULL THEN 1 ELSE 0 END) AS null_restore_hours,
       SUM(CASE WHEN sla_restore_hours IS NULL THEN 1 ELSE 0 END) AS null_sla_thresholds,
       SUM(CASE WHEN restore_hours < 0 THEN 1 ELSE 0 END) AS negative_restore_hours,
       SUM(CASE WHEN sla_met_flag <> CASE WHEN restore_hours <= sla_restore_hours THEN 1 ELSE 0 END
                 AND restore_hours IS NOT NULL AND sla_restore_hours IS NOT NULL
                THEN 1 ELSE 0 END) AS sla_flag_mismatches,
       SUM(CASE WHEN NOT EXISTS (
           SELECT 1 FROM dim_date AS d WHERE d.date_key = eligible.opened_date_key
       ) THEN 1 ELSE 0 END) AS missing_opening_dates,
       (SELECT COUNT(*) FROM (
           SELECT reason_id FROM dim_ticket_reason GROUP BY reason_id HAVING COUNT(*) > 1
       ) AS duplicate_reasons) AS duplicate_reason_keys,
       (SELECT COUNT(*) FROM (
           SELECT date_key FROM dim_date GROUP BY date_key HAVING COUNT(*) > 1
       ) AS duplicate_dates) AS duplicate_date_keys
FROM eligible;
