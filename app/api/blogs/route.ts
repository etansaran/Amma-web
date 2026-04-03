import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAuth } from "@/lib/auth";
import { slugify, calculateReadTime } from "@/utils/helpers";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "9");
    const page = parseInt(searchParams.get("page") || "1");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const admin = searchParams.get("admin");

    const query: Record<string, unknown> = admin ? {} : { isPublished: true };
    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .select("-content")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      blogs,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    await connectDB();
    const body = await request.json();

    const slug = body.slug || slugify(body.title);
    const existing = await Blog.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
    const readTime = calculateReadTime(body.content);

    const blog = await Blog.create({ ...body, slug: finalSlug, readTime });
    return NextResponse.json({ blog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
