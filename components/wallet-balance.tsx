"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletBalanceProps {
  userId?: number
}

export function WalletBalance({ userId }: WalletBalanceProps) {
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [depositAmount, setDepositAmount] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Fetch balance
  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('blackhole_access_token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet/balance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBalance(data.balance)
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  // Handle deposit
  const handleDeposit = async () => {
    const amount = parseInt(depositAmount)
    
    if (!amount || amount < 10000) {
      toast({
        title: "Lỗi",
        description: "Số tiền nạp tối thiểu là 10,000 VND",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('blackhole_access_token')
      if (!token) {
        toast({
          title: "Lỗi",
          description: "Vui lòng đăng nhập",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet/deposit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      const data = await response.json()

      if (response.ok && data.billUrl) {
        // Redirect to payment page
        window.location.href = data.billUrl
      } else {
        toast({
          title: "Lỗi",
          description: data.message || "Không thể tạo đơn thanh toán",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Số dư ví</p>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nạp tiền
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nạp tiền vào ví</DialogTitle>
                <DialogDescription>
                  Nhập số tiền bạn muốn nạp (tối thiểu 10,000 VND)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Số tiền (VND)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="10000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    min="10000"
                    step="10000"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[50000, 100000, 200000, 500000, 1000000, 2000000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDepositAmount(String(amount))}
                    >
                      {formatCurrency(amount)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleDeposit} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Tiếp tục
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
