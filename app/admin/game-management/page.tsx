"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpDown } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const mockCharacters = [
  {
    characterId: "CHAR001",
    characterName: "DragonKnight",
    accountId: "ACC001",
    level: 85,
    class: "Chiến Binh",
    playTime: "450 giờ",
    lastLogin: "2024-12-15 09:30:00",
    lastLogout: "2024-12-15 14:45:00",
    gold: 5000000,
    items: [
      { name: "Kiếm Long Tước", level: 80, quantity: 1 },
      { name: "Giáp Rồng Thiêng", level: 85, quantity: 1 },
      { name: "Thuốc Hồi HP", level: 1, quantity: 50 }
    ],
    experience: 12500000,
    chatLocked: false,
    accountLocked: false
  },
  {
    characterId: "CHAR002",
    characterName: "ShadowAssassin",
    accountId: "ACC002",
    level: 92,
    class: "Sát Thủ",
    playTime: "680 giờ",
    lastLogin: "2024-12-15 08:00:00",
    lastLogout: "2024-12-15 12:30:00",
    gold: 8500000,
    items: [
      { name: "Phi Tiêu Độc", level: 90, quantity: 99 },
      { name: "Áo Giáp Bóng Đêm", level: 88, quantity: 1 },
      { name: "Nhẫn Tốc Độ", level: 85, quantity: 2 }
    ],
    experience: 18900000,
    chatLocked: false,
    accountLocked: false
  },
  {
    characterId: "CHAR003",
    characterName: "MysticMage",
    accountId: "ACC003",
    level: 78,
    class: "Pháp Sư",
    playTime: "320 giờ",
    lastLogin: "2024-12-14 20:15:00",
    lastLogout: "2024-12-14 23:50:00",
    gold: 3200000,
    items: [
      { name: "Gậy Phép Thuật", level: 75, quantity: 1 },
      { name: "Áo Choàng Ma Pháp", level: 78, quantity: 1 },
      { name: "Sách Kỹ Năng", level: 1, quantity: 15 }
    ],
    experience: 9800000,
    chatLocked: true,
    accountLocked: false
  }
]

const performanceData = [
  { time: "00:00", cpu: 45, memory: 62, network: 35 },
  { time: "04:00", cpu: 32, memory: 58, network: 28 },
  { time: "08:00", cpu: 68, memory: 75, network: 52 },
  { time: "12:00", cpu: 85, memory: 82, network: 68 },
  { time: "16:00", cpu: 92, memory: 88, network: 75 },
  { time: "20:00", cpu: 78, memory: 80, network: 62 },
]

const userGrowthData = [
  { month: "T1", users: 1200, newUsers: 350 },
  { month: "T2", users: 1550, newUsers: 420 },
  { month: "T3", users: 1890, newUsers: 480 },
  { month: "T4", users: 2340, newUsers: 580 },
  { month: "T5", users: 2850, newUsers: 650 },
  { month: "T6", users: 3280, newUsers: 720 },
  { month: "T7", users: 3589, newUsers: 680 },
]

