import api from "@/lib/api";

export const getAllDashboardMembers = async (
  page,
  limit,
  adminApproval,
  memberType,
  paymentStatus,
) => {
  const { data } = await api.get("/admin/member", {
    params: {
      page,
      limit,
      adminApproval: adminApproval || undefined, // undefined avoids sending empty strings
      memberType: memberType || undefined,
      paymentStatus: paymentStatus || undefined,
    },
  });
  return data;
};


export const updateMemberStatus = async (payload) => {
  const { data } = await api.patch("/admin/member", payload);
  return data;
};