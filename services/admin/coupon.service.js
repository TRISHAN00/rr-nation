import api from "@/lib/api";

// Get ALL Coupons (Global List)
export const getAllDashboardCoupons = async (page = 1, limit = 10) => {
  const { data } = await api.get(
    `/admin/discount-coupon/all?page=${page}&limit=${limit}`,
  );
  return data;
};
// Create Coupon (Note: API expects an array)
export const createCoupon = (data) => {
  return api.post(
    "/admin/discount-coupon",
    Array.isArray(data) ? data : [data],
  );
};

// Update Coupon (Example using your Method Override concept)
export const updateCoupon = (couponId, data) => {
  return api.post(`/admin/discount-coupon/${couponId}`, data, {
    headers: {
      "X-HTTP-Method-Override": "PATCH",
    },
  });
};

// Delete Coupon
export const deleteCoupon = (couponId) => {
  return api.delete(`/admin/discount-coupon/${couponId}`);
};
