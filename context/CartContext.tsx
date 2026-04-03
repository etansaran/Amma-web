"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { ShopCartProduct } from "@/lib/shop";

export interface CartSelection {
  selectedSize?: string;
  selectedVariation?: string;
}

export interface CartItem {
  id: string;
  product: ShopCartProduct;
  quantity: number;
  selectedSize?: string;
  selectedVariation?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: ShopCartProduct, selection?: CartSelection) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product: ShopCartProduct, selection?: CartSelection) => {
    const cartItemId = [product.id, selection?.selectedSize || "", selection?.selectedVariation || ""].join("__");
    setItems(prev => {
      const existing = prev.find(i => i.id === cartItemId);
      if (existing) {
        return prev.map(i =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity: 1,
          selectedSize: selection?.selectedSize || "",
          selectedVariation: selection?.selectedVariation || "",
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev =>
      prev.map(i => i.id === itemId ? { ...i, quantity } : i)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen, addToCart, removeFromCart,
      updateQuantity, clearCart, openCart, closeCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
