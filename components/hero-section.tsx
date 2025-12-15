"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, ChevronRight, Gamepad2 } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLocale()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
      }))
    )
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <img
          src="/images/c4-90-e1-bb-99c-20gi-c3-a1c-20h-e1-bb-8fa-20th-e1-ba-a7n.png"
          alt="Game Background"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60 animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">{t.hero.tagline}</span>
          </div>

          <h1 className="mb-8">
            <span
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
              style={{ lineHeight: "1.1" }}
            >
              {t.hero.title}
            </span>
            <span
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2 bg-gradient-to-r from-[oklch(0.65_0.25_300)] via-[oklch(0.7_0.2_200)] to-[oklch(0.65_0.25_300)] bg-clip-text text-transparent"
              style={{ lineHeight: "1.2", paddingBottom: "0.1em" }}
            >
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)] hover:opacity-90 text-primary-foreground gap-2 px-8 animate-pulse-glow"
              asChild
            >
              <Link href="/games">
                <Gamepad2 className="h-5 w-5" />
                {t.hero.playNow}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border/50 bg-secondary/30 hover:bg-secondary/50"
            >
              <Play className="h-5 w-5" />
              {t.hero.watchTrailer}
            </Button>
            <Button size="lg" variant="ghost" className="gap-2 hover:text-primary" asChild>
              <Link href="/about">
                {t.hero.learnMore}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border/30">
            {[
              { value: "10M+", label: t.stats.players },
              { value: "5+", label: t.stats.games },
              { value: "50+", label: t.stats.countries },
              { value: "20+", label: t.stats.awards },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
