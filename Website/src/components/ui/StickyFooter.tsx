import React from "react"
import { Linkedin, Mail, MapPin, MessageCircle, Youtube, Instagram, Facebook } from "lucide-react"

const footerData = {
  social: [
    { href: "https://www.linkedin.com/company/ambot-365/", label: "LinkedIn", icon: Linkedin },
    { href: "https://wa.me/919113602689", label: "WhatsApp", icon: MessageCircle },
    { href: "https://youtube.com/@ambot365?si=0lREyG9S_k68ZzYp", label: "YouTube", icon: Youtube },
    { href: "https://www.instagram.com/ambot365?igsh=MW9mNjYwaWFibGNlcg%3D%3D&utm_source=qr", label: "Instagram", icon: Instagram },
    { href: "https://www.facebook.com/profile.php?id=61555896342817&mibextid=LQQJ4d", label: "Facebook", icon: Facebook },
  ],
  quickLinks: [
    { href: "#solutions-overview", label: "Services" },
    { href: "#agents-in-action", label: "AI Solutions" },
    { href: "#how-it-works", label: "Process" },
    { href: "#about", label: "Why Ambot365" },
  ],
  offerings: [
    "Intelligent AI Agents",
    "Microsoft Automation",
    "Office Suite Solutions",
    "Scalable AI Products",
  ],
  contact: [
    { label: "Email", value: "Info@ambot365.com", href: "mailto:Info@ambot365.com" },
    { label: "Location", value: "Coimbatore - Tamil Nadu" },
    { label: "Contact", value: "+91 9113602689", href: "https://wa.me/919113602689" },
  ],
  legalLinks: [
    { label: "Terms & Conditions", href: "/legal/terms-and-conditions.html" },
    { label: "Privacy Policy", href: "/legal/privacy-policy.html" },
    { label: "Disclaimer", href: "/legal/disclaimer.html" },
    { label: "Cookie Policy", href: "/legal/cookie-policy.html" },
  ],
  copyright: `(c) ${new Date().getFullYear()} Ambot365. All rights reserved.`,
}

type SocialLinkProps = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

function SocialLink({ href, label, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#9fe3bb] hover:border-[#9fe3bb]/60 transition-colors"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </a>
  )
}

export default function StickyFooter() {
  return (
    <footer className="border-t border-[#1f5a3c] bg-[linear-gradient(180deg,#0e2f1f_0%,#0a2418_100%)]">
      <div className="site-container py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-white/90">
              <a href="mailto:Info@ambot365.com" className="flex items-center gap-2 hover:text-[#9fe3bb] transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-base">Info@ambot365.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-base">UAE | India</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#9fe3bb] mb-3">Quick Links</p>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-base text-white/90 hover:text-[#9fe3bb] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#9fe3bb] mb-3">Core Offerings</p>
            <ul className="space-y-2">
              {footerData.offerings.map((item) => (
                <li key={item} className="text-base text-white/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#9fe3bb] mb-3">Contact Us</p>
            <ul className="space-y-2">
              {footerData.contact.map((item) => (
                <li key={item.label} className="text-base text-white/90 whitespace-nowrap">
                  <span className="text-white/70">{item.label}: </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover:text-[#9fe3bb] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1f5a3c] grid grid-cols-1 md:grid-cols-3 items-center gap-5">
          <p className="text-sm text-white/75 text-center md:text-left">{footerData.copyright}</p>

          <div className="flex items-center justify-center gap-4 md:gap-5 flex-wrap">
            {footerData.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-[#9fe3bb] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end">
            {footerData.social.map((social) => (
              <SocialLink key={social.label} href={social.href} label={social.label} icon={social.icon} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
