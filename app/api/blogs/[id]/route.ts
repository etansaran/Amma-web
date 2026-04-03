import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = params;
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
    await connectDB();
    const body = await request.json();
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
    await connectDB();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Blog deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
