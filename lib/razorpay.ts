import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export interface CreateOrderOptions {
  amount: number; // in paise (INR * 100)
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export async function createOrder(options: CreateOrderOptions) {
  return razorpay.orders.create({
    amount: options.amount,
    currency: options.currency || "INR",
    receipt: options.receipt || `receipt_${Date.now()}`,
    notes: options.notes,
  });
}

export default razorpay;
