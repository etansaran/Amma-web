import mongoose, { Document, Model, Schema } from "mongoose";

export interface IGalleryImage extends Document {
  url: string;
  publicId: string;
  caption?: string;
  category: "ashram" | "events" | "annadhanam" | "nature" | "devotees" | "other";
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String },
    category: {
      type: String,
      enum: ["ashram", "events", "annadhanam", "nature", "devotees", "other"],
      default: "other",
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

GalleryImageSchema.index({ category: 1, createdAt: -1 });

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);

export default GalleryImage;
