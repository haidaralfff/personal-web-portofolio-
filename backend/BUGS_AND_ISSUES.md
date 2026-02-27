# Backend Bugs & Issues - TODO List

## 🔴 **CRITICAL - High Priority**

### 1. **Password Security - No Hashing**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Passwords disimpan sebagai plain text di database
- **Impact:** CRITICAL SECURITY RISK
- **Solution:** 
  - Install `bcryptjs`: `npm install bcryptjs`
  - Hash password saat register
  - Compare hash saat login
- **Files to Update:**
  - `backend/controllers/authController.js`
  - `backend/routes/auth.js`
- **Priority:** IMMEDIATELY

```javascript
// Example - authController.js
import bcrypt from 'bcryptjs';

// saat register
const hashedPassword = await bcrypt.hash(password, 10);

// saat login
const isValidPassword = await bcrypt.compare(password, hashedPassword);
```

---

### 2. **No JWT Authentication**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Menggunakan session/localStorage tanpa token validation
- **Impact:** Tidak aman untuk production
- **Solution:**
  - Install `jsonwebtoken`: `npm install jsonwebtoken`
  - Buat JWT middleware
  - Return JWT token saat login
  - Validate token di routes yang protected
- **Files to Create:**
  - `backend/middlewares/auth.js` (JWT verification)
- **Priority:** HIGH

```javascript
// Middleware example
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new UnauthorizedError('Token not found');
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
```

---

### 3. **Image Storage - Base64 in Database**
- **Status:** ❌ NOT OPTIMIZED
- **Issue:** Images disimpan sebagai base64 string di TEXT column
- **Problems:**
  - Database jadi sangat besar dengan banyak images
  - Query performance jadi lambat
  - Sulit untuk image processing/optimization
- **Solution:** Gunakan cloud storage
  - AWS S3
  - Cloudinary
  - Firebase Storage
  - atau upload ke `/public/uploads/` folder + simpan path di database
- **Priority:** HIGH
- **Effort:** Medium

---

## 🟡 **MEDIUM Priority**

### 4. **No Protected Routes for Projects**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Siapa saja bisa create/delete/update projects tanpa authentication
- **Files to Update:**
  - `backend/routes/projects.js` - tambah auth middleware
- **Solution:**
```javascript
// projects.js
router.post("/", authMiddleware, validateProject, createProject);
router.put("/:id", authMiddleware, validateProjectId, updateProject);
router.delete("/:id", authMiddleware, validateProjectId, deleteProject);
```
- **Priority:** MEDIUM

---

### 5. **Missing Edit Project in Dashboard**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Dashboard punya edit button tapi functionality belum ada
- **Files to Update:**
  - `src/pages/dashboard/DashboardProject.jsx` - tambah edit modal
  - Backend `/api/projects/:id` PUT endpoint sudah ada
- **Priority:** MEDIUM

---

### 6. **No Input Validation - Tech Stack**
- **Status:** ⚠️ BASIC ONLY
- **Issue:** `tech` field hanya check panjang, tidak ada format validation
- **Examples Not Handled:**
  - SQL injection di field `title` atau `tech`
  - Special characters
  - XSS attempts (meski React escape, tapi lebih baik prevent di backend)
- **Solution:** 
  - Tambah schema validation (e.g., joi, zod)
  - Sanitize inputs
  - Whitelist allowed characters
- **Priority:** MEDIUM

---

### 7. **Logout Endpoint Tidak Functional**
- **Status:** ⚠️ CREATED BUT USELESS
- **Issue:** POST `/api/auth/logout` tidak melakukan apapun
- **Detail:** Dengan JWT token, tidak perlu backend logout (kill di frontend saja)
- **Fix:**
  - Hapus endpoint ini jika menggunakan client-side logout
  - Atau implementasi token blacklist jika ingin server-side logout
- **Priority:** LOW (nice to have)

---

## 🔵 **LOW Priority - Nice to Have**

### 8. **No Pagination for Projects**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** GET `/api/projects` return semua projects tanpa pagination
- **Problem:** Jika ada 1000+ projects, response jadi besar
- **Solution:**
```javascript
// Query param: ?page=1&limit=10
const limit = parseInt(req.query.limit) || 10;
const offset = (parseInt(req.query.page) - 1) * limit;

const result = await pool.query(
  'SELECT * FROM projects LIMIT $1 OFFSET $2',
  [limit, offset]
);
```
- **Priority:** LOW (needed when data grows)

