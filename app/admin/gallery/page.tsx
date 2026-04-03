"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface GalleryImage {
  _id: string;
  url: string;
  publicId: string;
  caption?: string;
  category: string;
  isFeatured: boolean;
  createdAt: string;
}

const CATEGORIES = ["all", "ashram", "events", "annadhanam", "nature", "devotees", "other"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionValue, setCaptionValue] = useState("");
  const [newImageCategory, setNewImageCategory] = useState("other");
  const [refreshKey, setRefreshKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    const cat = filter !== "all" ? `?category=${filter}` : "";
    fetch(`/api/gallery${cat}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setImages(data.images ?? []))
      .catch(() => setError("Failed to load gallery"))
      .finally(() => setLoading(false));
  }, [filter, refreshKey]);

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const token = localStorage.getItem("admin_token");
    try {
      // Step 1: Upload to Cloudinary via existing /api/upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "gallery");
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url, publicId } = await uploadRes.json();

      // Step 2: Save to gallery DB
      const saveRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url, publicId, category: newImageCategory }),
      });
      if (!saveRes.ok) throw new Error("Failed to save");

      toast.success("Image uploaded successfully");
      setRefreshKey(k => k + 1);
    } catch (e) {
      toast.error((e as Error).message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setImages(prev => prev.filter(img => img._id !== id));
      toast.success("Image deleted");
    } catch { toast.error("Delete failed"); }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isFeatured: !current }),
      });
      setImages(prev => prev.map(img => img._id === id ? { ...img, isFeatured: !current } : img));
    } catch { toast.error("Update failed"); }
  };

  const saveCaption = async (id: string) => {
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ caption: captionValue }),
      });
      setImages(prev => prev.map(img => img._id === id ? { ...img, caption: captionValue } : img));
      setEditingCaption(null);
      toast.success("Caption saved");
    } catch { toast.error("Failed to save caption"); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Gallery</h1>
        <p className="text-[#F5F5F5]/40 font-raleway text-sm">Manage ashram photo gallery</p>
      </div>

      {/* Upload zone */}
      <div className="rounded-2xl border-2 border-dashed border-[#D4A853]/20 bg-[#111] p-8 mb-6 text-center hover:border-[#D4A853]/40 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
        />
        <div className="mb-4">
          <p className="text-4xl mb-2">{uploading ? "⏳" : "🖼️"}</p>
          <p className="text-[#F5F5F5]/60 font-raleway text-sm mb-1">
            {uploading ? "Uploading image..." : "Click to upload a photo"}
          </p>
          <p className="text-[#F5F5F5]/25 font-raleway text-xs">JPG, PNG, WebP up to 10MB</p>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <select
            value={newImageCategory}
            onChange={e => setNewImageCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#D4A853]/20 text-[#F5F5F5]/60 text-xs font-raleway focus:border-[#D4A853]/50 outline-none"
          >
            {["ashram","events","annadhanam","nature","devotees","other"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-5 py-2 rounded-full bg-[#D4A853] text-[#0D0D0D] text-sm font-raleway font-semibold hover:bg-[#C17F4A] transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Choose Photo"}
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-raleway font-medium capitalize transition-all duration-200 ${
              filter === cat ? "bg-[#D4A853] text-[#0D0D0D]" : "border border-[#D4A853]/20 text-[#F5F5F5]/50 hover:text-[#D4A853]"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 mb-6 text-center">
          <p className="text-red-400 font-raleway text-sm">{error}</p>
        </div>
      )}

      {/* Image grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-[#D4A853]/5 animate-pulse" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] p-12 text-center">
          <p className="text-4xl mb-3">🖼️</p>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">
            No images{filter !== "all" ? ` in category "${filter}"` : ""}. Upload some photos!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img._id} className="group relative rounded-2xl overflow-hidden border border-[#D4A853]/10">
              <div className="aspect-square relative">
                <Image src={img.url} alt={img.caption || "Gallery image"} fill className="object-cover" />
                {img.isFeatured && (
                  <div className="absolute top-2 left-2 bg-[#D4A853] text-[#0D0D0D] text-xs px-2 py-0.5 rounded-full font-raleway font-semibold">★ Featured</div>
                )}
                <span className="absolute top-2 right-2 bg-[#0D0D0D]/70 text-[#F5F5F5]/60 text-xs px-2 py-0.5 rounded-full font-raleway capitalize">{img.category}</span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0D0D0D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3">
                  <button onClick={() => toggleFeatured(img._id, img.isFeatured)}
                    className="px-4 py-2 rounded-full text-xs font-raleway bg-[#D4A853]/20 text-[#D4A853] hover:bg-[#D4A853]/40 border border-[#D4A853]/30 transition-colors">
                    {img.isFeatured ? "Unfeature" : "★ Feature"}
                  </button>
                  <button onClick={() => handleDelete(img._id)}
                    className="px-4 py-2 rounded-full text-xs font-raleway bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 transition-colors">
                    Delete
                  </button>
                </div>
              </div>

              {/* Caption */}
              <div className="p-2 bg-[#0D0D0D]">
                {editingCaption === img._id ? (
                  <input
                    type="text"
                    value={captionValue}
                    onChange={e => setCaptionValue(e.target.value)}
                    onBlur={() => saveCaption(img._id)}
                    onKeyDown={e => e.key === "Enter" && saveCaption(img._id)}
                    className="w-full bg-transparent text-[#F5F5F5]/60 text-xs font-raleway outline-none border-b border-[#D4A853]/30"
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={() => { setEditingCaption(img._id); setCaptionValue(img.caption ?? ""); }}
                    className="w-full text-left text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 text-xs font-raleway truncate transition-colors">
                    {img.caption || "Add caption..."}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
