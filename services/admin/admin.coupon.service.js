import api from "@/lib/api";

// Get Coupon List
export const getMemberCoupons = async () => {
    const { data } = await api.get(`/admin/member/coupon`);
    return data;
}