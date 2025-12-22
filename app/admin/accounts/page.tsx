"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, EyeOff, ArrowUpDown, Moon, Sun } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockAccounts = [
  {
    id: "ACC001",
    username: "dragonslayer99",
    email: "player1@example.com",
    registeredDate: "2024-01-15",
    fullName: "Nguyễn Văn A",
    birthDate: "1995-05-20",
    phone: "0901234567",
    status: "activated",
    secretQuestion: "Tên thú cưng của bạn?",
    secretAnswer: "Lucky"
  },
  {
    id: "ACC002",
    username: "shadowhunter",
    email: "player2@example.com",
    registeredDate: "2024-02-10",
    fullName: "Trần Thị B",
    birthDate: "1998-08-15",
    phone: "0912345678",
    status: "activated",
    secretQuestion: "Món ăn yêu thích?",
    secretAnswer: "Phở"
  },
  {
    id: "ACC003",
    username: "magicmaster",
    email: "player3@example.com",
    registeredDate: "2024-03-05",
    fullName: "Lê Văn C",
    birthDate: "2000-12-01",
    phone: "0923456789",
    status: "not_activated",
    secretQuestion: "Thành phố sinh ra?",
    secretAnswer: "Hà Nội"
  },
  {
    id: "ACC004",
    username: "firemage",
    email: "player4@example.com",
    registeredDate: "2024-03-12",
    fullName: "Phạm Thị D",
    birthDate: "1997-06-25",
    phone: "0934567890",
    status: "activated",
    secretQuestion: "Màu yêu thích?",
    secretAnswer: "Đỏ"
  },
  {
    id: "ACC005",
    username: "iceknight",
    email: "player5@example.com",
    registeredDate: "2024-04-18",
    fullName: "Hoàng Văn E",
    birthDate: "1996-03-14",
    phone: "0945678901",
    status: "activated",
    secretQuestion: "Số may mắn?",
    secretAnswer: "7"
  },
  {
    id: "ACC006",
    username: "thundergod",
    email: "player6@example.com",
    registeredDate: "2024-05-22",
    fullName: "Võ Thị F",
    birthDate: "1999-09-08",
    phone: "0956789012",
    status: "activated",
    secretQuestion: "Tên trường cấp 3?",
    secretAnswer: "Trường THPT Chu Văn An"
  },
  {
    id: "ACC007",
    username: "stealthninja",
    email: "player7@example.com",
    registeredDate: "2024-06-30",
    fullName: "Đỗ Văn G",
    birthDate: "2001-11-19",
    phone: "0967890123",
    status: "not_activated",
    secretQuestion: "Tên bạn thân?",
    secretAnswer: "Minh"
  },
  {
    id: "ACC008",
    username: "holypriest",
    email: "player8@example.com",
    registeredDate: "2024-07-14",
    fullName: "Bùi Thị H",
    birthDate: "1994-04-22",
    phone: "0978901234",
    status: "activated",
    secretQuestion: "Quê quán?",
    secretAnswer: "Đà Nẵng"
  },
  {
    id: "ACC009",
    username: "darkarcher",
    email: "player9@example.com",
    registeredDate: "2024-08-25",
    fullName: "Lý Văn I",
    birthDate: "1998-07-16",
    phone: "0989012345",
    status: "activated",
    secretQuestion: "Sở thích?",
    secretAnswer: "Game"
  },
  {
    id: "ACC010",
    username: "lightwarrior",
    email: "player10@example.com",
    registeredDate: "2024-09-11",
    fullName: "Dương Thị K",
    birthDate: "2000-02-28",
    phone: "0990123456",
    status: "activated",
    secretQuestion: "Ngành học?",
    secretAnswer: "Công nghệ thông tin"
  },
  {
    id: "ACC011",
    username: "natureshaman",
    email: "player11@example.com",
    registeredDate: "2024-10-05",
    fullName: "Nguyễn Văn L",
    birthDate: "1997-12-30",
    phone: "0901234568",
    status: "not_activated",
    secretQuestion: "Ca sĩ yêu thích?",
    secretAnswer: "Sơn Tùng MTP"
  },
  {
    id: "ACC012",
    username: "bloodreaper",
    email: "player12@example.com",
    registeredDate: "2024-10-20",
    fullName: "Trần Văn M",
    birthDate: "1996-05-17",
    phone: "0912345679",
    status: "activated",
    secretQuestion: "Món thể thao yêu thích?",
    secretAnswer: "Bóng đá"
  },
  {
    id: "ACC013",
    username: "windwalker",
    email: "player13@example.com",
    registeredDate: "2024-11-08",
    fullName: "Lê Thị N",
    birthDate: "1999-08-23",
    phone: "0923456780",
    status: "activated",
    secretQuestion: "Nơi làm việc?",
    secretAnswer: "FPT Software"
  },
  {
    id: "ACC014",
    username: "earthguard",
    email: "player14@example.com",
    registeredDate: "2024-11-22",
    fullName: "Phạm Văn O",
    birthDate: "2001-01-09",
    phone: "0934567891",
    status: "activated",
    secretQuestion: "Ngày kỷ niệm?",
    secretAnswer: "14/02"
  },
  {
    id: "ACC015",
    username: "voidwalker",
    email: "player15@example.com",
    registeredDate: "2024-12-01",
    fullName: "Hoàng Thị P",
    birthDate: "1995-10-31",
    phone: "0945678902",
    status: "not_activated",
    secretQuestion: "Tên cha?",
    secretAnswer: "Hoàng Văn A"
  }
]

