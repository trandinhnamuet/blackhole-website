"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Clock,
  DollarSign,
  Search,
  Briefcase,
  Heart,
  Coffee,
  Gamepad2,
  GraduationCap,
  Upload,
  ChevronRight,
  Users,
  Building,
} from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const jobs = [
  {
    id: 1,
    title: "Senior Unity Developer",
    department: "Engineering",
    departmentVi: "Kỹ thuật",
    location: "Ho Chi Minh City",
    locationVi: "TP. Hồ Chí Minh",
    type: "fullTime",
    salary: "$2,000 - $4,000",
    descriptionVi:
      "Chúng tôi đang tìm kiếm Senior Unity Developer có kinh nghiệm để phát triển các tựa game MMORPG chất lượng cao.",
    descriptionEn: "We are looking for an experienced Senior Unity Developer to develop high-quality MMORPG games.",
    requirementsVi: [
      "5+ năm kinh nghiệm với Unity",
      "Thành thạo C#",
      "Kinh nghiệm với game multiplayer",
      "Hiểu biết về tối ưu hóa hiệu năng",
    ],
    requirementsEn: [
      "5+ years experience with Unity",
      "Proficient in C#",
      "Experience with multiplayer games",
      "Understanding of performance optimization",
    ],
    benefitsVi: ["Lương cạnh tranh", "Bảo hiểm sức khỏe", "13 tháng lương", "Môi trường làm việc gaming"],
    benefitsEn: ["Competitive salary", "Health insurance", "13th month salary", "Gaming work environment"],
  },
  {
    id: 2,
    title: "Game Designer",
    department: "Design",
    departmentVi: "Thiết kế",
    location: "Ho Chi Minh City",
    locationVi: "TP. Hồ Chí Minh",
    type: "fullTime",
    salary: "$1,500 - $3,000",
    descriptionVi: "Thiết kế gameplay, hệ thống game và cân bằng cho các dự án game mới.",
    descriptionEn: "Design gameplay, game systems and balance for new game projects.",
    requirementsVi: [
      "3+ năm kinh nghiệm game design",
      "Hiểu biết sâu về game mechanics",
      "Kỹ năng phân tích và document",
      "Đam mê MMORPG",
    ],
    requirementsEn: [
      "3+ years game design experience",
      "Deep understanding of game mechanics",
      "Analysis and documentation skills",
      "Passion for MMORPG",
    ],
    benefitsVi: ["Lương cạnh tranh", "Game library miễn phí", "Team building hàng tháng"],
    benefitsEn: ["Competitive salary", "Free game library", "Monthly team building"],
  },
  {
    id: 3,
    title: "3D Artist",
    department: "Art",
    departmentVi: "Nghệ thuật",
    location: "Da Nang / Remote",
    locationVi: "Đà Nẵng / Remote",
    type: "fullTime",
    salary: "$1,200 - $2,500",
    descriptionVi: "Tạo các model 3D character, môi trường và props cho game.",
    descriptionEn: "Create 3D character models, environments and props for games.",
    requirementsVi: [
      "Thành thạo Maya/3DS Max/Blender",
      "Kinh nghiệm với Substance Painter",
      "Portfolio ấn tượng",
      "Hiểu biết về game art pipeline",
    ],
    requirementsEn: [
      "Proficient in Maya/3DS Max/Blender",
      "Experience with Substance Painter",
      "Impressive portfolio",
      "Understanding of game art pipeline",
    ],
    benefitsVi: ["Làm việc remote", "Thiết bị làm việc cao cấp", "Đào tạo nâng cao"],
    benefitsEn: ["Remote work", "High-end work equipment", "Advanced training"],
  },
  {
    id: 4,
    title: "QA Tester",
    department: "QA",
    departmentVi: "Kiểm thử",
    location: "Ho Chi Minh City",
    locationVi: "TP. Hồ Chí Minh",
    type: "fullTime",
    salary: "$800 - $1,500",
    descriptionVi: "Kiểm thử và báo cáo bug cho các tựa game đang phát triển.",
    descriptionEn: "Test and report bugs for games in development.",
    requirementsVi: ["1+ năm kinh nghiệm QA", "Kỹ năng viết bug report", "Chơi game giỏi", "Tỉ mỉ, cẩn thận"],
    requirementsEn: ["1+ year QA experience", "Bug report writing skills", "Good gaming skills", "Detail-oriented"],
    benefitsVi: ["Được chơi game trước release", "Môi trường năng động", "Cơ hội thăng tiến"],
    benefitsEn: ["Play games before release", "Dynamic environment", "Career advancement"],
  },
  {
    id: 5,
    title: "Community Manager",
    department: "Marketing",
    departmentVi: "Marketing",
    location: "Remote",
    locationVi: "Remote",
    type: "fullTime",
    salary: "$1,000 - $2,000",
    descriptionVi: "Quản lý và phát triển cộng đồng người chơi trên các nền tảng.",
    descriptionEn: "Manage and grow player community across platforms.",
    requirementsVi: [
      "2+ năm kinh nghiệm community management",
      "Kỹ năng giao tiếp tốt",
      "Hiểu biết về social media",
      "Yêu thích game",
    ],
    requirementsEn: [
      "2+ years community management experience",
      "Good communication skills",
      "Social media knowledge",
      "Gaming enthusiast",
    ],
    benefitsVi: ["100% remote", "Flexible time", "Game vouchers"],
    benefitsEn: ["100% remote", "Flexible time", "Game vouchers"],
  },
]

