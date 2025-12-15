"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Play, Star } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const games = [
  {
    id: "vhtk2",
    title: "Võ Hiệp Truyền Kỳ 2",
    titleEn: "Martial Arts Legend 2",
    description: "MMORPG võ hiệp đỉnh cao với thế giới mở rộng lớn, hệ thống chiến đấu đa dạng và cốt truyện hấp dẫn.",
    descriptionEn: "Ultimate martial arts MMORPG with vast open world, diverse combat system and engaging storyline.",
    image: "/images/vhtk2/vhtk_banner.jpg",
    video: "/images/vhtk2/vhtk.mp4",
    status: "live",
    rating: 4.8,
    players: "5M+",
  },
  
  {
    id: "Kiếm Thần Vô Song",
    title: "Kiếm Thần Vô Song Mobile",
    titleEn: "Kiếm Thần Vô Song Mobile",
    description: "Game chiến thuật sắp ra mắt với hệ thống quân đội độc đáo và chiến đấu chiến lược.",
    descriptionEn: "Upcoming strategy game with unique army system and strategic combat.",
    image: "/images/vhtk2/b-ktvs-mobile.png",
    status: "coming",
    rating: 0,
    players: "0",
  },
  {
    id: "Kiếm Hiệp Thế Giới",
    title: "Kiếm Hiệp Thế Giới Mobile",
    titleEn: "Kiếm Hiệp Thế Giới Mobile",
    description: "Game nhân vật sắp ra mắt với các nhân vật độc đáo và câu chuyện hấp dẫn.",
    descriptionEn: "Upcoming character game with unique heroes and compelling storylines.",
    image: "/images/vhtk2/khtg.png",
    status: "coming",
    rating: 0,
    players: "0",
  },
  {
    id: "b-tlbb",
    title: "B-TLBB Mobile",
    titleEn: "B-TLBB Mobile",
    description: "Game nhập vai hành động sắp ra mắt với đồ họa tuyệt đẹp và gameplay hấp dẫn.",
    descriptionEn: "Upcoming action RPG with stunning graphics and engaging gameplay.",
    image: "/images/vhtk2/b-tlbb-mobile.png",
    status: "coming",
    rating: 0,
    players: "0",
  },
]

export function GamesShowcase() {
  const { t, locale } = useLocale()
  const [activeGame, setActiveGame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    // stop video when switching games
    if (videoRef.current) {
      try {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      } catch (e) {
        // ignore
      }
    }
    setIsPlaying(false)
  }, [activeGame])

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      // attempt to play when video element is mounted
      videoRef.current.play().catch(() => {})
    }
  }, [isPlaying])

  return (
    <section className="py-24 bg-[oklch(0.06_0.01_270)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
              {t.games.featured}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">{t.games.title}</h2>
          </div>
          <Button variant="ghost" className="gap-2 self-start" asChild>
            <Link href="/games">
              {t.common.viewAll}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Game */}
          <div className="relative aspect-video lg:aspect-auto lg:row-span-2 rounded-2xl overflow-hidden group">
            <Image
              src={games[activeGame].image || "/placeholder.svg"}
              alt={games[activeGame].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Video for VHTK2 (always shown) or click-to-play for others */}
            {games[activeGame].video && String(games[activeGame].id) === "vhtk2" ? (
              <div className="absolute inset-0 z-20">
                <video
                  ref={videoRef}
                  src={String(games[activeGame].video)}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                  poster={String(games[activeGame].image)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            ) : games[activeGame].video && isPlaying ? (
              <div className="absolute inset-0 z-20">
                <video
                  ref={videoRef}
                  src={String(games[activeGame].video)}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                  poster={String(games[activeGame].image)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  if (games[activeGame].video) {
                    setIsPlaying(true)
                    // play will be triggered by effect once mounted
                  }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/50 hover:bg-primary/30 transition-colors group-hover:scale-110 duration-300"
              >
                <Play className="h-8 w-8 text-primary fill-primary" />
              </button>
            )}

            {/* Game Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
                {games[activeGame].status === "live" ? t.games.playNow : t.games.comingSoon}
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {locale === "en" ? games[activeGame].titleEn : games[activeGame].title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {locale === "en" ? games[activeGame].descriptionEn : games[activeGame].description}
              </p>
              {games[activeGame].status === "live" && (
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{games[activeGame].rating}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {games[activeGame].players} {t.stats.players}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Game Cards */}
          {games.map((game, index) => (
            <Card
              key={game.id}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                activeGame === index ? "ring-2 ring-primary bg-primary/5" : "bg-card/50 hover:bg-card/80"
              }`}
              onClick={() => setActiveGame(index)}
            >
              <div className="flex gap-4 p-4">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden shrink-0">
                  <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {game.status === "live" ? t.games.playNow : t.games.comingSoon}
                  </Badge>
                  <h4 className="font-semibold truncate">{locale === "en" ? game.titleEn : game.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {locale === "en" ? game.descriptionEn : game.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