export default function GameManagementPage() {
  const [search, setSearch] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState<typeof mockCharacters[0] | null>(null)
  const [warningMessage, setWarningMessage] = useState("Chơi quá 180 phút một ngày sẽ ảnh hưởng xấu đến sức khỏe")
  const [systemStats] = useState({
    onlinePlayers: 1247,
    totalCharacters: 3589,
    activeServers: 5,
    serverLoad: "72%"
  })
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredCharacters = mockCharacters.filter(char => 
    char.characterName.toLowerCase().includes(search.toLowerCase()) ||
    char.accountId.toLowerCase().includes(search.toLowerCase())
  )

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn as keyof typeof a]
    const bVal = b[sortColumn as keyof typeof b]
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto p-6 pt-24 space-y-6">
      <h1 className="text-3xl font-bold">Quản Trị Hệ Thống Game</h1>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50 border border-zinc-700 rounded-lg p-1 h-auto">
          <TabsTrigger 
            value="system" 
            className="text-base font-semibold py-6 px-6 rounded-md whitespace-nowrap data-[state=active]:!bg-zinc-600 data-[state=active]:!text-white data-[state=active]:!border-2 data-[state=active]:!border-primary"
          >
            Hệ thống
          </TabsTrigger>
          <TabsTrigger 
            value="characters" 
            className="text-base font-semibold py-6 px-6 rounded-md whitespace-nowrap data-[state=active]:!bg-zinc-600 data-[state=active]:!text-white data-[state=active]:!border-2 data-[state=active]:!border-primary"
          >
            Nhân vật
          </TabsTrigger>
          <TabsTrigger 
            value="warning" 
            className="text-base font-semibold py-6 px-6 rounded-md whitespace-nowrap data-[state=active]:!bg-zinc-400 data-[state=active]:!text-white data-[state=active]:!border-2 data-[state=active]:!border-primary"
          >
            Cảnh báo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Người chơi online</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{systemStats.onlinePlayers}</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tổng nhân vật</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{systemStats.totalCharacters}</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Server hoạt động</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{systemStats.activeServers}</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tải server</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">{systemStats.serverLoad}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle>Hiệu năng hệ thống (24h)</CardTitle>
                <CardDescription>CPU, Memory và Network usage</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    cpu: {
                      label: "CPU %",
                      color: "#ef4444",
                    },
                    memory: {
                      label: "Memory %",
                      color: "#3b82f6",
                    },
                    network: {
                      label: "Network %",
                      color: "#10b981",
                    },
                  }}
                  className="h-[300px]"
                >
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis dataKey="time" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="memory" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="network" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle>Người dùng theo tháng</CardTitle>
                <CardDescription>Tổng người dùng và người dùng mới</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    users: {
                      label: "Tổng người dùng",
                      color: "#8b5cf6",
                    },
                    newUsers: {
                      label: "Người dùng mới",
                      color: "#06b6d4",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis dataKey="month" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="newUsers" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="characters" className="space-y-6">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle>Tìm kiếm nhân vật</CardTitle>
              <CardDescription>Tìm theo tên nhân vật hoặc mã tài khoản</CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                placeholder="Nhập tên nhân vật hoặc mã tài khoản..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">
                      <Button variant="ghost" size="sm" onClick={() => handleSort("characterName")} className="h-8 px-2">
                        Tên nhân vật <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[100px] px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleSort("accountId")} className="h-8 px-2">
                        Mã TK <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[100px] px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleSort("level")} className="h-8 px-2">
                        Cấp độ <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[120px] px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleSort("class")} className="h-8 px-2">
                        Lớp <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[140px] px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleSort("playTime")} className="h-8 px-2">
                        Thời gian chơi <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[180px] px-4">Trạng thái</TableHead>
                    <TableHead className="text-right w-[120px] pr-6">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCharacters.map((char) => (
                    <TableRow key={char.characterId}>
                      <TableCell className="font-medium pl-6">{char.characterName}</TableCell>
                      <TableCell className="px-4">{char.accountId}</TableCell>
                      <TableCell className="px-4">
                        <Badge variant="outline">Lv.{char.level}</Badge>
                      </TableCell>
                      <TableCell className="px-4">{char.class}</TableCell>
                      <TableCell className="px-4">{char.playTime}</TableCell>
                      <TableCell className="px-4">
                        <div className="flex gap-1">
                          {char.chatLocked && <Badge variant="destructive" className="text-xs">Chat bị khóa</Badge>}
                          {char.accountLocked && <Badge variant="destructive" className="text-xs">TK bị khóa</Badge>}
                          {!char.chatLocked && !char.accountLocked && <Badge variant="default" className="text-xs">Bình thường</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCharacter(char)}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>

          {selectedCharacter && (
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle>Thông tin chi tiết: {selectedCharacter.characterName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mã nhân vật</p>
                    <p className="text-lg font-semibold">{selectedCharacter.characterId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mã tài khoản</p>
                    <p className="text-lg font-semibold">{selectedCharacter.accountId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cấp độ</p>
                    <p className="text-lg font-semibold text-purple-600">Lv.{selectedCharacter.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Lớp nhân vật</p>
                    <p className="text-lg font-semibold">{selectedCharacter.class}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Thời gian chơi</p>
                    <p className="text-lg font-semibold">{selectedCharacter.playTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vàng trong game</p>
                    <p className="text-lg font-semibold text-yellow-600">
                      {selectedCharacter.gold.toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Điểm kinh nghiệm</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {selectedCharacter.experience.toLocaleString('vi-VN')} EXP
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Lần đăng nhập cuối</p>
                    <p className="text-sm">{selectedCharacter.lastLogin}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Lần đăng xuất cuối</p>
                    <p className="text-sm">{selectedCharacter.lastLogout}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Vật phẩm trong kho ({selectedCharacter.items.length})</h3>
                  <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-6">Tên vật phẩm</TableHead>
                        <TableHead className="w-[120px] px-4">Cấp độ</TableHead>
                        <TableHead className="text-right w-[120px] pr-6">Số lượng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedCharacter.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium pl-6">{item.name}</TableCell>
                          <TableCell className="px-4">
                            <Badge variant="outline">Lv.{item.level}</Badge>
                          </TableCell>
                          <TableCell className="text-right pr-6">{item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="default">Tặng quà</Button>
                  <Button variant="outline">Chuyển nhân vật</Button>
                  <Button variant="destructive">
                    {selectedCharacter.chatLocked ? "Mở khóa chat" : "Khóa chat"}
                  </Button>
                  <Button variant="destructive">
                    {selectedCharacter.accountLocked ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="warning" className="space-y-6">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle>Cảnh báo trên màn hình game</CardTitle>
              <CardDescription>
                Dòng chữ chạy sẽ hiển thị liên tục trên màn hình game của người chơi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="warning">Nội dung cảnh báo</Label>
                <Textarea 
                  id="warning"
                  value={warningMessage}
                  onChange={(e) => setWarningMessage(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button>Cập nhật cảnh báo</Button>
                <Button variant="outline">Xem trước</Button>
              </div>
              
              <div className="mt-4 p-4 bg-black text-yellow-400 rounded-lg overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="text-lg font-bold">⚠️ {warningMessage} ⚠️</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
