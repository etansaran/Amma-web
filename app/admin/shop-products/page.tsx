"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import type { ShopProduct } from "@/lib/shop";

type ProductForm = {
  title: string;
  description: string;
  longDescription: string;
  category: "books" | "rudraksha" | "home-decor";
  price: string;
  originalPrice: string;
  stockQuantity: string;
  emoji: string;
  image: string;
  imagePublicId: string;
  sku: string;
  sizeLabel: string;
  sizes: string;
  variations: string;
  tags: string;
  badge: string;
  isPublished: boolean;
  isFeatured: boolean;
};

const initialForm: ProductForm = {
  title: "",
  description: "",
  longDescription: "",
  category: "books",
  price: "",
  originalPrice: "",
  stockQuantity: "10",
  emoji: "🛕",
  image: "",
  imagePublicId: "",
  sku: "",
  sizeLabel: "",
  sizes: "",
  variations: "",
  tags: "",
  badge: "",
  isPublished: true,
  isFeatured: false,
};

export default function AdminShopProductsPage() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProducts = async () => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    try {
      const response = await fetch("/api/shop/products?admin=true&limit=100", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProducts(data.products ?? []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (product: ShopProduct) => {
    setEditingId(product.id);
    setShowForm(true);
    setForm({
      title: product.title,
      description: product.description,
      longDescription: product.longDescription || "",
      category: product.category,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : "",
      stockQuantity: String(product.stockQuantity),
      emoji: product.emoji || "🛕",
      image: product.image || "",
      imagePublicId: product.imagePublicId || "",
      sku: product.sku || "",
      sizeLabel: product.sizeLabel || "",
      sizes: product.sizes.join(", "),
      variations: product.variations.join(", "),
      tags: product.tags.join(", "),
      badge: product.badge || "",
      isPublished: product.isPublished,
      isFeatured: product.isFeatured,
    });
  };

  const uploadImage = async (file: File) => {
    const token = localStorage.getItem("admin_token");
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "shop");
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Image upload failed");
      setForm((prev) => ({
        ...prev,
        image: data.url,
        imagePublicId: data.publicId,
      }));
      toast.success("Product image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title || !form.description || !form.price) {
      toast.error("Title, description and price are required");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(editingId ? `/api/shop/products/${editingId}` : "/api/shop/products", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
          stockQuantity: Number(form.stockQuantity),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save product");
      toast.success(editingId ? "Product updated" : "Product created");
      resetForm();
      loadProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(`/api/shop/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Delete failed");
      toast.success("Product deleted");
      loadProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Shop Products</h1>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">Simple catalog management for your store</p>
        </div>
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white text-sm font-semibold"
        >
          {showForm ? "Close Form" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={saveProduct}
          className="rounded-2xl border border-[#D4A853]/15 bg-[#111] p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Product title" className="input-spiritual rounded-xl px-4 py-3 text-sm sm:col-span-2" />
          <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Short description" className="input-spiritual rounded-xl px-4 py-3 text-sm sm:col-span-2 min-h-[88px]" />
          <textarea value={form.longDescription} onChange={(e) => setForm((prev) => ({ ...prev, longDescription: e.target.value }))} placeholder="Long description" className="input-spiritual rounded-xl px-4 py-3 text-sm sm:col-span-2 min-h-[120px]" />
          <select value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as ProductForm["category"] }))} className="input-spiritual rounded-xl px-4 py-3 text-sm">
            <option value="books">Books</option>
            <option value="rudraksha">Rudraksha</option>
            <option value="home-decor">Home Decor</option>
          </select>
          <input value={form.emoji} onChange={(e) => setForm((prev) => ({ ...prev, emoji: e.target.value }))} placeholder="Emoji" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} placeholder="Price" type="number" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.originalPrice} onChange={(e) => setForm((prev) => ({ ...prev, originalPrice: e.target.value }))} placeholder="Original price (optional)" type="number" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.stockQuantity} onChange={(e) => setForm((prev) => ({ ...prev, stockQuantity: e.target.value }))} placeholder="Stock qty" type="number" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.sku} onChange={(e) => setForm((prev) => ({ ...prev, sku: e.target.value }))} placeholder="SKU (optional)" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <div className="sm:col-span-2 rounded-xl border border-[#D4A853]/10 bg-[#0D0D0D] p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#1A1A1A] border border-[#D4A853]/10 flex items-center justify-center text-4xl">
                {form.image ? (
                  <Image src={form.image} alt="Product preview" fill className="object-cover" />
                ) : (
                  <span>{form.emoji || "🛕"}</span>
                )}
              </div>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="px-4 py-2 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-sm disabled:opacity-50"
                >
                  {uploadingImage ? "Uploading..." : "Upload Image"}
                </button>
                {form.image && (
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, image: "", imagePublicId: "" }))}
                    className="block text-red-400 text-xs"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>
          <input value={form.sizeLabel} onChange={(e) => setForm((prev) => ({ ...prev, sizeLabel: e.target.value }))} placeholder="Size label (optional)" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.sizes} onChange={(e) => setForm((prev) => ({ ...prev, sizes: e.target.value }))} placeholder="Sizes: S, M, L" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.variations} onChange={(e) => setForm((prev) => ({ ...prev, variations: e.target.value }))} placeholder="Variations: Red, Gold" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.tags} onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))} placeholder="Tags: spiritual, sacred" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <input value={form.badge} onChange={(e) => setForm((prev) => ({ ...prev, badge: e.target.value }))} placeholder="Badge text (optional)" className="input-spiritual rounded-xl px-4 py-3 text-sm" />
          <label className="flex items-center gap-2 text-sm text-[#F5F5F5]/70">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))} className="accent-[#D4A853]" />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm text-[#F5F5F5]/70">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))} className="accent-[#D4A853]" />
            Featured
          </label>
          <div className="sm:col-span-2 flex gap-3">
            <button disabled={submitting} type="submit" className="px-5 py-3 rounded-full bg-gradient-to-r from-[#C17F4A] to-[#D4A853] text-white text-sm font-semibold disabled:opacity-50">
              {submitting ? "Saving..." : editingId ? "Update Product" : "Create Product"}
            </button>
            <button type="button" onClick={resetForm} className="px-5 py-3 rounded-full border border-[#D4A853]/20 text-[#F5F5F5]/70 text-sm">
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-12 rounded-xl bg-[#D4A853]/5 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center text-[#F5F5F5]/40">No products yet</div>
        ) : (
          <>
            <div className="md:hidden divide-y divide-[#D4A853]/5">
              {products.map((product) => (
                <div key={product.id} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#1A1A1A] border border-[#D4A853]/10 flex items-center justify-center text-2xl shrink-0">
                      {product.image ? (
                        <Image src={product.image} alt={product.title} fill className="object-cover" />
                      ) : (
                        <span>{product.emoji}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#F5F5F5]/85 text-sm font-medium">{product.title}</p>
                      <p className="text-[#F5F5F5]/35 text-xs mt-1">{product.category} · {product.sku || "No SKU"}</p>
                      <p className="text-[#D4A853] text-base font-semibold mt-2">₹{product.price.toLocaleString("en-IN")}</p>
                    </div>
                    <span className={`text-[11px] px-2 py-1 rounded-full ${product.isPublished ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>
                      {product.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-[#F5F5F5]/45">
                    <span className={product.stockQuantity <= 3 ? "text-yellow-400" : ""}>Stock: {product.stockQuantity}</span>
                    <span>{[product.sizes.length ? `${product.sizes.length} sizes` : "", product.variations.length ? `${product.variations.length} variations` : ""].filter(Boolean).join(" · ") || "Basic"}</span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => startEdit(product)} className="flex-1 px-3 py-2 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-xs">Edit</button>
                    <button onClick={() => deleteProduct(product.id)} className="flex-1 px-3 py-2 rounded-full border border-red-400/20 text-red-400 text-xs">Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D4A853]/10">
                  {["Product", "Price", "Stock", "Status", "Options", "Actions"].map((heading) => (
                    <th key={heading} className="text-left p-4 font-cinzel text-[#D4A853] text-xs uppercase tracking-wider">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A853]/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#D4A853]/3">
                    <td className="p-4">
                      <p className="text-[#F5F5F5]/80 text-sm font-medium">{product.emoji} {product.title}</p>
                      <p className="text-[#F5F5F5]/35 text-xs">{product.category} · {product.sku || "No SKU"}</p>
                    </td>
                    <td className="p-4 text-[#D4A853] font-semibold text-sm">₹{product.price.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-sm">
                      <span className={product.stockQuantity <= 3 ? "text-yellow-400" : "text-[#F5F5F5]/60"}>
                        {product.stockQuantity}
                      </span>
                      {product.stockQuantity <= 3 && (
                        <span className="block text-[11px] text-yellow-400/80">Low stock</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${product.isPublished ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>
                        {product.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-[#F5F5F5]/40 text-xs">
                      {[product.sizes.length ? `${product.sizes.length} sizes` : "", product.variations.length ? `${product.variations.length} variations` : ""].filter(Boolean).join(" · ") || "Basic"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3 text-xs">
                        <button onClick={() => startEdit(product)} className="text-[#D4A853]">Edit</button>
                        <button onClick={() => deleteProduct(product.id)} className="text-red-400">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
