"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Search, ArrowRight, Clock } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const newsData = [
  {
    id: 1,
    title: "Cập nhật phiên bản 2.5 - Thêm bản đồ Thiên Sơn",
    titleEn: "Version 2.5 Update - New Thien Son Map",
    excerpt:
      "Khám phá vùng đất mới Thiên Sơn với hàng loạt nhiệm vụ và boss mới. Phiên bản này còn mang đến hệ thống thú cưỡi mới và cải thiện hiệu năng đáng kể.",
    excerptEn:
      "Explore the new Thien Son region with new quests and bosses. This version also brings a new mount system and significant performance improvements.",
    content: "",
    image: "/images/c-e1-ba-a3nh-206.png",
    category: "update",
    date: "2024-12-01",
    readTime: 5,
    featured: true,
  },
  {
    id: 2,
    title: "Sự kiện Giáng Sinh 2024 - Quà tặng khủng",
    titleEn: "Christmas Event 2024 - Massive Rewards",
    excerpt:
      "Tham gia sự kiện Giáng Sinh với nhiều phần quà hấp dẫn: pet huyền thoại, trang phục giới hạn, và hàng triệu gold.",
    excerptEn:
      "Join the Christmas event with many exciting rewards: legendary pets, limited costumes, and millions of gold.",
    content: "",
    image: "/images/c-e1-ba-a3nh-209.png",
    category: "event",
    date: "2024-12-15",
    readTime: 3,
    featured: true,
  },
  {
    id: 3,
    title: "BlackHoleGame đạt 10 triệu người chơi toàn cầu",
    titleEn: "BlackHoleGame reaches 10 million global players",
    excerpt:
      "Cảm ơn cộng đồng đã đồng hành cùng chúng tôi trong suốt hành trình. Nhân dịp này, chúng tôi tặng toàn bộ người chơi gói quà đặc biệt.",
    excerptEn:
      "Thank you community for being with us throughout the journey. To celebrate, we're giving all players a special gift package.",
    content: "",
    image: "/images/c4-90-e1-bb-99c-20gi-c3-a1c-20h-e1-bb-8fa-20th-e1-ba-a7n.png",
    category: "announcement",
    date: "2024-11-20",
    readTime: 4,
    featured: false,
  },
  {
    id: 4,
    title: "Hướng dẫn tân thủ: Cách build nhân vật mạnh nhất",
    titleEn: "Beginner's Guide: How to build the strongest character",
    excerpt:
      "Hướng dẫn chi tiết cách xây dựng nhân vật từ level 1 đến max level, bao gồm skill build, trang bị và chiến thuật.",
    excerptEn:
      "Detailed guide on building your character from level 1 to max level, including skill builds, equipment and tactics.",
    content: "",
    image: "/images/c-e1-ba-a3nh-207.png",
    category: "guide",
    date: "2024-11-15",
    readTime: 10,
    featured: false,
  },
  {
    id: 5,
    title: "Công bố lịch bảo trì định kỳ tháng 12",
    titleEn: "December Maintenance Schedule Announcement",
    excerpt: "Thông báo lịch bảo trì và cập nhật trong tháng 12/2024. Người chơi vui lòng sắp xếp thời gian phù hợp.",
    excerptEn: "Maintenance and update schedule for December 2024. Please plan your playtime accordingly.",
    content: "",
    image: "/images/c-e1-ba-a3nh-206.png",
    category: "announcement",
    date: "2024-11-10",
    readTime: 2,
    featured: false,
  },
  {
    id: 6,
    title: "Giải đấu PvP mùa Đông - Giải thưởng 100 triệu VNĐ",
    titleEn: "Winter PvP Tournament - 100M VND Prize Pool",
    excerpt: "Đăng ký ngay giải đấu PvP lớn nhất năm với tổng giải thưởng lên đến 100 triệu đồng tiền mặt.",
    excerptEn: "Register now for the biggest PvP tournament of the year with up to 100 million VND cash prize.",
    content: "",
    image: "/images/c-e1-ba-a3nh-209.png",
    category: "event",
    date: "2024-11-05",
    readTime: 4,
    featured: false,
  },
]

const categories = [
  { key: "all", vi: "Tất cả", en: "All" },
  { key: "update", vi: "Cập nhật", en: "Updates" },
  { key: "event", vi: "Sự kiện", en: "Events" },
  { key: "announcement", vi: "Thông báo", en: "Announcements" },
  { key: "guide", vi: "Hướng dẫn", en: "Guides" },
]

export default function NewsPage() {
  const { t, locale } = useLocale()
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNews = newsData.filter((news) => {
    const matchesCategory = activeCategory === "all" || news.category === activeCategory
    const title = locale === "vi" ? news.title : news.titleEn
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredNews = newsData.filter((n) => n.featured)

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.key === category)
    return cat ? (locale === "vi" ? cat.vi : cat.en) : category
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">{t.news.subtitle}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.news.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {locale === "vi"
                ? "Cập nhật tin tức mới nhất về game, sự kiện và cộng đồng BlackHoleGame"
                : "Latest news about games, events and BlackHoleGame community"}
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl font-bold mb-8">{locale === "vi" ? "Tin nổi bật" : "Featured News"}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredNews.map((news) => (
              <Card key={news.id} className="overflow-hidden bg-gradient-to-br from-card/60 to-card/40 border-primary/20 hover:border-primary/40 group transition-all">
                <Link href={`/news/${news.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge className="mb-3 bg-primary/80">{getCategoryLabel(news.category)}</Badge>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {locale === "vi" ? news.title : news.titleEn}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(news.date).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {news.readTime} {locale === "vi" ? "phút đọc" : "min read"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={locale === "vi" ? "Tìm kiếm tin tức..." : "Search news..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-border/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={activeCategory === cat.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.key)}
                  className={activeCategory === cat.key ? "bg-primary" : "bg-transparent"}
                >
                  {locale === "vi" ? cat.vi : cat.en}
                </Button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <Card key={news.id} className="overflow-hidden bg-card/50 border-border/50 group">
                <Link href={`/news/${news.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary/80">{getCategoryLabel(news.category)}</Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(news.date).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {news.readTime} {locale === "vi" ? "phút" : "min"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {locale === "vi" ? news.title : news.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {locale === "vi" ? news.excerpt : news.excerptEn}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                      {t.news.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {locale === "vi" ? "Không tìm thấy tin tức phù hợp" : "No matching news found"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
