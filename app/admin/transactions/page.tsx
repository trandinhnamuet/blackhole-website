"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Eye, EyeOff, Moon, Sun, Loader2 } from "lucide-react"
import { withAdminAuth } from "@/lib/auth-context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3012';

interface Payment {
  id: number;
  merchantOrderId: string;
  gpayBillId: string;
  gpayTransId: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  callbackReceivedAt: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function TransactionsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [hideData, setHideData] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    fetchPayments()
  }, [pagination.page, pagination.limit, search, statusFilter])

  const fetchPayments = async () => {
    try {
      setIsLoading(true)
      
      const token = localStorage.getItem('blackhole_access_token')
      if (!token) {
        console.error('No access token')
        return
      }

      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      
      if (search) params.append('search', search)
      if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter)

      const response = await fetch(`${API_URL}/wallet/admin/payments?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch payments')
      }

      const data = await response.json()
      setPayments(data.data)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const maskData = (data: string | number) => hideData ? "*".repeat(10) : data.toString()

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedPayments = [...payments].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn as keyof typeof a]
    const bVal = b[sortColumn as keyof typeof b]
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "ORDER_SUCCESS":
        return <Badge variant="default" className="bg-green-600">Thành công</Badge>
      case "PROCESSING":
        return <Badge variant="secondary" className="bg-blue-600">Đang xử lý</Badge>
      case "PENDING":
        return <Badge variant="secondary">Chờ thanh toán</Badge>
      case "ORDER_FAILED":
      case "FAILED":
        return <Badge variant="destructive">Thất bại</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
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
          <CardDescription className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>Tìm kiếm theo mã giao dịch, email người dùng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className={isLightMode ? 'text-gray-900' : ''}>
                Tìm kiếm
              </Label>
              <Input 
                id="search"
                placeholder="Mã đơn, email..." 
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
              />
            </div>
            <div>
              <Label htmlFor="status" className={isLightMode ? 'text-gray-900' : ''}>
                Trạng thái
              </Label>
              <Select value={statusFilter} onValueChange={(value) => {
                setStatusFilter(value)
                setPagination(prev => ({ ...prev, page: 1 }))
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="ORDER_SUCCESS">Thành công</SelectItem>
                  <SelectItem value="PROCESSING">Đang xử lý</SelectItem>
                  <SelectItem value="PENDING">Chờ thanh toán</SelectItem>
                  <SelectItem value="ORDER_FAILED">Thất bại</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={fetchPayments} className="w-full">
                Tìm kiếm
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>
              Danh sách giao dịch ({pagination.total})
            </CardTitle>
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
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[100px] pl-6">ID</TableHead>
                      <TableHead className="w-[180px]">Mã đơn hàng</TableHead>
                      <TableHead className="w-[200px]">Email / Tên</TableHead>
                      <TableHead className="text-right w-[130px]">Số tiền</TableHead>
                      <TableHead className="w-[130px]">Trạng thái</TableHead>
                      <TableHead className="w-[150px]">Phương thức</TableHead>
                      <TableHead className="w-[160px]">Thời gian tạo</TableHead>
                      <TableHead className="w-[160px] pr-6">Hoàn thành</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPayments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                          Không có dữ liệu
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className={`font-medium pl-6 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                            {hideData ? "***" : payment.id}
                          </TableCell>
                          <TableCell className={`font-mono text-xs ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                            {hideData ? "**********" : payment.merchantOrderId.substring(0, 25) + '...'}
                          </TableCell>
                          <TableCell className={`${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                            <div className="space-y-1">
                              <div className="text-sm">{hideData ? "**********" : payment.userEmail}</div>
                              <div className="text-xs text-muted-foreground">{hideData ? "**********" : payment.userName}</div>
                            </div>
                          </TableCell>
                          <TableCell className={`text-right font-semibold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                            {hideData ? "**********" : Number(payment.amount).toLocaleString('vi-VN') + " VND"}
                          </TableCell>
                          <TableCell>
                            {hideData ? <Badge>**********</Badge> : getStatusBadge(payment.status)}
                          </TableCell>
                          <TableCell className={`${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                            {hideData ? "**********" : (payment.paymentMethod || 'N/A')}
                          </TableCell>
                          <TableCell className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
                            {hideData ? "**********" : formatDate(payment.createdAt)}
                          </TableCell>
                          <TableCell className={`text-sm pr-6 ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
                            {hideData ? "**********" : formatDate(payment.callbackReceivedAt)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between p-4 border-t border-zinc-700">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>Hiển thị</span>
                  <Select value={pagination.limit.toString()} onValueChange={(value) => {
                    setPagination(prev => ({ ...prev, limit: Number(value), page: 1 }))
                  }}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>
                    trên tổng {pagination.total} bản ghi
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page === 1}
                    className={isLightMode ? 'text-gray-900' : ''}
                  >
                    Trước
                  </Button>
                  <span className={`text-sm ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                    Trang {pagination.page} / {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                    disabled={pagination.page === pagination.totalPages}
                    className={isLightMode ? 'text-gray-900' : ''}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default withAdminAuth(TransactionsPage)
