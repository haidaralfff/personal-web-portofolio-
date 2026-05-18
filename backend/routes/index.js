import express from "express";
import pool from "../db.js";
import authRoutes from "./auth.js";
import projectRoutes from "./projects.js";
import messageRoutes from "./messages.js";
import settingRoutes from "./settings.js";
import analyticsRoutes from "./analytics.js";

const router = express.Router();

// ===== HEALTH CHECK & TELEMETRY ENDPOINTS =====
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

router.get("/test", async (req, res, next) => {
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

// ===== DEVELOPMENT SEED ENDPOINT =====
if (process.env.NODE_ENV === "development") {
  router.post("/seed", async (req, res, next) => {
    try {
      await pool.query("TRUNCATE TABLE projects CASCADE");

      const projects = [
        { title: "Portfolio Website", tech: "React + Node.js", status: "Active" },
        { title: "E-commerce Platform", tech: "Node.js + PostgreSQL", status: "In Progress" },
        { title: "Mobile App", tech: "React Native", status: "Draft" },
        { title: "Dashboard Analytics", tech: "Vue.js + Chart.js", status: "Completed" },
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

// ===== API DOMAIN MOUNTING =====
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/messages", messageRoutes);
router.use("/settings", settingRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
