// Entry point backend Express.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARES =====
// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
  credentials: true,
}));

// Body parser with larger limit for images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ===== ROUTES =====

// Test connection
app.get("/api/test", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Database connection successful",
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    next(error);
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Seed endpoint untuk development only
if (process.env.NODE_ENV === "development") {
  app.post("/api/seed", async (req, res, next) => {
    try {
      // Clear existing data
      await pool.query("TRUNCATE TABLE projects CASCADE");

      // Insert dummy data
      const projects = [
        { title: "Portfolio Web", tech: "React", status: "Active" },
        { title: "POS Dashboard", tech: "Node.js", status: "Draft" },
        { title: "Mobile App", tech: "React Native", status: "In Progress" },
      ];

      for (const project of projects) {
        await pool.query(
          "INSERT INTO projects (title, tech, status) VALUES ($1, $2, $3)",
          [project.title, project.tech, project.status]
        );
      }

      res.json({
        success: true,
        message: "Database seeded successfully",
        count: projects.length,
      });
    } catch (error) {
      next(error);
    }
  });
}

// ===== ERROR HANDLERS =====
app.use(notFoundHandler);
app.use(errorHandler);

// ===== SERVER =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 API Test: http://localhost:${PORT}/api/test`);
  console.log(`📝 Documentation: http://localhost:${PORT}/api/docs (if added)`);
  console.log(`\n📚 Routes:`);
  console.log(`   AUTH:`);
  console.log(`   - POST /api/auth/login`);
  console.log(`   - POST /api/auth/register`);
  console.log(`   - POST /api/auth/logout`);
  console.log(`\n   PROJECTS:`);
  console.log(`   - GET /api/projects`);
  console.log(`   - GET /api/projects/:id`);
  console.log(`   - POST /api/projects`);
  console.log(`   - PUT /api/projects/:id`);
  console.log(`   - DELETE /api/projects/:id`);
  if (process.env.NODE_ENV === "development") {
    console.log(`\n   DEVELOPMENT:`);
    console.log(`   - POST /api/seed (insert dummy data)`);
  }
});
