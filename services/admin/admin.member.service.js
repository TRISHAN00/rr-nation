import api from "@/lib/api";

// Get all members
export const getAllDashboardMembers = async (
  page,
  limit,
  adminApproval,
  memberType,
  paymentStatus,
  search,
) => {
  const { data } = await api.get("/admin/member", {
    params: {
      page,
      limit,
      adminApproval: adminApproval || undefined,
      memberType: memberType || undefined,
      paymentStatus: paymentStatus || undefined,
      search: search || undefined,
    },
  });
  return data;
};

// update member status of data
export const updateMemberStatus = async (payload) => {
  const { data } = await api.patch("/admin/member", payload);
  return data;
};

// get all stats
export const getMemberOverviewData = async () => {
  const { data } = await api.get(`/admin/member/overview`);
  return data;
}

// Create Coupon
export const createMemberCoupon = async (payload) => {
  return api.post(`/admin/member/coupon`, payload)
}