"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Eye, EyeOff, Moon, Sun } from "lucide-react"

const mockContent = [
  {
    id: "CMS001",
    type: "announcement",
    title: "Bảo trì hệ thống",
    content: "Server sẽ bảo trì từ 2:00 - 5:00 ngày 20/12/2024",
    status: "published",
    createdAt: "2024-12-10 10:00:00",
    updatedAt: "2024-12-10 10:00:00"
  },
  {
    id: "CMS002",
    type: "news",
    title: "Sự kiện Giáng Sinh 2024",
    content: "Tham gia sự kiện săn quà Giáng Sinh để nhận nhiều phần thưởng hấp dẫn...",
    status: "published",
    createdAt: "2024-12-05 14:30:00",
    updatedAt: "2024-12-05 14:30:00"
  },
  {
    id: "CMS003",
    type: "warning",
    title: "Cảnh báo lừa đảo",
    content: "Cảnh báo: Không chia sẻ mật khẩu cho bất kỳ ai. Admin không bao giờ hỏi mật khẩu của bạn.",
    status: "draft",
    createdAt: "2024-12-12 09:15:00",
    updatedAt: "2024-12-12 09:15:00"
  }
]

export default function CMSPage() {
  const [contents, setContents] = useState(mockContent)
  const [editingContent, setEditingContent] = useState<typeof mockContent[0] | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [hideData, setHideData] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  const maskData = (data: string) => hideData ? "*".repeat(10) : data
  
  const [formData, setFormData] = useState({
    type: "announcement",
    title: "",
    content: "",
    status: "draft"
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedContents = [...contents].sort((a, b) => {
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

  const handleCreate = () => {
    setIsCreating(true)
    setEditingContent(null)
    setFormData({
      type: "announcement",
      title: "",
      content: "",
      status: "draft"
    })
  }

  const handleEdit = (content: typeof mockContent[0]) => {
    setEditingContent(content)
    setIsCreating(false)
    setFormData({
      type: content.type,
      title: content.title,
      content: content.content,
      status: content.status
    })
  }

  const handleSave = () => {
    if (isCreating) {
      const newContent = {
        id: `CMS${String(contents.length + 1).padStart(3, '0')}`,
        ...formData,
        createdAt: new Date().toLocaleString('sv-SE'),
        updatedAt: new Date().toLocaleString('sv-SE')
      }
      setContents([...contents, newContent])
    } else if (editingContent) {
      setContents(contents.map(c => 
        c.id === editingContent.id 
          ? { ...c, ...formData, updatedAt: new Date().toLocaleString('sv-SE') }
          : c
      ))
    }
    setIsCreating(false)
    setEditingContent(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa nội dung này?')) {
      setContents(contents.filter(c => c.id !== id))
    }
  }

  const getTypeBadge = (type: string) => {
    switch(type) {
      case "announcement":
        return <Badge variant="default">Thông báo</Badge>
      case "news":
        return <Badge className="bg-blue-600">Tin tức</Badge>
      case "warning":
        return <Badge variant="destructive">Cảnh báo</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "published" 
      ? <Badge variant="default" className="bg-green-600">Đã xuất bản</Badge>
      : <Badge variant="secondary">Bản nháp</Badge>
  }

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-50' : 'bg-zinc-900'}`}>
      <div className="container mx-auto p-6 pt-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Quản Lý Nội Dung (CMS)</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsLightMode(!isLightMode)}
            className={isLightMode ? 'bg-white border-gray-300' : 'bg-zinc-800 border-zinc-700'}
          >
            {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button onClick={handleCreate}>+ Tạo nội dung mới</Button>
        </div>
      </div>

      {(isCreating || editingContent) && (
        <Card className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}>
          <CardHeader>
            <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>{isCreating ? "Tạo nội dung mới" : "Chỉnh sửa nội dung"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className={isLightMode ? 'text-gray-900' : ''}>
                  Loại nội dung
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Thông báo</SelectItem>
                    <SelectItem value="news">Tin tức</SelectItem>
                    <SelectItem value="warning">Cảnh báo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className={isLightMode ? 'text-gray-900' : ''}>
                  Trạng thái
                </Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Bản nháp</SelectItem>
                    <SelectItem value="published">Xuất bản</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="title" className={isLightMode ? 'text-gray-900' : ''}>
                Tiêu đề
              </Label>
              <Input 
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Nhập tiêu đề..."
              />
            </div>
            <div>
              <Label htmlFor="content" className={isLightMode ? 'text-gray-900' : ''}>
                Nội dung
              </Label>
              <Textarea 
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Nhập nội dung..."
                rows={6}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>Lưu</Button>
              <Button variant="outline" onClick={() => { setIsCreating(false); setEditingContent(null); }}>
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className={isLightMode ? 'bg-white border-gray-200' : 'bg-zinc-800/50 border-zinc-700'}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={isLightMode ? 'text-gray-900' : 'text-white'}>Danh sách nội dung ({contents.length})</CardTitle>
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
                    Mã <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[130px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("type")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Loại <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("title")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Tiêu đề <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[140px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("status")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Trạng thái <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[160px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("createdAt")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Ngày tạo <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[160px] px-4">
                  <Button variant="ghost" size="sm" onClick={() => handleSort("updatedAt")} className={`h-8 px-2 ${isLightMode ? 'text-gray-900' : ''}`}>
                    Cập nhật <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className={`text-right w-[160px] pr-6 ${isLightMode ? 'text-gray-900' : ''}`}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedContents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className={`font-medium pl-6 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(content.id)}</TableCell>
                  <TableCell className="px-4">{hideData ? <Badge>**********</Badge> : getTypeBadge(content.type)}</TableCell>
                  <TableCell className={`max-w-xs truncate px-4 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{maskData(content.title)}</TableCell>
                  <TableCell className="px-4">{hideData ? <Badge>**********</Badge> : getStatusBadge(content.status)}</TableCell>
                  <TableCell className={`text-sm px-4 ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>{maskData(content.createdAt)}</TableCell>
                  <TableCell className={`text-sm px-4 ${isLightMode ? 'text-gray-600' : 'text-muted-foreground'}`}>{maskData(content.updatedAt)}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(content)}>
                        Sửa
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(content.id)}>
                        Xóa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
