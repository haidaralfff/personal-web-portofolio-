# 🚀 Setup Backend & Database PostgreSQL

## 📋 Checklist Setup

- [ ] Install PostgreSQL
- [ ] Buat Database & User
- [ ] Jalankan Schema SQL
- [ ] Setup Environment Variables
- [ ] Install Dependencies Backend
- [ ] Jalankan Backend Server
- [ ] Test API Endpoints

---

## 1️⃣ Install PostgreSQL

### Windows
1. Download dari: https://www.postgresql.org/download/windows/
2. Run installer dan ikuti langkah-langkahnya
3. Set password untuk user `postgres` (jangan lupa!)
4. Port default: 5432

### macOS
```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

---

## 2️⃣ Buat Database & User

### Buka PostgreSQL Shell
```bash
# Windows (Command Prompt)
psql -U postgres

# macOS/Linux
psql -U postgres
```

### Jalankan Commands
```sql
-- Buat database
CREATE DATABASE dailyporto;

-- Buat user (opsional, gunakan postgres jika mau simple)
CREATE USER dailyporto_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE dailyporto TO dailyporto_user;

-- Verifikasi
\l
```

---

## 3️⃣ Jalankan Schema SQL

### Di dalam psql
```sql
-- Pilih database
\c dailyporto;

-- Jalankan schema file
\i 'C:/Users/haida/CODE/dailyporto/dailyportoaing/backend/schema.sql'

-- Verifikasi tabel
\dt
```

### Atau Manual Copy-Paste
Buka `schema.sql`, copy semua isinya, paste ke SQL Editor:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tech VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);
```

---

## 4️⃣ Setup Environment Variables

### 1. Duplikat `.env.example` menjadi `.env`
```bash
cd backend
cp .env.example .env
```

### 2. Edit file `.env`

**Opsi A: Gunakan CONNECTION STRING (Recommended)**
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/dailyporto
PORT=4000
NODE_ENV=development
```

**Opsi B: Gunakan Konfigurasi Manual**
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=dailyporto
DB_PASS=password
DB_PORT=5432
PORT=4000
NODE_ENV=development
```

> 💡 **Note:** Ganti `password` dengan password yang Anda set saat install PostgreSQL

---

## 5️⃣ Install Dependencies Backend

```bash
cd backend
npm install
```

Packages yang akan diinstall:
- ✅ `express` - Web framework
- ✅ `pg` - PostgreSQL client
- ✅ `cors` - Cross-origin requests
- ✅ `dotenv` - Environment variables

---

## 6️⃣ Jalankan Backend Server

### Development Mode (recommended)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Output yang diharapkan:
```
✅ Server running on port 4000
📝 API Test: http://localhost:4000/api/test
📚 Routes:
   - POST /api/auth/login
   - POST /api/auth/register
   - GET /api/projects
   - POST /api/projects
   - PUT /api/projects/:id
   - DELETE /api/projects/:id
```

---

## 7️⃣ Test API Endpoints

### Test Database Connection
```bash
curl http://localhost:4000/api/test
```

### Test Register User
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

### Test Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

### Test Get All Projects
```bash
curl http://localhost:4000/api/projects
```

### Test Create Project
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","tech":"Node.js","status":"Active"}'
```

---

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL service belum running
- **Windows:** Buka Services (services.msc), start `postgresql-x64-15`
- **macOS:** `brew services start postgresql`
- **Linux:** `sudo service postgresql start`

### Error: "role "postgres" does not exist"
- Gunakan user yang correct saat login psql

### Error: "database "dailyporto" does not exist"
- Pastikan sudah run `CREATE DATABASE dailyporto;`

### Error: "password authentication failed"
- Check password di `.env` sudah sesuai

### CORS Error di Frontend
- Backend sudah setup CORS, tapi pastikan `.env` PORT sesuai

---

## 📚 File Structure Backend

```
backend/
├── index.js                 # Main server file
├── db.js                    # Database connection
├── schema.sql              # Database schema
├── package.json            # Dependencies
├── .env                    # Environment variables (JANGAN di-commit)
├── .env.example            # Template .env
├── .gitignore              # Ignore files
├── README.md               # Backend documentation
└── routes/
    ├── auth.js             # Authentication routes
    └── projects.js         # Project CRUD routes
```

---

## 🔐 Security Notes (Future Improvements)

- [ ] Hash password dengan `bcrypt`
- [ ] Implement JWT tokens
- [ ] Add request validation middleware
- [ ] Add authentication middleware
- [ ] Rate limiting
- [ ] Input sanitization

---

## ✅ Next Steps

Setelah backend running:
1. Integrasi API frontend dengan backend
2. Replace dummy login dengan real API call
3. Update dashboard untuk fetch dari API
4. Add error handling di frontend

