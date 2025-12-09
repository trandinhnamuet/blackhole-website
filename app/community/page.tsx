"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Trophy,
  Calendar,
  MessageSquare,
  Users,
  Heart,
  Eye,
  Share2,
  Search,
  Crown,
  Medal,
  Award,
  ExternalLink,
  Flame,
  Star,
} from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export default function CommunityPage() {
  const { t, locale } = useLocale()
  const [activeTab, setActiveTab] = useState("fanart")

  // Fan Art Data
  const fanArtworks = [
    {
      id: 1,
      image: "/images/c4-90-e1-bb-99c-20gi-c3-a1c-20h-e1-bb-8fa-20th-e1-ba-a7n.png",
      title: locale === "vi" ? "Độc Giác Hỏa Thần" : "Fire God Mount",
      artist: "ArtMaster_VN",
      likes: 1247,
      views: 5892,
      featured: true,
    },
    {
      id: 2,
      image: "/images/c-e1-ba-a3nh-206.png",
      title: locale === "vi" ? "Băng Cung Huyền Bí" : "Mystic Ice Palace",
      artist: "DragonArt99",
      likes: 986,
      views: 4231,
      featured: false,
    },
    {
      id: 3,
      image: "/images/c-e1-ba-a3nh-209.png",
      title: locale === "vi" ? "Làng Quê Thanh Bình" : "Peaceful Village",
      artist: "PixelNinja",
      likes: 754,
      views: 3102,
      featured: false,
    },
    {
      id: 4,
      image: "/images/c-e1-ba-a3nh-207.png",
      title: locale === "vi" ? "Sa Mạc Hoàng Kim" : "Golden Desert",
      artist: "GameArtLover",
      likes: 621,
      views: 2845,
      featured: false,
    },
  ]

  // Leaderboard Data
  const leaderboardData = [
    { rank: 1, name: "DragonSlayer99", level: 99, guild: "Phoenix Rising", score: 9875420, icon: Crown },
    { rank: 2, name: "ShadowNinja", level: 98, guild: "Dark Legion", score: 9654210, icon: Medal },
    { rank: 3, name: "MysticMage", level: 97, guild: "Arcane Order", score: 9432150, icon: Award },
    { rank: 4, name: "ThunderBolt", level: 96, guild: "Storm Riders", score: 9210870 },
    { rank: 5, name: "IceQueen", level: 95, guild: "Frost Empire", score: 8987650 },
    { rank: 6, name: "FireLord", level: 94, guild: "Phoenix Rising", score: 8765430 },
    { rank: 7, name: "WindWalker", level: 93, guild: "Sky Warriors", score: 8543210 },
    { rank: 8, name: "EarthShaker", level: 92, guild: "Mountain Guard", score: 8321000 },
    { rank: 9, name: "VoidMaster", level: 91, guild: "Dark Legion", score: 8098780 },
    { rank: 10, name: "LightBringer", level: 90, guild: "Holy Knights", score: 7876560 },
  ]

  // Events Data
  const events = [
    {
      id: 1,
      titleVi: "Giải Đấu Mùa Đông 2025",
      titleEn: "Winter Tournament 2025",
      descVi: "Tham gia giải đấu PvP lớn nhất năm với giải thưởng lên đến 100 triệu VNĐ",
      descEn: "Join the biggest PvP tournament of the year with prizes up to $4,000",
      date: "2025-01-15",
      status: "upcoming",
      participants: 1250,
      prize: "100,000,000 VNĐ",
    },
    {
      id: 2,
      titleVi: "Sự Kiện Tết Nguyên Đán",
      titleEn: "Lunar New Year Event",
      descVi: "Nhận quà Tết đặc biệt và tham gia các hoạt động lễ hội",
      descEn: "Receive special Lunar New Year gifts and join festive activities",
      date: "2025-01-29",
      status: "upcoming",
      participants: 5420,
      prize: locale === "vi" ? "Vật phẩm độc quyền" : "Exclusive Items",
    },
    {
      id: 3,
      titleVi: "Boss World - Thử Thách Tuần",
      titleEn: "World Boss - Weekly Challenge",
      descVi: "Đánh bại World Boss để nhận phần thưởng khủng",
      descEn: "Defeat the World Boss to earn massive rewards",
      date: "2025-01-10",
      status: "active",
      participants: 8750,
      prize: locale === "vi" ? "Trang bị huyền thoại" : "Legendary Equipment",
    },
  ]

  // Forum Topics
  const forumTopics = [
    {
      titleVi: "Hướng dẫn build nhân vật mạnh nhất Season 5",
      titleEn: "Best Character Build Guide for Season 5",
      author: "ProGamer123",
      replies: 245,
      views: 12450,
      hot: true,
    },
    {
      titleVi: "Thảo luận: Bản cập nhật 2.5 có gì mới?",
      titleEn: "Discussion: What's new in Update 2.5?",
      author: "NewsHunter",
      replies: 189,
      views: 8920,
      hot: true,
    },
    {
      titleVi: "Tìm Guild - Server Linh Xà",
      titleEn: "Looking for Guild - Linh Xa Server",
      author: "NewPlayer2025",
      replies: 34,
      views: 1205,
      hot: false,
    },
    {
      titleVi: "Bug Report: Lỗi skill không hoạt động",
      titleEn: "Bug Report: Skill not working properly",
      author: "BugFinder",
      replies: 56,
      views: 2340,
      hot: false,
    },
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Users className="h-3 w-3 mr-1" />
              10M+ {locale === "vi" ? "Thành viên" : "Members"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.community.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {locale === "vi"
                ? "Kết nối với hàng triệu game thủ, chia sẻ tác phẩm nghệ thuật, tham gia sự kiện và cạnh tranh trên bảng xếp hạng"
                : "Connect with millions of gamers, share artwork, join events, and compete on leaderboards"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-primary to-accent gap-2">
                <MessageSquare className="h-4 w-4" />
                {t.community.discord}
              </Button>
              <Button variant="outline" className="bg-transparent gap-2">
                <ExternalLink className="h-4 w-4" />
                {t.community.forum}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4 mb-12 bg-card/50 p-1">
              <TabsTrigger value="fanart" className="gap-2 data-[state=active]:bg-primary/20">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">{t.community.fanArt}</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="gap-2 data-[state=active]:bg-primary/20">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">{t.community.leaderboard}</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2 data-[state=active]:bg-primary/20">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">{t.community.events}</span>
              </TabsTrigger>
              <TabsTrigger value="forum" className="gap-2 data-[state=active]:bg-primary/20">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">{t.community.forum}</span>
              </TabsTrigger>
            </TabsList>

            {/* Fan Art Tab */}
            <TabsContent value="fanart">
              <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <h2 className="text-2xl font-bold">{t.community.fanArt}</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={locale === "vi" ? "Tìm kiếm tác phẩm..." : "Search artworks..."}
                      className="pl-10 bg-secondary/50 border-border/50 w-64"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    {locale === "vi" ? "Đăng tác phẩm" : "Submit Art"}
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {fanArtworks.map((art) => (
                  <Card
                    key={art.id}
                    className="overflow-hidden bg-card/50 border-border/50 group hover:border-primary/50 transition-all"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={art.image || "/placeholder.svg"}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {art.featured && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="flex-1 gap-1">
                            <Heart className="h-4 w-4" />
                            {art.likes}
                          </Button>
                          <Button size="sm" variant="secondary" className="gap-1">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 truncate">{art.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">by {art.artist}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {art.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {art.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="bg-transparent">
                  {locale === "vi" ? "Xem thêm tác phẩm" : "Load More Artworks"}
                </Button>
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{t.community.leaderboard}</h2>
                <p className="text-muted-foreground">
                  {locale === "vi"
                    ? "Top 10 người chơi mạnh nhất Server Linh Xà"
                    : "Top 10 strongest players on Linh Xa Server"}
                </p>
              </div>

              {/* Top 3 Podium */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {leaderboardData.slice(0, 3).map((player, i) => (
                  <Card
                    key={player.rank}
                    className={`p-6 text-center ${
                      i === 0
                        ? "md:order-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50"
                        : i === 1
                          ? "md:order-1 bg-gradient-to-br from-gray-400/20 to-gray-500/20 border-gray-400/50"
                          : "md:order-3 bg-gradient-to-br from-orange-600/20 to-orange-700/20 border-orange-600/50"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                        i === 0 ? "bg-yellow-500/30" : i === 1 ? "bg-gray-400/30" : "bg-orange-600/30"
                      }`}
                    >
                      {player.icon && (
                        <player.icon
                          className={`h-8 w-8 ${i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : "text-orange-600"}`}
                        />
                      )}
                    </div>
                    <div className="text-3xl font-bold mb-2">#{player.rank}</div>
                    <h3 className="text-xl font-semibold mb-1">{player.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Lv.{player.level} • {player.guild}
                    </p>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {player.score.toLocaleString()}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Rest of Leaderboard */}
              <Card className="bg-card/50 border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">{locale === "vi" ? "Hạng" : "Rank"}</th>
                        <th className="text-left p-4 font-semibold">{locale === "vi" ? "Người chơi" : "Player"}</th>
                        <th className="text-left p-4 font-semibold">{locale === "vi" ? "Cấp độ" : "Level"}</th>
                        <th className="text-left p-4 font-semibold">Guild</th>
                        <th className="text-right p-4 font-semibold">{locale === "vi" ? "Điểm" : "Score"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.slice(3).map((player) => (
                        <tr
                          key={player.rank}
                          className="border-t border-border/50 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="p-4 font-semibold">#{player.rank}</td>
                          <td className="p-4">{player.name}</td>
                          <td className="p-4">Lv.{player.level}</td>
                          <td className="p-4 text-muted-foreground">{player.guild}</td>
                          <td className="p-4 text-right font-semibold text-primary">{player.score.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{t.community.events}</h2>
                <p className="text-muted-foreground">
                  {locale === "vi"
                    ? "Tham gia các sự kiện hấp dẫn để nhận phần thưởng"
                    : "Join exciting events to earn rewards"}
                </p>
              </div>

              <div className="space-y-6">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 p-6 bg-gradient-to-br from-primary/20 to-accent/20 flex flex-col items-center justify-center text-center">
                        <div className="text-4xl font-bold mb-1">{new Date(event.date).getDate()}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <Badge
                          className={`mt-3 ${event.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-blue-500/20 text-blue-500 border-blue-500/30"}`}
                        >
                          {event.status === "active"
                            ? locale === "vi"
                              ? "Đang diễn ra"
                              : "Active"
                            : locale === "vi"
                              ? "Sắp tới"
                              : "Upcoming"}
                        </Badge>
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {locale === "vi" ? event.titleVi : event.titleEn}
                        </h3>
                        <p className="text-muted-foreground mb-4">{locale === "vi" ? event.descVi : event.descEn}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            {event.participants.toLocaleString()} {locale === "vi" ? "người tham gia" : "participants"}
                          </span>
                          <span className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            {event.prize}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex items-center">
                        <Button className="bg-gradient-to-r from-primary to-accent">
                          {locale === "vi" ? "Tham gia" : "Join Now"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Forum Tab */}
            <TabsContent value="forum">
              <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t.community.forum}</h2>
                  <p className="text-muted-foreground">
                    {locale === "vi"
                      ? "Thảo luận và chia sẻ kinh nghiệm với cộng đồng"
                      : "Discuss and share experiences with the community"}
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-primary to-accent">
                  {locale === "vi" ? "Tạo bài viết" : "Create Post"}
                </Button>
              </div>

              <div className="space-y-4">
                {forumTopics.map((topic, i) => (
                  <Card
                    key={i}
                    className="p-4 bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {topic.hot && (
                            <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
                              <Flame className="h-3 w-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          <h3 className="font-semibold hover:text-primary transition-colors">
                            {locale === "vi" ? topic.titleVi : topic.titleEn}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {topic.author}</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {topic.replies} {locale === "vi" ? "trả lời" : "replies"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {topic.views.toLocaleString()} {locale === "vi" ? "lượt xem" : "views"}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="bg-transparent">
                  {locale === "vi" ? "Xem tất cả bài viết" : "View All Posts"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Discord CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#5865F2]/20 to-primary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-[#5865F2] flex items-center justify-center mb-6">
              <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {locale === "vi" ? "Tham gia Discord của chúng tôi" : "Join Our Discord"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {locale === "vi"
                ? "Kết nối với hơn 100,000 game thủ, nhận thông báo sự kiện, và trò chuyện với đội ngũ phát triển!"
                : "Connect with over 100,000 gamers, get event notifications, and chat with the development team!"}
            </p>
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              {t.community.discord}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
