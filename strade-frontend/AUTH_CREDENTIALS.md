# STRADE Authentication System - Demo Credentials

## 🔐 Login Credentials (Demo)

### User Accounts
1. **Admin Account**
   - Email: `admin@strade.ai`
   - Username: `admin`
   - Password: `admin123`

2. **Demo Account**
   - Email: `demo@strade.ai`
   - Username: `demo`
   - Password: `demo123`

3. **User Account**
   - Email: `alya.prananda@strade.ai`
   - Username: `alya`
   - Password: `alya123`

---

## 🎟️ Activation Codes (Demo)

Valid activation codes for registration:
- `STRADE-2025-ALPHA`
- `STRADE-2025-BETA`
- `STRADE-2025-GAMMA`
- `STRADE-VIP-001`
- `STRADE-VIP-002`

---

## 🚀 Flow Authentication

### 1. Login Flow
1. User membuka aplikasi → tampil **Login Page**
2. Input email/username dan password
3. Klik tombol **"Masuk"**
4. Jika berhasil → redirect ke **Dashboard**

### 2. Registration Flow (Butuh Activation Code)
1. Dari Login Page → klik **"Aktivasi Kode"**
2. Input activation code yang valid
3. Klik **"Verifikasi Kode"**
4. Jika valid → redirect ke **Register Page**
5. Lengkapi form registrasi (nama, username, email, phone, password)
6. Klik **"Daftar Sekarang"**
7. Akun terdaftar → auto login → redirect ke **Dashboard**

### 3. Forgot Password Flow
1. Dari Login Page → klik **"Lupa Password?"**
2. Input email
3. Klik **"Kirim Link Reset"**
4. Tampil konfirmasi email terkirim
5. User klik **"Kembali ke Login"**

### 4. Logout Flow
1. User ke **Profile Page**
2. Scroll ke bawah
3. Klik tombol **"Logout"**
4. Konfirmasi dialog
5. Logout berhasil → kembali ke **Login Page**

---

## 📝 Technical Implementation

### LocalStorage Keys
- `authToken` - Token autentikasi user (dummy: "dummy-token-{username}")
- `username` - Username user yang login
- `userData` - Data lengkap user (untuk register)
- `activationCode` - Kode aktivasi temporary (dihapus setelah register)

### Component Structure
```
App.jsx (Main Router)
├── Login.jsx (Email/Username + Password)
├── Activation.jsx (Input Activation Code)
├── Register.jsx (Form Registrasi Lengkap)
├── ForgotPassword.jsx (Reset Password)
└── [Protected Pages]
    ├── DashboardNew.jsx
    ├── TradeNew.jsx
    ├── BotsNew.jsx
    ├── Profile.jsx
    └── ... other pages
```

### Authentication Check
- App.jsx mengecek `localStorage.authToken` pada mount
- Jika ada token → set `isAuthenticated = true` → tampil dashboard
- Jika tidak ada → tampil Login Page
- Profile page dapat trigger logout → clear localStorage → redirect ke login

---

## 🎨 Design Consistency
- Semua auth pages menggunakan tema STRADE:
  - Primary color: `#84F7F0` (cyan)
  - Background: `#041C1A` (dark teal)
  - Glassmorphism effects dengan `backdrop-blur-md`
  - Border subtle dengan `border-[#84F7F0]/20`
  - Shadow effects dengan `shadow-[#84F7F0]/30`

---

## ⚠️ Notes
- Ini adalah **demo authentication** untuk development
- Dalam production, ganti dengan API backend yang proper
- Password harus di-hash di backend
- Activation code harus di-validasi dari database
- Implementasikan JWT token yang proper
- Tambahkan rate limiting untuk security
