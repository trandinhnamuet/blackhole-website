"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Users, Trophy, Palette, ChevronRight } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function CommunitySection() {
  const { t } = useLocale()

  const communityFeatures = [
    {
      icon: Palette,
      title: t.community.fanArt,
      count: "5,000+",
    },
    {
      icon: Users,
      title: t.community.forum,
      count: "50,000+",
    },
    {
      icon: Trophy,
      title: t.community.leaderboard,
      count: "Top 100",
    },
    {
      icon: MessageCircle,
      title: "Discord",
      count: "100,000+",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/images/c-e1-ba-a3nh-209.png" alt="Community" fill className="object-cover" />
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image src="/images/c-e1-ba-a3nh-206.png" alt="Community" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image src="/images/c-e1-ba-a3nh-207.png" alt="Community" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/c4-90-e1-bb-99c-20gi-c3-a1c-20h-e1-bb-8fa-20th-e1-ba-a7n.png"
                  alt="Community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
              {t.community.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.community.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Gia nhập cộng đồng BlackHoleGame với hàng triệu game thủ từ khắp nơi trên thế giới. Chia sẻ kinh nghiệm,
              tham gia sự kiện và kết nối với những người có cùng đam mê.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {communityFeatures.map((feature, index) => (
                <Card key={index} className="p-4 bg-card/50 border-border/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{feature.count}</div>
                    <div className="text-sm text-muted-foreground">{feature.title}</div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="gap-2 bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)]" asChild>
                <Link href="/community">
                  {t.community.discord}
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent" asChild>
                <Link href="/community">
                  {t.common.viewAll}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
