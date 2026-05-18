# Backend Dashboard Project API

Backend untuk aplikasi Portfolio Dashboard menggunakan Express.js, Node.js, dan PostgreSQL.

**Status**: ✅ Production-ready (with security & maintainability improvements)

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Setup PostgreSQL Database](#setup-postgresql-database)
- [API Endpoints](#api-endpoints)
- [Security Features](#-security-features)
- [Code Quality & Maintainability](#-code-quality--maintainability)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup .env file
cp .env.example .env
# Edit .env dengan database credentials Anda

# 3. Run database schema
psql -U postgres -d dailyporto -f schema.sql

# 4. Start development server
npm run dev

# 5. Seed database with dummy data (development only)
curl -X POST http://localhost:3001/api/seed
```

---

## Setup PostgreSQL Database

### 1. Install PostgreSQL
Jika belum install: https://www.postgresql.org/download/

### 2. Create Database
```bash
psql -U postgres -c "CREATE DATABASE dailyporto;"
```

### 3. Run Schema SQL
```bash
psql -U postgres -d dailyporto -f schema.sql
```

**Atau gunakan pgAdmin GUI:**
- Buat database baru: `dailyporto`
- Query editor → Execute `schema.sql`

### 4. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/dailyporto
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 📚 API Endpoints

### Health Check
```http
GET /api/health
GET /api/test
```

### Projects Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/api/projects` | List all projects | `status`, `limit`, `offset` |
| `GET` | `/api/projects/:id` | Get project details | - |
| `GET` | `/api/projects/stats` | Get project statistics | - |
| `POST` | `/api/projects` | Create new project | - |
| `PUT` | `/api/projects/:id` | Update project | - |
| `DELETE` | `/api/projects/:id` | Delete project | - |

### Request/Response Format

**Create/Update Project:**
```json
{
  "title": "E-commerce Platform",
  "tech": "Node.js + React",
  "status": "Active",
  "image": "base64_string_or_image_url"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project berhasil dibuat",
  "data": {
    "id": 1,
    "title": "E-commerce Platform",
    "tech": "Node.js + React",
    "status": "Active",
    "image_url": null,
    "created_at": "2024-03-13T10:30:00Z",
    "updated_at": "2024-03-13T10:30:00Z"
  },
  "timestamp": "2024-03-13T10:30:00Z"
}
```

---

## 🔐 Security Features

### ✅ Implemented Security Measures

1. **Input Validation & Sanitization**
   - Strict string validation dengan `.trim()`
   - XSS protection - remove angle brackets
   - Type checking untuk semua inputs
   - File size limits (image max 5MB)

2. **Database Security**
   - Parameterized queries (SQL injection prevention)
   - UNIQUE constraints untuk title
   - CHECK constraints untuk status validation
   - Automatic timestamps (created_at, updated_at)

3. **HTTP Security Headers**
   - `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
   - `X-Frame-Options: DENY` - Prevent clickjacking
   - `X-XSS-Protection` - Browser XSS filter
   - `Strict-Transport-Security` - Force HTTPS
   - `Content-Security-Policy` - Restrict resource loading

4. **CORS Protection**
   - Whitelist frontend URLs
   - Restrict headers dan methods
   - 24-hour max age untuk preflight cache

5. **Rate Limiting**
   - 100 requests per 15 minutes per IP
   - Prevent brute force attacks
   - Return 429 status jika exceeded

6. **Error Handling**
   - No sensitive info exposed
   - Structured error responses
   - Proper HTTP status codes
   - Stack traces hanya di development

---

## 🛠️ Code Quality & Maintainability

### ✅ Best Practices Implemented

1. **Modular Architecture**
   ```
   controllers/     - Business logic
   routes/          - API endpoints
   middlewares/     - Request processing
   utils/           - Shared utilities
   ```

2. **Consistent Error Handling**
   - Custom error classes (ValidationError, NotFoundError, etc.)
   - Async error wrapper (asyncHandler)
   - Centralized error middleware

3. **Input Validation**
   - Dedicated validation middleware
   - Type-safe validation functions
   - Clear error messages

4. **Database Timestamps**
   - Automatic `created_at` dan `updated_at`
   - Database-level defaults (CURRENT_TIMESTAMP)
   - Easy audit trails

5. **Pagination Support**
   - Limit & offset parameters
   - Total count metadata
   - Has-more indicator untuk infinite scroll

6. **Statistics Endpoint**
   - `GET /api/projects/stats`
   - Count projects by status
   - Perfect untuk dashboard widgets

---

## 💻 Environment Configuration

Create `.env` file dengan template dari `.env.example`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/dailyporto

# Server
PORT=3001
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# Security
JWT_SECRET=your_secret_key_here
SESSION_SECRET=your_session_secret

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

### Production Environment
Untuk production, gunakan:
```env
NODE_ENV=production
DATABASE_URL=postgresql://prod_user:prod_password@prod_host:5432/dailyporto_prod
FRONTEND_URL=https://yourportfolio.com
JWT_SECRET=<generate_strong_secret>
```

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Get All Projects
```bash
curl http://localhost:3001/api/projects
```

### Get Project Stats
```bash
curl http://localhost:3001/api/projects/stats
```

### Create Project
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Project",
    "tech": "React + Express",
    "status": "Active"
  }'
```

---

## 📝 Database Schema

### projects table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  tech VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_status CHECK (status IN ('Active', 'Draft', 'In Progress', 'Completed'))
);
```

### users table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
- Pastikan PostgreSQL running: `pg_ctl status`
- Check DATABASE_URL di `.env`
- Verify username & password

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution:**
```bash
# Kill process on port 3001
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Atau gunakan port lain
PORT=3002 npm run dev
```

### Schema Already Exists
```
Error: relation "projects" already exists
```
**Solution:**
```bash
psql -U postgres -d dailyporto -c "DROP TABLE IF EXISTS projects CASCADE;"
psql -U postgres -d dailyporto -f schema.sql
```

---

## 📦 Dependencies

- **express** - Web framework
- **cors** - CORS middleware
- **pg** - PostgreSQL client
- **dotenv** - Environment variables
- **nodemon** - Auto-restart (dev)

Install dengan: `npm install`

---

## 🚀 Production Deployment Checklist

- [ ] Use strong `JWT_SECRET` (generate dengan `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Set `NODE_ENV=production`
- [ ] Update `FRONTEND_URL` ke domain production
- [ ] Configure database connection ke production database
- [ ] Enable HTTPS (use reverse proxy seperti nginx)
- [ ] Setup rate limiting properly
- [ ] Configure logging service
- [ ] Setup error tracking (Sentry, etc.)
- [ ] Regular database backups
- [ ] Monitor server performance

---

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [OWASP Security Guidelines](https://owasp.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### projects table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tech VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);
```

## Notes
- Password belum di-hash (gunakan bcrypt untuk production)
- Belum ada JWT authentication (akan ditambahkan)
- CORS sudah enabled untuk semua origin
-fix API
-DATA BELUM MASUK KE DB 
- DOCS POSTMAN
- END POINT MASIH AMBURADUL

--- masi mengumpulkan niat buat progres---
