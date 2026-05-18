/**
 * Controller untuk Settings (Profile & Config) endpoints
 */

import pool from "../db.js";
import { okResponse } from "../utils/response.js";
import { DatabaseError, ValidationError } from "../utils/errorHandler.js";

/**
 * GET /api/settings
 * Ambil semua data konfigurasi/profil (Public)
 * Mengembalikan data dalam bentuk flat object: { site_name: "...", bio: "..." }
 */
export const getSettings = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT key, value FROM settings");
    
    // Convert array of {key, value} to single flat object
    const settingsObject = {};
    result.rows.forEach(row => {
      settingsObject[row.key] = row.value;
    });

    okResponse(res, settingsObject, "Settings fetched successfully");
  } catch (error) {
    next(new DatabaseError(error.message));
  }
};

/**
 * PUT /api/settings
 * Update pengaturan profil secara massal (Protected - Admin Only)
 * Body: { site_name: "...", bio: "...", etc }
 */
export const updateSettings = async (req, res, next) => {
  try {
    const settingsData = req.body;

    if (!settingsData || typeof settingsData !== "object" || Array.isArray(settingsData)) {
      throw new ValidationError("Invalid settings payload");
    }

    // Begin database transaction
    await pool.query("BEGIN");

    for (const [key, value] of Object.entries(settingsData)) {
      // Basic validation for key length
      if (key.trim().length === 0) continue;

      await pool.query(
        `INSERT INTO settings (key, value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (key) 
         DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
        [key, String(value)]
      );
    }

    // Commit transaction
    await pool.query("COMMIT");

    // Fetch updated settings to return
    const result = await pool.query("SELECT key, value FROM settings");
    const settingsObject = {};
    result.rows.forEach(row => {
      settingsObject[row.key] = row.value;
    });

    okResponse(res, settingsObject, "Settings updated successfully");
  } catch (error) {
    // Rollback transaction on failure
    await pool.query("ROLLBACK");
    next(error instanceof ValidationError ? error : new DatabaseError(error.message));
  }
};
