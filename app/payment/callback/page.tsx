"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

function PaymentCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  useEffect(() => {
    // Get bill_id from URL params
    const billId = searchParams.get('bill_id')
    
    // Simulate checking payment status (in real app, call API)
    setTimeout(() => {
      // You can call API here to verify payment status
      setStatus('success') // or 'failed' based on actual status
    }, 2000)
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
                Có lỗi xảy ra trong quá trình thanh toán
              </CardDescription>
            </>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {status !== 'loading' && (
            <div className="flex flex-col gap-2">
              <Link href="/user">
                <Button className="w-full">
                  Quay về trang chủ
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
