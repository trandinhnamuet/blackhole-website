"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3012';

interface PaymentInfo {
  status: string;
  amount: number;
  gpayTransId?: string;
  gpayBillId?: string;
  merchantOrderId: string;
  createdAt: string;
  callbackReceivedAt?: string;
}

function PaymentCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Get merchant_order_id or bill_id from URL params
        const merchantOrderId = searchParams.get('merchant_order_id') || searchParams.get('request_id')
        const billId = searchParams.get('bill_id') || searchParams.get('gpay_bill_id')
        
        if (!merchantOrderId && !billId) {
          setError('Không tìm thấy thông tin thanh toán')
          setStatus('failed')
          return
        }

        console.log('Checking payment status...', { merchantOrderId, billId })

        // Wait a bit for callback to be processed
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Call backend API to get payment status
        const queryParams = new URLSearchParams()
        if (merchantOrderId) queryParams.append('merchant_order_id', merchantOrderId)
        if (billId) queryParams.append('gpay_bill_id', billId)

        const response = await fetch(`${API_URL}/wallet/payment-status?${queryParams}`, {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Không thể kiểm tra trạng thái thanh toán')
        }

        const data = await response.json()
        setPaymentInfo(data)

        if (data.status === 'ORDER_SUCCESS') {
          setStatus('success')
        } else if (data.status === 'ORDER_FAILED' || data.status === 'FAILED') {
          setStatus('failed')
        } else {
          // Still processing
          setStatus('loading')
          // Retry after a few seconds
          setTimeout(checkPaymentStatus, 3000)
        }
      } catch (err: any) {
        console.error('Error checking payment status:', err)
        setError(err.message || 'Có lỗi xảy ra')
        setStatus('failed')
      }
    }

    checkPaymentStatus()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
              <CardTitle>Đang xử lý thanh toán</CardTitle>
              <CardDescription>Vui lòng chờ trong giây lát...</CardDescription>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-green-500">Thanh toán thành công!</CardTitle>
              <CardDescription>
                Số tiền đã được nạp vào ví của bạn
              </CardDescription>
            </>
          )}
          
          {status === 'failed' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-red-500">Thanh toán thất bại</CardTitle>
              <CardDescription>
                {error || 'Có lỗi xảy ra trong quá trình thanh toán'}
              </CardDescription>
            </>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {paymentInfo && status !== 'loading' && (
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số tiền:</span>
                <span className="font-semibold">{Number(paymentInfo.amount).toLocaleString('vi-VN')} VND</span>
              </div>
              {paymentInfo.gpayTransId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mã GD:</span>
                  <span className="font-mono text-xs">{paymentInfo.gpayTransId}</span>
                </div>
              )}
              {paymentInfo.merchantOrderId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mã đơn:</span>
                  <span className="font-mono text-xs">{paymentInfo.merchantOrderId.substring(0, 20)}...</span>
                </div>
              )}
            </div>
          )}

          {status !== 'loading' && (
            <div className="flex flex-col gap-2">
              <Link href="/user">
                <Button className="w-full">
                  {status === 'success' ? 'Xem ví của tôi' : 'Quay về trang chủ'}
                </Button>
              </Link>
              
              {status === 'failed' && (
                <Link href="/user">
                  <Button variant="outline" className="w-full">
                    Thử lại
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  )
}
