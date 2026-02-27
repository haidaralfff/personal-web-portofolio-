import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json({ 
      message: "Projects retrieved successfully",
      total: result.rows.length,
      data: result.rows 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET PROJECT BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project tidak ditemukan" });
    }
    res.json({ 
      message: "Project retrieved successfully", 
      data: result.rows[0] 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE PROJECT
router.post("/", async (req, res) => {
  const { title, tech, status } = req.body;

  if (!title || !tech || !status) {
    return res.status(400).json({ error: "Title, tech, dan status wajib diisi" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO projects (title, tech, status) VALUES ($1, $2, $3) RETURNING *",
      [title, tech, status]
    );
    res.status(201).json({ 
      message: "Project berhasil dibuat", 
      data: result.rows[0] 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PROJECT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, tech, status } = req.body;

  if (!title || !tech || !status) {
    return res.status(400).json({ error: "Title, tech, dan status wajib diisi" });
  }

  try {
    const result = await pool.query(
      "UPDATE projects SET title = $1, tech = $2, status = $3 WHERE id = $4 RETURNING *",
      [title, tech, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project tidak ditemukan" });
    }

    res.json({ 
      message: "Project berhasil diupdate", 
      data: result.rows[0] 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE PROJECT
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *", 
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project tidak ditemukan" });
    }

    res.json({ 
      message: "Project berhasil dihapus", 
      data: result.rows[0] 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
