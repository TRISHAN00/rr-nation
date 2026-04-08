"use client";
import CartDetailModal from "@/app/components/modal/CartDetailModal";
import { deleteCartItem, eventAddToCart, getCartItems } from "@/services/cart.service";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const GUEST_CART_KEY = "runrise_guest_cart";

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState({ id: null, totalAmount: "0.00", items: [] });

  console.log(cartData)

  // Helper to get guest items
  const getGuestItems = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
  };

  const fetchCart = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      const items = getGuestItems();
      setCartData({
        id: "guest",
        // Calculate total correctly from the package price
        totalAmount: items.reduce((acc, curr) => acc + (Number(curr.package?.price) || 0), 0).toFixed(2),
        items: items.map(item => ({
          // CRITICAL: We map tempId to "id" so the Modal/UI sees a unique value
          id: item.tempId || item.eventTicketId,
          itemType: "ticket",
          quantity: item.quantity,
          unitPrice: item.package?.price,
          participant: item.participant,
          eventTicket: {
            ...item.package,
            event: item.package?.event // Ensure nested event data is preserved
          }
        }))
      });
      return;
    }

    try {
      const response = await getCartItems();
      if (response?.data) setCartData(response.data);
    } catch (err) {
      console.error("Cart fetch error.");
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
      // Logged in: Delete from Server using API ID
      await deleteCartItem(cartItemId);
    } else {
      // Guest: Delete from LocalStorage using our tempId
      const currentItems = getGuestItems();
      // Filter specifically for the item that matches the tempId
      const filteredItems = currentItems.filter(item => item.tempId !== cartItemId);
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(filteredItems));
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