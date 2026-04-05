"use client";
import CartDetailModal from "@/app/components/modal/CartDetailModal";
import { deleteCartItem, eventAddToCart, getCartItems } from "@/services/cart.service";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const GUEST_CART_KEY = "runrise_guest_cart";

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState({ id: null, totalAmount: "0.00", items: [] });

  // Helper to get guest items
  const getGuestItems = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
  };

  const fetchCart = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    // If NOT logged in, load from localStorage
    if (!token) {
      const items = getGuestItems();
      setCartData({
        id: "guest",
        totalAmount: items.reduce((acc, curr) => acc + (curr.price || 0), 0).toFixed(2),
        items: items
      });
      return;
    }

    try {
      const response = await getCartItems();
      if (response?.data) setCartData(response.data);
    } catch (err) {
      console.error("Cart fetch error suppressed.");
    }
  }, []);

  // Professional Sync Function
  const syncGuestCart = async () => {
    const items = getGuestItems();
    if (items.length === 0) return;

    try {
      // Loop through guest items and call your API
      for (const item of items) {
        await eventAddToCart(item);
      }
      localStorage.removeItem(GUEST_CART_KEY);
      await fetchCart();
    } catch (error) {
      console.error("Sync error:", error);
    }
  };

  const addToCart = async (payload) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      await eventAddToCart(payload);
    } else {
      const currentItems = getGuestItems();
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify([...currentItems, payload]));
    }
    await fetchCart();
    setIsCartOpen(true);
  };

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const handleDeleteCartItem = async (cartItemId) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Logged in: Delete from Server
      await deleteCartItem(cartItemId);
    } else {
      // Guest: Delete from LocalStorage
      const currentItems = JSON.parse(localStorage.getItem("guest_cart_items") || "[]");
      // If you don't have unique IDs for guest items, you might need to add a temp UUID when adding to cart
      const filteredItems = currentItems.filter(item => item.id !== cartItemId);
      localStorage.setItem("guest_cart_items", JSON.stringify(filteredItems));
    }

    await fetchCart();
  };

  return (
    <CartContext.Provider value={{
      isCartOpen,
      setIsCartOpen,
      cartData,
      fetchCart,
      addToCart, // Use this centralized method
      syncGuestCart,
      handleDeleteCartItem,
    }}>
      {children}
      {isCartOpen && (
        <CartDetailModal
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartData={cartData}
        />
      )}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);