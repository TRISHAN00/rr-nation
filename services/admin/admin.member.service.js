import api from "@/lib/api";

export const getAllDashboardMembers = async (
  page = 1,
  limit = 10,
  adminApproval = "pending",
  memberType = "member",
  paymentStatus = "pending",
) => {
  const { data } = await api.get("/admin/member", {
    params: {
      page,
      limit,
      adminApproval,
      memberType,
      paymentStatus,
    },
  });

  return data;
};
