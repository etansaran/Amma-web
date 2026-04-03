import mongoose, { Document, Model, Schema } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  country: string;
  subject: string;
  message: string;
  isRead: boolean;
  repliedAt?: Date;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    country: { type: String, default: "India" },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, maxlength: 2000 },
    isRead: { type: Boolean, default: false },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);

export default ContactMessage;
