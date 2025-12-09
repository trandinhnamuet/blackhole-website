"use client"

import Link from "next/link"
import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="relative w-20 h-auto">
          <Image
            src="/images/logo-reference.png"
            alt="Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-[oklch(0.65_0.25_300)] via-[oklch(0.7_0.2_200)] to-[oklch(0.65_0.25_300)] bg-clip-text text-transparent">
          BLACKHOLE
        </span>
        <span className="text-xs tracking-[0.3em] text-muted-foreground -mt-1">GAME</span>
      </div>
    </Link>
  )
}
