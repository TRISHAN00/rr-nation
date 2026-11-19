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

const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const resolvePrices = (item = {}) => {
  const n = toNumber;
  const base = n(item.basePrice ?? item.originalPrice, 0);
  const sale = n(item.salePrice ?? item.discountPrice, 0);
  const unit = n(item.unitPrice ?? item.price, 0);
  const unitSale = n(item.unitSalePrice, 0);
  const pkg = n(item.package?.price, 0);

  let basePrice = base;
  let effectivePrice = 0;

  if (base > 0 && sale > 0 && sale < base) {
    basePrice = base;
    effectivePrice = sale;
  } else if (base > 0 && unitSale > 0 && unitSale < base) {
    basePrice = base;
    effectivePrice = unitSale;
  } else if (base > 0 && unit > 0 && unit < base) {
    basePrice = base;
    effectivePrice = unit;
  } else if (unitSale > 0 && (base <= 0 || unitSale <= base)) {
    basePrice = base || unit || unitSale;
    effectivePrice = unitSale;
  } else if (sale > 0 && (base <= 0 || sale <= base)) {
    basePrice = base || unit || sale;
    effectivePrice = sale;
  } else {
    effectivePrice = unit || unitSale || sale || base || pkg;
    basePrice = base || effectivePrice;
  }

  if (basePrice > 0 && effectivePrice > basePrice) {
    basePrice = effectivePrice;
  }
  if (basePrice <= 0) basePrice = effectivePrice;

  return { basePrice, effectivePrice };
};

const normalizeEventCartItem = (item = {}) => {
  const quantity = Math.max(1, toNumber(item.quantity, 1));
  const { basePrice, effectivePrice } = resolvePrices(item);
  const unitPrice = basePrice || effectivePrice || toNumber(item.package?.price, 0);
  return {
    ...item,
    itemType: "ticket",
    quantity,
    unitPrice,
    lineTotal: unitPrice * quantity,
  };
};

const normalizeShopCartItem = (item = {}) => {
  const quantity = Math.max(1, toNumber(item.quantity, 1));
  const { basePrice, effectivePrice } = resolvePrices(item);
  const baseUnitPrice = basePrice || effectivePrice;
  const effectiveUnitPrice = effectivePrice || baseUnitPrice;
  const lineTotal = toNumber(
    item.totalSalePrice ?? item.totalAmount ?? item.lineTotal,
    effectiveUnitPrice * quantity,
  );

  return {
    ...item,
    itemType: "product",
    quantity,
    // Keep both for compatibility: unitPrice = original/base, unitSalePrice = effective/sale
    unitPrice: baseUnitPrice || effectiveUnitPrice,
    unitSalePrice: effectiveUnitPrice,
    baseUnitPrice,
    effectiveUnitPrice,
    lineTotal,
  };
};

