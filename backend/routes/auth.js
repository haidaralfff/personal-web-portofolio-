import express from "express";
import * as authController from "../controllers/authController.js";
import { validateLogin } from "../middlewares/validation.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

const router = express.Router();

// Routes
router.post("/login", asyncHandler(validateLogin), asyncHandler(authController.login));
router.post("/register", asyncHandler(validateLogin), asyncHandler(authController.register));
router.post("/logout", asyncHandler(authController.logout));

export default router;
