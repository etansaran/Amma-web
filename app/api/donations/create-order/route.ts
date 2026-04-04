import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { createOrder } from "@/lib/razorpay";
import { convertToINR } from "@/utils/helpers";
import { createLocalRecord, LOCAL_MODE, updateStore } from "@/lib/local-store";
import { checkRateLimit } from "@/lib/rate-limit";

function createReceiptNumber() {
  return `DON-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
}

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, "donations-create-order", 10, 60_000);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Too many donation attempts. Please wait a minute and try again." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
      );
    }

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

    if (LOCAL_MODE || !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      const donation = createLocalRecord({
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
        orderId: `local_order_${Date.now()}`,
        paymentGateway: "local",
        status: "completed",
        paymentId: `local_payment_${Date.now()}`,
        receiptNumber: createReceiptNumber(),
        receiptUrl: "",
      });

      updateStore((store) => {
        store.donations.unshift(donation);
      });

      return NextResponse.json({
        mode: "local",
        donationId: donation._id,
        amount: donation.amountInINR,
        currency: "INR",
        message: "Donation recorded in local mode",
      });
    }

    await connectDB();

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
      receiptNumber: createReceiptNumber(),
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
