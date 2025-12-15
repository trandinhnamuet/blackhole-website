"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Star,
  Users,
  Download,
  Monitor,
  Smartphone,
  Apple,
  ChevronLeft,
  Gamepad2,
  Sword,
  Users2,
  Zap,
  Shield,
  Trophy,
} from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export default function GameDetailPage() {
  const { t, locale } = useLocale()
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const gameData = {
    id: "vhtk2",
    title: "Võ Hiệp Truyền Kỳ 2",
    titleEn: "Martial Arts Legend 2",
    subtitle: "MMORPG Võ Hiệp",
    subtitleEn: "Martial Arts MMORPG",
    rating: 4.8,
    players: "5M+",
    downloads: "10M+",
    status: "live",
    description:
      "Bước vào thế giới võ hiệp đầy bí ẩn, nơi các anh hùng viết nên những huyền thoại bất tử. Võ Hiệp Truyền Kỳ 2 mang đến trải nghiệm MMORPG sâu sắc với hệ thống chiến đấu phong phú, cốt truyện hấp dẫn và cộng đồng sôi động.",
    descriptionEn:
      "Enter a mysterious martial arts world where heroes write immortal legends. Martial Arts Legend 2 offers a rich MMORPG experience with diverse combat system, engaging storyline and vibrant community.",
    image: "/images/vhtk2/vhtk_banner.jpg",
    screenshots: [
      "/images/vhtk2/vhtk1.jpg",
      "/images/vhtk2/vhtk2.png",
      "/images/vhtk2/vhtk3.jpg",
    ],
    video: "/images/vhtk2/vhtk.mp4",
    features: [
      {
        vi: "Thế giới mở rộng lớn",
        en: "Vast Open World",
        description: {
          vi: "Khám phá một thế giới võ hiệp rộng lớn với hàng trăm địa điểm, quests phong phú và những bí ẩn đang chờ bạn.",
          en: "Explore a vast martial arts world with hundreds of locations, rich quests, and mysteries waiting for you.",
        },
        icon: Sword,
      },
      {
        vi: "Hệ thống phái đa dạng",
        en: "Diverse Faction System",
        description: {
          vi: "Chọn gia phái yêu thích của bạn, học những chiêu thức độc đáo và tham gia vào các cuộc tranh đoạt quyền lực.",
          en: "Choose your favorite faction, learn unique techniques, and participate in power struggles.",
        },
        icon: Shield,
      },
      {
        vi: "100+ kỹ năng võ công",
        en: "100+ Martial Skills",
        description: {
          vi: "Làm chủ hơn 100 kỹ năng võ công khác nhau, mỗi kỹ năng có những tác động đặc biệt và chiến thuật riêng.",
          en: "Master over 100 different martial skills, each with unique effects and tactics.",
        },
        icon: Zap,
      },
      {
        vi: "PvP/PvE phong phú",
        en: "Rich PvP/PvE Content",
        description: {
          vi: "Tham gia các trận đấu PvP gay cấn, thách thức những boss huyền thoại trong dungeons hoặc hợp tác với bạn bè.",
          en: "Engage in intense PvP battles, challenge legendary bosses in dungeons, or cooperate with friends.",
        },
        icon: Trophy,
      },
      {
        vi: "Hệ thống guild mạnh mẽ",
        en: "Powerful Guild System",
        description: {
          vi: "Lập gia bang của riêng mình, nâng cao quyền lợi, chinh phục các guild khác và trở thành huyền thoại.",
          en: "Build your own guild, increase benefits, conquer other guilds, and become a legend.",
        },
        icon: Users2,
      },
      {
        vi: "Đồ họa 3D tuyệt đẹp",
        en: "Beautiful 3D Graphics",
        description: {
          vi: "Tận hưởng đồ họa 3D cao cấp với hiệu ứng skill hoành tráng, môi trường sống động và nhân vật chi tiết.",
          en: "Enjoy premium 3D graphics with spectacular skill effects, lively environments, and detailed characters.",
        },
        icon: Gamepad2,
      },
    ],
    platforms: ["android", "ios", "pc"],
    technologies: ["Unity 3D", "C#", "MySQL", "Redis", "WebSocket"],
  }

  return (
    <div className="pt-20 pb-20">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/games">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{locale === "en" ? gameData.titleEn : gameData.title}</h1>
            <p className="text-sm text-muted-foreground">{locale === "en" ? gameData.subtitleEn : gameData.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={gameData.image}
            alt={gameData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-green-500/80">{locale === "en" ? "Now Available" : "Có sẵn ngay"}</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {locale === "en" ? gameData.titleEn : gameData.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              {locale === "en" ? gameData.descriptionEn : gameData.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-6 text-lg">
                <Play className="h-5 w-5" />
                {locale === "en" ? "Play Now" : "Chơi ngay"}
              </Button>
              <Button variant="outline" className="gap-2 px-8 py-6 text-lg">
                <Download className="h-5 w-5" />
                {locale === "en" ? "Download" : "Tải về"}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-lg">{gameData.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{locale === "en" ? "Rating" : "Đánh giá"}</p>
              </div>
              <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg">{gameData.players}</span>
                </div>
                <p className="text-xs text-muted-foreground">{locale === "en" ? "Players" : "Người chơi"}</p>
              </div>
              <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-5 w-5 text-accent" />
                  <span className="font-bold text-lg">{gameData.downloads}</span>
                </div>
                <p className="text-xs text-muted-foreground">{locale === "en" ? "Downloads" : "Tải"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-card/50">
              <TabsTrigger value="video">{locale === "en" ? "Video Trailer" : "Video Giới Thiệu"}</TabsTrigger>
              <TabsTrigger value="screenshots">{locale === "en" ? "Screenshots" : "Ảnh chụp"}</TabsTrigger>
              <TabsTrigger value="features">{locale === "en" ? "Features" : "Tính năng"}</TabsTrigger>
              <TabsTrigger value="info">{locale === "en" ? "About" : "Thông tin"}</TabsTrigger>
            </TabsList>

            {/* Video Tab */}
            <TabsContent value="video" className="space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-background border border-border/50">
                <video
                  src={gameData.video}
                  controls
                  className="w-full h-full object-cover"
                  poster={gameData.image}
                >
                  {locale === "en"
                    ? "Your browser does not support the video tag."
                    : "Trình duyệt của bạn không hỗ trợ thẻ video."}
                </video>
              </div>
              <div className="flex items-center gap-4 bg-card/50 rounded-lg p-4 border border-border/50">
                <Play className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-semibold">
                    {locale === "en" ? "Game Trailer" : "Video Giới Thiệu Game"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {locale === "en"
                      ? "Watch the official trailer to get a taste of the adventure"
                      : "Xem video giới thiệu chính thức để cảm nhận cuộc phiêu lưu"}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Screenshots Tab */}
            <TabsContent value="screenshots" className="space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={gameData.screenshots[activeScreenshot]}
                  alt={`Screenshot ${activeScreenshot + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2">
                {gameData.screenshots.map((ss, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeScreenshot === i ? "border-primary" : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image src={ss} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {gameData.features.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <Card key={i} className="overflow-hidden bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/20">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2 text-lg">
                              {locale === "en" ? feature.en : feature.vi}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {locale === "en" ? feature.description.en : feature.description.vi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="info" className="space-y-8">
              {/* Platforms */}
              <div>
                <h3 className="text-2xl font-bold mb-4">{locale === "en" ? "Platforms" : "Nền tảng"}</h3>
                <div className="flex gap-4">
                  {gameData.platforms.map((platform) => {
                    let Icon, label
                    if (platform === "android") {
                      Icon = Smartphone
                      label = "Android"
                    } else if (platform === "ios") {
                      Icon = Apple
                      label = "iOS"
                    } else {
                      Icon = Monitor
                      label = "PC"
                    }
                    return (
                      <div key={platform} className="flex items-center gap-3 bg-card/50 rounded-lg p-4 border border-border/50">
                        <Icon className="h-6 w-6 text-primary" />
                        <span className="font-medium">{label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-2xl font-bold mb-4">{locale === "en" ? "Technologies" : "Công nghệ"}</h3>
                <div className="flex flex-wrap gap-2">
                  {gameData.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-primary/10 px-4 py-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* About Description */}
              <div>
                <h3 className="text-2xl font-bold mb-4">{locale === "en" ? "About This Game" : "Về trò chơi này"}</h3>
                <div className="bg-card/50 border border-border/50 rounded-lg p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en" ? gameData.descriptionEn : gameData.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "With a rich story, diverse gameplay systems, and an active community, Martial Arts Legend 2 offers countless hours of entertainment. Whether you prefer PvP combat, exploration, or guild wars, there's something for everyone."
                      : "Với cốt truyện phong phú, các hệ thống gameplay đa dạng và cộng đồng sôi động, Võ Hiệp Truyền Kỳ 2 mang đến hàng trăm giờ giải trí. Dù bạn thích chiến đấu PvP, khám phá hay chiến tranh guild, đều có thứ dành cho bạn."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl mx-4 md:mx-0">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            {locale === "en" ? "Ready to Start Your Journey?" : "Sẵn sàng bắt đầu hành trình?"}
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {locale === "en"
              ? "Join millions of players in the world of martial arts. Download now and become a legend!"
              : "Tham gia hàng triệu người chơi trong thế giới võ hiệp. Tải về ngay và trở thành huyền thoại!"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-6 text-base">
              <Play className="h-5 w-5" />
              {locale === "en" ? "Play Now" : "Chơi ngay"}
            </Button>
            <Button variant="outline" className="gap-2 px-8 py-6 text-base">
              <Download className="h-5 w-5" />
              {locale === "en" ? "Download" : "Tải về"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
