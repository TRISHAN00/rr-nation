"use client";

import CartDetailModal from "@/app/components/modal/CartDetailModal";
import { deleteCartItem, getCartItems } from "@/services/cart.service";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState({
    id: null,
    totalAmount: "0.00",
    items: [],
  });

  const fetchCart = useCallback(async () => {
    // 🛡️ THE GUARD: Only fetch if a token exists in localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) return;

    try {
      const response = await getCartItems();
      // Adjust based on your service (you return 'data' directly in cart.service)
      if (response?.data) {
        setCartData(response.data);
      } else if (response) {
        setCartData(response);
      }
    } catch (err) {
      console.error("Cart fetch error suppressed to prevent loop.");
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDeleteCartItem = async (cartItemId) => {
    await deleteCartItem(cartItemId);
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartData,
        fetchCart,
        handleDeleteCartItem,
      }}
    >
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
