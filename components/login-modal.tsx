"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocale } from "@/lib/locale-context"
import Link from "next/link"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLocale()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 glass-effect rounded-2xl border border-border/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[oklch(0.65_0.25_300)]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[oklch(0.7_0.2_200)]/20 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors z-10"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="relative p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)] mb-4">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {mode === "login" ? t.auth.loginTitle : t.auth.registerTitle}
            </h2>
            <p className="text-muted-foreground mt-2">
              {mode === "login" ? t.auth.loginSubtitle : t.auth.registerSubtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  {t.auth.username}
                </Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder={t.auth.usernamePlaceholder}
                    className="pl-11 bg-secondary/30 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                {t.auth.email}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.auth.emailPlaceholder}
                  className="pl-11 bg-secondary/30 border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                {t.auth.password}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.auth.passwordPlaceholder}
                  className="pl-11 pr-11 bg-secondary/30 border-border/50 focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-border bg-secondary/30" />
                  {t.auth.rememberMe}
                </label>
                <Link href="/forgot-password" className="text-primary hover:underline">
                  {t.auth.forgotPassword}
                </Link>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)] hover:opacity-90 text-white font-semibold py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.auth.processing}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  {mode === "login" ? t.auth.loginButton : t.auth.registerButton}
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-muted-foreground text-sm">{t.auth.or}</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            {["Google", "Facebook", "Discord"].map((provider) => (
              <Button
                key={provider}
                variant="outline"
                className="bg-secondary/30 border-border/50 hover:bg-secondary/50"
              >
                {provider[0]}
              </Button>
            ))}
          </div>

          {/* Switch Mode */}
          <p className="text-center text-muted-foreground mt-6">
            {mode === "login" ? t.auth.noAccount : t.auth.hasAccount}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-primary hover:underline font-medium"
            >
              {mode === "login" ? t.auth.registerNow : t.auth.loginNow}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
