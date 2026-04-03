/**
 * Seed script — creates the initial admin user.
 * Run: npx ts-node scripts/seed.ts
 * (Or: npx tsx scripts/seed.ts)
 */

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  // Dynamically import to avoid module issues
  const { default: User } = await import("../models/User");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@ammaashram.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456";

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log("⚠️  Admin user already exists:", adminEmail);
    await mongoose.disconnect();
    return;
  }

  await User.create({
    name: "Ashram Admin",
    email: adminEmail,
    password: adminPassword,
    role: "superadmin",
  });

  console.log("✅ Admin user created:");
  console.log("   Email:", adminEmail);
  console.log("   Password:", adminPassword);
  console.log("   ⚠️  Please change the password after first login!");

  await mongoose.disconnect();
  console.log("✅ Done. Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
