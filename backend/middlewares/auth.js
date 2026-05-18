/**
 * Authentication middleware untuk melindungi endpoints menggunakan JWT
 */

import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errorHandler.js";

/**
 * Middleware untuk check apakah user sudah login dengan JWT token
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Anda harus login terlebih dahulu");
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "dev_secret_key_change_in_production";
    const decoded = jwt.verify(token, secret);
    
    // Set user info di request untuk digunakan di controller
    req.userId = decoded.userId;
    req.username = decoded.username;
    
    next();
  } catch (error) {
    throw new UnauthorizedError("Token tidak valid atau telah kadaluwarsa");
  }
};

/**
 * Optional auth middleware - allow akses dengan atau tanpa auth
 */
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const secret = process.env.JWT_SECRET || "dev_secret_key_change_in_production";
      const decoded = jwt.verify(token, secret);
      
      req.userId = decoded.userId;
      req.username = decoded.username;
    } catch (error) {
      // Abaikan error jika optional auth gagal
    }
  }
  
  next();
};

/**
 * Rate limiting middleware untuk prevent abuse
 */
export const createRateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = Date.now();
    const userRequests = requests.get(ip) || [];

    // Clean up old requests
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: "Terlalu banyak requests. Coba lagi nanti.",
        retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
      });
    }

    recentRequests.push(now);
    requests.set(ip, recentRequests);

    next();
  };
};
