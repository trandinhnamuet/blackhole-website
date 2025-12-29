"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { withAuth, useAuth } from "@/lib/auth-context"
import { WalletBalance } from "@/components/wallet-balance"
import { 
  User,
  Trophy,
  Clock,
  Star,
  Gamepad2,
  Settings,
  Bell,
  Gift,
  Calendar,
  Award
} from "lucide-react"

function UserDashboard() {
  const { user } = useAuth()

  const userStats = [
    {
      title: "Thời Gian Chơi",
      value: "124 giờ",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Cấp Độ",
      value: "Level 45",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Thành Tựu",
      value: "28/50",
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Điểm Tích Lũy",
      value: "12,450",
      icon: Star,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    }
  ]

  const quickActions = [
    {
      title: "Game Library",
      description: "Xem các game đang chơi",
      href: "/games",
      icon: Gamepad2,
      color: "text-primary"
    },
    {
      title: "Sự Kiện",
      description: "Tham gia sự kiện đang diễn ra",
      href: "/community",
      icon: Calendar,
      color: "text-green-500"
    },
    {
      title: "Phần Thưởng",
      description: "Nhận quà tặng và ưu đãi",
      href: "#rewards",
      icon: Gift,
      color: "text-orange-500"
    },
    {
      title: "Cài Đặt",
      description: "Quản lý tài khoản của bạn",
      href: "#settings",
      icon: Settings,
      color: "text-gray-500"
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto p-6 pt-24 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Chào mừng, {user?.name || 'Gamer'}!
              </h1>
              <p className="text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        {/* Wallet Balance */}
        <WalletBalance />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {userStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="bg-card/50 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Truy Cập Nhanh</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Card className="h-full bg-card/50 border-border/50 hover:bg-card/70 transition-all cursor-pointer group">
                    <CardHeader>
                      <Icon className={`h-8 w-8 ${action.color} mb-2 group-hover:scale-110 transition-transform`} />
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Hoạt Động Gần Đây</CardTitle>
            <CardDescription>Lịch sử chơi game và tương tác của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <Gamepad2 className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Vua Hải Tặc Kỷ Nguyên 2</p>
                  <p className="text-sm text-muted-foreground">Chơi 2 giờ trước</p>
                </div>
                <span className="text-sm text-muted-foreground">+150 điểm</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <Award className="h-8 w-8 text-yellow-500" />
                <div className="flex-1">
                  <p className="font-medium">Mở khóa thành tựu mới</p>
                  <p className="text-sm text-muted-foreground">5 giờ trước</p>
                </div>
                <span className="text-sm text-muted-foreground">+50 điểm</span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <Gift className="h-8 w-8 text-pink-500" />
                <div className="flex-1">
                  <p className="font-medium">Nhận phần thưởng đăng nhập hàng ngày</p>
                  <p className="text-sm text-muted-foreground">1 ngày trước</p>
                </div>
                <span className="text-sm text-muted-foreground">+100 điểm</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Games */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Game Đang Chơi</h2>
            <Link href="/games">
              <Button variant="ghost">Xem tất cả</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card/50 border-border/50 overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Gamepad2 className="h-16 w-16 text-primary/50" />
              </div>
              <CardHeader>
                <CardTitle>Vua Hải Tặc Kỷ Nguyên 2</CardTitle>
                <CardDescription>MMORPG • Đang chơi</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(UserDashboard)
