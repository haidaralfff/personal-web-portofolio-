// Entry point backend Express.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ===== ROUTES =====

// Test connection
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ 
      message: "Database connection successful", 
      timestamp: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});

// Auth routes
app.use("/api/auth", authRoutes);

// Project routes
app.use("/api/projects", projectRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint tidak ditemukan" });
});

// ===== SERVER =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 API Test: http://localhost:${PORT}/api/test`);
  console.log(`📚 Routes:`);
  console.log(`   - POST /api/auth/login`);
  console.log(`   - POST /api/auth/register`);
  console.log(`   - GET /api/projects`);
  console.log(`   - POST /api/projects`);
  console.log(`   - PUT /api/projects/:id`);
  console.log(`   - DELETE /api/projects/:id`);
});
