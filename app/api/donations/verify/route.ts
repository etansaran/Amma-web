import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } =
      await request.json();

    // Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await Donation.findByIdAndUpdate(donationId, { status: "failed" });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const donation = await Donation.findByIdAndUpdate(
      donationId,
      {
        status: "completed",
        paymentId: razorpay_payment_id,
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Payment verified successfully",
      donation,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
