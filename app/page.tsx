import { HeroSection } from "@/components/hero-section"
import { GamesShowcase } from "@/components/games-showcase"
import { AboutPreview } from "@/components/about-preview"
import { NewsSection } from "@/components/news-section"
import { CommunitySection } from "@/components/community-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GamesShowcase />
      <AboutPreview />
      <NewsSection />
      <CommunitySection />
      <CTASection />
    </>
  )
}
