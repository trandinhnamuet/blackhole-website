# BlackHole Authentication System

## 🎮 Hệ thống đăng nhập JWT cho BlackHole Game

Dự án này đã được tích hợp hệ thống authentication JWT hoàn chỉnh, copy từ dự án Phutraco và điều chỉnh cho phù hợp với giao diện BlackHole.

## 🚀 Cấu trúc dự án

### Backend (be-blackhole)
- **Port:** 3006
- **Tech Stack:** NestJS + TypeORM + PostgreSQL + JWT
- **Database:** Sử dụng chung database với Phutraco (schema: phutraco)
- **Auth Features:**
  - JWT Access Token (15 phút expiration)
  - JWT Refresh Token (30 ngày expiration, lưu trong httpOnly cookie)
  - Session management với database
  - Token rotation khi refresh
  - Auto cleanup expired sessions
  - Password hashing với bcrypt
  
### Frontend (blackhole-website)
- **Port:** 3000 (mặc định Next.js)
- **Tech Stack:** Next.js 16 + TypeScript + Tailwind CSS
- **Auth Features:**
  - Auto token refresh mỗi 14 phút
  - Protected routes với Higher-Order Component
  - Auth Context để quản lý authentication state
  - UI đẹp với dark theme phù hợp với game

## 📁 File cấu trúc quan trọng

### Backend
```
be-blackhole/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts      # Login, logout, refresh endpoints
│   │   ├── auth.service.ts         # Business logic authentication
│   │   ├── auth.module.ts          # Module configuration
│   │   ├── jwt.strategy.ts         # JWT validation strategy
│   │   ├── jwt-auth.guard.ts       # Guard để protect routes
│   │   ├── user-session.entity.ts  # Session entity
│   │   └── session-cleanup.service.ts # Auto cleanup expired sessions
│   ├── users/
│   │   ├── user.entity.ts          # User entity (phutraco.users)
│   │   ├── users.service.ts        # User service
│   │   └── users.module.ts         # Users module
│   ├── app.module.ts               # Main application module
│   └── main.ts                     # Entry point
├── .env                            # Environment variables
└── package.json
```

### Frontend
```
blackhole-website/
├── app/
│   ├── login/
│   │   └── page.tsx               # Login page với giao diện đẹp
│   └── layout.tsx                 # Root layout với AuthProvider
├── lib/
│   └── auth-context.tsx           # Auth Context & HOC
├── services/
│   └── auth.service.ts            # Auth API service
├── .env.local                     # Environment variables
└── package.json
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3006
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.gvjwexzmokunrxmhcbbl
DB_PASSWORD=Mt231103.,@
DB_NAME=postgres

JWT_ACCESS_SECRET=blackhole_access_secret_key_2025_secure_random_string_xyz789
JWT_REFRESH_SECRET=blackhole_refresh_secret_key_2025_secure_random_string_def456
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=30d

FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3006/api
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Đăng xuất (xóa session hiện tại)
- `POST /api/auth/logout-all` - Đăng xuất khỏi tất cả thiết bị
- `POST /api/auth/me` - Lấy thông tin user hiện tại (protected)

### Health Check
- `GET /api/health` - Kiểm tra backend status

## 🧪 Testing

### 1. Start Backend
```bash
cd be-blackhole
npm install
npm run start:dev
```

Backend sẽ chạy tại: http://localhost:3006

### 2. Start Frontend
```bash
cd blackhole-website
npm install
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

### 3. Test Login

#### Option 1: Sử dụng UI
1. Mở trình duyệt: http://localhost:3000/login
2. Đăng nhập với tài khoản có sẵn trong database phutraco
3. Sau khi đăng nhập thành công, sẽ redirect đến /admin

#### Option 2: Sử dụng cURL
```bash
# Test health endpoint
curl http://localhost:3006/api/health

# Test login
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}' \
  -c cookies.txt

# Test get current user (với cookie)
curl -X POST http://localhost:3006/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -b cookies.txt

# Test refresh token
curl -X POST http://localhost:3006/api/auth/refresh \
  -b cookies.txt

# Test logout
curl -X POST http://localhost:3006/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -b cookies.txt
```

## 🗄️ Database Schema

### Users Table (phutraco.users)
```sql
- id: uuid (PK)
- email: varchar(255) UNIQUE
- password_hash: varchar(255)
- name: varchar(255)
- role: varchar(20) DEFAULT 'user'
- created_at: timestamp
- updated_at: timestamp
```

### User Sessions Table (phutraco.user_sessions)
```sql
- id: uuid (PK)
- user_id: uuid (FK -> users.id)
- refresh_token_hash: text
- user_agent: text
- ip_address: varchar(45)
- created_at: timestamp
- expires_at: timestamp
```

## 🔒 Security Features

1. **Password Hashing:** Bcrypt với 12 salt rounds
2. **JWT Tokens:** 
   - Access token: 15 phút expiration, lưu trong memory/localStorage
   - Refresh token: 30 ngày expiration, lưu trong httpOnly cookie
3. **Token Rotation:** Khi refresh, token cũ bị xóa và tạo token mới
4. **Session Management:** Mỗi login tạo 1 session trong database
5. **CORS:** Chỉ cho phép frontend URL cụ thể
6. **Auto Cleanup:** Tự động xóa expired sessions mỗi 6 giờ

## 📝 Usage trong Code

### Frontend - Protected Route
```tsx
import { withAuth } from '@/lib/auth-context'

function AdminPage() {
  return <div>Admin Content</div>
}

export default withAuth(AdminPage)
```

### Frontend - Use Auth Hook
```tsx
import { useAuth } from '@/lib/auth-context'

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth()
  
  return (
    <div>
      {isAuthenticated && <p>Welcome {user?.name}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Backend - Protected Endpoint
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```

## 🎨 UI/UX Features

- Dark theme phù hợp với game theme
- Responsive design
- Form validation
- Loading states
- Error messages
- Password visibility toggle
- Social login buttons (UI only, chưa implement)
- Remember me checkbox (UI only)

## ⚙️ Configuration

### CORS Settings
Backend cho phép CORS từ frontend URL được config trong .env. Mặc định: `http://localhost:3000`

### Cookie Settings
- httpOnly: true (không thể truy cập từ JavaScript)
- secure: true (production mode only)
- sameSite: 'strict'
- maxAge: 30 days
- path: '/'

## 🔧 Troubleshooting

### Backend không kết nối được database
- Kiểm tra credentials trong .env
- Đảm bảo database có schema 'phutraco'
- Kiểm tra network connection

### Frontend không gọi được API
- Kiểm tra NEXT_PUBLIC_API_URL trong .env.local
- Kiểm tra CORS settings trong backend
- Kiểm tra backend có đang chạy không

### Token expired
- Access token tự động refresh sau 14 phút
- Nếu refresh token cũng expired (30 ngày), user phải login lại

## 📚 Dependencies

### Backend
- @nestjs/core, @nestjs/common
- @nestjs/typeorm, typeorm, pg
- @nestjs/jwt, @nestjs/passport, passport, passport-jwt
- bcrypt
- cookie-parser

### Frontend
- next, react
- Services: auth.service.ts
- Context: auth-context.tsx

## 🎉 Hoàn thành

Hệ thống JWT authentication đã được tích hợp hoàn chỉnh:
✅ Backend NestJS với JWT
✅ Frontend Next.js với Auth Context
✅ Shared database với Phutraco
✅ UI đẹp phù hợp với theme BlackHole
✅ Secure & Production-ready

---

**Developed by:** ICS Team
**Date:** December 25, 2025
