"use client"

import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Black Hole Icon */}
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.65_0.25_300)] via-[oklch(0.7_0.2_200)] to-[oklch(0.65_0.25_300)] animate-spin"
            style={{ animationDuration: "8s" }}
          />
          <div className="absolute inset-1 rounded-full bg-background" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[oklch(0.65_0.25_300)] to-transparent opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[oklch(0.08_0.01_270)] shadow-[0_0_10px_oklch(0.65_0.25_300)]" />
          </div>
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
