"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[#1A1A1A] border-l border-[#D4A853]/15 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4A853]/15">
              <div>
                <h2 className="font-cinzel text-[#F5F5F5] text-lg font-semibold">
                  My Cart
                </h2>
                <p className="text-[#C17F4A] text-xs mt-0.5">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-[#222222] flex items-center justify-center text-[#F5F5F5]/60 hover:text-[#F5F5F5] hover:bg-[#3A2A1A] transition-all"
              >
                ✕
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <span className="text-6xl mb-4 opacity-40">🛕</span>
                  <p className="font-cinzel text-[#F5F5F5]/50 text-base">Your cart is empty</p>
                  <p className="text-[#F5F5F5]/30 text-sm mt-2">Add sacred items to begin</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ background: "#C17F4A" }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 bg-[#222222] rounded-xl p-3 border border-[#D4A853]/10"
                  >
                    {/* Emoji image */}
                    <div className="w-16 h-16 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-3xl shrink-0">
                      {item.product.emoji}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-cinzel text-[#F5F5F5] text-xs font-semibold leading-snug line-clamp-2 mb-1">
                        {item.product.name}
                      </p>
                      <p className="text-[#D4A853] text-sm font-bold mb-2">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 rounded-full bg-[#1A1A1A] text-[#F5F5F5] text-sm flex items-center justify-center disabled:opacity-30 hover:bg-[#C17F4A]/20 transition-colors"
                        >
                          −
                        </button>
                        <span className="text-[#F5F5F5] text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-[#1A1A1A] text-[#F5F5F5] text-sm flex items-center justify-center hover:bg-[#C17F4A]/20 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-[#F5F5F5]/30 hover:text-red-400 text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#D4A853]/15 px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-[#F5F5F5]/60 text-sm">Subtotal</span>
                  <span className="font-cinzel text-[#D4A853] text-lg font-bold">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[#F5F5F5]/30 text-xs">
                  Shipping calculated at checkout · Free above ₹999
                </p>

                {/* Checkout button */}
                <button
                  className="w-full py-3.5 rounded-full font-cinzel font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(193,127,74,0.4)]"
                  style={{ background: "linear-gradient(135deg, #C17F4A, #D4A853)" }}
                >
                  Proceed to Checkout →
                </button>

                {/* Trust badges */}
                <div className="flex justify-center gap-4 pt-1">
                  {["🔒 Secure", "📦 Fast Ship", "✓ Authentic"].map(t => (
                    <span key={t} className="text-[#F5F5F5]/30 text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
