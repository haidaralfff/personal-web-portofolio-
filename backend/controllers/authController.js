/**
 * Controller untuk Authentication endpoints
 */

import pool from "../db.js";
import { createdResponse, okResponse } from "../utils/response.js";
import { UnauthorizedError, ConflictError, DatabaseError } from "../utils/errorHandler.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Query database
    const result = await pool.query(
      "SELECT id, username FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedError("Username atau password salah");
    }

    const user = result.rows[0];
    okResponse(res, { user_id: user.id, username: user.username }, "Login berhasil");
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Insert user
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, password]
    );

    createdResponse(res, result.rows[0], "User berhasil dibuat");
  } catch (error) {
    if (error.code === "23505") {
      return next(new ConflictError("Username sudah digunakan"));
    }
    next(error);
  }
};

// Optional: Logout handler (di frontend bisa handle langsung)
export const logout = async (req, res) => {
  okResponse(res, null, "Logout berhasil");
};
