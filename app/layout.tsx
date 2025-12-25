import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LocaleProvider } from "@/lib/locale-context"
import { AuthProvider } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlackHoleGame | Nơi Huyền Thoại Được Tạo Ra",
  description:
    "BlackHoleGame - Studio game hàng đầu Việt Nam, mang đến những trải nghiệm gaming đỉnh cao với đồ họa tuyệt đẹp và gameplay cuốn hút.",
  keywords: ["game", "MMORPG", "BlackHoleGame", "Vietnam game studio", "mobile game", "PC game"],
  authors: [{ name: "BlackHoleGame" }],
  creator: "BlackHoleGame",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://blackholegame.com",
    siteName: "BlackHoleGame",
    title: "BlackHoleGame | Nơi Huyền Thoại Được Tạo Ra",
    description: "Studio game hàng đầu Việt Nam với những tựa game MMORPG đỉnh cao",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackHoleGame",
    description: "Studio game hàng đầu Việt Nam",
  },
  icons: {
    icon: [
    { url: "/logo-reference2.png" },
  ],
    apple: "/logo-reference2.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="font-sans antialiased">
        <LocaleProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
