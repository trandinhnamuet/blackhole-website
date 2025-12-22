"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Eye, EyeOff, Moon, Sun } from "lucide-react"

const mockTransactions = [
  { id: "TXN20240115001", accountId: "ACC001", method: "Thẻ cào Viettel", amount: 100000, status: "success", receivedInfo: "Nhận 100,000 VNĐ - Tặng 10,000 VNĐ", timestamp: "2024-01-15 10:30:25" },
  { id: "TXN20240115002", accountId: "ACC001", method: "Chuyển khoản ngân hàng", amount: 500000, status: "success", receivedInfo: "Nhận 500,000 VNĐ - Tặng 75,000 VNĐ", timestamp: "2024-01-15 14:20:10" },
  { id: "TXN20240210001", accountId: "ACC002", method: "Ví MoMo", amount: 200000, status: "pending", receivedInfo: "Đang xử lý...", timestamp: "2024-02-10 09:15:30" },
  { id: "TXN20240210002", accountId: "ACC002", method: "Thẻ cào Vinaphone", amount: 50000, status: "failed", receivedInfo: "Thẻ không hợp lệ", timestamp: "2024-02-10 16:45:55" },
  { id: "TXN20240305001", accountId: "ACC003", method: "Chuyển khoản ngân hàng", amount: 1000000, status: "success", receivedInfo: "Nhận 1,000,000 VNĐ - Tặng 200,000 VNĐ", timestamp: "2024-03-05 11:20:45" },
  { id: "TXN20240312001", accountId: "ACC004", method: "Thẻ cào Mobifone", amount: 300000, status: "success", receivedInfo: "Nhận 300,000 VNĐ - Tặng 45,000 VNĐ", timestamp: "2024-03-12 15:10:12" },
  { id: "TXN20240418001", accountId: "ACC005", method: "Ví ZaloPay", amount: 150000, status: "success", receivedInfo: "Nhận 150,000 VNĐ - Tặng 20,000 VNĐ", timestamp: "2024-04-18 08:25:33" },
  { id: "TXN20240522001", accountId: "ACC006", method: "Chuyển khoản ngân hàng", amount: 800000, status: "success", receivedInfo: "Nhận 800,000 VNĐ - Tặng 150,000 VNĐ", timestamp: "2024-05-22 12:40:18" },
  { id: "TXN20240630001", accountId: "ACC007", method: "Thẻ cào Viettel", amount: 100000, status: "pending", receivedInfo: "Đang xử lý...", timestamp: "2024-06-30 17:55:42" },
  { id: "TXN20240714001", accountId: "ACC008", method: "Ví MoMo", amount: 400000, status: "success", receivedInfo: "Nhận 400,000 VNĐ - Tặng 60,000 VNĐ", timestamp: "2024-07-14 09:30:27" },
  { id: "TXN20240825001", accountId: "ACC009", method: "Chuyển khoản ngân hàng", amount: 600000, status: "success", receivedInfo: "Nhận 600,000 VNĐ - Tặng 100,000 VNĐ", timestamp: "2024-08-25 14:15:55" },
  { id: "TXN20240911001", accountId: "ACC010", method: "Thẻ cào Vinaphone", amount: 200000, status: "failed", receivedInfo: "Mã thẻ sai", timestamp: "2024-09-11 11:22:08" },
  { id: "TXN20241005001", accountId: "ACC011", method: "Ví ZaloPay", amount: 350000, status: "success", receivedInfo: "Nhận 350,000 VNĐ - Tặng 50,000 VNĐ", timestamp: "2024-10-05 16:48:31" },
  { id: "TXN20241020001", accountId: "ACC012", method: "Chuyển khoản ngân hàng", amount: 250000, status: "success", receivedInfo: "Nhận 250,000 VNĐ - Tặng 35,000 VNĐ", timestamp: "2024-10-20 10:05:19" },
  { id: "TXN20241108001", accountId: "ACC013", method: "Thẻ cào Mobifone", amount: 500000, status: "success", receivedInfo: "Nhận 500,000 VNĐ - Tặng 75,000 VNĐ", timestamp: "2024-11-08 13:38:44" }
]

export default function TransactionsPage() {
  const [search, setSearch] = useState("")
  const [accountFilter, setAccountFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [hideData, setHideData] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  const maskData = (data: string | number) => hideData ? "*".repeat(10) : data.toString()

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredTransactions = mockTransactions.filter(txn => {
    const matchSearch = txn.id.toLowerCase().includes(search.toLowerCase()) ||
                       txn.method.toLowerCase().includes(search.toLowerCase())
    const matchAccount = !accountFilter || txn.accountId === accountFilter
    return matchSearch && matchAccount
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn as keyof typeof a]
    const bVal = b[sortColumn as keyof typeof b]
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = sortedTransactions.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "success":
        return <Badge variant="default" className="bg-green-600">Thành công</Badge>
      case "pending":
        return <Badge variant="secondary">Đang xử lý</Badge>
      case "failed":
        return <Badge variant="destructive">Thất bại</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-50' : 'bg-zinc-900'}`}>
      <div className="container mx-auto p-6 pt-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Tra Cứu Log Giao Dịch</h1>
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
          <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>Bộ lọc tìm kiếm</CardTitle>
          <CardDescription className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>Tìm kiếm theo mã giao dịch, phương thức thanh toán hoặc mã tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search" className={isLightMode ? 'text-gray-900' : ''}>
                Mã giao dịch / Phương thức
              </Label>
              <Input 
                id="search"
                placeholder="Nhập mã giao dịch hoặc phương thức..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="account" className={isLightMode ? 'text-gray-900' : ''}>
                Lọc theo tài khoản
              </Label>
              <Input 
                id="account"
                placeholder="Nhập mã tài khoản..." 
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>Danh sách giao dịch ({filteredTransactions.length})</CardTitle>
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
                <TableHead className="w-[140px] pl-6">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("id")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Mã GD <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[100px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("accountId")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Mã TK <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("method")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Phương thức TT <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right w-[130px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("amount")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Số tiền <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[130px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("status")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Trạng thái <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className={`w-[250px] px-4 ${isLightMode ? 'text-gray-900' : ''}`}>Thông tin nhận</TableHead>
                <TableHead className="w-[160px] pr-6">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("timestamp")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Thời gian <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className={`font-medium pl-6 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(txn.id)}</TableCell>
                  <TableCell className={`px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(txn.accountId)}</TableCell>
                  <TableCell className={`px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(txn.method)}</TableCell>
                  <TableCell className={`text-right font-semibold px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                    {hideData ? "**********" : txn.amount.toLocaleString('vi-VN') + " VNĐ"}
                  </TableCell>
                  <TableCell className="px-4">{hideData ? <Badge>**********</Badge> : getStatusBadge(txn.status)}</TableCell>
                  <TableCell className={`max-w-[250px] truncate px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(txn.receivedInfo)}</TableCell>
                  <TableCell className={`text-sm pr-6 ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>{maskData(txn.timestamp)}</TableCell>
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
                trên tổng {sortedTransactions.length} bản ghi
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
      </div>
    </div>
  )
}
