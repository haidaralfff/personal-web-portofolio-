import express from "express";
import * as messageController from "../controllers/messageController.js";
import { requireAuth } from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

const router = express.Router();

// Public route to submit messages from contact form
router.post("/", asyncHandler(messageController.createMessage));

// Protected routes (Admin Only)
router.get("/", requireAuth, asyncHandler(messageController.getAllMessages));
router.patch("/:id/read", requireAuth, asyncHandler(messageController.toggleMessageReadStatus));
router.delete("/:id", requireAuth, asyncHandler(messageController.deleteMessage));

export default router;
