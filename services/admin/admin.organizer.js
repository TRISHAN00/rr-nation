import api from "@/lib/api";

export const getAllDashboardOrganizers = async (
  page,
  limit,
  adminApproval,
  memberType,
  paymentStatus,
) => {
  const { data } = await api.get("/admin/organizer", {
    params: {
      page,
      limit,
      adminApproval: adminApproval || undefined, // undefined avoids sending empty strings
    },
  });
  return data;
};