const sumLineTotals = (items = []) =>
  items.reduce((acc, item) => acc + toNumber(item.lineTotal, 0), 0);

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
    try {
      return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const getShopGuestItems = () => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(SHOP_GUEST_CART_KEY) || "[]");
    } catch {
      return [];
    }
  };

  // ── Derived: separated items ──
  const eventItems = cartData.items.filter((i) => i.itemType === "ticket");
  const shopItems = cartData.items.filter((i) => i.itemType === "product");

  const eventSubtotal = eventItems.reduce(
    (acc, item) =>
      acc +
      toNumber(item.unitPrice ?? item.package?.price, 0) *
        Math.max(1, toNumber(item.quantity, 1)),
    0,
  );

  const shopItemsSubtotal = sumLineTotals(shopItems);
  const summaryProductPrice = toNumber(shopSummary?.productPrice, 0);
  const summaryProductDiscount = toNumber(shopSummary?.productDiscountPrice, 0);
  const summaryEffectiveSubtotal = Math.max(0, summaryProductPrice - summaryProductDiscount);

  const shopSubtotal = shopSummary
    ? summaryEffectiveSubtotal || shopItemsSubtotal || summaryProductPrice
    : shopItemsSubtotal;
  const shopDiscount = shopSummary
    ? summaryProductDiscount || Math.max(0, summaryProductPrice - shopSubtotal)
    : 0;
  const shopCouponDiscount = toNumber(shopSummary?.couponDiscount, 0);
  const deliveryFee = toNumber(shopSummary?.deliveryFee, 0);
  const shopTotal = shopSummary
    ? toNumber(shopSummary?.totalPrice, Math.max(0, shopSubtotal - shopCouponDiscount + deliveryFee))
    : Math.max(0, shopSubtotal - shopCouponDiscount + deliveryFee);

  const grandTotal = (
    Math.max(0, eventSubtotal - toNumber(eventDiscount, 0)) + shopTotal
  ).toFixed(2);

  // ── Fetch Cart ──
  const fetchCart = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      const eventGuestItems = getGuestItems();
      const shopGuestItems = getShopGuestItems();

      const mappedEventItems = eventGuestItems.map((item) =>
        normalizeEventCartItem({
          id: item.tempId,
          quantity: item.quantity,
          unitPrice: item.package?.price ?? item.unitPrice,
          formData: item.participantData,
          package: item.package,
        }),
      );

      const mappedShopItems = shopGuestItems.map((item) =>
        normalizeShopCartItem({
          id: item.id ?? item.tempId ?? item.productId,
          quantity: item.quantity,
          unitPrice: item.basePrice ?? item.baseUnitPrice ?? item.unitPrice,
          unitSalePrice:
            item.salePrice ??
            item.unitSalePrice ??
            item.effectiveUnitPrice ??
            item.unitPrice,
          basePrice: item.basePrice ?? item.baseUnitPrice ?? item.unitPrice,
          salePrice:
            item.salePrice ??
            item.unitSalePrice ??
            item.effectiveUnitPrice ??
            item.unitPrice,
          name: item.name || item.productName || "Product",
          imageUrl: item.imageUrl || item.thumbnailImage || null,
          variantName: item.variantName,
        }),
      );

      const allItems = [...mappedEventItems, ...mappedShopItems];
      const eventTotal = sumLineTotals(mappedEventItems);
      const shopTotalGuest = sumLineTotals(mappedShopItems);
      const totalAmount = (eventTotal + shopTotalGuest).toFixed(2);

      setCartData({ id: "guest", totalAmount, items: allItems });
      setShopSummary(
        mappedShopItems.length > 0
          ? {
              productPrice: shopTotalGuest,
              productDiscountPrice: 0,
              couponDiscount: 0,
              deliveryFee: 0,
              totalPrice: shopTotalGuest,
            }
          : null,
      );
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

        const mappedEvent = eventApiItems.map((item) => normalizeEventCartItem(item));
        const mappedShop = shopItemsData.map((item) => normalizeShopCartItem(item));

        const effectiveSubtotal = shopSummaryData
          ? Math.max(
              0,
              toNumber(shopSummaryData.productPrice, 0) -
                toNumber(shopSummaryData.productDiscountPrice, 0),
            ) || sumLineTotals(mappedShop)
          : sumLineTotals(mappedShop);
        const normalizedShopSummary = shopSummaryData
          ? {
              ...shopSummaryData,
              productPrice: toNumber(shopSummaryData.productPrice, effectiveSubtotal),
              productDiscountPrice: toNumber(shopSummaryData.productDiscountPrice, 0),
              couponDiscount: toNumber(shopSummaryData.couponDiscount, 0),
              deliveryFee: toNumber(shopSummaryData.deliveryFee, 0),
              totalPrice: toNumber(
                shopSummaryData.totalPrice,
                Math.max(
                  0,
                  effectiveSubtotal -
                    toNumber(shopSummaryData.couponDiscount, 0) +
                    toNumber(shopSummaryData.deliveryFee, 0),
                ),
              ),
              effectiveProductPrice: effectiveSubtotal,
            }
          : mappedShop.length > 0
            ? {
                productPrice: effectiveSubtotal,
                productDiscountPrice: 0,
                couponDiscount: 0,
                deliveryFee: 0,
                totalPrice: effectiveSubtotal,
                effectiveProductPrice: effectiveSubtotal,
              }
            : null;

        const allItems = [...mappedEvent, ...mappedShop];
        const eventTotal = sumLineTotals(mappedEvent);
        const shopTotalAmount = toNumber(
          normalizedShopSummary?.totalPrice,
          effectiveSubtotal,
        );
        const totalAmount = (eventTotal + shopTotalAmount).toFixed(2);

        setCartData({
          id: eventRes.status === "fulfilled" ? eventRes.value?.data?.id : null,
          totalAmount,
          items: allItems,
        });
        setShopSummary(normalizedShopSummary);
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
    const qty = Math.max(1, toNumber(quantity, 1));
    const basePrice = toNumber(
      productData.basePrice ?? productData.price ?? productData.unitPrice,
      0,
    );
    const salePriceRaw = toNumber(productData.salePrice ?? productData.unitSalePrice, 0);
    const salePrice =
      salePriceRaw > 0 && (basePrice <= 0 || salePriceRaw < basePrice)
        ? salePriceRaw
        : 0;
    const effectivePrice = salePrice || basePrice || salePriceRaw;

    if (token) {
      await addShopCartItem({ productId, quantity: qty });
    } else {
      const currentItems = getShopGuestItems();
      const existingIndex = currentItems.findIndex((item) => String(item.id) === String(productId));
      if (existingIndex >= 0) {
        currentItems[existingIndex].quantity =
          Math.max(1, toNumber(currentItems[existingIndex].quantity, 1)) + qty;
        // Refresh pricing/details in case product data changed
        if (productData.name) currentItems[existingIndex].name = productData.name;
        if (productData.imageUrl) currentItems[existingIndex].imageUrl = productData.imageUrl;
        if (basePrice || effectivePrice) {
          currentItems[existingIndex].basePrice = basePrice || effectivePrice;
          currentItems[existingIndex].salePrice = salePrice || null;
          currentItems[existingIndex].unitPrice = basePrice || effectivePrice;
          currentItems[existingIndex].unitSalePrice = effectivePrice;
        }
      } else {
        currentItems.push({
          id: productId,
          quantity: qty,
          name: productData.name || "Product",
          imageUrl: productData.imageUrl || null,
          basePrice: basePrice || effectivePrice,
          salePrice: salePrice || null,
          unitPrice: basePrice || effectivePrice,
          unitSalePrice: effectivePrice,
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
    const trimmed = (code || "").trim();
    if (!trimmed) throw new Error("Enter a coupon code");
    const res = await applyShopCoupon(trimmed);
    await fetchCart();
    return res;
  };

  const removeShopCouponAction = async () => {
    await removeShopCoupon();
    await fetchCart();
  };

  // ── Event Coupon ──
  const applyEventCouponAction = async (code) => {
    const trimmed = (code || "").trim();
    if (!trimmed) return { success: false, error: "Enter a coupon code" };
    const response = await applyEventCouponApi({ coupon: trimmed });
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
