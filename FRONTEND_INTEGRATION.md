# 🔗 Frontend-Backend Integration Guide

## ✅ Integrasi Selesai!

Frontend sudah terintegrasi dengan Backend API. Berikut yang sudah diimplementasikan:

---

## 📁 Files yang Dibuat/Diubah

### 1. **`src/services/api.js`** (NEW)
File centralized untuk semua API calls.

**Services yang tersedia:**
- `authService.login(username, password)` - Login user
- `authService.register(username, password)` - Register user
- `projectService.getAll()` - Fetch semua projects
- `projectService.create(title, tech, status)` - Buat project baru
- `projectService.update(id, title, tech, status)` - Update project
- `projectService.delete(id)` - Hapus project
- `storageService.setUser(user)` - Simpan user ke localStorage
- `storageService.getUser()` - Ambil user dari localStorage
- `storageService.clearUser()` - Hapus user dari localStorage

### 2. **`src/components/layouts/Navbar.jsx`** (UPDATED)
✅ Login form sekarang call API backend
✅ User data disimpan di localStorage
✅ Persistent login (user tetap login setelah refresh)
✅ Loading state saat proses login
✅ Error handling yang baik

**Fitur baru:**
```jsx
- Import authService & storageService
- useEffect untuk check localStorage saat mount
- API call ke /api/auth/login
- Save user data ke localStorage
- Loading indicator di button
```

### 3. **`src/pages/dashboard/DashboardProject.jsx`** (UPDATED)
✅ Fetch projects dari API saat component mount
✅ Create project call API
✅ Delete project call API (dengan confirmation)
✅ Loading state saat fetch data
✅ Error handling & display

**Fitur baru:**
```jsx
- Import projectService
- useEffect untuk fetch projects
- Error message display
- Loading indicator saat fetch
- Confirmation dialog saat delete
- isSubmitting state untuk button disable
```

---

## 🔄 Flow Diagram

### Login & Navigation
```
1. User klik "Login" button di Navbar
   ↓
2. Modal form opens
   ↓
3. User input username & password
   ↓
4. Submit form → API call ke /api/auth/login
   ↓
5. Success → Save user ke localStorage
   ↓
6. Button berubah jadi "Dashboard" + "Logout"
   ↓
7. User klik "Dashboard" → Navigate ke /dashboard
   ↓
8. DashboardProject fetch projects dari API
```

### Create Project
```
1. User klik "Add Project" button
   ↓
2. Modal form opens
   ↓
3. User input title, tech, status
   ↓
4. Click "Save" → API call ke /api/projects (POST)
   ↓
5. Success → Add new project ke state & update UI
   ↓
6. Close modal & clear error
```

### Delete Project
```
1. User klik delete button (trash icon)
   ↓
2. Confirmation dialog muncul
   ↓
3. User confirm → API call ke /api/projects/:id (DELETE)
   ↓
4. Success → Remove project dari state & update UI
```

---

## 🚀 How to Test

### 1. **Make sure Backend is Running**
```bash
cd backend
npm run dev
```
Should see:
```
✅ Server running on port 4000
```

### 2. **Jalankan Frontend**
```bash
# Di root folder (alongside backend)
npm run dev
```

### 3. **Test Login Flow**
- Go to http://localhost:5173 (atau port Vite Anda)
- Klik "Login" button di Navbar
- Input: `username: admin` & `password: admin`
- Expected: Login success & button changes to "Dashboard"

### 4. **Test Dashboard (setelah login)**
- Klik "Dashboard" button
- Should see loading state → projects from database
- Try:
  - ✅ Add new project
  - ✅ Delete existing project
  - Check error handling jika ada error

### 5. **Test Persistent Login**
- Login
- Refresh page (F5)
- User should still logged in ✓

---

## 📊 API Endpoints Used

| Method | Endpoint | Used in |
|--------|----------|---------|
| POST | `/api/auth/login` | Navbar.jsx |
| POST | `/api/auth/register` | (Available for future use) |
| GET | `/api/projects` | DashboardProject.jsx |
| POST | `/api/projects` | DashboardProject.jsx |
| PUT | `/api/projects/:id` | (Available for future use) |
| DELETE | `/api/projects/:id` | DashboardProject.jsx |

---

## 🔐 localStorage Structure

Ketika user login, user data disimpan di localStorage:
```javascript
{
  id: 1,
  username: "admin"
}
```

Key: `"user"`

---

## ⚠️ Error Handling

### Login Errors
- Username/password salah → Show error message in modal
- Network error → Show error message

### Project Errors
- Failed to fetch → Show error message + loading indicator
- Failed to add → Show error message in alert box
- Failed to delete → Show error message

---

## 🔮 Future Enhancements

### Priority 1
- [ ] Hash password dengan bcrypt (backend)
- [ ] Implement JWT tokens untuk secure auth
- [ ] Add HTTP interceptor untuk auto-attach JWT
- [ ] Protected routes (check login sebelum render dashboard)

### Priority 2
- [ ] Edit project functionality
- [ ] Add search & filter projects
- [ ] Pagination untuk projects
- [ ] User profile page

### Priority 3
- [ ] Dark/Light mode toggle
- [ ] Notifications/Toast messages
- [ ] Logout warning jika inaktif
- [ ] Rate limiting

---

## 📝 Important Notes

✅ **CORS**: Backend sudah setup CORS, jadi frontend bisa access API

✅ **localStorage**: User data persisted, no need to login setiap kali refresh

❌ **Password**: Belum di-hash! Use bcrypt di production

❌ **JWT**: Belum implement! Add untuk production

✅ **Error Handling**: Implemented untuk user feedback

✅ **Loading States**: Implemented untuk UX yang baik

---

## 🧪 Testing Checklist

- [ ] Backend running di port 4000
- [ ] Frontend running di port 5173
- [ ] Login dengan admin:admin berhasil
- [ ] User data saved di localStorage
- [ ] Login persist setelah refresh
- [ ] Dashboard fetch projects from API
- [ ] Add project berfungsi
- [ ] Delete project berfungsi
- [ ] Error messages display properly
- [ ] Loading states work correctly

---

✨ **Integration Complete!** Ready untuk production? Atau ada yang perlu di-improve?
