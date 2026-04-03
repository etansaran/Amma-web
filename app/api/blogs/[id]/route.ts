import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";
import { LOCAL_MODE, readStore, touch, updateStore } from "@/lib/local-store";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    if (LOCAL_MODE) {
      let blog = readStore().blogs.find((item) => item._id === id || item.slug === id);
      if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

      updateStore((store) => {
        const index = store.blogs.findIndex((item) => item._id === blog!._id);
        if (index !== -1) {
          store.blogs[index] = touch({ ...store.blogs[index], views: (store.blogs[index].views || 0) + 1 });
          blog = store.blogs[index];
        }
      });

      return NextResponse.json({ blog });
    }

    await connectDB();
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const blog = await Blog.findOne(query);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    // Increment views
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();

    if (LOCAL_MODE) {
      let blog: Record<string, unknown> | null = null;
      updateStore((store) => {
        const index = store.blogs.findIndex((item) => item._id === params.id);
        if (index === -1) return;
        store.blogs[index] = touch({ ...store.blogs[index], ...body });
        blog = store.blogs[index];
      });
      if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      return NextResponse.json({ blog });
    }

    await connectDB();
    const blog = await Blog.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    if (LOCAL_MODE) {
      updateStore((store) => {
        store.blogs = store.blogs.filter((item) => item._id !== params.id);
      });
      return NextResponse.json({ message: "Blog deleted" });
    }

    await connectDB();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Blog deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
