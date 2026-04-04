import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { LOCAL_MODE, touch, updateStore } from "@/lib/local-store";

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } =
      await request.json();

    if (LOCAL_MODE || !process.env.RAZORPAY_KEY_SECRET) {
      let donation: Record<string, unknown> | null = null;
      updateStore((store) => {
        const index = store.donations.findIndex((item) => item._id === donationId);
        if (index === -1) return;
        store.donations[index] = touch({
          ...store.donations[index],
          status: "completed",
          paymentId: razorpay_payment_id || `local_payment_${Date.now()}`,
          receiptUrl: `/admin/donations/${donationId}/receipt`,
        });
        donation = store.donations[index];
      });

      return NextResponse.json({
        message: "Payment verified successfully",
        donation,
      });
    }

    await connectDB();

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
        receiptUrl: `/admin/donations/${donationId}/receipt`,
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
