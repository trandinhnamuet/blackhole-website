"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"

const mockBalances = [
  { accountId: "ACC001", accountName: "dragonslayer99", transactionId: "TXN20240115001", deposited: 500000, silver: 500 },
  { accountId: "ACC002", accountName: "shadowhunter", transactionId: "TXN20240210001", deposited: 1000000, silver: 1000 },
  { accountId: "ACC003", accountName: "magicmaster", transactionId: "TXN20240305001", deposited: 200000, silver: 200 },
  { accountId: "ACC004", accountName: "firemage", transactionId: "TXN20240312001", deposited: 750000, silver: 750 },
  { accountId: "ACC005", accountName: "iceknight", transactionId: "TXN20240418001", deposited: 300000, silver: 300 },
  { accountId: "ACC006", accountName: "thundergod", transactionId: "TXN20240522001", deposited: 1200000, silver: 1200 },
  { accountId: "ACC007", accountName: "stealthninja", transactionId: "TXN20240630001", deposited: 150000, silver: 150 },
  { accountId: "ACC008", accountName: "holypriest", transactionId: "TXN20240714001", deposited: 900000, silver: 900 },
  { accountId: "ACC009", accountName: "darkarcher", transactionId: "TXN20240825001", deposited: 600000, silver: 600 },
  { accountId: "ACC010", accountName: "lightwarrior", transactionId: "TXN20240911001", deposited: 450000, silver: 450 },
  { accountId: "ACC011", accountName: "natureshaman", transactionId: "TXN20241005001", deposited: 800000, silver: 800 },
  { accountId: "ACC012", accountName: "bloodreaper", transactionId: "TXN20241020001", deposited: 350000, silver: 350 },
  { accountId: "ACC013", accountName: "windwalker", transactionId: "TXN20241108001", deposited: 1100000, silver: 1100 },
  { accountId: "ACC014", accountName: "earthguard", transactionId: "TXN20241122001", deposited: 250000, silver: 250 },
  { accountId: "ACC015", accountName: "voidwalker", transactionId: "TXN20241201001", deposited: 550000, silver: 550 }
]

export default function BalancePage() {
  const [accountSearch, setAccountSearch] = useState("")
  const [result, setResult] = useState<typeof mockBalances[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
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

  const sortedBalances = [...mockBalances].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn as keyof typeof a]
    const bVal = b[sortColumn as keyof typeof b]
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedBalances.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBalances = sortedBalances.slice(startIndex, endIndex)

  const handleSearch = () => {
    const found = mockBalances.find(
      b => b.accountId === accountSearch || b.accountName === accountSearch
    )
    setResult(found || null)
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto p-6 pt-24 space-y-6">
      <h1 className="text-3xl font-bold">Tra Cứu Số Dư</h1>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <CardTitle>Tìm kiếm tài khoản</CardTitle>
          <CardDescription>Nhập mã tài khoản hoặc tên tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Mã tài khoản / Tên tài khoản</Label>
              <Input 
                id="search"
                placeholder="Nhập mã hoặc tên tài khoản..." 
                value={accountSearch}
                onChange={(e) => setAccountSearch(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch}>Tra cứu</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle>Kết quả tra cứu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mã tài khoản</p>
                <p className="text-2xl font-bold">{result.accountId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tên tài khoản</p>
                <p className="text-2xl font-bold">{result.accountName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mã giao dịch</p>
                <p className="text-2xl font-bold">{result.transactionId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tiền đã nạp</p>
                <p className="text-2xl font-bold text-green-600">
                  {result.deposited.toLocaleString('vi-VN')} VNĐ
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Số bạc (trong game)</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {result.silver.toLocaleString('vi-VN')} Bạc
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <CardTitle>Danh sách tất cả tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[120px] pl-6">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("accountId")} className="h-8 px-2">
                    Mã tài khoản <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("accountName")} className="h-8 px-2">
                    Tên tài khoản <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("transactionId")} className="h-8 px-2">
                    Mã giao dịch <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right w-[150px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("deposited")} className="h-8 px-2">
                    Tiền đã nạp <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right w-[150px] pr-6">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("silver")} className="h-8 px-2">
                    Số bạc <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBalances.map((balance) => (
                <TableRow key={balance.accountId}>
                  <TableCell className="font-medium pl-6">{balance.accountId}</TableCell>
                  <TableCell className="px-4">{balance.accountName}</TableCell>
                  <TableCell className="px-4">{balance.transactionId}</TableCell>
                  <TableCell className="text-right text-green-600 font-semibold px-4">
                    {balance.deposited.toLocaleString('vi-VN')} VNĐ
                  </TableCell>
                  <TableCell className="text-right text-yellow-600 font-semibold pr-6">
                    {balance.silver.toLocaleString('vi-VN')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-zinc-700">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Hiển thị</span>
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
              <span className="text-sm text-muted-foreground">
                trên tổng {sortedBalances.length} bản ghi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Trước
              </Button>
              <span className="text-sm">
                Trang {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
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
