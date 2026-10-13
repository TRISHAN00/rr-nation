"use client";
import CartDetailModal from "@/app/components/modal/CartDetailModal";
import {
  deleteCartItem,
  eventAddToCartV2,
  getCartItems,
  addShopCartItem,
  getShopCart,
  removeShopCartItem,
  updateShopCartItem,
  clearShopCart,
  applyShopCoupon,
  removeShopCoupon,
} from "@/services/cart.service";
import { applyCoupon as applyEventCouponApi } from "@/services/coupon.service";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const GUEST_CART_KEY = "runrise_guest_cart";
const SHOP_GUEST_CART_KEY = "runrise_shop_guest_cart";

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState({ id: null, totalAmount: "0.00", items: [] });
  const [shopSummary, setShopSummary] = useState(null);

  // Event coupon state
  const [eventDiscount, setEventDiscount] = useState(0);
  const [eventCouponId, setEventCouponId] = useState(null);

  // ── Guest Helpers ──
  const getGuestItems = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
  };

  const getShopGuestItems = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(SHOP_GUEST_CART_KEY) || "[]");
  };

  // ── Derived: separated items ──
  const eventItems = cartData.items.filter((i) => i.itemType === "ticket");
  const shopItems = cartData.items.filter((i) => i.itemType === "product");

  const eventSubtotal = eventItems.reduce(
    (acc, item) => acc + (Number(item.unitPrice || item.package?.price) || 0) * (item.quantity || 1),
    0
  );

  const shopSubtotal = Number(shopSummary?.productPrice || 0);
  const shopDiscount = Number(shopSummary?.productDiscountPrice || 0);
  const shopCouponDiscount = Number(shopSummary?.couponDiscount || 0);
  const deliveryFee = Number(shopSummary?.deliveryFee || 0);
  const shopTotal = Number(shopSummary?.totalPrice || 0);

  const grandTotal = (eventSubtotal - Number(eventDiscount || 0) + shopTotal).toFixed(2);

  // ── Fetch Cart ──
  const fetchCart = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      const eventGuestItems = getGuestItems();
      const shopGuestItems = getShopGuestItems();

      const mappedEventItems = eventGuestItems.map((item) => ({
        id: item.tempId,
        itemType: "ticket",
        quantity: item.quantity,
        unitPrice: item.package?.price,
        formData: item.participantData,
        package: item.package,
      }));

      const mappedShopItems = shopGuestItems.map((item) => ({
        id: item.id,
        itemType: "product",
        quantity: item.quantity,
        unitPrice: item.unitPrice || 0,
        unitSalePrice: item.unitSalePrice || item.unitPrice || 0,
        name: item.name || "Product",
        imageUrl: item.imageUrl || null,
        totalSalePrice: (item.unitSalePrice || item.unitPrice || 0) * (item.quantity || 1),
      }));

      const allItems = [...mappedEventItems, ...mappedShopItems];
      const totalAmount = allItems
        .reduce((acc, curr) => acc + (Number(curr.unitPrice) || 0) * (curr.quantity || 1), 0)
        .toFixed(2);

      setCartData({ id: "guest", totalAmount, items: allItems });
      setShopSummary(null);
    } else {
      try {
        const [eventRes, shopRes] = await Promise.allSettled([
          getCartItems(),
          getShopCart(),
        ]);

        const eventApiItems = eventRes.status === "fulfilled" ? eventRes.value?.data?.items || [] : [];
        const shopResData = shopRes.status === "fulfilled" ? shopRes.value?.data : null;
        const shopItemsData = shopResData?.items || [];
        const shopSummaryData = shopResData?.summary || null;

        const mappedEvent = eventApiItems.map((item) => ({ ...item, itemType: "ticket" }));
        const mappedShop = shopItemsData.map((item) => ({ ...item, itemType: "product" }));

        const allItems = [...mappedEvent, ...mappedShop];
        const eventTotal = mappedEvent
          .reduce((acc, curr) => acc + (Number(curr.unitPrice) || 0) * (curr.quantity || 1), 0);
        const shopTotalAmount = shopSummaryData?.totalPrice || 0;
        const totalAmount = (eventTotal + shopTotalAmount).toFixed(2);

        setCartData({
          id: eventRes.status === "fulfilled" ? eventRes.value?.data?.id : null,
          totalAmount,
          items: allItems,
        });
        setShopSummary(shopSummaryData);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }
  }, []);

  // ── Event Cart Add ──
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
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

  const syncShopGuestCart = async () => {
    const items = getShopGuestItems();
    if (items.length === 0) return;

    try {
      for (const item of items) {
        await addShopCartItem({ productId: item.id, quantity: item.quantity });
      }
      localStorage.removeItem(SHOP_GUEST_CART_KEY);
      await fetchCart();
    } catch (error) {
      console.error("Failed to sync shop guest cart:", error);
    }
  };

  const addToCart = async (payload, rawDataForGuest) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (token) {
      await eventAddToCartV2(payload);
    } else {
      const currentItems = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
      const newGuestItem = {
        tempId: Date.now().toString(),
        eventTicketId: rawDataForGuest.eventTicketId,
        quantity: 1,
        participantData: rawDataForGuest,
        package: rawDataForGuest.pak,
      };
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify([...currentItems, newGuestItem]));
    }

    await fetchCart();
    setIsCartOpen(true);
  };

  // ── Shop Cart Add ──
  const addShopToCart = async (productId, quantity = 1, productData = {}) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (token) {
      await addShopCartItem({ productId, quantity });
    } else {
      const currentItems = getShopGuestItems();
      const existingIndex = currentItems.findIndex((item) => item.id === productId);
      if (existingIndex >= 0) {
        currentItems[existingIndex].quantity += quantity;
      } else {
        currentItems.push({
          id: productId,
          quantity,
          name: productData.name || "Product",
          imageUrl: productData.imageUrl || null,
          unitPrice: productData.unitPrice || 0,
          unitSalePrice: productData.unitSalePrice || productData.unitPrice || 0,
        });
      }
      localStorage.setItem(SHOP_GUEST_CART_KEY, JSON.stringify(currentItems));
    }

    await fetchCart();
    setIsCartOpen(true);
  };

  // ── Shop Cart: Update Quantity ──
  const updateShopItemQuantity = async (itemId, quantity) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (token) {
      await updateShopCartItem(itemId, { quantity });
    } else {
      const currentItems = getShopGuestItems();
      const idx = currentItems.findIndex((item) => item.id === itemId);
      if (idx >= 0) {
        currentItems[idx].quantity = quantity;
        localStorage.setItem(SHOP_GUEST_CART_KEY, JSON.stringify(currentItems));
      }
    }

    await fetchCart();
  };

  // ── Shop Cart: Clear ──
  const clearShopItems = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (token) {
      await clearShopCart();
    } else {
      localStorage.removeItem(SHOP_GUEST_CART_KEY);
    }

    await fetchCart();
  };

  // ── Shop Coupon ──
  const applyShopCouponAction = async (code) => {
    const res = await applyShopCoupon(code);
    await fetchCart();
    return res;
  };

  const removeShopCouponAction = async () => {
    await removeShopCoupon();
    await fetchCart();
  };

  // ── Event Coupon ──
  const applyEventCouponAction = async (code) => {
    const response = await applyEventCouponApi({ coupon: code });
    const responseData = response?.data?.data;
    const amount = responseData?.discountAmount;
    const id = responseData?.discountCoupon?.id;

    if (amount !== undefined && amount !== null) {
      setEventDiscount(amount);
      setEventCouponId(id);
      return { success: true, amount };
    }
    return { success: false };
  };

  const removeEventCouponAction = () => {
    setEventDiscount(0);
    setEventCouponId(null);
  };

  // ── Delete Cart Item ──
  const handleDeleteCartItem = async (cartItemId, itemType) => {
    const token = localStorage.getItem("authToken");

    if (itemType === "product") {
      if (token) {
        await removeShopCartItem(cartItemId);
      } else {
        const currentItems = getShopGuestItems();
        localStorage.setItem(
          SHOP_GUEST_CART_KEY,
          JSON.stringify(currentItems.filter((item) => item.tempId !== cartItemId && item.id !== cartItemId))
        );
      }
    } else {
      if (token) {
        await deleteCartItem(cartItemId);
      } else {
        const currentItems = getGuestItems();
        localStorage.setItem(
          GUEST_CART_KEY,
          JSON.stringify(currentItems.filter((item) => item.tempId !== cartItemId))
        );
      }
    }

    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartData,
        shopSummary,
        // Derived
        eventItems,
        shopItems,
        eventSubtotal,
        shopSubtotal,
        shopDiscount,
        shopCouponDiscount,
        deliveryFee,
        shopTotal,
        eventDiscount,
        eventCouponId,
        grandTotal,
        // Actions
        fetchCart,
        addToCart,
        addShopToCart,
        syncGuestCart,
        syncShopGuestCart,
        handleDeleteCartItem,
        updateShopItemQuantity,
        clearShopItems,
        applyShopCoupon: applyShopCouponAction,
        removeShopCoupon: removeShopCouponAction,
        applyEventCoupon: applyEventCouponAction,
        removeEventCoupon: removeEventCouponAction,
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
