# 🏗️ Backend Architecture & Best Practices

## 📁 Folder Structure (Refactored)

```
backend/
├── controllers/              # Business logic untuk setiap feature
│   ├── authController.js     # Authentication logic
│   └── projectController.js  # Project CRUD logic
│
├── routes/                   # API route definitions
│   ├── auth.js              # Auth endpoints (refactored dengan controller)
│   └── projects.js          # Project endpoints (refactored dengan controller)
│
├── middlewares/             # Express middlewares
│   ├── errorHandler.js      # Error handling & async wrapper
│   └── validation.js        # Request validation
│
├── utils/                   # Helper utilities
│   ├── response.js          # Consistent API response format
│   └── errorHandler.js      # Custom error classes
│
├── db.js                    # Database connection
├── index.js                 # Main server file
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
└── schema.sql              # Database schema
```

---

## 🎯 Key Improvements

### 1. **Separation of Concerns**
- ✅ Routes hanya define route paths
- ✅ Controllers handle business logic
- ✅ Middlewares handle validation & error handling
- ✅ Utils untuk reusable functions

### 2. **Consistent Response Format**

**Success Response:**
```json
{
  "success": true,
  "message": "Projects berhasil diambil",
  "data": [...],
  "timestamp": "2026-02-27T10:00:00.000Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Username atau password salah",
  "data": null,
  "timestamp": "2026-02-27T10:00:00.000Z"
}
```

### 3. **Custom Error Classes**

```javascript
// Standardized error handling
throw new ValidationError("Username minimal 3 karakter");
throw new UnauthorizedError("Username atau password salah");
throw new NotFoundError("Project tidak ditemukan");
throw new ConflictError("Username sudah digunakan");
throw new DatabaseError("Database connection failed");
```

### 4. **Async Error Handling**

**Before (Hard Code Error Handling):**
```javascript
router.post("/login", async (req, res) => {
  try {
    // logic
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**After (Clean & DRY):**
```javascript
router.post("/login", 
  asyncHandler(validateLogin), 
  asyncHandler(authController.login)
);
```

### 5. **Input Validation**

```javascript
// Middleware validation
router.post("/", 
  asyncHandler(validateProject),  // Auto-validate request body
  asyncHandler(projectController.createProject)
);
```

---

## 📋 Design Patterns Used

### 1. **MVC-like Pattern**
- **Model**: Database queries
- **View**: API Responses (JSON)
- **Controller**: Business logic

### 2. **Middleware Chain Pattern**
```
Request → Validation → Business Logic → Response
```

### 3. **Error Handling Pattern**
```
Sync Error → Custom Error Class → Error Middleware → Error Response
```

### 4. **DRY (Don't Repeat Yourself)**
- Response formatting: `response.js`
- Error handling: `errorHandler.js`
- Validation: `validation.js`
- All reusable & centralized

---

## 🔧 How to Extend / Refactor

### Add New Endpoint

**1. Create Controller:**
```javascript
// controllers/userController.js
export const getUserProfile = async (req, res, next) => {
  try {
    // Logic here
    okResponse(res, data, "User profile retrieved");
  } catch (error) {
    next(error);
  }
};
```

**2. Create Route:**
```javascript
// routes/user.js
import { asyncHandler } from "../middlewares/errorHandler.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();
router.get("/profile/:id", asyncHandler(userController.getUserProfile));
export default router;
```

**3. Import in index.js:**
```javascript
import userRoutes from "./routes/user.js";
app.use("/api/users", userRoutes);
```

### Add New Validation

```javascript
// middlewares/validation.js
export const validateUser = (req, res, next) => {
  const { email, name } = req.body;
  
  if (!email || !name) {
    throw new ValidationError("Email dan name diperlukan");
  }
  
  next();
};

// routes/user.js
router.post("/", asyncHandler(validateUser), asyncHandler(userController.createUser));
```

---

## 🌱 Environment Setup

### Development

```bash
# Jalankan dengan watch mode
npm run dev

# Includes /api/seed endpoint untuk testing
```

### Production

```bash
# Jalankan tanpa watch mode
npm start

# /api/seed endpoint tidak available
```

---

## 🧪 Testing Checklist

- [ ] Backend running tanpa error
- [ ] All endpoints return proper format
- [ ] Validation works correctly
- [ ] Error handling works properly
- [ ] Database queries return correct data
- [ ] CORS working (frontend bisa access)
- [ ] No hard-coded values dalam routes/controllers

---

## 🚀 Next Steps / Improvements

### High Priority
- [ ] Add JWT authentication (token-based)
- [ ] Add request logging middleware
- [ ] Add rate limiting
- [ ] Hash passwords dengan bcrypt
- [ ] Add API documentation (Swagger/OpenAPI)

### Medium Priority
- [ ] Add database migrations (e.g., Knex.js)
- [ ] Add input sanitization
- [ ] Add request caching
- [ ] Add pagination untuk GET endpoints
- [ ] Add search & filters

### Low Priority
- [ ] Add API versioning (/api/v1/...)
- [ ] Add webhook support
- [ ] Add batch operations
- [ ] Add audit logging

---

## 💡 Best Practices Implemented

✅ **DRY**: No code duplication
✅ **SOLID**: Single responsibility per file/function
✅ **Error Handling**: Centralized & consistent
✅ **Validation**: Centralized input validation
✅ **Response Format**: Consistent across all endpoints
✅ **Async/Await**: Clean async handling without nested .catch()
✅ **Environment Config**: Using .env for configuration
✅ **Project Structure**: Logical folder organization
✅ **Error Messages**: User-friendly & helpful
✅ **HTTP Status Codes**: Proper status codes per situation

---

## 📝 Notes

- Kode sekarang **mudah di-refactor** tanpa affecting other parts
- Setiap layer punya responsibility yang jelas
- Adding new features = just add new controller + route
- Maintenance jadi lebih mudah dengan structure yang clear
- Easy to test karena logic terpisah

**Result**: Production-ready backend yang scalable! 🚀
