"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Trophy, Globe, Sparkles, ChevronRight } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function AboutPreview() {
  const { t } = useLocale()

  const features = [
    {
      icon: Sparkles,
      title: t.about.mission,
      description: t.about.missionText,
    },
    {
      icon: Globe,
      title: t.about.vision,
      description: t.about.visionText,
    },
    {
      icon: Trophy,
      title: t.about.values,
      description: t.about.valuesText,
    },
    {
      icon: Users,
      title: t.about.team,
      description: t.about.teamText,
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
              {t.about.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.about.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.about.description}</p>
            <Button className="gap-2 bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)]" asChild>
              <Link href="/about">
                {t.hero.learnMore}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
