import api from "@/lib/api";

export const getAllDashboardMembers = async (
  page,
  limit,
  adminApproval,
  memberType,
  paymentStatus,
  search
) => {
  const { data } = await api.get("/admin/member", {
    params: {
      page,
      limit,
      adminApproval: adminApproval || undefined, // undefined avoids sending empty strings
      memberType: memberType || undefined,
      paymentStatus: paymentStatus || undefined,
      searchTerm: search || undefined
    }
  });
  return data;
};