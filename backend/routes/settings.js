import express from "express";
import * as settingController from "../controllers/settingController.js";
import { requireAuth } from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

const router = express.Router();

// Public route to get portfolio settings
router.get("/", asyncHandler(settingController.getSettings));

// Protected route to update portfolio settings (Admin Only)
router.put("/", requireAuth, asyncHandler(settingController.updateSettings));

export default router;
