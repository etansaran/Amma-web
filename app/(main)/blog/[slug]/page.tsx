"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/utils/helpers";

const samplePost = {
  _id: "1",
  title: "The Fire of Arunachala: What the Hill Reveals to the Seeker",
  slug: "fire-of-arunachala",
  excerpt: "Arunachala is not merely a hill. The ancient scriptures declare it to be Shiva himself.",
  content: `Arunachala is not merely a hill. The ancient scriptures — Skanda Purana, Arunachala Mahatmyam — declare it to be Shiva himself: the Agni Linga, the column of infinite fire that has no beginning and no end.

To come here is not to visit a place. It is to come face to face with one's own eternity.

## The Hill That Calls You Back

There is a saying among old devotees: "Arunachala calls only those it has chosen." People from across the world find themselves inexplicably drawn here — often without knowing why, often despite every practical obstacle. They arrive, they circumambulate the hill, they sit in silence near the Shiva Lingam — and something in them dissolves.

Ramana Maharshi, the greatest sage of modern India, came to Arunachala as a teenager and never left. He said: "Arunachala is the spiritual centre of the world." Not a tourist destination. A magnetic pole of consciousness.

## What Amma Teaches About Arunachala

Amma always says: "You don't need to understand Arunachala with your mind. You need to let it work on your heart."

The fire of Arunachala is not destructive fire. It is the fire of consciousness — the fire that burns away ignorance, separation, and the illusion of being a small, isolated self. When this fire touches you, what burns away is everything you are not. What remains is everything you truly are.

## How to Receive the Grace of Arunachala

Whether you are standing at the foot of the hill or sitting in your home in Singapore, London, or Houston — the fire of Arunachala knows no boundaries. Here is what Amma suggests:

**1. Girivalam (Circumambulation):** Walk the 14km sacred path around the hill barefoot if possible. Let each step be a prayer. This is a complete spiritual practice in itself.

**2. Thiyanam (Meditation):** Sit in silence, face the hill, and simply be. Don't try to achieve anything. Just be present. Arunachala will do the rest.

**3. Surrender:** The greatest practice Arunachala teaches is surrender — letting go of the ego's agenda and resting in the grace of what is. This is the essence of Ramana Maharshi's teaching of Self-inquiry.

**4. Service:** Feed the pilgrims. Offer Annadhanam. The pilgrims who walk barefoot around Arunachala are sacred — to serve them is to serve Shiva directly.

## A Final Word

If you have felt drawn to this page, perhaps Arunachala is calling you. Come if you can. If you cannot come physically, connect through our live darshan streams. Sponsor Annadhanam for those who make the pilgrimage.

The grace of this hill is inexhaustible. It is available to all — in every moment, in every place.

*Om Arunachala Shiva.*`,
  author: "Amma Ashram",
  category: "teachings",
  readTime: 8,
  isFeatured: true,
  createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  views: 1247,
};

export default function BlogDetailPage() {
  const post = samplePost;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#D4A853]/70 hover:text-[#D4A853] text-sm font-raleway mb-8 transition-colors">
          ← Back to Teachings
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Category */}
          <span className="inline-block text-xs font-raleway uppercase tracking-widest bg-[#C17F4A]/15 text-[#C17F4A] px-3 py-1 rounded-full border border-[#C17F4A]/20 mb-6 capitalize">
            {post.category}
          </span>

          <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-[#F5F5F5] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[#D4A853]/10">
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">{formatDate(post.createdAt)}</span>
            <span className="text-[#D4A853]/30">•</span>
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">{post.readTime} min read</span>
            <span className="text-[#D4A853]/30">•</span>
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">By {post.author}</span>
            <span className="text-[#D4A853]/30">•</span>
            <span className="text-[#F5F5F5]/40 text-sm font-raleway">{post.views} views</span>
          </div>

          {/* Content */}
          <div className="prose-spiritual">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i}>{block.slice(3)}</h2>;
              }
              if (block.startsWith("**")) {
                return (
                  <p key={i} className="font-semibold text-[#D4A853]">
                    {block.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (block.startsWith("*") && block.endsWith("*")) {
                return (
                  <blockquote key={i}>{block.slice(1, -1)}</blockquote>
                );
              }
              return <p key={i}>{block}</p>;
            })}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-[#D4A853]/10 flex items-center justify-between">
            <p className="text-[#F5F5F5]/40 text-sm font-raleway">Share this teaching</p>
            <div className="flex gap-3">
              {["WhatsApp", "Twitter", "Facebook"].map((s) => (
                <button key={s} className="px-4 py-2 border border-[#D4A853]/20 text-[#D4A853]/60 hover:text-[#D4A853] hover:border-[#D4A853]/50 text-xs font-raleway rounded-full transition-all duration-300">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
