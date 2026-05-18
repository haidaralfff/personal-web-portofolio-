/**
 * Controller untuk Authentication endpoints dengan Bcrypt & JWT
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { createdResponse, okResponse } from "../utils/response.js";
import { UnauthorizedError, ConflictError, DatabaseError } from "../utils/errorHandler.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key_change_in_production";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new UnauthorizedError("Username dan password wajib diisi");
    }

    // Query database untuk mengambil user
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedError("Username atau password salah");
    }

    const user = result.rows[0];

    // Bandingkan password hash dengan fallback untuk legacy plaintext password
    let isPasswordMatch = false;
    let needsUpgrade = false;

    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$") || user.password.startsWith("$2y$")) {
      isPasswordMatch = await bcrypt.compare(password, user.password);
    } else {
      // Legacy plaintext password check
      isPasswordMatch = (password === user.password);
      if (isPasswordMatch) {
        needsUpgrade = true;
      }
    }
    
    if (!isPasswordMatch) {
      throw new UnauthorizedError("Username atau password salah");
    }

    // Upgrade legacy password ke Bcrypt secara otomatis jika cocok
    if (needsUpgrade) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query(
          "UPDATE users SET password = $1 WHERE id = $2",
          [hashedPassword, user.id]
        );
        console.log(`🔒 [Security] Auto-upgraded legacy plaintext password for user "${user.username}" to Bcrypt.`);
      } catch (err) {
        console.error("⚠️ Failed to auto-upgrade legacy password hash:", err);
      }
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    okResponse(
      res, 
      { 
        token, 
        user: { id: user.id, username: user.username } 
      }, 
      "Login berhasil"
    );
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || username.trim().length < 3 || password.trim().length < 6) {
      throw new UnauthorizedError("Username minimal 3 karakter, password minimal 6 karakter");
    }

    // Blokir registrasi jika sudah ada user admin terdaftar
    const userCountResult = await pool.query("SELECT COUNT(*) FROM users");
    const userCount = parseInt(userCountResult.rows[0].count);
    if (userCount > 0) {
      throw new ConflictError("Registrasi dinonaktifkan. Hanya satu pengguna admin (pemilik portofolio) yang diizinkan.");
    }

    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user ke database
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at",
      [username, hashedPassword]
    );

    createdResponse(res, result.rows[0], "User berhasil didaftarkan");
  } catch (error) {
    if (error.code === "23505") {
      return next(new ConflictError("Username sudah digunakan"));
    }
    next(
      error instanceof ConflictError || error instanceof UnauthorizedError 
        ? error 
        : new DatabaseError(error.message)
    );
  }
};

export const logout = async (req, res) => {
  okResponse(res, null, "Logout berhasil");
};
