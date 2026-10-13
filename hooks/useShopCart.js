"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

export function useShopCart() {
  const [loading, setLoading] = useState(false);
  const { addShopToCart } = useCart();

  const addToCart = async (productId, quantity = 1, productData = {}) => {
    try {
      setLoading(true);
      await addShopToCart(productId, quantity, productData);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading };
}
