"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Heart, Sparkles, Globe, Rocket, Award } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const timeline = [
  {
    year: "2018",
    titleVi: "Khởi đầu hành trình",
    titleEn: "The Beginning",
    descVi: "BlackHoleGame được thành lập bởi một nhóm 5 developer đam mê gaming tại TP.HCM",
    descEn: "BlackHoleGame was founded by a team of 5 passionate developers in Ho Chi Minh City",
  },
  {
    year: "2019",
    titleVi: "Game đầu tiên",
    titleEn: "First Game Launch",
    descVi: "Ra mắt game mobile đầu tiên với 100,000 lượt tải trong tháng đầu tiên",
    descEn: "Launched first mobile game with 100,000 downloads in the first month",
  },
  {
    year: "2020",
    titleVi: "Mở rộng quy mô",
    titleEn: "Scaling Up",
    descVi: "Đội ngũ phát triển lên 50 người, mở văn phòng mới tại Đà Nẵng",
    descEn: "Team grew to 50 people, opened new office in Da Nang",
  },
  {
    year: "2021",
    titleVi: "Thành công quốc tế",
    titleEn: "International Success",
    descVi: "Tiêu Dao Giang Hồ đạt 1 triệu người chơi toàn cầu",
    descEn: "Tieu Dao Giang Ho reached 1 million global players",
  },
  {
    year: "2022",
    titleVi: "Giải thưởng danh giá",
    titleEn: "Prestigious Awards",
    descVi: "Đạt giải Best Mobile Game tại Vietnam Game Awards",
    descEn: "Won Best Mobile Game at Vietnam Game Awards",
  },
  {
    year: "2023",
    titleVi: "Vươn tầm châu Á",
    titleEn: "Asian Expansion",
    descVi: "Mở rộng thị trường sang Nhật Bản, Hàn Quốc và Đông Nam Á",
    descEn: "Expanded to Japan, South Korea and Southeast Asia markets",
  },
  {
    year: "2024",
    titleVi: "10 triệu người chơi",
    titleEn: "10 Million Players",
    descVi: "Đạt mốc 10 triệu người chơi trên toàn cầu với 200+ nhân sự",
    descEn: "Reached 10 million global players with 200+ team members",
  },
]

const teamMembers = [
  {
    name: "Nguyễn Văn A",
    role: "CEO & Founder",
    image: "/asian-male-ceo-professional-headshot.jpg",
  },
  {
    name: "Trần Thị B",
    role: "Creative Director",
    image: "/asian-female-creative-director-professional-headsh.jpg",
  },
  {
    name: "Lê Văn C",
    role: "Lead Developer",
    image: "/asian-male-developer-professional-headshot.jpg",
  },
  {
    name: "Phạm Thị D",
    role: "Art Director",
    image: "/asian-female-artist-professional-headshot.jpg",
  },
]

export default function AboutPage() {
  const { t, locale } = useLocale()

  const values = [
    {
      icon: Sparkles,
      title: locale === "vi" ? "Đổi Mới" : "Innovation",
      desc:
        locale === "vi"
          ? "Luôn tìm tòi và áp dụng công nghệ mới nhất"
          : "Always exploring and applying the latest technologies",
    },
    {
      icon: Heart,
      title: locale === "vi" ? "Đam Mê" : "Passion",
      desc:
        locale === "vi" ? "Yêu thích gaming là động lực cho mọi sáng tạo" : "Love for gaming drives all our creativity",
    },
    {
      icon: Target,
      title: locale === "vi" ? "Chất Lượng" : "Quality",
      desc: locale === "vi" ? "Không thỏa hiệp với chất lượng sản phẩm" : "Never compromise on product quality",
    },
    {
      icon: Users,
      title: locale === "vi" ? "Cộng Đồng" : "Community",
      desc: locale === "vi" ? "Lắng nghe và phục vụ cộng đồng game thủ" : "Listen to and serve the gaming community",
    },
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">{t.about.subtitle}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t.about.description}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "200+", label: locale === "vi" ? "Nhân sự" : "Team Members" },
              { icon: Globe, value: "50+", label: locale === "vi" ? "Quốc gia" : "Countries" },
              { icon: Rocket, value: "5+", label: locale === "vi" ? "Dự án" : "Projects" },
              { icon: Award, value: "20+", label: locale === "vi" ? "Giải thưởng" : "Awards" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.about.mission}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.about.missionText}</p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.about.vision}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.about.visionText}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about.values}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === "vi"
                ? "Những giá trị cốt lõi định hướng mọi hoạt động của chúng tôi"
                : "Core values that guide everything we do"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Card
                key={i}
                className="p-6 bg-card/50 border-border/50 hover:bg-card/80 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about.journey}</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary" />

              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-center mb-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"} pl-20 md:pl-0`}>
                    <Card className="p-6 bg-card/50 border-border/50">
                      <Badge className="mb-3 bg-primary/20 text-primary border-primary/50">{item.year}</Badge>
                      <h3 className="font-semibold text-lg mb-2">{locale === "vi" ? item.titleVi : item.titleEn}</h3>
                      <p className="text-sm text-muted-foreground">{locale === "vi" ? item.descVi : item.descEn}</p>
                    </Card>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about.team}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.about.teamText}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <Card key={i} className="overflow-hidden bg-card/50 border-border/50 group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
