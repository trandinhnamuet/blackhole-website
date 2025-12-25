"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { withAdminAuth, useAuth } from "@/lib/auth-context"
import { 
  Users, 
  Wallet, 
  Receipt, 
  Gamepad2, 
  FileText,
  BarChart3,
  Shield,
  Moon,
  Sun
} from "lucide-react"

const adminModules = [
  {
    title: "Quản Lý Tài Khoản",
    description: "Quản lý thông tin tài khoản người dùng, trạng thái kích hoạt, câu hỏi bí mật",
    href: "/admin/accounts",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Tra Cứu Số Dư",
    description: "Tra cứu số dư tài khoản, tiền đã nạp, số bạc trong game",
    href: "/admin/balance",
    icon: Wallet,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Log Giao Dịch",
    description: "Tra cứu lịch sử giao dịch, phương thức thanh toán, trạng thái nạp tiền",
    href: "/admin/transactions",
    icon: Receipt,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    title: "Quản Trị Game",
    description: "Quản lý nhân vật, vật phẩm, hệ thống game, cảnh báo người chơi",
    href: "/admin/game-management",
    icon: Gamepad2,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    title: "Quản Lý Nội Dung (CMS)",
    description: "Cập nhật thông báo, tin tức, cảnh báo trên website",
    href: "/admin/cms",
    icon: FileText,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  }
]

function AdminDashboard() {
  const [isLightMode, setIsLightMode] = useState(false)
  const { user } = useAuth()

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-50' : 'bg-zinc-900'}`}>
      <div className="container mx-auto p-6 pt-24 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Trang Quản Trị</h1>
            <p className={`${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
              Xin chào, {user?.name || 'Admin'} - Hệ thống quản lý BlackHole Game
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsLightMode(!isLightMode)}
          className={isLightMode ? 'bg-white border-gray-300' : 'bg-zinc-800 border-zinc-700'}
        >
          {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className={`col-span-full ${isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
              <BarChart3 className="h-5 w-5" />
              Thống kê tổng quan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Tổng tài khoản</p>
                <p className={`text-2xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>3,589</p>
              </div>
              <div className="space-y-1">
                <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Người chơi online</p>
                <p className="text-2xl font-bold text-green-600">1,247</p>
              </div>
              <div className="space-y-1">
                <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Giao dịch hôm nay</p>
                <p className="text-2xl font-bold text-yellow-600">156</p>
              </div>
              <div className="space-y-1">
                <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Doanh thu hôm nay</p>
                <p className="text-2xl font-bold text-blue-600">45.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {adminModules.map((module) => {
          const Icon = module.icon
          return (
            <Link key={module.href} href={module.href}>
              <Card className={`h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer border-2 hover:border-primary/50 ${isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}`}>
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${module.bgColor} mb-2`}>
                    <Icon className={`h-6 w-6 ${module.color}`} />
                  </div>
                  <CardTitle className={`text-xl ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{module.title}</CardTitle>
                  <CardDescription className={`line-clamp-2 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Truy cập
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}>
        <CardHeader>
          <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>Hướng dẫn sử dụng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Users className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className={`font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Quản Lý Tài Khoản</p>
              <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Xem và quản lý thông tin chi tiết người chơi, trạng thái tài khoản</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Wallet className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className={`font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Tra Cứu Số Dư</p>
              <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Kiểm tra số dư, tiền nạp và tài sản trong game của người chơi</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Receipt className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className={`font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Log Giao Dịch</p>
              <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Theo dõi lịch sử giao dịch nạp tiền và trạng thái thanh toán</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Gamepad2 className="h-5 w-5 text-purple-500 mt-0.5" />
            <div>
              <p className={`font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Quản Trị Game</p>
              <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Quản lý nhân vật, vật phẩm, hệ thống và cảnh báo trong game</p>
            </div>
          </div>
          <div className="flex gap-3">
            <FileText className="h-5 w-5 text-pink-500 mt-0.5" />
            <div>
              <p className={`font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Quản Lý Nội Dung (CMS)</p>
              <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Tạo và quản lý thông báo, tin tức, cảnh báo trên website</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default withAdminAuth(AdminDashboard)
