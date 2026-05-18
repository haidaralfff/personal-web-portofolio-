import express from "express";
import * as projectController from "../controllers/projectController.js";
import { validateProject, validateProjectId } from "../middlewares/validation.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

const router = express.Router();

// Public routes
router.get("/", asyncHandler(projectController.getAllProjects));
router.get("/stats", asyncHandler(projectController.getProjectStats));
router.get("/:id", asyncHandler(validateProjectId), asyncHandler(projectController.getProjectById));

// Protected routes (dalam development, semua bisa akses, tapi structure sudah siap untuk auth)
router.post("/", asyncHandler(validateProject), asyncHandler(projectController.createProject));
router.put("/:id", asyncHandler(validateProjectId), asyncHandler(validateProject), asyncHandler(projectController.updateProject));
router.delete("/:id", asyncHandler(validateProjectId), asyncHandler(projectController.deleteProject));

export default router;

