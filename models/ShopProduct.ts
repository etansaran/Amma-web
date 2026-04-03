import mongoose, { Schema, models, model } from "mongoose";

const ShopProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    category: {
      type: String,
      enum: ["books", "rudraksha", "home-decor"],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    emoji: { type: String, default: "🛕" },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    tags: [{ type: String }],
    badge: { type: String, default: "" },
    badgeColor: { type: String, default: "" },
    rating: { type: Number, default: 4.8 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0, min: 0 },
    sizeLabel: { type: String, default: "" },
    sizes: [{ type: String }],
    variations: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    sku: { type: String, trim: true },
  },
  { timestamps: true }
);

ShopProductSchema.index({ isPublished: 1, createdAt: -1 });

export default models.ShopProduct || model("ShopProduct", ShopProductSchema);
