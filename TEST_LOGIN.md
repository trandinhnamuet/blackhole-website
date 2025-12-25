# Test Login Script

## Test với tài khoản admin từ database Phutraco

Để test đăng nhập, bạn cần:

1. **Đảm bảo backend đang chạy:**
   - Backend: http://localhost:3006
   - Frontend: http://localhost:3000 (chạy `npm run dev` ở folder blackhole-website)

2. **Đăng nhập bằng tài khoản có sẵn trong database:**
   - Email: admin@phutraco.com (hoặc email khác có trong database)
   - Password: (password của tài khoản đó)

3. **Sau khi đăng nhập thành công:**
   - Tên user sẽ hiển thị ở header
   - Có nút dropdown với tên user
   - Có option "Admin Panel" và "Đăng xuất"

## Test bằng cURL:

```bash
# Test health check
curl http://localhost:3006/api/health

# Test login (thay email/password thật)
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@phutraco.com\",\"password\":\"your-password\"}" \
  -v

# Response sẽ có:
# - accessToken
# - user object (id, email, name, role)
# - Set-Cookie header với refreshToken
```

## Nếu chưa có tài khoản, tạo tài khoản mới:

```bash
curl -X POST http://localhost:3006/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@blackhole.com\",\"password\":\"Test123456\",\"name\":\"Test User\"}"
```

## Debug:

Nếu vẫn chưa thấy user info sau login:
1. Mở DevTools (F12) -> Console
2. Kiểm tra có error không
3. Kiểm tra Network tab xem API có được gọi không
4. Xem localStorage có `blackhole_access_token` không
5. Xem cookie có `refreshToken` không
