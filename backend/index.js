// Entry point backend Express.js - Decoupled & Optimized
import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/index.js";
import { securityHeaders, corsMiddleware } from "./middlewares/security.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { createRateLimiter } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV || "development";

// ===== 1. SECURITY & POLICY LAYER =====
app.use(securityHeaders);
app.use(corsMiddleware);

// ===== 2. GLOBAL RATE LIMITER (100 reqs / 15 mins) =====
const apiLimiter = createRateLimiter(100, 15 * 60 * 1000);
app.use("/api/", apiLimiter);

// ===== 3. BODY PARSERS =====
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ===== 4. REQUEST LOGGER (DEV ONLY) =====
if (NODE_ENV === "development") {
  app.use((req, res, next) => {
    const timeStart = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - timeStart;
      console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    next();
  });
}

// ===== 5. CENTRALIZED API ROUTING =====
app.use("/api", apiRoutes);

// ===== 6. GLOBAL ERROR HANDLING =====
app.use(notFoundHandler);
app.use(errorHandler);

// ===== 7. SERVER INITIALIZATION =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 DailyPorto API Server is live!`);
  console.log(`⚙️  Environment : ${NODE_ENV}`);
  console.log(`🔗 Access Link  : http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check : http://localhost:${PORT}/api/health\n`);
});
