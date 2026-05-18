import express from "express";
import * as analyticsController from "../controllers/analyticsController.js";
import { requireAuth } from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

const router = express.Router();

// Public route to log visitor page view from frontend React Router
router.post("/view", asyncHandler(analyticsController.recordPageView));

// Protected route to fetch analytics dashboard data (Admin Only)
router.get("/stats", requireAuth, asyncHandler(analyticsController.getAnalyticsStats));

export default router;
