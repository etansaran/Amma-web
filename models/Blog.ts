import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: "teachings" | "events" | "devotees" | "annadhanam" | "ashram-life" | "festivals";
  tags: string[];
  image?: string;
  isFeatured: boolean;
  isPublished: boolean;
  readTime: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },
    author: { type: String, default: "Amma Ashram" },
    category: {
      type: String,
      enum: ["teachings", "events", "devotees", "annadhanam", "ashram-life", "festivals"],
      default: "teachings",
    },
    tags: [{ type: String, lowercase: true }],
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

BlogSchema.index({ isPublished: 1, createdAt: -1 });

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
