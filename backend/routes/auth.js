import express from "express";
import pool from "../db.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const user = result.rows[0];
    res.json({ 
      message: "Login berhasil", 
      user_id: user.id, 
      username: user.username,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, password]
    );

    res.status(201).json({ 
      message: "User berhasil dibuat", 
      user: result.rows[0],
      timestamp: new Date()
    });
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ error: "Username sudah digunakan" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

export default router;
