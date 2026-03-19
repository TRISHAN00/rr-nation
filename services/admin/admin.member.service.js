import api from "@/lib/api";

export const getAllDashboardMembers = async (
  page = 1,
  limit = 10,
  adminApproval = "approved",
  memberType = "admin",
  paymentStatus = "pending",
) => {
  const { data } = await api.get(
    `/admin/member?page=${page}&limit=${limit}&adminApproval=${adminApproval}&memberType=${memberType}&paymentStatus=${paymentStatus}`,
    
  );

  return data;
};