export default function AccountsPage() {
  const [search, setSearch] = useState("")
  const [selectedAccount, setSelectedAccount] = useState<typeof mockAccounts[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [hideData, setHideData] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  const maskData = (data: string) => hideData ? "*".repeat(Math.min(data.length, 10)) : data

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredAccounts = mockAccounts.filter(acc => 
    acc.username.toLowerCase().includes(search.toLowerCase()) ||
    acc.email.toLowerCase().includes(search.toLowerCase()) ||
    acc.fullName.toLowerCase().includes(search.toLowerCase())
  )

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn as keyof typeof a]
    const bVal = b[sortColumn as keyof typeof b]
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedAccounts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAccounts = sortedAccounts.slice(startIndex, endIndex)

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-50' : 'bg-zinc-900'}`}>
      <div className="container mx-auto p-6 pt-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Quản Lý Tài Khoản</h1>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsLightMode(!isLightMode)}
          className={isLightMode ? 'bg-white border-gray-300' : 'bg-zinc-800 border-zinc-700'}
        >
          {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      <Card className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}>
        <CardHeader>
          <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>Tìm kiếm tài khoản</CardTitle>
          <CardDescription className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>Tìm theo tên tài khoản, email hoặc họ tên</CardDescription>
        </CardHeader>
        <CardContent>
          <Input 
            placeholder="Nhập từ khóa tìm kiếm..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>Danh sách tài khoản</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHideData(!hideData)}
              className={`gap-2 ${isLightMode ? 'text-gray-900' : ''}`}
            >
              {hideData ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {hideData ? "Hiện thông tin" : "Ẩn thông tin"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px] pl-6">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("id")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Mã TK <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("username")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Tên tài khoản <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("email")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Email <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("fullName")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Họ tên <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("registeredDate")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Ngày đăng ký <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[150px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("status")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Trạng thái <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className={`text-right w-[120px] pr-6 ${isLightMode ? 'text-gray-900' : ''}`}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className={`font-medium pl-6 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(account.id)}</TableCell>
                  <TableCell className={`px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(account.username)}</TableCell>
                  <TableCell className={`px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(account.email)}</TableCell>
                  <TableCell className={`px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(account.fullName)}</TableCell>
                  <TableCell className={`px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(account.registeredDate)}</TableCell>
                  <TableCell className="px-4">
                    <Badge variant={account.status === "activated" ? "default" : "secondary"}>
                      {account.status === "activated" ? "Đã kích hoạt" : "Chưa kích hoạt"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => {
                        setSelectedAccount(account)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-zinc-700">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Hiển thị</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
                trên tổng {sortedAccounts.length} bản ghi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={isLightMode ? 'text-gray-900' : ''}
              >
                Trước
              </Button>
              <span className={`text-sm ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                Trang {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={isLightMode ? 'text-gray-900' : ''}
              >
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800 border-zinc-700'} style={{ maxWidth: '90vw', width: '90vw' }}>
          <DialogHeader>
            <DialogTitle className={`text-3xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Chi tiết tài khoản</DialogTitle>
            <DialogDescription className={`text-base ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
              Thông tin chi tiết về tài khoản người dùng
            </DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className={`rounded-lg p-6 border ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-zinc-900/50 border-zinc-700'}`}>
                <h3 className="text-xl font-semibold mb-4 text-primary">Thông tin cơ bản</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Mã tài khoản</p>
                    <p className={`text-xl font-semibold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{selectedAccount.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Tên tài khoản</p>
                    <p className="text-xl font-semibold text-blue-400">{selectedAccount.username}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Email đăng ký</p>
                    <p className={`text-lg ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{selectedAccount.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Trạng thái</p>
                    <Badge variant={selectedAccount.status === "activated" ? "default" : "secondary"} className="text-sm px-3 py-1">
                      {selectedAccount.status === "activated" ? "Đã kích hoạt" : "Chưa kích hoạt"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg p-6 border ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-zinc-900/50 border-zinc-700'}`}>
                <h3 className="text-xl font-semibold mb-4 text-primary">Thông tin cá nhân</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Họ và tên</p>
                    <p className={`text-lg font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{selectedAccount.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Ngày sinh</p>
                    <p className={`text-lg ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{selectedAccount.birthDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Số điện thoại</p>
                    <p className={`text-lg ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{selectedAccount.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Ngày đăng ký</p>
                    <p className={`text-lg ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{selectedAccount.registeredDate}</p>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg p-6 border ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-zinc-900/50 border-zinc-700'}`}>
                <h3 className="text-xl font-semibold mb-4 text-primary">Bảo mật</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Câu hỏi bí mật</p>
                    <p className={`text-lg rounded px-4 py-3 border ${isLightMode ? 'bg-gray-100 border-gray-200 text-gray-900' : 'bg-zinc-800/80 border-zinc-700 text-white'}`}>{selectedAccount.secretQuestion}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-zinc-400'}`}>Câu trả lời</p>
                    <p className={`text-lg rounded px-4 py-3 border ${isLightMode ? 'bg-gray-100 border-gray-200 text-gray-900' : 'bg-zinc-800/80 border-zinc-700 text-white'}`}>{selectedAccount.secretAnswer}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  )
}
