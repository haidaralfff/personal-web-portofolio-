/**
 * Utility untuk consistent API response format
 */

export const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

export const sendError = (res, message = "Error", statusCode = 500, data = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

// Shorthand methods
export const okResponse = (res, data, message = "Success") => sendSuccess(res, data, message, 200);
export const createdResponse = (res, data, message = "Created") => sendSuccess(res, data, message, 201);
export const badRequest = (res, message = "Bad Request") => sendError(res, message, 400);
export const unauthorized = (res, message = "Unauthorized") => sendError(res, message, 401);
export const forbidden = (res, message = "Forbidden") => sendError(res, message, 403);
export const notFound = (res, message = "Not Found") => sendError(res, message, 404);
export const serverError = (res, message = "Internal Server Error") => sendError(res, message, 500);
