import cors from "cors";

const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Middleware untuk memasang berbagai security headers
 */
export const securityHeaders = (req, res, next) => {
  // Cegah XSS dan Clickjacking
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  
  // Transport Security & Referrer Policies
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  next();
};

/**
 * Konfigurasi CORS Middleware
 */
const allowedOrigins = (NODE_ENV === "production") 
  ? [process.env.FRONTEND_URL || "http://localhost:5173"]
  : ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400 // 24 jam cache preflight
});
