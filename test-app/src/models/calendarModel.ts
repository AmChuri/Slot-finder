import pg from 'pg';
import { TCalendarQuery } from '../schemas/calendarSchema';

const pool = new pg.Pool({
  user: 'postgres',
  host: process.env.DB_HOST,
  database: 'coding-challenge',
  password: 'mypassword123!',
  port: 5432,
});

export const getAvailableSlots = async (
  queryInput: TCalendarQuery
) => {
  const query = `
      WITH matching_managers AS (
          SELECT DISTINCT sm.id AS sales_manager_id
          FROM sales_managers sm
          WHERE 
              $2::text[] <@ sm.products::text[]
              AND $3 = ANY(sm.languages)
              AND $4 = ANY(sm.customer_ratings)
      )
        SELECT 
            s.start_date,
            COUNT(*) AS available_count
        FROM slots s
        JOIN matching_managers mm ON s.sales_manager_id = mm.sales_manager_id
        LEFT JOIN slots booked_slots 
            ON s.sales_manager_id = booked_slots.sales_manager_id
            AND booked_slots.booked = true
            AND (
                booked_slots.start_date < s.end_date
                AND booked_slots.end_date > s.start_date
            )
    WHERE 
        s.booked = false
        AND DATE(s.start_date) = $1
        AND booked_slots.id IS NULL  -- Ensure no overlap with booked slots
        GROUP BY s.start_date
        ORDER BY s.start_date;
    `;

  const values = [
    queryInput.date,
    queryInput.products,
    queryInput.language,
    queryInput.rating,
  ];

  try {
    const result = await pool.query(query, values);
    const availableSlots = result.rows.map((row) => ({
      start_date: row.start_date.toISOString(),
      available_count: parseInt(row.available_count),
    }));
    return availableSlots;
  } catch (error) {
    throw new Error('Failed to retrieve available slots');
  }
};
