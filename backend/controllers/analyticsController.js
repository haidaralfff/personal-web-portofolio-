/**
 * Controller untuk Visitor Analytics endpoints
 */

import pool from "../db.js";
import { okResponse, createdResponse } from "../utils/response.js";
import { DatabaseError, ValidationError } from "../utils/errorHandler.js";

/**
 * POST /api/analytics/view
 * Catat kunjungan halaman baru dari frontend (Public)
 */
export const recordPageView = async (req, res, next) => {
  try {
    const { path } = req.body;

    if (!path) {
      throw new ValidationError("Visited path is required");
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Insert to database
    await pool.query(
      `INSERT INTO page_views (ip_address, user_agent, visited_path)
       VALUES ($1, $2, $3)`,
      [ipAddress, userAgent, path]
    );

    createdResponse(res, null, "Page view logged successfully");
  } catch (error) {
    next(error instanceof ValidationError ? error : new DatabaseError(error.message));
  }
};

/**
 * GET /api/analytics/stats
 * Ambil semua analitik pengunjung (Protected - Admin Only)
 */
export const getAnalyticsStats = async (req, res, next) => {
  try {
    // 1. Total Page Views
    const totalViewsResult = await pool.query("SELECT COUNT(*) FROM page_views");
    const totalViews = parseInt(totalViewsResult.rows[0].count);

    // 2. Unique Visitors (berdasarkan IP address unik)
    const uniqueVisitorsResult = await pool.query(
      "SELECT COUNT(DISTINCT ip_address) FROM page_views"
    );
    const uniqueVisitors = parseInt(uniqueVisitorsResult.rows[0].count);

    // 3. Views Today
    const viewsTodayResult = await pool.query(`
      SELECT COUNT(*) FROM page_views 
      WHERE visited_at >= CURRENT_DATE
    `);
    const viewsToday = parseInt(viewsTodayResult.rows[0].count);

    // 4. Views Yesterday
    const viewsYesterdayResult = await pool.query(`
      SELECT COUNT(*) FROM page_views 
      WHERE visited_at >= CURRENT_DATE - INTERVAL '1 day' 
        AND visited_at < CURRENT_DATE
    `);
    const viewsYesterday = parseInt(viewsYesterdayResult.rows[0].count);

    // 5. Popular Pages (Top 10 paths)
    const popularPagesResult = await pool.query(`
      SELECT visited_path as path, COUNT(*) as views 
      FROM page_views 
      GROUP BY visited_path 
      ORDER BY views DESC 
      LIMIT 10
    `);

    // 6. Daily View Trends (Past 7 Days) for Recharts Area Graph
    const dailyTrendsResult = await pool.query(`
      SELECT 
        TO_CHAR(d.day, 'YYYY-MM-DD') as date,
        COALESCE(COUNT(pv.id), 0) as views,
        COALESCE(COUNT(DISTINCT pv.ip_address), 0) as visitors
      FROM (
        SELECT GENERATE_SERIES(
          CURRENT_DATE - INTERVAL '6 days', 
          CURRENT_DATE, 
          '1 day'::interval
        )::date as day
      ) d
      LEFT JOIN page_views pv ON pv.visited_at::date = d.day
      GROUP BY d.day
      ORDER BY d.day ASC
    `);

    okResponse(res, {
      totalViews,
      uniqueVisitors,
      viewsToday,
      viewsYesterday,
      popularPages: popularPagesResult.rows,
      dailyTrends: dailyTrendsResult.rows
    }, "Analytics stats loaded successfully");
  } catch (error) {
    next(new DatabaseError(error.message));
  }
};
