import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, readStore, touch, updateStore } from "@/lib/local-store";
import { normalizeShopProduct } from "@/lib/shop";
import { slugify } from "@/utils/helpers";
import ShopProduct from "@/models/ShopProduct";

function parseList(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

function buildUpdate(body: Record<string, any>) {
  return {
    title: String(body.title || "").trim(),
    description: String(body.description || "").trim(),
    longDescription: String(body.longDescription || body.description || "").trim(),
    category: body.category || "books",
    price: Number(body.price || 0),
    originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
    emoji: body.emoji || "🛕",
    image: body.image || "",
    imagePublicId: body.imagePublicId || "",
    tags: parseList(body.tags),
    badge: body.badge || "",
    badgeColor: body.badgeColor || "",
    rating: Number(body.rating || 4.8),
    reviews: Number(body.reviews || 0),
    stockQuantity: Math.max(0, Number(body.stockQuantity ?? 0)),
    inStock: Number(body.stockQuantity ?? 0) > 0,
    sizeLabel: body.sizeLabel || "",
    sizes: parseList(body.sizes),
    variations: parseList(body.variations),
    isPublished: body.isPublished !== false,
    isFeatured: Boolean(body.isFeatured),
    sku: body.sku || "",
  };
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (LOCAL_MODE) {
      const store = readStore();
      const product = store.shopProducts.find((item) => item._id === id || item.slug === id);
      if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
      return NextResponse.json({ product: normalizeShopProduct(product) });
    }

    await connectDB();
    const product = await ShopProduct.findOne({ $or: [{ _id: id }, { slug: id }] }).lean();
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ product: normalizeShopProduct(product) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const payload = buildUpdate(body);
    const nextSlug = slugify(body.slug || payload.title);

    if (LOCAL_MODE) {
      let updated: Record<string, any> | null = null;
      updateStore((store) => {
        store.shopProducts = store.shopProducts.map((item) => {
          if (item._id !== id) return item;
          updated = touch({ ...item, ...payload, slug: nextSlug || item.slug });
          return updated;
        });
      });
      if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });
      return NextResponse.json({ product: normalizeShopProduct(updated) });
    }

    await connectDB();
    const product = await ShopProduct.findByIdAndUpdate(id, { ...payload, slug: nextSlug }, { new: true }).lean();
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ product: normalizeShopProduct(product) });
  } catch (err) {
    console.error("Shop product PUT error:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const { id } = await params;

    if (LOCAL_MODE) {
      let removed = false;
      updateStore((store) => {
        const before = store.shopProducts.length;
        store.shopProducts = store.shopProducts.filter((item) => item._id !== id);
        removed = store.shopProducts.length !== before;
      });
      if (!removed) return NextResponse.json({ error: "Product not found" }, { status: 404 });
      return NextResponse.json({ success: true });
    }

    await connectDB();
    const deleted = await ShopProduct.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
