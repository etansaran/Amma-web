import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  date: Date;
  endDate?: Date;
  time: string;
  location: string;
  category: "festival" | "pooja" | "annadhanam" | "meditation" | "satsang" | "other";
  image?: string;
  isRecurring: boolean;
  maxAttendees?: number;
  registeredCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    date: { type: Date, required: true },
    endDate: { type: Date },
    time: { type: String, required: true },
    location: { type: String, default: "Amma Ashram, Thiruvannamalai" },
    category: {
      type: String,
      enum: ["festival", "pooja", "annadhanam", "meditation", "satsang", "other"],
      default: "other",
    },
    image: { type: String },
    isRecurring: { type: Boolean, default: false },
    maxAttendees: { type: Number },
    registeredCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EventSchema.index({ date: 1, isPublished: 1 });
EventSchema.index({ slug: 1 });

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
