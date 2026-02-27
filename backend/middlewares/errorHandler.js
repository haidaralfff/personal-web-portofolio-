/**
 * Middleware untuk handle errors di Express
 */

import { sendError } from "../utils/response.js";
import { AppError } from "../utils/errorHandler.js";

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Set error defaults
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Log error untuk debugging
  console.error("[ERROR]", {
    name: err.name,
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
  });

  // Handle specific errors
  if (err.code === "23505") {
    // PostgreSQL unique constraint violation
    return sendError(res, "Username already exists", 409);
  }

  if (err.isOperational) {
    // Operational errors (errors yang kita throw)
    return sendError(res, err.message, err.statusCode);
  }

  // Programming/unknown error
  return sendError(res, "Something went wrong", 500);
};

// Async error wrapper untuk catch errors di async functions
export const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

// 404 handler
export const notFoundHandler = (req, res) => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
};
