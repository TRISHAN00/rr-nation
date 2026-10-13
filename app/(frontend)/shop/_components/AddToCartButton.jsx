"use client";

import { useShopCart } from "@/hooks/useShopCart";
import { Button } from "@/app/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";

export default function AddToCartButton({ productId, stockQuantity, productData, className = "" }) {
  const { addToCart, loading } = useShopCart();

  return (
    <Button
      className={className}
      disabled={stockQuantity <= 0 || loading}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(productId, 1, productData);
      }}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4 mr-2" />
      )}
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
