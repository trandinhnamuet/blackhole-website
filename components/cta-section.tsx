"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, ArrowRight } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function CTASection() {
  const { t } = useLocale()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.65_0.25_300/0.2)] via-background to-[oklch(0.7_0.2_200/0.2)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(oklch(0.65 0.25 300 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.25 300 / 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[oklch(0.65_0.25_300)] via-[oklch(0.7_0.2_200)] to-[oklch(0.65_0.25_300)] bg-clip-text text-transparent">
              Sẵn sàng bắt đầu
            </span>
            <br />
            <span className="text-foreground">cuộc phiêu lưu?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Tham gia cùng hàng triệu game thủ đang khám phá thế giới của BlackHoleGame. Đăng ký ngay để nhận ưu đãi đặc
            biệt!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)] hover:opacity-90 text-primary-foreground gap-2 px-8 animate-pulse-glow"
              asChild
            >
              <Link href="/register">
                <Gamepad2 className="h-5 w-5" />
                {t.nav.register}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border/50 bg-secondary/30 hover:bg-secondary/50"
              asChild
            >
              <Link href="/games">
                {t.games.title}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
