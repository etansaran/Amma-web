"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/helpers";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readTime: number;
  isFeatured?: boolean;
  createdAt: string;
  views: number;
}

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${params.slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data.blog ?? null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return <div className="min-h-screen pt-24 px-4 text-center text-[#F5F5F5]/50">Loading post...</div>;
  }

  if (!post) {
    return <div className="min-h-screen pt-24 px-4 text-center text-[#F5F5F5]/50">Post not found.</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#D4A853]/70 hover:text-[#D4A853] text-sm font-raleway mb-8 transition-colors">
          ← Back to Teachings
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <span className="inline-block text-xs font-raleway uppercase tracking-widest bg-[#C17F4A]/15 text-[#C17F4A] px-3 py-1 rounded-full border border-[#C17F4A]/20 mb-6 capitalize">
            {post.category}
          </span>

          <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-[#F5F5F5] mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[#D4A853]/10">
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">{formatDate(post.createdAt)}</span>
            <span className="text-[#D4A853]/30">•</span>
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">{post.readTime} min read</span>
            <span className="text-[#D4A853]/30">•</span>
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">By {post.author}</span>
            <span className="text-[#D4A853]/30">•</span>
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">{post.views} views</span>
          </div>

          <div className="prose-spiritual">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;
              if (block.startsWith("*") && block.endsWith("*")) return <blockquote key={i}>{block.slice(1, -1)}</blockquote>;
              return <p key={i}>{block}</p>;
            })}
          </div>
        </motion.article>
      </div>
    </div>
  );
}
