import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import ShopContent from "@/components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Sacred Shop — Books, Rudraksha & Home Decor",
  description:
    "Shop authentic spiritual items from Siva Sri Thiyaneswar Amma Ashram — sacred books, energized Rudraksha malas, brass lamps and Hindu spiritual home decor. Ships across India and worldwide.",
};

export default function ShopPage() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}
