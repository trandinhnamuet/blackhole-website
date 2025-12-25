# 🎮 HƯỚNG DẪN TEST ĐĂNG NHẬP BLACKHOLE

## ✅ Các bước đã hoàn thành:

1. ✅ Backend NestJS với JWT đã chạy tại port 3006
2. ✅ Frontend đã có AuthContext và auth service
3. ✅ Header đã hiển thị user info và nút logout
4. ✅ Login page đã tích hợp JWT authentication
5. ✅ Admin page được bảo vệ bằng withAuth HOC

## 🚀 CÁCH TEST:

### Bước 1: Chạy Backend (đã chạy sẵn)
Backend đang chạy tại: http://localhost:3006

### Bước 2: Tạo tài khoản test
Có 2 cách:

**Cách 1: Dùng script (khuyến nghị)**
```bash
cd be-blackhole
node create-test-user.js
```

**Cách 2: Dùng cURL**
```bash
curl -X POST http://localhost:3006/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"blackhole@test.com\",\"password\":\"Blackhole123\",\"name\":\"BlackHole Admin\"}"
```

### Bước 3: Chạy Frontend
```bash
cd d:\ICS\blackhole-website
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

### Bước 4: Test đăng nhập
1. Mở trình duyệt: http://localhost:3000/login
2. Đăng nhập với:
   - **Email:** blackhole@test.com
   - **Password:** Blackhole123
3. Sau khi đăng nhập thành công:
   - Sẽ redirect về /admin
   - Header sẽ hiển thị tên "BlackHole Admin"
   - Có dropdown menu với options:
     - Admin Panel (link to /admin)
     - Đăng xuất

### Bước 5: Test các tính năng
- ✅ Xem thông tin user ở header
- ✅ Click vào dropdown xem menu
- ✅ Vào trang /admin (protected route)
- ✅ Click "Đăng xuất" để logout
- ✅ Sau logout sẽ redirect về homepage
- ✅ Try vào /admin khi chưa login -> redirect về /login

## 🔍 Debugging:

### Nếu không thấy user info sau login:

1. **Mở DevTools (F12):**
   - Console tab: Xem có error không
   - Network tab: Xem API calls (login, me)
   - Application tab -> Local Storage: Kiểm tra có `blackhole_access_token`
   - Application tab -> Cookies: Kiểm tra có `refreshToken`

2. **Kiểm tra backend:**
   ```bash
   curl http://localhost:3006/api/health
   ```
   Response phải là:
   ```json
   {
     "status": "ok",
     "timestamp": "...",
     "service": "BlackHole Backend API"
   }
   ```

3. **Test login trực tiếp bằng cURL:**
   ```bash
   curl -X POST http://localhost:3006/api/auth/login \
     -H "Content-Type: application/json" \
     -d "{\"email\":\"blackhole@test.com\",\"password\":\"Blackhole123\"}" \
     -v
   ```

4. **Xem logs trong terminal:**
   - Backend terminal: Xem request logs
   - Frontend terminal: Xem errors/warnings

### Lỗi thường gặp:

**1. "Invalid credentials"**
- Kiểm tra email/password đúng chưa
- Thử tạo user mới bằng script

**2. "CORS error"**
- Kiểm tra .env của backend có FRONTEND_URL=http://localhost:3000
- Restart backend

**3. "Network error"**
- Backend có chạy không? (check port 3006)
- Frontend có chạy không? (check port 3000)

**4. Không redirect sau login**
- Xem console có error không
- Kiểm tra AuthContext có wrap đúng không

**5. User info không hiển thị**
- Xem localStorage có token không
- Xem /api/auth/me có được gọi không (Network tab)
- Check AuthContext đã wrap Header chưa

## 📝 Thông tin đăng nhập

### Tài khoản test mới tạo:
- Email: blackhole@test.com
- Password: Blackhole123

### Hoặc dùng tài khoản trong database Phutraco:
- Bất kỳ tài khoản nào trong bảng phutraco.users

## 🎯 Expected Behavior:

### Khi chưa đăng nhập:
- Header hiển thị nút "Đăng nhập"
- Truy cập /admin -> redirect to /login

### Khi đã đăng nhập:
- Header hiển thị tên user + dropdown
- Dropdown có: "Admin Panel" và "Đăng xuất"
- Truy cập /admin -> hiển thị admin page
- Trang admin hiển thị: "Xin chào, {user.name}"

### Khi đăng xuất:
- Session bị xóa
- Token bị clear
- Redirect về homepage
- Header hiển thị lại nút "Đăng nhập"

## 📁 Files quan trọng:

### Backend:
- `be-blackhole/src/auth/` - Auth module
- `be-blackhole/.env` - Environment variables
- `be-blackhole/create-test-user.js` - Script tạo user test

### Frontend:
- `services/auth.service.ts` - Auth API service
- `lib/auth-context.tsx` - Auth Context & HOC
- `app/login/page.tsx` - Login page
- `app/admin/page.tsx` - Protected admin page
- `components/header.tsx` - Header with user menu
- `.env.local` - Frontend environment

## 🔐 Security Features:

1. JWT Access Token (15 phút, lưu trong localStorage)
2. JWT Refresh Token (30 ngày, httpOnly cookie)
3. Auto refresh mỗi 14 phút
4. Token rotation khi refresh
5. Session management trong database
6. Protected routes với HOC
7. CORS protection
8. Password hashing với bcrypt (12 rounds)

---

**Nếu vẫn gặp vấn đề, hãy:**
1. Restart cả backend và frontend
2. Clear browser cache và cookies
3. Thử với Incognito/Private window
4. Check các terminal logs
5. Xem DevTools console và network tab
