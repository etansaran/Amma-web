import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import { createLocalRecord, LOCAL_MODE, paginate, readStore, updateStore } from "@/lib/local-store";
import { normalizeShopProduct } from "@/lib/shop";
import { slugify } from "@/utils/helpers";
import ShopProduct from "@/models/ShopProduct";

function parseList(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function buildProductPayload(body: Record<string, any>) {
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

// Public/admin: list products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "24");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search")?.toLowerCase();
    const isAdmin = searchParams.get("admin") === "true";

    if (LOCAL_MODE) {
      const store = readStore();
      let products = store.shopProducts.filter((item) => (isAdmin ? true : item.isPublished));
      if (category && category !== "all") products = products.filter((item) => item.category === category);
      if (featured === "true") products = products.filter((item) => item.isFeatured);
      if (search) {
        products = products.filter((item) =>
          [item.title, item.description, ...(item.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(search)
        );
      }
      products = [...products].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const result = paginate(products, page, limit);
      return NextResponse.json({
        products: result.items.map(normalizeShopProduct),
        pagination: result.pagination,
      });
    }

    await connectDB();
    const query: Record<string, any> = isAdmin ? {} : { isPublished: true };
    if (category && category !== "all") query.category = category;
    if (featured === "true") query.isFeatured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const total = await ShopProduct.countDocuments(query);
    const products = await ShopProduct.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      products: products.map(normalizeShopProduct),
      pagination: { total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (error) {
    console.error("Shop products GET error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// Admin: create product
export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();
    const payload = buildProductPayload(body);

    if (!payload.title || !payload.description || !payload.price || !payload.category) {
      return NextResponse.json({ error: "Title, description, category, and price are required" }, { status: 400 });
    }

    const baseSlug = slugify(body.slug || payload.title);

    if (LOCAL_MODE) {
      const store = readStore();
      const exists = store.shopProducts.find((item) => item.slug === baseSlug);
      const slug = exists ? `${baseSlug}-${Date.now()}` : baseSlug;
      const product = createLocalRecord({
        ...payload,
        slug,
      });
      updateStore((draft) => {
        draft.shopProducts.unshift(product);
      });
      return NextResponse.json({ product: normalizeShopProduct(product) }, { status: 201 });
    }

    await connectDB();
    const exists = await ShopProduct.findOne({ slug: baseSlug });
    const slug = exists ? `${baseSlug}-${Date.now()}` : baseSlug;
    const product = await ShopProduct.create({ ...payload, slug });
    return NextResponse.json({ product: normalizeShopProduct(product.toObject()) }, { status: 201 });
  } catch (error) {
    console.error("Shop products POST error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
