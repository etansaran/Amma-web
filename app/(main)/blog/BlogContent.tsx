"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/ui/BlogCard";
import SectionHeader from "@/components/ui/SectionHeader";

const CATEGORIES = ["all", "teachings", "events", "devotees", "annadhanam", "ashram-life", "festivals"];

// Sample blogs
const sampleBlogs = [
  {
    _id: "1", title: "The Fire of Arunachala: What the Hill Reveals to the Seeker",
    slug: "fire-of-arunachala", excerpt: "Arunachala is not merely a hill. The ancient scriptures declare it to be Shiva himself — the infinite pillar of consciousness that has no beginning and no end. To come here is to come face to face with one's own eternity.",
    author: "Amma Ashram", category: "teachings", readTime: 8, isFeatured: true, createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), views: 1247,
  },
  {
    _id: "2", title: "How Annadhanam Changed My Life: A Devotee's Story from London",
    slug: "annadhanam-devotee-london", excerpt: "Sarah had everything the modern world could offer. But something was missing. Her first encounter with Amma's kitchen — where hundreds were fed in silence and love — cracked her heart open in a way nothing else had.",
    author: "Amma Ashram", category: "devotees", readTime: 6, createdAt: new Date(Date.now() - 10 * 86400000).toISOString(), views: 843,
  },
  {
    _id: "3", title: "Thiyanam — Why Silence Is the Highest Teaching",
    slug: "thiyanam-silence", excerpt: "In a world drowning in noise, Amma's Thiyanam sessions offer something rare: profound, spacious silence. Not the silence of emptiness, but the silence of fullness — the silence that IS Shiva.",
    author: "Amma Ashram", category: "teachings", readTime: 7, createdAt: new Date(Date.now() - 15 * 86400000).toISOString(), views: 1089,
  },
  {
    _id: "4", title: "Karthigai Deepam 2024: When 100,000 Souls Became One Flame",
    slug: "karthigai-deepam-2024", excerpt: "Words cannot capture what happens when the Maha Deepam is lit atop Arunachala. But we have tried. A reflection on last year's most sacred festival and what it revealed about the nature of light.",
    author: "Amma Ashram", category: "festivals", readTime: 10, createdAt: new Date(Date.now() - 90 * 86400000).toISOString(), views: 2341,
  },
  {
    _id: "5", title: "A Day in the Life of the Ashram Kitchen",
    slug: "ashram-kitchen-life", excerpt: "Every morning at 9 AM, something magical begins. Fifteen volunteers gather in the kitchen. No talking about yesterday, no worrying about tomorrow — just the devotion of now, and rice, and love.",
    author: "Amma Ashram", category: "ashram-life", readTime: 5, createdAt: new Date(Date.now() - 20 * 86400000).toISOString(), views: 567,
  },
  {
    _id: "6", title: "Shivaratri 2025: Registration Now Open for the All-Night Vigil",
    slug: "shivaratri-2025-registration", excerpt: "Shivaratri — the night of Shiva — is the most auspicious night of the year for spiritual practice. Amma will guide four deep meditation sessions through the night. Registration is now open.",
    author: "Amma Ashram", category: "events", readTime: 3, createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), views: 398,
  },
];

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? sampleBlogs
    : sampleBlogs.filter((b) => b.category === activeCategory);

  const [featured, ...rest] = activeCategory === "all"
    ? sampleBlogs.filter((b) => b.isFeatured).concat(sampleBlogs.filter((b) => !b.isFeatured))
    : filtered;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <p className="font-devanagari text-[#D4A853]/60 tracking-[0.4em] text-sm mb-4">
            ज्ञान • Jnāna
          </p>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-shimmer">Teachings & Reflections</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            Sacred wisdom, devotee stories, ashram updates, and the living teachings
            of Arunachala — shared for all who seek.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-raleway font-medium transition-all duration-300 capitalize ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white"
                  : "border border-[#D4A853]/25 text-[#F5F5F5]/60 hover:text-[#D4A853] hover:border-[#D4A853]/50"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && activeCategory === "all" && (
          <div className="mb-10">
            <BlogCard blog={featured} index={0} featured />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === "all" ? rest : filtered).map((blog, i) => (
            <BlogCard key={blog._id} blog={blog} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📿</p>
            <p className="text-[#F5F5F5]/40 font-raleway">No articles in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
