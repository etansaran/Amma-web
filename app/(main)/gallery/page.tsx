"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type GalleryImage = {
  _id: string;
  url: string;
  publicId?: string;
  caption?: string;
  category: string;
  isFeatured?: boolean;
  createdAt: string;
};

const categories = ["all", "ashram", "events", "annadhanam", "nature", "devotees", "other"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "120" });
    if (category !== "all") params.set("category", category);
    fetch(`/api/gallery?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setImages(data.images ?? []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, [category]);

  const selectedImage = useMemo(() => {
    if (selectedIndex === null) return null;
    return images[selectedIndex] || null;
  }, [images, selectedIndex]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-[#C17F4A] text-sm tracking-[0.35em] uppercase mb-3">Ashram Moments</p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-[#D4A853] mb-4">Photo Gallery</h1>
          <p className="text-[#F5F5F5]/55 max-w-2xl mx-auto">
            A visual journey through satsangs, annadhanam, sacred festivals, nature around Arunachala, and everyday grace at Amma Ashram.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                category === item
                  ? "bg-[#D4A853] text-[#0D0D0D]"
                  : "border border-[#D4A853]/20 text-[#F5F5F5]/65 hover:text-[#D4A853]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-3xl bg-[#D4A853]/5 animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-3xl border border-[#D4A853]/10 bg-[#111] p-16 text-center">
            <p className="text-5xl mb-4">🖼️</p>
            <p className="text-[#F5F5F5]/45">Gallery images will appear here once uploaded from the admin panel.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((image, index) => (
              <button
                key={image._id}
                onClick={() => setSelectedIndex(index)}
                className="group relative w-full overflow-hidden rounded-3xl border border-[#D4A853]/10 bg-[#111] break-inside-avoid"
              >
                <div className="relative w-full min-h-[220px]">
                  <Image
                    src={image.url}
                    alt={image.caption || "Amma Ashram gallery image"}
                    width={800}
                    height={1000}
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 text-left">
                    <p className="text-[#F5F5F5] text-sm font-medium">{image.caption || "Amma Ashram"}</p>
                    <p className="text-[#D4A853]/80 text-xs mt-1 capitalize">{image.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md p-4 md:p-8"
          >
            <button onClick={() => setSelectedIndex(null)} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 text-white text-xl">
              ✕
            </button>
            <div className="mx-auto max-w-5xl h-full flex flex-col justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#111]">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption || "Amma Ashram gallery image"}
                  width={1600}
                  height={1200}
                  className="w-full h-auto max-h-[75vh] object-contain bg-[#050505]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-white text-lg font-medium">{selectedImage.caption || "Amma Ashram"}</p>
                  <p className="text-[#D4A853]/80 text-sm capitalize mt-1">{selectedImage.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length))}
                    className="px-4 py-2 rounded-full border border-white/15 text-white text-sm"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % images.length))}
                    className="px-4 py-2 rounded-full border border-white/15 text-white text-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
