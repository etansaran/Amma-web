import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { createOrder } from "@/lib/razorpay";
import { convertToINR } from "@/utils/helpers";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      donorName,
      donorEmail,
      donorPhone,
      country,
      amount,
      currency = "INR",
      category = "general",
      frequency = "one-time",
      message,
      panCard,
    } = body;

    if (!donorName || !donorEmail || !amount) {
      return NextResponse.json(
        { error: "Name, email, and amount are required" },
        { status: 400 }
      );
    }

    const amountInINR = convertToINR(amount, currency);

    // Create Razorpay order (amount in paise)
    const order = await createOrder({
      amount: amountInINR * 100,
      currency: "INR",
      receipt: `donation_${Date.now()}`,
      notes: {
        donorName,
        donorEmail,
        category,
        frequency,
      },
    });

    // Save pending donation
    const donation = await Donation.create({
      donorName,
      donorEmail,
      donorPhone,
      country: country || "India",
      amount,
      currency,
      amountInINR,
      category,
      frequency,
      message,
      panCard,
      orderId: order.id,
      paymentGateway: "razorpay",
      status: "pending",
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      donationId: donation._id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
