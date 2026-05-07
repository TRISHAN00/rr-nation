"use client";
import CartDetailModal from "@/app/components/modal/CartDetailModal";
import { deleteCartItem, eventAddToCartV2 } from "@/services/cart.service";
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

    if (!token) {
      const items = getGuestItems();
      setCartData({
        id: "guest",
        totalAmount: items.reduce((acc, curr) => acc + (Number(curr.package?.price) || 0), 0).toFixed(2),
        items: items.map(item => ({
          id: item.tempId, // Used for deletion
          itemType: "ticket",
          quantity: item.quantity,
          unitPrice: item.package?.price,
          participant: item.participant, // This is the object with dynamic fields
          package: item.package
        }))
      });
      return;
    }
    // ... authenticated fetch logic
  }, []);

  // Professional Sync Function
  const syncGuestCart = async () => {
    const items = getGuestItems();
    if (items.length === 0) return;

    try {
      for (const item of items) {
        // Re-construct FormData from guest items for the API
        const data = new FormData();
        data.append("eventTicketId", item.eventTicketId);
        data.append("quantity", item.quantity);

        const formattedFields = Object.entries(item.participant).map(([key, value]) => ({
          name: key,
          value: value,
        }));
        data.append("formData", JSON.stringify(formattedFields));

        await eventAddToCartV2(data);
      }
      localStorage.removeItem(GUEST_CART_KEY);
      await fetchCart();
    } catch (error) {
      console.error("Failed to sync guest cart:", error);
    }
  };

  const addToCart = async (payload, rawDataForGuest) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (token) {
      // Logged in: API expects FormData
      await eventAddToCartV2(payload);
    } else {
      // Guest: LocalStorage needs a plain Object
      // Check if rawDataForGuest exists to avoid the 'tempId' error
      if (!rawDataForGuest) {
        console.error("Guest data is missing!");
        return;
      }

      const currentItems = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");

      const newGuestItem = {
        tempId: rawDataForGuest.tempId, // This line caused your error
        eventTicketId: rawDataForGuest.eventTicketId || payload.get("eventTicketId"),
        quantity: 1,
        formData: rawDataForGuest,
        package: rawDataForGuest.pak
      };

      localStorage.setItem(GUEST_CART_KEY, JSON.stringify([...currentItems, newGuestItem]));
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