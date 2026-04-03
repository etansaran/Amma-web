export type ShopCategory = "all" | "books" | "rudraksha" | "home-decor";

export interface ShopProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: Exclude<ShopCategory, "all">;
  price: number;
  originalPrice?: number;
  emoji?: string;
  image?: string;
  imagePublicId?: string;
  tags: string[];
  badge?: string;
  badgeColor?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockQuantity: number;
  sizeLabel?: string;
  sizes: string[];
  variations: string[];
  isPublished: boolean;
  isFeatured: boolean;
  sku?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopCartProduct extends ShopProduct {}

export interface ShopOrderItem {
  productId: string;
  title: string;
  sku?: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedVariation?: string;
  emoji?: string;
}

export interface ShopOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes?: string;
  items: ShopOrderItem[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: "cash-on-delivery" | "upi-transfer";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  customerMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export const shopCategories: Array<{
  id: ShopCategory;
  label: string;
  emoji: string;
}> = [
  { id: "all", label: "All Products", emoji: "🛕" },
  { id: "books", label: "Books", emoji: "📖" },
  { id: "rudraksha", label: "Rudraksha", emoji: "📿" },
  { id: "home-decor", label: "Home Decor", emoji: "🪔" },
];

export function normalizeShopProduct(product: Record<string, any>): ShopProduct {
  return {
    id: product._id ?? product.id,
    slug: product.slug,
    title: product.title ?? product.name,
    description: product.description ?? "",
    longDescription: product.longDescription ?? "",
    category: product.category,
    price: Number(product.price ?? 0),
    originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
    emoji: product.emoji ?? "🛕",
    image: product.image,
    imagePublicId: product.imagePublicId,
    tags: Array.isArray(product.tags) ? product.tags : [],
    badge: product.badge,
    badgeColor: product.badgeColor,
    rating: Number(product.rating ?? 4.8),
    reviews: Number(product.reviews ?? 0),
    inStock: Boolean(product.inStock),
    stockQuantity: Number(product.stockQuantity ?? 0),
    sizeLabel: product.sizeLabel ?? "",
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    variations: Array.isArray(product.variations) ? product.variations : [],
    isPublished: product.isPublished !== false,
    isFeatured: Boolean(product.isFeatured),
    sku: product.sku,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export function calculateShipping(subtotal: number) {
  return subtotal >= 999 ? 0 : 99;
}

export function formatOrderNumber(index: number) {
  return `AMMA-${String(index).padStart(5, "0")}`;
}
