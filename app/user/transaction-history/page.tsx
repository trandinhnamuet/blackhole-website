"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, ArrowLeft, Receipt } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3012';

interface Payment {
  id: number;
  merchantOrderId: string;
  gpayBillId: string;
  gpayTransId: string;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  callbackReceivedAt: string;
}

export default function TransactionHistoryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setIsLoading(true)
      setError('')

      const token = localStorage.getItem('blackhole_access_token')
      if (!token) {
        setError('Vui lòng đăng nhập')
        return
      }

      const response = await fetch(`${API_URL}/wallet/payments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Không thể tải lịch sử giao dịch')
      }

      const data = await response.json()
      setPayments(data)
    } catch (err: any) {
      console.error('Error fetching payments:', err)
      setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ORDER_SUCCESS':
        return <Badge className="bg-green-600">Thành công</Badge>
      case 'PROCESSING':
        return <Badge variant="secondary">Đang xử lý</Badge>
      case 'PENDING':
        return <Badge variant="secondary">Chờ thanh toán</Badge>
      case 'ORDER_FAILED':
      case 'FAILED':
        return <Badge variant="destructive">Thất bại</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto p-6 pt-24 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/user')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Lịch Sử Nạp Tiền</h1>
              <p className="text-muted-foreground">Xem lại các giao dịch nạp tiền của bạn</p>
            </div>
          </div>
        </div>

        {error && (
          <Card className="bg-red-500/10 border-red-500">
            <CardContent className="pt-6">
              <p className="text-red-500">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Danh Sách Giao Dịch</CardTitle>
            <CardDescription>
              Tổng số: {payments.length} giao dịch
            </CardDescription>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Chưa có giao dịch nào</p>
                <Button 
                  className="mt-4"
                  onClick={() => router.push('/user')}
                >
                  Nạp tiền ngay
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Mã đơn</TableHead>
                      <TableHead className="text-zinc-400">Số tiền</TableHead>
                      <TableHead className="text-zinc-400">Phương thức</TableHead>
                      <TableHead className="text-zinc-400">Trạng thái</TableHead>
                      <TableHead className="text-zinc-400">Thời gian</TableHead>
                      <TableHead className="text-zinc-400">Hoàn thành</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id} className="border-zinc-700 hover:bg-zinc-800/50">
                        <TableCell className="font-mono text-sm text-zinc-300">
                          {payment.merchantOrderId.substring(0, 20)}...
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          {Number(payment.amount).toLocaleString('vi-VN')} VND
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {payment.paymentMethod || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(payment.status)}
                        </TableCell>
                        <TableCell className="text-sm text-zinc-400">
                          {formatDate(payment.createdAt)}
                        </TableCell>
                        <TableCell className="text-sm text-zinc-400">
                          {payment.callbackReceivedAt ? formatDate(payment.callbackReceivedAt) : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
