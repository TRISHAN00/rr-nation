import api from "@/lib/api";

// GET Coupons List
export const getEcommerceCoupons = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/e-commerce/admin/coupons`, {
    params: { page, limit },
  });
  return data;
};

// GET Coupon by ID
export const getEcommerceCouponById = async (couponId) => {
  const { data } = await api.get(`/e-commerce/admin/coupons/${couponId}`);
  return data;
};

// POST Create coupon
export const createEcommerceCoupon = async (payload) => {
  const { data } = await api.post("/e-commerce/admin/coupons", payload);
  return data;
};

// PUT Update coupon
export const updateEcommerceCoupon = async (couponId, payload) => {
  const { data } = await api.put(`/e-commerce/admin/coupons/${couponId}`, payload);
  return data;
};

// DELETE Coupon
export const deleteEcommerceCoupon = async (couponId) => {
  const { data } = await api.delete(`/e-commerce/admin/coupons/${couponId}`);
  return data;
};

// PATCH Toggle active/inactive
export const toggleEcommerceCoupon = async (couponId) => {
  const { data } = await api.patch(`/e-commerce/admin/coupons/${couponId}/toggle`);
  return data;
};
