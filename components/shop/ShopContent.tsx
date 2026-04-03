"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import CartSidebar from "./CartSidebar";
import { useCart } from "@/context/CartContext";
import { products, categories } from "@/lib/shopData";
import type { ProductCategory } from "@/lib/shopData";

const sortOptions = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
];

export default function ShopContent() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [sortBy, setSortBy] = useState("featured");
  const [search, setSearch] = useState("");
  const { openCart, totalItems } = useCart();

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });

    switch (sortBy) {
      case "price-asc":  list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating":     list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [activeCategory, sortBy, search]);

  return (
    <>
      <CartSidebar />

      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-b from-[#222222] to-[#0D0D0D] pt-32 pb-16 overflow-hidden">
        {/* Sacred geometry background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <g stroke="#D4A853" strokeWidth="0.5" fill="none">
              <circle cx="400" cy="200" r="180" />
              <circle cx="400" cy="200" r="120" />
              <polygon points="400,20 560,290 240,290" />
              <polygon points="400,380 560,110 240,110" />
            </g>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-devanagari text-[#D4A853]/60 text-base tracking-[0.4em] mb-3"
          >
            ॐ नमः शिवाय
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-cinzel text-4xl sm:text-5xl font-bold text-[#D4A853] mb-3"
          >
            Sacred Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[#F5F5F5]/60 max-w-xl mx-auto text-base"
          >
            Authentic spiritual items from Thiruvannamalai — books, Rudraksha, and sacred home decor
          </motion.p>

          {/* Category quick-jump strip — like Isha Life */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {[
              { emoji: "📖", label: "Books",       href: "#books" },
              { emoji: "📿", label: "Rudraksha",   href: "#rudraksha" },
              { emoji: "🪔", label: "Home Decor",  href: "#home-decor" },
              { emoji: "✨", label: "Energized",   href: "#rudraksha" },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4A853]/20 text-[#F5F5F5]/70 text-sm hover:border-[#C17F4A]/50 hover:text-[#C17F4A] transition-all duration-200 bg-[#1A1A1A]/60 backdrop-blur-sm"
              >
                <span>{item.emoji}</span> {item.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category banners (4-up dark strips) ── */}
      <section className="bg-[#0D0D0D] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { emoji: "📖", label: "Books",          sub: "Scriptures & Teachings", cat: "books" as ProductCategory,      bg: "from-[#222222] to-[#1A0A02]" },
              { emoji: "📿", label: "Rudraksha",      sub: "Sacred & Energized",     cat: "rudraksha" as ProductCategory,  bg: "from-[#1A0A2A] to-[#0D0D0D]" },
              { emoji: "🪔", label: "Home Decor",     sub: "Brass & Sacred Items",   cat: "home-decor" as ProductCategory, bg: "from-[#2A1A02] to-[#0D0D0D]" },
              { emoji: "🛕", label: "All Products",   sub: "Browse Everything",      cat: "all" as ProductCategory,        bg: "from-[#1A1A0A] to-[#0D0D0D]" },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => { setActiveCategory(item.cat); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`relative bg-gradient-to-br ${item.bg} rounded-xl p-5 text-left border border-[#D4A853]/10 hover:border-[#C17F4A]/30 transition-all duration-300 group`}
              >
                <span className="text-3xl block mb-2">{item.emoji}</span>
                <p className="font-cinzel text-[#D4A853] text-sm font-semibold">{item.label}</p>
                <p className="text-[#F5F5F5]/40 text-xs mt-0.5">{item.sub}</p>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C17F4A]/40 group-hover:text-[#C17F4A] transition-colors text-lg">›</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products section ── */}
      <section id="products" className="bg-[#0D0D0D] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as ProductCategory)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-[#C17F4A] text-white shadow-[0_0_20px_rgba(193,127,74,0.3)]"
                      : "bg-[#1A1A1A] text-[#F5F5F5]/60 border border-[#D4A853]/15 hover:border-[#C17F4A]/40 hover:text-[#F5F5F5]"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-white/20" : "bg-[#D4A853]/10 text-[#D4A853]"}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: search + sort */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-spiritual rounded-full px-4 py-2 text-sm w-44 sm:w-52"
              />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="input-spiritual rounded-full px-4 py-2 text-sm"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-[#F5F5F5]/40 text-sm mb-6">
            Showing <span className="text-[#D4A853]">{filtered.length}</span> sacred items
          </p>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="font-cinzel text-[#F5F5F5]/50 text-lg">No items found</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-4 text-[#C17F4A] text-sm underline">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Trust section ── */}
      <section className="bg-[#141414] border-t border-[#D4A853]/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { emoji: "🔒", title: "Secure Payments",     sub: "UPI, Cards, Net Banking" },
              { emoji: "📦", title: "Pan-India Shipping",  sub: "Free above ₹999" },
              { emoji: "✓",  title: "100% Authentic",      sub: "Certified & Energized" },
              { emoji: "🌍", title: "Ships Worldwide",     sub: "NRI-friendly checkout" },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.emoji}</span>
                <p className="font-cinzel text-[#D4A853] text-sm font-semibold">{item.title}</p>
                <p className="text-[#F5F5F5]/40 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky cart button (mobile) ── */}
      {totalItems > 0 && (
        <motion.button
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          onClick={openCart}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-3 px-5 py-3 rounded-full font-semibold text-white shadow-2xl sm:hidden"
          style={{ background: "linear-gradient(135deg, #C17F4A, #D4A853)" }}
        >
          🛒 View Cart
          <span className="bg-white/30 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        </motion.button>
      )}
    </>
  );
}
