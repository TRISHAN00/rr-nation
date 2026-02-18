import api from "@/lib/api";

export const applyCoupon = (data) => {
  return api.post("/auth/user/cart/discount-coupon/apply", data);
};