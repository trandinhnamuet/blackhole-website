"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Globe, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Logo } from "./logo"
import { useLocale } from "@/lib/locale-context"
import { useAuth } from "@/lib/auth-context"
import { localeNames, type Locale } from "@/lib/i18n"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { locale, setLocale, t } = useLocale()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/games", label: t.nav.games },
    { href: "/news", label: t.nav.news },
    { href: "/careers", label: t.nav.careers },
    { href: "/community", label: t.nav.community },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-secondary/50 ${
                    pathname === item.href
                      ? "text-primary bg-secondary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{localeNames[locale]}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-effect border-border">
                  {(Object.keys(localeNames) as Locale[]).map((loc) => (
                    <DropdownMenuItem
                      key={loc}
                      onClick={() => setLocale(loc)}
                      className={locale === loc ? "bg-primary/20 text-primary" : ""}
                    >
                      {localeNames[loc]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu or Login Button */}
              <div className="hidden sm:flex items-center">
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <User className="h-4 w-4" />
                        <span className="max-w-[120px] truncate">{user.name}</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-effect border-border w-48">
                      <div className="px-2 py-1.5 text-sm">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      {user.role === 'admin' ? (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer">
                            <User className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link href="/user" className="cursor-pointer">
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                        <LogOut className="h-4 w-4 mr-2" />
                        {t.nav.logout || "Đăng xuất"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button
                      size="sm"
                      className="gap-2 bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)] hover:opacity-90 text-white"
                    >
                      <LogIn className="h-4 w-4" />
                      {t.nav.login}
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-border/50 pt-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-border/50">
                  {isAuthenticated && user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-sm">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      {user.role === 'admin' ? (
                        <Button
                          variant="outline"
                          className="w-full"
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link href="/admin">
                            <User className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full"
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link href="/user">
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        className="w-full gap-2"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          logout()
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        {t.nav.logout || "Đăng xuất"}
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        className="w-full bg-gradient-to-r from-[oklch(0.65_0.25_300)] to-[oklch(0.7_0.2_200)] gap-2"
                      >
                        <LogIn className="h-4 w-4" />
                        {t.nav.login}
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
