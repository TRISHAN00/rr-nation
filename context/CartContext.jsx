"use client";
import CartDetailModal from "@/app/components/modal/CartDetailModal";
import { deleteCartItem, eventAddToCartV2, getCartItems } from "@/services/cart.service";
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
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken")
        : null;

    if (!token) {
      const items = getGuestItems();

      setCartData({
        id: "guest",
        totalAmount: items
          .reduce(
            (acc, curr) =>
              acc + (Number(curr.package?.price) || 0) * (curr.quantity || 1),
            0
          )
          .toFixed(2),
        items: items.map((item) => ({
          id: item.tempId,
          itemType: "ticket",
          quantity: item.quantity,
          unitPrice: item.package?.price,
          formData: item.participantData,
          package: item.package,
        })),
      });
    } else {
      try {
        const cartItems = await getCartItems(); // ✅ FIXED
        setCartData({
          id: cartItems?.data?.id,
          totalAmount: cartItems?.data?.totalAmount,
          items: cartItems?.data?.items,
        });
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }
  }, []);

  // Helper to convert Base64 back to a File object
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const syncGuestCart = async () => {
    const items = getGuestItems();
    if (items.length === 0) return;

    try {
      for (const item of items) {
        const data = new FormData();
        data.append("eventTicketId", item.eventTicketId);
        data.append("quantity", item.quantity);

        const textFields = [];
        let fileIndex = 1;

        for (const [key, value] of Object.entries(item.participantData)) {
          if (typeof value === "string" && value.startsWith("data:image")) {
            // Convert Base64 back to File for the API
            const fileObj = base64ToFile(value, `${key}.png`);
            data.append("files", fileObj);
            textFields.push({ name: key, value: `file${fileIndex}` });
            fileIndex++;
          } else if (!["pak", "eventTicketId", "tempId"].includes(key)) {
            textFields.push({ name: key, value: value });
          }
        }

        data.append("formData", JSON.stringify(textFields));
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
      // Logged in: payload is FormData (handles files natively)
      await eventAddToCartV2(payload);
    } else {
      // Guest: rawDataForGuest now contains Base64 strings for images
      const currentItems = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");

      const newGuestItem = {
        tempId: Date.now().toString(),
        eventTicketId: rawDataForGuest.eventTicketId,
        quantity: 1,
        participantData: rawDataForGuest, // This now safely stringifies
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