# SETUP Project Backend

Backend untuk aplikasi Dashboard Project menggunakan Express.js dan PostgreSQL.

## Setup PostgreSQL Database

### 1. Install PostgreSQL
Jika belum install, download dari: https://www.postgresql.org/download/

### 2. Buat Database
Buka PostgreSQL Shell atau pgAdmin, kemudian jalankan:

```sql
CREATE DATABASE dailyporto;
```

### 3. Jalankan Schema SQL
Buka database yang sudah dibuat, lalu jalankan file `schema.sql`:

```sql
\c dailyporto;
\i schema.sql
```

Atau copy-paste isi schema.sql langsung ke SQL Editor.

### 4. Setup Environment Variables
Salin `.env.example` menjadi `.env` dan sesuaikan dengan konfigurasi PostgreSQL Anda:

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/dailyporto
PORT=4000
```

**Atau gunakan konfigurasi manual:**
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=dailyporto
DB_PASS=password
DB_PORT=5432
```

## Installation & Running

### Install Dependencies
```bash
npm install
```

### Start Server
```bash
npm start
```

Server akan berjalan di `http://localhost:4000`

## API Endpoints

### Test Connection
```
GET /api/test
```

### Authentication
```
POST /api/auth/login
Body: { "username": "admin", "password": "admin" }

POST /api/auth/register
Body: { "username": "newuser", "password": "password123" }
```

### Projects (CRUD)
```
GET /api/projects                 # Get all projects
GET /api/projects/:id             # Get project by ID
POST /api/projects                # Create project
PUT /api/projects/:id             # Update project
DELETE /api/projects/:id          # Delete project
```

### Project Request/Response Format
```json
{
  "title": "Portfolio Web",
  "tech": "React",
  "status": "Active"
}
```

## Database Schema

### users table
```sql
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
