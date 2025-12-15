"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Mail, Phone, Clock, Send, Facebook, Youtube, Twitter, MessageCircle, CheckCircle } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export default function ContactPage() {
  const { t, locale } = useLocale()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      titleVi: "Địa chỉ",
      titleEn: "Address",
      content: "Số 777, Đường Nguyễn Thiện Thuật, Phường Mỹ Hào, Tỉnh Hưng Yên, Việt Nam",
    },
    {
      icon: Mail,
      titleVi: "Email",
      titleEn: "Email",
      content: "contact@blackholegame.com",
    },
    {
      icon: Phone,
      titleVi: "Điện thoại",
      titleEn: "Phone",
      content: "+84 22 1557 9999",
    },
    {
      icon: Clock,
      titleVi: "Giờ làm việc",
      titleEn: "Working Hours",
      content: locale === "vi" ? "Thứ 2 - Thứ 6: 9:00 - 18:00" : "Mon - Fri: 9:00 AM - 6:00 PM",
    },
  ]

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Twitter, label: "Twitter/X", href: "#" },
    { icon: MessageCircle, label: "Discord", href: "#" },
  ]

  const subjects = [
    { value: "general", labelVi: "Câu hỏi chung", labelEn: "General Inquiry" },
    { value: "support", labelVi: "Hỗ trợ kỹ thuật", labelEn: "Technical Support" },
    { value: "business", labelVi: "Hợp tác kinh doanh", labelEn: "Business Partnership" },
    { value: "media", labelVi: "Liên hệ báo chí", labelEn: "Media Inquiry" },
    { value: "careers", labelVi: "Tuyển dụng", labelEn: "Careers" },
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.contact.title}</h1>
            <p className="text-xl text-muted-foreground">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-card/50 border-border/50">
              <h2 className="text-2xl font-bold mb-6">
                {locale === "vi" ? "Gửi tin nhắn cho chúng tôi" : "Send us a message"}
              </h2>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.common.success}</h3>
                  <p className="text-muted-foreground">
                    {locale === "vi"
                      ? "Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất!"
                      : "Your message has been sent. We'll respond as soon as possible!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.contact.name}</Label>
                      <Input id="name" required className="bg-secondary/50 border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contact.email}</Label>
                      <Input id="email" type="email" required className="bg-secondary/50 border-border/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t.contact.subject}</Label>
                    <Select>
                      <SelectTrigger className="bg-secondary/50 border-border/50">
                        <SelectValue placeholder={locale === "vi" ? "Chọn chủ đề" : "Select a subject"} />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value}>
                            {locale === "vi" ? subject.labelVi : subject.labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.message}</Label>
                    <Textarea id="message" rows={6} required className="bg-secondary/50 border-border/50 resize-none" />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent gap-2">
                    <Send className="h-4 w-4" />
                    {t.contact.send}
                  </Button>
                </form>
              )}
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, i) => (
                  <Card key={i} className="p-6 bg-card/50 border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{locale === "vi" ? info.titleVi : info.titleEn}</h3>
                    <p className="text-sm text-muted-foreground">{info.content}</p>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <Card className="p-6 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-4">{t.contact.followUs}</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </Card>

              {/* Map */}
              <Card className="overflow-hidden bg-card/50 border-border/50">
                <div className="aspect-video bg-secondary/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">
                      {locale === "vi" ? "Bản đồ vị trí văn phòng" : "Office Location Map"}
                    </p>
                    <Button variant="outline" className="mt-4 bg-transparent" asChild>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                        {locale === "vi" ? "Xem trên Google Maps" : "View on Google Maps"}
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {locale === "vi" ? "Câu hỏi thường gặp" : "Frequently Asked Questions"}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                qVi: "Làm sao để liên hệ hỗ trợ kỹ thuật?",
                qEn: "How do I contact technical support?",
                aVi: "Bạn có thể gửi email đến support@blackholegame.com hoặc sử dụng form liên hệ với chủ đề 'Hỗ trợ kỹ thuật'.",
                aEn: "You can email support@blackholegame.com or use the contact form with the subject 'Technical Support'.",
              },
              {
                qVi: "Thời gian phản hồi trung bình là bao lâu?",
                qEn: "What is the average response time?",
                aVi: "Chúng tôi thường phản hồi trong vòng 24-48 giờ làm việc.",
                aEn: "We typically respond within 24-48 business hours.",
              },
              {
                qVi: "Tôi muốn hợp tác kinh doanh thì liên hệ ai?",
                qEn: "Who do I contact for business partnerships?",
                aVi: "Vui lòng gửi email đến business@blackholegame.com hoặc chọn chủ đề 'Hợp tác kinh doanh' trong form.",
                aEn: "Please email business@blackholegame.com or select 'Business Partnership' in the form.",
              },
            ].map((faq, i) => (
              <Card key={i} className="p-6 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-2">{locale === "vi" ? faq.qVi : faq.qEn}</h3>
                <p className="text-sm text-muted-foreground">{locale === "vi" ? faq.aVi : faq.aEn}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
