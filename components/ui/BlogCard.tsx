"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/helpers";

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    category: string;
    image?: string;
    readTime: number;
    isFeatured?: boolean;
    createdAt: string;
    views?: number;
  };
  index?: number;
  featured?: boolean;
}

export default function BlogCard({ blog, index = 0, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl border border-[#D4A853]/15 bg-[#111]/80 overflow-hidden card-hover ${
        featured ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-full min-h-[240px]" : "h-52"}`}>
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0A1A0D] to-[#0D0D0D] flex items-center justify-center">
            <span className="text-6xl opacity-10">🕉</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#C17F4A]/20 text-[#C17F4A] capitalize font-raleway border border-[#C17F4A]/20">
            {blog.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[#F5F5F5]/40 text-xs font-raleway">
            {formatDate(blog.createdAt)}
          </span>
          <span className="text-[#D4A853]/30">•</span>
          <span className="text-[#F5F5F5]/40 text-xs font-raleway">
            {blog.readTime} min read
          </span>
          {blog.views !== undefined && (
            <>
              <span className="text-[#D4A853]/30">•</span>
              <span className="text-[#F5F5F5]/40 text-xs font-raleway">
                {blog.views} views
              </span>
            </>
          )}
        </div>

        <h3
          className={`font-cinzel text-[#F5F5F5] font-semibold group-hover:text-[#D4A853] transition-colors mb-2 line-clamp-2 ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {blog.title}
        </h3>
        <p className="text-[#F5F5F5]/50 text-sm font-raleway line-clamp-3 mb-4 leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[#F5F5F5]/40 text-xs font-raleway">By {blog.author}</span>
          <Link
            href={`/blog/${blog.slug}`}
            className="text-[#D4A853] text-sm font-semibold font-raleway hover:underline group-hover:text-[#D4AD58]"
          >
            Read more →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
