"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  { label: "YouTube", href: "#", icon: "▶" },
  { label: "Facebook", href: "#", icon: "f" },
  { label: "Instagram", href: "#", icon: "◉" },
  { label: "WhatsApp", href: "#", icon: "✆" },
];

export default function Footer() {
  const { t, lang } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#D4A853]/15 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A853' fill-opacity='1'%3E%3Cpath d='M40 0L80 40L40 80L0 40z' fill='none' stroke='%23D4A853' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.avif"
                alt="Siva Sri Thiyaneswar Amma Ashram"
                width={64}
                height={64}
                className="rounded-full shadow-[0_0_20px_rgba(193,127,74,0.4)] object-cover"
              />
              <div>
                <p className="font-cinzel text-[#D4A853] font-semibold leading-tight">
                  {lang === "ta" ? "சிவ ஸ்ரீ தியானேஸ்வர்" : "Siva Sri Thiyaneswar"}
                </p>
                <p className="font-cinzel text-[#F5F5F5]/60 text-sm leading-tight">
                  {lang === "ta" ? "அம்மா ஆசிரமம்" : "Amma Ashram"}
                </p>
              </div>
            </div>
            <p className="text-[#F5F5F5]/50 text-sm font-raleway leading-relaxed mb-6 max-w-xs">
              {f.desc}
            </p>
            <p className="font-cinzel text-[#D4A853]/70 text-xs italic">
              {f.quote}
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#D4A853]/20 flex items-center justify-center text-[#D4A853]/60 hover:text-[#D4A853] hover:border-[#D4A853]/50 hover:bg-[#D4A853]/10 transition-all duration-300 text-sm font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(f.columns).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-cinzel text-[#D4A853] text-sm font-semibold mb-4 uppercase tracking-widest">
                {title}
              </h4>
              <ul className="space-y-3">
                {(links as { label: string; href: string }[]).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#F5F5F5]/50 hover:text-[#D4A853] text-sm font-raleway transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/30 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-[#F5F5F5]/40 text-sm font-raleway">{f.address}</p>
            <p className="text-[#F5F5F5]/40 text-sm font-raleway mt-1">
              {f.phone} &nbsp;|&nbsp; {f.email}
            </p>
          </div>
          <div className="text-[#F5F5F5]/30 text-xs font-raleway text-right">
            <p>{f.copyright}</p>
            <p className="mt-1">{f.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