---

### 9. **No Search/Filter Projects**
- **Status:** ❌ NOT IMPLEMENTED
- **Example:**
  - GET `/api/projects?search=react` - search by title/tech
  - GET `/api/projects?status=Active` - filter by status
- **Impact:** UX improvement
- **Priority:** LOW

---

### 10. **No Rate Limiting**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Tidak ada protection dari brute force attacks
- **Solution:** Install `express-rate-limit`
```javascript
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Terlalu banyak attempt login, coba lagi nanti'
});

router.post('/login', authLimiter, login);
```
- **Priority:** LOW (add before production)

---

### 11. **No Logging System**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Tidak ada way untuk track API calls, errors, user actions
- **Solution:** Install `morgan` + `winston`
- **Priority:** LOW (useful for debugging)

---

### 12. **No User Profile/Info Endpoint**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Tidak ada GET `/api/auth/me` untuk get current user info
- **Priority:** LOW

---

## 📋 **Environment & Config Issues**

### 13. **Hardcoded CORS Origins**
- **Status:** ⚠️ PARTIALLY FIXED
- **Issue:** Origins di-hardcode di `index.js`
- **File:** `backend/index.js` line 16-18
- **Fix:** Move to `.env` file:
```javascript
// .env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

// index.js
app.use(cors({
  origin: process.env.CORS_ORIGINS.split(','),
  credentials: true,
}));
```
- **Priority:** MEDIUM

---

### 14. **No Environment Variable Validation**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Tidak ada validation saat startup jika env var missing
- **Solution:** Buat `backend/config/env.js` untuk validate env vars
- **Priority:** LOW

---

## 🧪 **Testing & Documentation**

### 15. **No Unit Tests**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Tidak ada test untuk controller/middleware
- **Tool:** Jest + Supertest
- **Priority:** LOW (but important for production)

---

### 16. **No API Documentation**
- **Status:** ⚠️ PARTIALLY (ada ARCHITECTURE.md)
- **Missing:** Swagger/OpenAPI docs
- **Tool:** `swagger-jsdoc` + `swagger-ui-express`
- **Priority:** LOW (nice to have)

---

## 📊 **Database Issues**

### 17. **No Database Migrations**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** Schema changes dilakukan manual di PostgreSQL
- **Solution:** 
  - Install `node-pg-migrate`
  - Create migration files untuk schema changes
- **Priority:** MEDIUM (important as app grows)

---

### 18. **No Data Validation at Database Level**
- **Status:** ❌ NOT IMPLEMENTED
- **Issue:** No constraints seperti UNIQUE, NOT NULL, CHECK di table
- **Example:**
```sql
-- User table improvements
ALTER TABLE users ADD CONSTRAINT users_username_unique UNIQUE(username);
ALTER TABLE users ADD CONSTRAINT users_username_not_empty CHECK (username != '');

-- Projects table improvements
ALTER TABLE projects ADD CONSTRAINT projects_title_not_empty CHECK (title != '');
```
- **Priority:** MEDIUM

---

## ✅ **COMPLETED**

- ✅ CORS configuration fixed
- ✅ Payload limit increased for images (50MB)
- ✅ Database connection working
- ✅ Basic error handling middleware
- ✅ Request validation middleware
- ✅ Image field added to projects table

---

## 🚀 **Recommended Fix Order (for Production)**

1. **IMMEDIATELY:**
   - [ ] Implement password hashing (bcryptjs)
   - [ ] Implement JWT authentication

2. **BEFORE DEPLOYMENT:**
   - [ ] Image storage optimization (move to cloud)
   - [ ] Add auth middleware to protected routes
   - [ ] Move CORS config to .env
   - [ ] Add database constraints

3. **AFTER DEPLOYMENT:**
   - [ ] Add rate limiting
   - [ ] Add API documentation (Swagger)
   - [ ] Add logging system
   - [ ] Add unit tests
   - [ ] Setup database migrations
   - [ ] Add search/filter functionality

---

## 📝 **Notes**

- Backend API is functional for MVP
- CORS issue resolved ✅
- Image upload working (but needs optimization)
- Ready for feature improvements and security hardening
- Recommend review security before production deployment

---

**Last Updated:** February 27, 2026
**Status:** Development Phase
**Next Review:** After implementing password hashing & JWT
