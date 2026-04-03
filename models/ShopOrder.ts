import { Schema, models, model } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    sku: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    selectedSize: { type: String },
    selectedVariation: { type: String },
    emoji: { type: String },
  },
  { _id: false }
);

const ShopOrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
    notes: { type: String, default: "" },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["cash-on-delivery", "upi-transfer"],
      default: "upi-transfer",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["new", "processing", "shipped", "delivered", "cancelled"],
      default: "new",
    },
    customerMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

ShopOrderSchema.index({ createdAt: -1 });
ShopOrderSchema.index({ paymentStatus: 1, orderStatus: 1 });

export default models.ShopOrder || model("ShopOrder", ShopOrderSchema);
