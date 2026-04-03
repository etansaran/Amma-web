"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/shopData";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#D4A853]/10 hover:border-[#C17F4A]/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(193,127,74,0.12)] flex flex-col"
    >
      {/* Badge — flush left like Isha Life */}
      {product.badge && (
        <div
          className="absolute top-3 left-0 z-10 px-3 py-1 text-[11px] font-bold text-white tracking-wide"
          style={{
            background: product.badgeColor ?? "#C17F4A",
            borderRadius: "0 20px 20px 0",
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Discount badge — top right */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-[#8B0000] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
          {discount}% OFF
        </div>
      )}

      {/* Product image / emoji area */}
      <div className="relative h-52 bg-gradient-to-br from-[#222222] to-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500 select-none">
          {product.emoji}
        </span>
        {/* Hover overlay with quick-add */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={handleAdd}
            className="px-5 py-2 text-sm font-semibold text-white rounded-full transition-all duration-200"
            style={{ background: "#C17F4A" }}
          >
            {added ? "✓ Added!" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category label */}
        <p className="text-[#C17F4A] text-[11px] font-semibold uppercase tracking-[0.15em] mb-1">
          {product.category === "home-decor" ? "Home Decor" : product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </p>

        {/* Product name */}
        <h3 className="font-cinzel text-[#F5F5F5] text-sm font-semibold leading-snug mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-[#F5F5F5]/50 text-xs leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="text-xs"
                style={{ color: i < Math.round(product.rating) ? "#D4A853" : "#4A3520" }}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-[#F5F5F5]/40 text-[11px]">({product.reviews})</span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-cinzel text-[#D4A853] text-base font-bold">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-[#D4A853]/40 text-sm line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          className="w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border"
          style={{
            background: added ? "#2D6A4F" : "transparent",
            borderColor: added ? "#2D6A4F" : "#C17F4A",
            color: added ? "#fff" : "#C17F4A",
          }}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}
