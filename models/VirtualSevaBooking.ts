import mongoose, { Document, Model, Schema } from "mongoose";

export interface IVirtualSevaBooking extends Document {
  name: string;
  email: string;
  phone?: string;
  country: string;
  sevaType: "abhishekam" | "homam" | "archana" | "annadhanam" | "special-pooja" | "virtual-satsang";
  sevaTitle: string;
  preferredDate?: Date;
  intention?: string;
  amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  adminNotes?: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VirtualSevaBookingSchema = new Schema<IVirtualSevaBooking>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    country: { type: String, default: "India" },
    sevaType: {
      type: String,
      enum: ["abhishekam", "homam", "archana", "annadhanam", "special-pooja", "virtual-satsang"],
      required: true,
    },
    sevaTitle: { type: String, required: true },
    preferredDate: { type: Date },
    intention: { type: String, maxlength: 500 },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    adminNotes: { type: String },
    paymentId: { type: String },
  },
  { timestamps: true }
);

VirtualSevaBookingSchema.index({ status: 1, createdAt: -1 });
VirtualSevaBookingSchema.index({ email: 1 });

const VirtualSevaBooking: Model<IVirtualSevaBooking> =
  mongoose.models.VirtualSevaBooking ||
  mongoose.model<IVirtualSevaBooking>("VirtualSevaBooking", VirtualSevaBookingSchema);

export default VirtualSevaBooking;
