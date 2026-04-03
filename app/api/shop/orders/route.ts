import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { calculateShipping, formatOrderNumber } from "@/lib/shop";
import { createLocalRecord, LOCAL_MODE, paginate, readStore, updateStore } from "@/lib/local-store";
import ShopOrder from "@/models/ShopOrder";
import ShopProduct from "@/models/ShopProduct";

function getStats(orders: Array<Record<string, any>>) {
  return {
    totalOrders: orders.length,
    successfulOrders: orders.filter((item) => ["processing", "shipped", "delivered"].includes(item.orderStatus) || item.paymentStatus === "paid").length,
    paymentPending: orders.filter((item) => item.paymentStatus === "pending").length,
    totalRevenue: orders
      .filter((item) => item.paymentStatus === "paid")
      .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0),
  };
}

export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const { searchParams } = new URL(request.url);

  try {
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const paymentStatus = searchParams.get("paymentStatus");
    const orderStatus = searchParams.get("orderStatus");
    const email = searchParams.get("email");

    if (LOCAL_MODE) {
      const store = readStore();
      let orders = [...store.shopOrders];
      if (paymentStatus) orders = orders.filter((item) => item.paymentStatus === paymentStatus);
      if (orderStatus) orders = orders.filter((item) => item.orderStatus === orderStatus);
      if (email) orders = orders.filter((item) => item.email === email);
      orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const result = paginate(orders, page, limit);
      return NextResponse.json({ orders: result.items, pagination: result.pagination, stats: getStats(store.shopOrders) });
    }

    await connectDB();
    const query: Record<string, any> = {};
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (orderStatus) query.orderStatus = orderStatus;
    if (email) query.email = email;
    const total = await ShopOrder.countDocuments(query);
    const orders = await ShopOrder.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    const statsRows = await ShopOrder.find({}).lean();
    return NextResponse.json({
      orders,
      pagination: { total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) },
      stats: getStats(statsRows),
    });
  } catch (error) {
    console.error("Shop orders GET error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, "shop-order-create", 5, 10 * 60 * 1000);
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: `Too many checkout attempts. Try again in ${rateLimit.retryAfter}s.` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!body.customerName || !body.email || !body.phone || !body.addressLine1 || !body.city || !body.state || !body.postalCode || items.length === 0) {
      return NextResponse.json({ error: "Complete customer, address, and cart details are required" }, { status: 400 });
    }

    if (LOCAL_MODE) {
      const store = readStore();
      const enrichedItems = items.map((item: Record<string, any>) => {
        const product = store.shopProducts.find((entry) => entry._id === item.productId);
        if (!product) throw new Error("One or more products are no longer available");
        const quantity = Number(item.quantity || 1);
        if (product.stockQuantity < quantity) {
          throw new Error(`${product.title} does not have enough stock`);
        }
        return {
          productId: product._id,
          title: product.title,
          sku: product.sku,
          price: Number(product.price),
          quantity,
          selectedSize: item.selectedSize || "",
          selectedVariation: item.selectedVariation || "",
          emoji: product.emoji || "🛕",
        };
      });
      const subtotal = enrichedItems.reduce((sum: number, item: Record<string, any>) => sum + item.price * item.quantity, 0);
      const shippingFee = calculateShipping(subtotal);
      const order = createLocalRecord({
        orderNumber: formatOrderNumber(store.shopOrders.length + 1),
        customerName: body.customerName,
        email: String(body.email).toLowerCase(),
        phone: body.phone,
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2 || "",
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country || "India",
        notes: body.notes || "",
        items: enrichedItems,
        subtotal,
        shippingFee,
        totalAmount: subtotal + shippingFee,
        paymentMethod: body.paymentMethod === "cash-on-delivery" ? "cash-on-delivery" : "upi-transfer",
        paymentStatus: "pending",
        orderStatus: "new",
        customerMessage: body.paymentMethod === "cash-on-delivery"
          ? "Order received. Please keep cash ready at delivery."
          : "Order received. Our team will verify your payment and start processing shortly.",
      });

      updateStore((draft) => {
        draft.shopOrders.unshift(order);
        draft.shopProducts = draft.shopProducts.map((product) => {
          const line = enrichedItems.find((item: Record<string, any>) => item.productId === product._id);
          if (!line) return product;
          const stockQuantity = Math.max(0, Number(product.stockQuantity || 0) - Number(line.quantity || 0));
          return {
            ...product,
            stockQuantity,
            inStock: stockQuantity > 0,
            updatedAt: new Date().toISOString(),
          };
        });
      });

      return NextResponse.json({
        success: true,
        order,
        message: order.customerMessage,
      }, { status: 201 });
    }

    await connectDB();
    const productIds = items.map((item: Record<string, any>) => item.productId);
    const products = await ShopProduct.find({ _id: { $in: productIds } }).lean();
    const productMap = new Map(products.map((item) => [String(item._id), item]));
    const enrichedItems = items.map((item: Record<string, any>) => {
      const product = productMap.get(String(item.productId));
      if (!product) throw new Error("One or more products are no longer available");
      const quantity = Number(item.quantity || 1);
      if (Number(product.stockQuantity || 0) < quantity) {
        throw new Error(`${product.title} does not have enough stock`);
      }
      return {
        productId: String(product._id),
        title: product.title,
        sku: product.sku,
        price: Number(product.price),
        quantity,
        selectedSize: item.selectedSize || "",
        selectedVariation: item.selectedVariation || "",
        emoji: product.emoji || "🛕",
      };
    });
    const subtotal = enrichedItems.reduce((sum: number, item: Record<string, any>) => sum + item.price * item.quantity, 0);
    const shippingFee = calculateShipping(subtotal);
    const count = await ShopOrder.countDocuments();
    const order = await ShopOrder.create({
      orderNumber: formatOrderNumber(count + 1),
      customerName: body.customerName,
      email: String(body.email).toLowerCase(),
      phone: body.phone,
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2 || "",
      city: body.city,
      state: body.state,
      postalCode: body.postalCode,
      country: body.country || "India",
      notes: body.notes || "",
      items: enrichedItems,
      subtotal,
      shippingFee,
      totalAmount: subtotal + shippingFee,
      paymentMethod: body.paymentMethod === "cash-on-delivery" ? "cash-on-delivery" : "upi-transfer",
      paymentStatus: "pending",
      orderStatus: "new",
      customerMessage: body.paymentMethod === "cash-on-delivery"
        ? "Order received. Please keep cash ready at delivery."
        : "Order received. Our team will verify your payment and start processing shortly.",
    });
    await Promise.all(enrichedItems.map((item: Record<string, any>) =>
      ShopProduct.findByIdAndUpdate(item.productId, {
        $inc: { stockQuantity: -Number(item.quantity || 0) },
      })
    ));
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to place order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
