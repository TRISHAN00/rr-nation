import api from "@/lib/api";

// GET Coupon List
export const getMemberCoupons = async () => {
    const { data } = await api.get(`/admin/member/coupon`);
    return data;
}

// POST Create a coupon
export const createMemberCoupons = async (payload) => {
    const { data } = await api.post("/admin/member/coupon", payload);
    return data;
};

// PATCH Member Coupon
export const updateMemberCoupon = async (payload) => {
    const { data } = await api.patch("/admin/member/coupon", payload);
    return data;
};

// DELETE Member Coupon
export const deleteMemberCoupon = async (couponId) => {
    return api.delete(`/admin/member/coupon/${couponId}`)
}

// PATCH Active / Inactive Coupon
export const toggleActiveInactive = async (couponId) => {
    const { data } = await api.patch(`/admin/member/coupon/active-deactive/${couponId}`)
}