import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEventRegistration extends Document {
  event: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  numberOfAttendees: number;
  country: string;
  specialRequirements?: string;
  createdAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    numberOfAttendees: { type: Number, default: 1, min: 1, max: 20 },
    country: { type: String, default: "India" },
    specialRequirements: { type: String },
  },
  { timestamps: true }
);

const EventRegistration: Model<IEventRegistration> =
  mongoose.models.EventRegistration ||
  mongoose.model<IEventRegistration>("EventRegistration", EventRegistrationSchema);

export default EventRegistration;
