import api from "@/lib/api";

// ── Event Cart (existing) ──
export const getCartItems = async () => {
  const { data } = await api.get("/auth/user/cart");
  return data;
};

export const eventAddToCart = async (cartItem) => {
  return api.post(`/auth/user/cart/item/add-to-cart`, cartItem);
};

export const eventAddToCartV2 = async (cartItem) => {
  return api.post(`/auth/user/v2/cart/item/add-to-cart`, cartItem);
};

export const deleteCartItem = async (cartItemId) => {
  return api.delete(`/auth/user/cart/item/${cartItemId}`);
};

export const processCheckout = (payload) => {
  return api.post("/auth/user/cart/checkout", payload);
};

// ── E-Commerce Cart ──
export const getShopCart = async () => {
  const { data } = await api.get("/e-commerce/cart");
  return data;
};

export const addShopCartItem = async (payload) => {
  const { data } = await api.post("/e-commerce/cart/items", payload);
  return data;
};

export const updateShopCartItem = async (itemId, payload) => {
  const { data } = await api.put(`/e-commerce/cart/items/${itemId}`, payload);
  return data;
};

export const removeShopCartItem = async (itemId) => {
  const { data } = await api.delete(`/e-commerce/cart/items/${itemId}`);
  return data;
};

export const clearShopCart = async () => {
  const { data } = await api.delete("/e-commerce/cart/clear");
  return data;
};

export const applyShopCoupon = async (code) => {
  const { data } = await api.post("/e-commerce/cart/apply-coupon", { code });
  return data;
};

export const removeShopCoupon = async () => {
  const { data } = await api.delete("/e-commerce/cart/apply-coupon");
  return data;
};
