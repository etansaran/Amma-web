"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/ui/BlogCard";

const CATEGORIES = ["all", "teachings", "events", "devotees", "annadhanam", "ashram-life", "festivals"];

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: number;
  isFeatured?: boolean;
  createdAt: string;
  views?: number;
}

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const categoryQuery = activeCategory === "all" ? "" : `?category=${activeCategory}`;
    fetch(`/api/blogs${categoryQuery}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs ?? []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const featured = activeCategory === "all" ? blogs.find((blog) => blog.isFeatured) : undefined;
  const gridBlogs = activeCategory === "all" && featured ? blogs.filter((blog) => blog._id !== featured._id) : blogs;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
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
            Sacred wisdom, devotee stories, ashram updates, and the living teachings of Arunachala.
          </p>
        </motion.div>

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

        {featured && (
          <div className="mb-10">
            <BlogCard blog={featured} index={0} featured />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridBlogs.map((blog, i) => (
            <BlogCard key={blog._id} blog={blog} index={i} />
          ))}
        </div>

        {!loading && blogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📿</p>
            <p className="text-[#F5F5F5]/40 font-raleway">No articles in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
