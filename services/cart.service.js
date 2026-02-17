import api from "@/lib/api";

export const getCartItems = async () => {
  const { data } = await api.get("/auth/user/cart");
  return data;
};

export const eventAddToCart = async (cartItem) => {
  return api.post(`/auth/user/cart/item/add-to-cart`, cartItem);
};
