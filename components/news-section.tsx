"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Calendar, ArrowRight } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const newsItems = [
  {
    id: 1,
    title: "Cập nhật phiên bản 2.5 - Thêm bản đồ mới",
    titleEn: "Version 2.5 Update - New Map Added",
    excerpt: "Khám phá vùng đất mới Thiên Sơn với hàng loạt nhiệm vụ và boss mới...",
    excerptEn: "Explore the new Thien Son region with new quests and bosses...",
    image: "/images/c-e1-ba-a3nh-206.png",
    category: "update",
    date: "2024-12-01",
  },
  {
    id: 2,
    title: "Sự kiện Giáng Sinh 2024",
    titleEn: "Christmas Event 2024",
    excerpt: "Tham gia sự kiện Giáng Sinh với nhiều phần quà hấp dẫn...",
    excerptEn: "Join the Christmas event with many exciting rewards...",
    image: "/images/c-e1-ba-a3nh-209.png",
    category: "event",
    date: "2024-12-15",
  },
  {
    id: 3,
    title: "BlackHoleGame đạt 10 triệu người chơi",
    titleEn: "BlackHoleGame reaches 10 million players",
    excerpt: "Cảm ơn cộng đồng đã đồng hành cùng chúng tôi trong suốt hành trình...",
    excerptEn: "Thank you community for being with us throughout the journey...",
    image: "/images/c4-90-e1-bb-99c-20gi-c3-a1c-20h-e1-bb-8fa-20th-e1-ba-a7n.png",
    category: "announcement",
    date: "2024-11-20",
  },
]

export function NewsSection() {
  const { t, locale } = useLocale()

  const getCategoryLabel = (category: string) => {
    const categories = t.news.categories as Record<string, string>
    return categories[category] || category
  }

  return (
    <section className="py-24 bg-[oklch(0.06_0.01_270)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
              {t.news.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">{t.news.title}</h2>
          </div>
          <Button variant="ghost" className="gap-2 self-start" asChild>
            <Link href="/news">
              {t.news.allNews}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <Card
              key={news.id}
              className={`overflow-hidden bg-card/50 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 border-border/50 group ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Link href={`/news/${news.id}`}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/80 text-primary-foreground">{getCategoryLabel(news.category)}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    {new Date(news.date).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {locale === "en" ? news.titleEn : news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {locale === "en" ? news.excerptEn : news.excerpt}
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
      </div>
    </section>
  )
}
