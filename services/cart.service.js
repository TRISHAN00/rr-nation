import api from "@/lib/api";

export const getCartItems = async () => {
  const { data } = await api.get("/auth/user/cart");
  return data;
};

export const eventAddToCart = async (cartItem) => {
  return api.post(`/auth/user/cart/item/add-to-cart`, cartItem);
};


// Added Delete Function
export const deleteCartItem = async (cartItemId) => {
  return api.delete(`/auth/user/cart/item/${cartItemId}`);
};

// Post Checkout to get Payment Gateway URL
export const processCheckout = (payload) => {
  return api.post("/auth/user/cart/checkout", payload);
};