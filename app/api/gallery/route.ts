import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { requireAuth } from "@/lib/auth";
import { createLocalRecord, LOCAL_MODE, readStore, updateStore } from "@/lib/local-store";

// GET /api/gallery - Public: list gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "100");

    if (LOCAL_MODE) {
      const store = readStore();
      const images = store.galleryImages
        .filter((image) => !category || image.category === category)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
      return NextResponse.json({ images });
    }

    await connectDB();
    const query: Record<string, unknown> = {};
    if (category) query.category = category;

    const images = await GalleryImage.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// POST /api/gallery - Admin: create gallery image record
export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();
    const { url, publicId, caption, category } = body;

    if (!url || !publicId) {
      return NextResponse.json({ error: "url and publicId are required" }, { status: 400 });
    }

    if (LOCAL_MODE) {
      const image = createLocalRecord({
        url,
        publicId,
        caption,
        category: category || "other",
        isFeatured: false,
      });
      updateStore((store) => {
        store.galleryImages.unshift(image);
      });
      return NextResponse.json({ image }, { status: 201 });
    }

    await connectDB();
    const image = await GalleryImage.create({ url, publicId, caption, category: category || "other" });
    return NextResponse.json({ image }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 });
  }
}
