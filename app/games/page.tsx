"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Star, Users, Download, Monitor, Smartphone, Apple, ChevronRight } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const games = [
  {
    id: "vhtk2",
    title: "Võ Hiệp Truyền Kỳ 2",
    titleEn: "Martial Arts Legend 2",
    subtitle: "MMORPG Võ Hiệp",
    subtitleEn: "Martial Arts MMORPG",
    description:
      "MMORPG võ hiệp đỉnh cao với thế giới mở rộng lớn, hệ thống chiến đấu đa dạng và cốt truyện hấp dẫn. Hàng trăm kỹ năng võ công, hệ thống phái, và các hoạt động PvP/PvE phong phú.",
    descriptionEn:
      "Ultimate martial arts MMORPG with vast open world, diverse combat system and engaging storyline. Hundreds of martial arts skills, faction system, and rich PvP/PvE activities.",
    image: "/images/vhtk2/vhtk_banner.jpg",
    screenshots: [
      "/images/vhtk2/vhtk1.jpg",
      "/images/vhtk2/vhtk2.png",
      "/images/vhtk2/vhtk3.jpg",
    ],
    status: "live",
    rating: 4.8,
    players: "5M+",
    downloads: "10M+",
    platforms: ["android", "ios", "pc"],
    features: [
      { vi: "Thế giới mở rộng lớn", en: "Vast Open World" },
      { vi: "100+ kỹ năng võ công", en: "100+ Martial Skills" },
      { vi: "Hệ thống phái đa dạng", en: "Diverse Faction System" },
      { vi: "PvP/PvE phong phú", en: "Rich PvP/PvE Content" },
    ],
    technologies: ["Unity 3D", "C#", "MySQL", "Redis", "WebSocket"],
  },
  
  {
    id: "Kiếm Thần Vô Song",
    title: "Kiếm Thần Vô Song Mobile",
    titleEn: "Kiếm Thần Vô Song Mobile",
    subtitle: "Strategy Game",
    subtitleEn: "Strategy Game",
    description:
      "Game chiến thuật sắp ra mắt với hệ thống quân đội độc đáo, chiến đấu chiến lược và chinh phục lãnh thổ.",
    descriptionEn:
      "Upcoming strategy game with unique army system, tactical combat and territorial conquest.",
    image: "/images/vhtk2/ktvs.png",
    screenshots: [
      "/images/vhtk2/ktvs.png",
    ],
    status: "coming",
    rating: 0,
    players: "0",
    downloads: "0",
    platforms: ["android", "ios"],
    features: [
      { vi: "Chiến lược sâu", en: "Deep Strategy" },
      { vi: "Quân đội đa dạng", en: "Diverse Armies" },
      { vi: "Chinh phục vương quốc", en: "Kingdom Conquest" },
      { vi: "Liên minh chiến thuật", en: "Alliance Warfare" },
    ],
    technologies: ["Unreal Engine", "C++"],
  },
  {
    id: "Kiếm Hiệp Thế Giới",
    title: "Kiếm Hiệp Thế Giới Mobile",
    titleEn: "Kiếm Hiệp Thế Giới Mobile",
    subtitle: "Character RPG",
    subtitleEn: "Character RPG",
    description:
      "Game nhân vật sắp ra mắt với các nhân vật độc đáo, kỹ năng đa dạng và câu chuyện hấp dẫn.",
    descriptionEn:
      "Upcoming character RPG with unique heroes, diverse skills and compelling storylines.",
    image: "/images/vhtk2/khtg.png",
    screenshots: [
      "/images/vhtk2/khtg.png",
    ],
    status: "coming",
    rating: 0,
    players: "0",
    downloads: "0",
    platforms: ["android", "ios"],
    features: [
      { vi: "Nhân vật độc đáo", en: "Unique Characters" },
      { vi: "Kỹ năng đa dạng", en: "Diverse Skills" },
      { vi: "Phát triển nhân vật", en: "Character Growth" },
      { vi: "Câu chuyện chi tiết", en: "Detailed Storyline" },
    ],
    technologies: ["Unity 3D", "C#"],
  },
  {
    id: "b-tlbb",
    title: "B-TLBB Mobile",
    titleEn: "B-TLBB Mobile",
    subtitle: "Action RPG",
    subtitleEn: "Action RPG",
    description:
      "Game nhập vai hành động sắp ra mắt với đồ họa tuyệt đẹp, gameplay hấp dẫn và hệ thống chiến đấu độc đáo.",
    descriptionEn:
      "Upcoming action RPG with stunning graphics, engaging gameplay and unique combat system.",
    image: "/images/vhtk2/tlbb.png",
    screenshots: [
      "/images/vhtk2/tlbb.png",
    ],
    status: "coming",
    rating: 0,
    players: "0",
    downloads: "0",
    platforms: ["android", "ios"],
    features: [
      { vi: "Hành động sôi động", en: "Dynamic Action" },
      { vi: "Đồ họa HD", en: "HD Graphics" },
      { vi: "Câu chuyện hấp dẫn", en: "Compelling Story" },
      { vi: "Nhiều quái vật", en: "Various Bosses" },
    ],
    technologies: ["Unity 3D", "C#"],
  },
]

