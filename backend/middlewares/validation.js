/**
 * Middleware untuk validasi request dan sanitization
 */

import { ValidationError } from "../utils/errorHandler.js";

// Utility functions untuk sanitasi input
const sanitize = (str) => {
  if (typeof str !== "string") return str;
  return str
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets untuk XSS protection
    .slice(0, 500); // Limit panjang string
};

const validateString = (value, fieldName, minLength = 1, maxLength = 255) => {
  if (!value || typeof value !== "string") {
    throw new ValidationError(`${fieldName} harus berupa string`);
  }

  const sanitized = sanitize(value);

  if (sanitized.length < minLength) {
    throw new ValidationError(`${fieldName} minimal ${minLength} karakter`);
  }

  if (sanitized.length > maxLength) {
    throw new ValidationError(`${fieldName} maksimal ${maxLength} karakter`);
  }

  return sanitized;
};

export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ValidationError("Username dan password diperlukan");
  }

  const validatedUsername = validateString(username, "Username", 3, 100);
  const validatedPassword = validateString(password, "Password", 3, 255);

  if (!/^[a-zA-Z0-9_]+$/.test(validatedUsername)) {
    throw new ValidationError("Username hanya boleh mengandung huruf, angka, dan underscore");
  }

  // Sanitize body untuk digunakan di controller
  req.body.username = validatedUsername;
  req.body.password = validatedPassword;

  next();
};

export const validateProject = (req, res, next) => {
  const { title, tech, status } = req.body;

  // Validate required fields
  if (!title || !tech) {
    throw new ValidationError("Title dan tech diperlukan");
  }

  // Validate dan sanitasi strings
  const validatedTitle = validateString(title, "Title", 3, 255);
  const validatedTech = validateString(tech, "Tech", 2, 255);

  // Validate status - set default ke Draft jika tidak ada
  const validStatus = ["Active", "Draft", "In Progress", "Completed"];
  const finalStatus = status && validStatus.includes(status) ? status : "Draft";

  // Sanitasi image jika ada
  let finalImage = null;
  if (req.body.image) {
    if (typeof req.body.image !== "string") {
      throw new ValidationError("Image harus berupa string");
    }
    // Limit base64 image size (5MB)
    if (req.body.image.length > 5 * 1024 * 1024) {
      throw new ValidationError("Ukuran image maksimal 5MB");
    }
    finalImage = req.body.image;
  }

  // Update body dengan validated values
  req.body.title = validatedTitle;
  req.body.tech = validatedTech;
  req.body.status = finalStatus;
  req.body.image = finalImage;

  next();
};

export const validateProjectId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    throw new ValidationError("Project ID harus berupa angka positif yang valid");
  }

  // Convert string to number
  req.params.id = Number(id);

  next();
};
