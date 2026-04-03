import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { deleteImage } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/auth";
import { LOCAL_MODE, touch, updateStore } from "@/lib/local-store";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();
    const update: Record<string, unknown> = {};
    if (body.caption !== undefined) update.caption = body.caption;
    if (body.category) update.category = body.category;
    if (typeof body.isFeatured === "boolean") update.isFeatured = body.isFeatured;

    if (LOCAL_MODE) {
      let image: Record<string, unknown> | null = null;
      updateStore((store) => {
        const index = store.galleryImages.findIndex((item) => item._id === params.id);
        if (index === -1) return;
        store.galleryImages[index] = touch({ ...store.galleryImages[index], ...update });
        image = store.galleryImages[index];
      });
      if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });
      return NextResponse.json({ image });
    }

    await connectDB();
    const image = await GalleryImage.findByIdAndUpdate(params.id, update, { new: true });
    if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });
    return NextResponse.json({ image });
  } catch {
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAuth(request);
  if (error) return error;

  try {
    if (LOCAL_MODE) {
      updateStore((store) => {
        store.galleryImages = store.galleryImages.filter((item) => item._id !== params.id);
      });
      return NextResponse.json({ message: "Image deleted" });
    }

    await connectDB();
    const image = await GalleryImage.findById(params.id);
    if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });

    await deleteImage(image.publicId);
    await GalleryImage.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Image deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
