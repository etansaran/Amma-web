"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, lang, setLang } = useLanguage();
  const n = t.nav;

  const navLinks = [
    { href: "/", label: n.home },
    { href: "/about", label: n.about },
    { href: "/services", label: n.services },
    { href: "/events", label: n.events },
    { href: "/blog", label: n.teachings },
    { href: "/shop", label: n.shop },
    { href: "/live-darshan", label: n.liveDarshan },
    { href: "/donate", label: n.donate, highlight: true },
  ];

  const bookLabel = lang === "ta" ? "தரிசனம் பதிவு" : "Book Darshan";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#D4A853]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/logo.avif"
                  alt="Siva Sri Thiyaneswar Amma Ashram"
                  width={56}
                  height={56}
                  className="rounded-full shadow-[0_0_20px_rgba(193,127,74,0.4)] group-hover:shadow-[0_0_30px_rgba(212,168,83,0.6)] transition-shadow duration-300 object-cover"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <p className="font-cinzel text-[#D4A853] text-sm font-semibold leading-tight">
                  {lang === "ta" ? "சிவ ஸ்ரீ தியானேஸ்வர்" : "Siva Sri Thiyaneswar"}
                </p>
                <p className="font-cinzel text-[#F5F5F5]/70 text-xs leading-tight">
                  {lang === "ta" ? "அம்மா ஆசிரமம்" : "Amma Ashram"}
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                if (link.highlight) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="ml-4 px-5 py-2 bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white font-semibold text-sm rounded-full hover:shadow-[0_0_20px_rgba(193,127,74,0.5)] transition-all duration-300 hover:scale-105 font-raleway"
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 font-raleway ${
                      isActive
                        ? "text-[#D4A853]"
                        : "text-[#F5F5F5]/70 hover:text-[#D4A853]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A853]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                href="/appointment"
                className="ml-2 px-4 py-2 border border-[#D4A853]/40 text-[#D4A853] text-sm rounded-full hover:bg-[#D4A853]/10 transition-all duration-300 font-raleway"
              >
                {bookLabel}
              </Link>

              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "ta" : "en")}
                className="ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold hover:bg-[#D4A853]/10 hover:border-[#D4A853]/60 transition-all duration-200"
                title="Switch language"
              >
                <span className="text-sm">{lang === "en" ? "🇮🇳" : "🌍"}</span>
                <span>{lang === "en" ? "தமிழ்" : "EN"}</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "ta" : "en")}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold hover:bg-[#D4A853]/10 transition-all duration-200"
              >
                <span>{lang === "en" ? "தமிழ்" : "EN"}</span>
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md text-[#F5F5F5]/70 hover:text-[#D4A853] transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-current"
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block h-0.5 bg-current"
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-current"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#0D0D0D]/98 backdrop-blur-xl border-b border-[#D4A853]/20 lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-3 px-4 rounded-lg font-raleway font-medium transition-colors ${
                      link.highlight
                        ? "bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white text-center"
                        : pathname === link.href
                        ? "text-[#D4A853] bg-[#D4A853]/10"
                        : "text-[#F5F5F5]/70 hover:text-[#D4A853] hover:bg-[#D4A853]/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/appointment"
                className="mt-2 py-3 px-4 border border-[#D4A853]/40 text-[#D4A853] rounded-lg text-center font-raleway hover:bg-[#D4A853]/10 transition-colors"
              >
                {bookLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
