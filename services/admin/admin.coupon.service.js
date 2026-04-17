import api from "@/lib/api";

// Get Coupon List
export const getMemberCoupons = async () => {
    const { data } = await api.get(`/admin/member/coupon`);
    return data;
}

// Create a coupon
export const createMemberCoupons = async (payload) => {
    const { data } = await api.post("/admin/member/coupon", payload);
    return data;
};