import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISiteSettings extends Document {
  youtubeLiveId?: string;
  siteAnnouncement?: string;
  announcementActive: boolean;
  maintenanceMode: boolean;
  contactEmail: string;
  contactPhone?: string;
  donationUpiId?: string;
  ashramAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    youtubeLiveId: { type: String },
    siteAnnouncement: { type: String, maxlength: 300 },
    announcementActive: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },
    contactEmail: { type: String, default: "info@ammaashram.org" },
    contactPhone: { type: String },
    donationUpiId: { type: String },
    ashramAddress: { type: String },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
