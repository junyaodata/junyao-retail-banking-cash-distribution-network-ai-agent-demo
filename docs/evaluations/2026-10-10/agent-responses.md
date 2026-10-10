# Observed live-agent answers

These are public-demo responses, not independent database exports. Internal reasoning events and response headers are not included.

## Ticket baseline response

All three queries executed successfully. No schema or type adjustments were required. No incident-level SLA was computed.

### Quarterly baseline results

| calendar_year | calendar_quarter | cash_tickets | ticket_sla_pct | avg_restore_h |
|---:|---:|---:|---:|---:|
| 2024 | 1 | 2814 | 95.3400 | 3.6300 |
| 2024 | 2 | 2530 | 94.3500 | 3.7300 |
| 2024 | 3 | 2994 | 93.9200 | 3.8300 |
| 2024 | 4 | 3355 | 94.7200 | 3.7900 |
| 2025 | 1 | 3404 | 95.1800 | 3.8500 |
| 2025 | 2 | 1881 | 95.4300 | 3.8400 |
| 2025 | 3 | 2824 | 95.5700 | 3.7800 |
| 2025 | 4 | 2622 | 95.7300 | 3.6900 |

### Overall eligible-ticket reconciliation

| cash_tickets | sla_met_count | ticket_sla_pct |
|---:|---:|---:|
| 22424 | 21304 | 95.0100 |

The quarterly counts reconcile to **22,424 tickets** and **21,304 SLA-met tickets**, yielding **95.0100% overall attainment**.

### Eligible unresolved tickets

| eligible_unresolved_tickets |
|---:|
| 0 |

### Executed SQL

#### Quarterly baseline

```sql
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
```

#### Overall eligible-ticket aggregate

```sql
SELECT COUNT(*) AS cash_tickets,
       SUM(t.sla_met_flag) AS sla_met_count,
       ROUND(100.0 * SUM(t.sla_met_flag) / COUNT(*), 2) AS ticket_sla_pct
FROM outage_ticket AS t
JOIN dim_ticket_reason AS r ON r.reason_id = t.reason_id
WHERE r.is_cash_outage = 1
  AND r.sla_applies = 1
  AND t.resolved_at IS NOT NULL;
```

#### Eligible unresolved-ticket count

```sql
SELECT COUNT(*) AS eligible_unresolved_tickets
FROM outage_ticket AS t
JOIN dim_ticket_reason AS r ON r.reason_id = t.reason_id
WHERE r.is_cash_outage = 1
  AND r.sla_applies = 1
  AND t.resolved_at IS NULL;
```

## Data-quality response

Executed successfully with **no SQL errors and no changes**. The query was run exactly as supplied.

```sql
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
```

| eligible_closed_tickets | first_opened_at | last_opened_at | null_sla_flags | invalid_sla_flags | null_restore_hours | null_sla_thresholds | negative_restore_hours | sla_flag_mismatches | missing_opening_dates | duplicate_reason_keys | duplicate_date_keys |
|---:|:---|:---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 22424 | 2024-01-01 12:27:34 | 2025-12-31 21:49:59 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

All quality checks returned zero exceptions.
