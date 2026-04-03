const baseUrl = process.env.QA_BASE_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(`${path} failed (${response.status}): ${typeof data === "string" ? data : JSON.stringify(data)}`);
  }

  return data;
}

async function main() {
  const login = await request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@amma.org", password: "admin" }),
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${login.token}`,
  };

  const createdProduct = await request("/api/shop/products", {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: "Tester Copper Bowl",
      description: "Simple pooja bowl for QA checkout",
      longDescription: "Simple pooja bowl for QA checkout and admin verification.",
      category: "home-decor",
      price: 555,
      stockQuantity: 4,
      emoji: "🏺",
      sku: "QA-BOWL",
      sizeLabel: "Size",
      sizes: "Small, Large",
      variations: "Copper, Antique",
      tags: "qa, bowl",
      isPublished: true,
      isFeatured: false,
    }),
  });

  const publicProducts = await request("/api/shop/products?limit=100");
  const product = publicProducts.products.find((item) => item.id === createdProduct.product.id);
  if (!product) throw new Error("Created product did not appear in public product list");

  const orderResponse = await request("/api/shop/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: "QA Devotee",
      email: "qa-shop@example.com",
      phone: "9876543210",
      addressLine1: "1 Arunachala Street",
      addressLine2: "Near Temple Road",
      city: "Thiruvannamalai",
      state: "Tamil Nadu",
      postalCode: "606601",
      country: "India",
      notes: "Please pack with care",
      paymentMethod: "upi-transfer",
      items: [
        {
          productId: product.id,
          quantity: 1,
          selectedSize: "Large",
          selectedVariation: "Copper",
        },
      ],
    }),
  });

  const adminOrders = await request("/api/shop/orders?admin=true&limit=20", {
    headers: { Authorization: `Bearer ${login.token}` },
  });
  const createdOrder = adminOrders.orders.find((item) => item._id === orderResponse.order._id);
  if (!createdOrder) throw new Error("Created order did not appear in admin orders list");

  const updatedOrder = await request(`/api/shop/orders/${createdOrder._id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      paymentStatus: "paid",
      orderStatus: "processing",
    }),
  });

  const productAfter = await request(`/api/shop/products/${product.id}`);

  console.log(JSON.stringify({
    createdProduct: {
      id: createdProduct.product.id,
      title: createdProduct.product.title,
      stockQuantity: createdProduct.product.stockQuantity,
    },
    publicProductFound: true,
    createdOrder: {
      id: createdOrder._id,
      orderNumber: createdOrder.orderNumber,
      paymentStatus: createdOrder.paymentStatus,
      orderStatus: createdOrder.orderStatus,
      shippingCity: createdOrder.city,
    },
    updatedOrder: {
      paymentStatus: updatedOrder.order.paymentStatus,
      orderStatus: updatedOrder.order.orderStatus,
    },
    stockAfterOrder: productAfter.product.stockQuantity,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
