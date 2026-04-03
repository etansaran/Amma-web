import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAppointment extends Document {
  name: string;
  email: string;
  phone: string;
  country: string;
  purpose: "personal-guidance" | "healing" | "meditation-initiation" | "general-darshan" | "virtual-seva" | "other";
  preferredDate: Date;
  preferredTime: string;
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    country: { type: String, default: "India" },
    purpose: {
      type: String,
      enum: ["personal-guidance", "healing", "meditation-initiation", "general-darshan", "virtual-seva", "other"],
      required: true,
    },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, maxlength: 1000 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

AppointmentSchema.index({ status: 1, preferredDate: 1 });

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
