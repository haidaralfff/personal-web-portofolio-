/**
 * Middleware untuk validasi request
 */

import { ValidationError } from "../utils/errorHandler.js";

export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ValidationError("Username dan password diperlukan");
  }

  if (username.trim().length < 3) {
    throw new ValidationError("Username minimal 3 karakter");
  }

  if (password.length < 3) {
    throw new ValidationError("Password minimal 3 karakter");
  }

  next();
};

export const validateProject = (req, res, next) => {
  const { title, tech, status } = req.body;

  if (!title || !tech || !status) {
    throw new ValidationError("Title, tech, dan status diperlukan");
  }

  if (title.trim().length < 3) {
    throw new ValidationError("Title minimal 3 karakter");
  }

  if (tech.trim().length < 2) {
    throw new ValidationError("Tech minimal 2 karakter");
  }

  const validStatus = ["Active", "Draft", "In Progress", "Completed"];
  if (!validStatus.includes(status)) {
    throw new ValidationError(`Status harus salah satu dari: ${validStatus.join(", ")}`);
  }

  next();
};

export const validateProjectId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new ValidationError("Project ID harus berupa angka yang valid");
  }

  next();
};
