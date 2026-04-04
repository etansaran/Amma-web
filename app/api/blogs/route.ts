import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAuth } from "@/lib/auth";
import { slugify, calculateReadTime } from "@/utils/helpers";
import { createLocalRecord, LOCAL_MODE, paginate, readStore, updateStore } from "@/lib/local-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "9");
    const page = parseInt(searchParams.get("page") || "1");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const admin = searchParams.get("admin");
    const search = searchParams.get("search")?.toLowerCase().trim();

    if (LOCAL_MODE) {
      const store = readStore();
      let blogs = store.blogs.filter((blog) => (admin ? true : blog.isPublished));
      if (category) blogs = blogs.filter((blog) => blog.category === category);
      if (featured === "true") blogs = blogs.filter((blog) => blog.isFeatured);
      if (search) {
        blogs = blogs.filter((blog) =>
          [blog.title, blog.excerpt, blog.author, blog.category]
            .join(" ")
            .toLowerCase()
            .includes(search)
        );
      }
      blogs = blogs
        .map((blog) => {
          const { content, ...rest } = blog;
          void content;
          return rest;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const result = paginate(blogs, page, limit);

      return NextResponse.json({
        blogs: result.items,
        pagination: result.pagination,
      });
    }

    await connectDB();
    const query: Record<string, unknown> = admin ? {} : { isPublished: true };
    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

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
    const body = await request.json();

    const slug = body.slug || slugify(body.title);
    const readTime = calculateReadTime(body.content);

    if (LOCAL_MODE) {
      const store = readStore();
      const existing = store.blogs.find((blog) => blog.slug === slug);
      const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
      const blog = createLocalRecord({
        ...body,
        slug: finalSlug,
        readTime,
        views: 0,
        tags: body.tags || [],
        isFeatured: Boolean(body.isFeatured),
        isPublished: Boolean(body.isPublished),
      });
      updateStore((draft) => {
        draft.blogs.unshift(blog);
      });
      return NextResponse.json({ blog }, { status: 201 });
    }

    await connectDB();
    const existing = await Blog.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
    const blog = await Blog.create({ ...body, slug: finalSlug, readTime });
    return NextResponse.json({ blog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
