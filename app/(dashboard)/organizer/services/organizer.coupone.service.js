import api from "@/lib/api";

// Get Coupons by Event ID
export const getOrganizerEventCouponsByEventId = async (eventId) => {
  const { data } = await api.get(
    `/organizer/discount-coupon/${eventId}`
  );
  return data;
};

// Update Coupon by ID
export const updateOrganizerEventCouponById = (eventId, payload) => {
  return api.patch(`/organizer/discount-coupon/${eventId}`, payload);
}

// PATCH Active / Inactive Coupon
export const toggleOrganizerEventCouponActiveInactive = async (couponId) => {
  const { data } = await api.patch(`/organizer/discount-coupon/active-deactive/${couponId}`)
}

// DELETE Coupon
export const deleteOrganizerEventCoupon = async (discountCouponId) => {
  return await api.delete(`/organizer/discount-coupon/${discountCouponId}`)
}


// Get ALL Coupons (Global List)
export const getAllOrganizerDashboardCoupons = async (page = 1, limit = 10) => {
  const { data } = await api.get(
    `/organizer/discount-coupon/all?page=${page}&limit=${limit}`,
  );
  return data;
};
// Create Coupon (Note: API expects an array)
export const createOrganizerEventCoupon = (data) => {
  return api.post(
    "/organizer/discount-coupon",
    Array.isArray(data) ? data : [data],
  );
};

// Update Coupon (Example using your Method Override concept)
export const updateOrganizerEventCoupon = (couponId, data) => {
  return api.post(`/organizer/discount-coupon/${couponId}`, data, {
    headers: {
      "X-HTTP-Method-Override": "PATCH",
    },
  });
};