const benefits = [
  {
    icon: DollarSign,
    titleVi: "Lương Cạnh Tranh",
    titleEn: "Competitive Salary",
    descVi: "Mức lương hấp dẫn cùng thưởng hiệu suất",
    descEn: "Attractive salary with performance bonuses",
  },
  {
    icon: Heart,
    titleVi: "Bảo Hiểm Toàn Diện",
    titleEn: "Full Insurance",
    descVi: "Bảo hiểm sức khỏe cho bạn và gia đình",
    descEn: "Health insurance for you and family",
  },
  {
    icon: Coffee,
    titleVi: "Môi Trường Tuyệt Vời",
    titleEn: "Great Environment",
    descVi: "Văn phòng hiện đại, đồ ăn nhẹ miễn phí",
    descEn: "Modern office, free snacks",
  },
  {
    icon: Gamepad2,
    titleVi: "Game Library",
    titleEn: "Game Library",
    descVi: "Truy cập miễn phí hàng nghìn game",
    descEn: "Free access to thousands of games",
  },
  {
    icon: GraduationCap,
    titleVi: "Đào Tạo & Phát Triển",
    titleEn: "Training & Growth",
    descVi: "Cơ hội học tập và phát triển liên tục",
    descEn: "Continuous learning opportunities",
  },
  {
    icon: Users,
    titleVi: "Team Building",
    titleEn: "Team Building",
    descVi: "Hoạt động team building hàng tháng",
    descEn: "Monthly team building activities",
  },
]

export default function CareersPage() {
  const { t, locale } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const departments = ["all", ...new Set(jobs.map((j) => j.department))]

  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDepartment && matchesSearch
  })

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/c-e1-ba-a3nh-209.png" alt="Careers Background" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">{t.careers.subtitle}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.careers.title}</h1>
            <p className="text-xl text-muted-foreground">{t.careers.description}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "200+", labelVi: "Nhân sự", labelEn: "Team Members" },
              { value: "5", labelVi: "Văn phòng", labelEn: "Offices" },
              { value: "15+", labelVi: "Vị trí đang tuyển", labelEn: "Open Positions" },
              { value: "50+", labelVi: "Quốc gia", labelEn: "Countries" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-card/60 to-card/40 border border-primary/20 hover:border-primary/40 transition-colors text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{locale === "vi" ? stat.labelVi : stat.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.careers.benefits}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === "vi"
                ? "Chúng tôi tin rằng nhân viên hạnh phúc tạo ra sản phẩm tuyệt vời"
                : "We believe happy employees create great products"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <Card key={i} className="p-6 bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{locale === "vi" ? benefit.titleVi : benefit.titleEn}</h3>
                <p className="text-sm text-muted-foreground">{locale === "vi" ? benefit.descVi : benefit.descEn}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.careers.openPositions}</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={locale === "vi" ? "Tìm kiếm vị trí..." : "Search positions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                  className={selectedDepartment === dept ? "bg-primary" : "bg-transparent"}
                >
                  {dept === "all" ? (locale === "vi" ? "Tất cả" : "All") : dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="p-6 bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge variant="outline">{locale === "vi" ? job.departmentVi : job.department}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {locale === "vi" ? job.descriptionVi : job.descriptionEn}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {locale === "vi" ? job.locationVi : job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {t.careers[job.type as keyof typeof t.careers]}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2 bg-transparent">
                          {locale === "vi" ? "Chi tiết" : "Details"}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{job.title}</DialogTitle>
                          <DialogDescription>
                            {locale === "vi" ? job.departmentVi : job.department} •{" "}
                            {locale === "vi" ? job.locationVi : job.location}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 pt-4">
                          <div>
                            <h4 className="font-semibold mb-2">{t.careers.requirements}</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {(locale === "vi" ? job.requirementsVi : job.requirementsEn).map((req, i) => (
                                <li key={i}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">{t.careers.benefits}</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {(locale === "vi" ? job.benefitsVi : job.benefitsEn).map((ben, i) => (
                                <li key={i}>{ben}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-accent gap-2">{t.careers.applyNow}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {locale === "vi" ? "Ứng tuyển" : "Apply"}: {job.title}
                          </DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{locale === "vi" ? "Họ và tên" : "Full name"}</Label>
                              <Input className="bg-secondary/50" />
                            </div>
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input type="email" className="bg-secondary/50" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>{locale === "vi" ? "Số điện thoại" : "Phone"}</Label>
                            <Input className="bg-secondary/50" />
                          </div>
                          <div className="space-y-2">
                            <Label>{locale === "vi" ? "Giới thiệu bản thân" : "About yourself"}</Label>
                            <Textarea className="bg-secondary/50" rows={4} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t.careers.uploadCV}</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                {locale === "vi"
                                  ? "Kéo thả hoặc click để upload CV"
                                  : "Drag & drop or click to upload CV"}
                              </p>
                            </div>
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
                            {t.common.submit}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {locale === "vi" ? "Không tìm thấy vị trí phù hợp" : "No matching positions found"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/20 via-card to-accent/20 border-border/50 text-center">
            <Building className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === "vi" ? "Không tìm thấy vị trí phù hợp?" : "Can't find a suitable position?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {locale === "vi"
                ? "Gửi CV của bạn cho chúng tôi, chúng tôi sẽ liên hệ khi có vị trí phù hợp!"
                : "Send us your CV, we'll contact you when a suitable position opens!"}
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              {locale === "vi" ? "Gửi CV ngay" : "Submit CV"}
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}