const platformIcons = {
  android: Smartphone,
  ios: Apple,
  pc: Monitor,
}

export default function GamesPage() {
  const { t, locale } = useLocale()
  const [selectedGame, setSelectedGame] = useState(games[0])
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">{t.games.featured}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.games.title}</h1>
            <p className="text-xl text-muted-foreground">{t.games.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Games Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-card/50">
              <TabsTrigger value="all">{locale === "vi" ? "Tất cả" : "All"}</TabsTrigger>
              <TabsTrigger value="live">{t.games.playNow}</TabsTrigger>
              <TabsTrigger value="coming">{t.games.upcoming}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {games.map((game) => (
                <GameCard key={game.id} game={game} locale={locale} t={t} />
              ))}
            </TabsContent>
            <TabsContent value="live" className="space-y-8">
              {games
                .filter((g) => g.status === "live")
                .map((game) => (
                  <GameCard key={game.id} game={game} locale={locale} t={t} />
                ))}
            </TabsContent>
            <TabsContent value="coming" className="space-y-8">
              {games
                .filter((g) => g.status === "coming")
                .map((game) => (
                  <GameCard key={game.id} game={game} locale={locale} t={t} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.games.technologies}</h2>
            <p className="text-muted-foreground">
              {locale === "vi"
                ? "Công nghệ tiên tiến nhất để mang đến trải nghiệm tốt nhất"
                : "Cutting-edge technologies for the best gaming experience"}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Unity 3D",
              "Unreal Engine 5",
              "C#",
              "C++",
              "WebSocket",
              "MySQL",
              "PostgreSQL",
              "Redis",
              "Kubernetes",
              "Docker",
            ].map((tech) => (
              <Badge key={tech} variant="outline" className="px-4 py-2 text-base bg-card/50">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function GameCard({ game, locale, t }: { game: (typeof games)[0]; locale: string; t: any }) {
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  return (
    <Card className="overflow-hidden bg-card/50 border-border/50">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Screenshots */}
        <div className="relative">
          <div className="relative aspect-video">
            <Image
              src={game.screenshots[activeScreenshot] || "/placeholder.svg"}
              alt={game.title}
              fill
              className="object-cover"
            />
            {game.status === "live" && (
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/50 hover:bg-primary/30 transition-colors">
                <Play className="h-6 w-6 text-primary fill-primary" />
              </button>
            )}
            <Badge
              className={`absolute top-4 left-4 ${game.status === "live" ? "bg-green-500/80" : "bg-yellow-500/80"}`}
            >
              {game.status === "live" ? t.games.playNow : t.games.comingSoon}
            </Badge>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 p-4 bg-background/50">
            {game.screenshots.map((ss, i) => (
              <button
                key={i}
                onClick={() => setActiveScreenshot(i)}
                className={`relative w-20 h-12 rounded overflow-hidden border-2 transition-colors ${
                  activeScreenshot === i ? "border-primary" : "border-transparent"
                }`}
              >
                <Image src={ss || "/placeholder.svg"} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-6 lg:p-8 flex flex-col">
          <div className="flex-1">
            <p className="text-primary text-sm font-medium mb-2">{locale === "vi" ? game.subtitle : game.subtitleEn}</p>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">{locale === "vi" ? game.title : game.titleEn}</h3>
            <p className="text-muted-foreground mb-6">{locale === "vi" ? game.description : game.descriptionEn}</p>

            {/* Stats */}
            {game.status === "live" && (
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{game.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{game.players}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-accent" />
                  <span>{game.downloads}</span>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">{t.games.features}</h4>
              <div className="flex flex-wrap gap-2">
                {game.features.map((f, i) => (
                  <Badge key={i} variant="outline" className="bg-primary/10">
                    {locale === "vi" ? f.vi : f.en}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className="flex items-center gap-3 mb-6">
              {game.platforms.map((platform) => {
                const Icon = platformIcons[platform as keyof typeof platformIcons]
                return (
                  <div
                    key={platform}
                    className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center"
                    title={platform.toUpperCase()}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {game.status === "live" ? (
              <Button className="flex-1 bg-gradient-to-r from-primary to-accent gap-2">{t.games.playNow}</Button>
            ) : (
              <Button className="flex-1" variant="secondary" disabled>
                {t.games.comingSoon}
              </Button>
            )}
            <Button variant="outline" className="gap-2 bg-transparent" asChild>
              <Link href={`/games/${game.id}`}>
                {t.games.viewDetails}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
