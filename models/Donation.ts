import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDonation extends Document {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  country: string;
  amount: number;
  currency: "INR" | "USD" | "GBP" | "EUR" | "AUD" | "CAD" | "SGD";
  amountInINR: number;
  category: "annadhanam" | "pournami" | "karthigai-deepam" | "construction" | "general" | "virtual-seva";
  frequency: "one-time" | "monthly";
  message?: string;
  paymentGateway: "razorpay" | "stripe";
  paymentId?: string;
  orderId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  receiptNumber?: string;
  receiptUrl?: string;
  panCard?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    donorName: { type: String, required: true, trim: true },
    donorEmail: { type: String, required: true, lowercase: true },
    donorPhone: { type: String },
    country: { type: String, default: "India" },
    amount: { type: Number, required: true, min: 1 },
    currency: {
      type: String,
      enum: ["INR", "USD", "GBP", "EUR", "AUD", "CAD", "SGD"],
      default: "INR",
    },
    amountInINR: { type: Number, required: true },
    category: {
      type: String,
      enum: ["annadhanam", "pournami", "karthigai-deepam", "construction", "general", "virtual-seva"],
      default: "general",
    },
    frequency: {
      type: String,
      enum: ["one-time", "monthly"],
      default: "one-time",
    },
    message: { type: String, maxlength: 500 },
    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe"],
      default: "razorpay",
    },
    paymentId: { type: String },
    orderId: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    receiptNumber: { type: String },
    receiptUrl: { type: String },
    panCard: { type: String },
  },
  { timestamps: true }
);

DonationSchema.index({ status: 1, createdAt: -1 });
DonationSchema.index({ donorEmail: 1 });

const Donation: Model<IDonation> =
  mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema);

export default Donation;
