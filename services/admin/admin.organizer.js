import api from "@/lib/api";

export const getAllDashboardOrganizers = async (page, limit, adminApproval) => {
  const { data } = await api.get("/admin/organizer", {
    params: {
      page,
      limit,
      adminApproval: adminApproval || undefined,
    },
  });
  return data;
};

export const updateOrganizerStatus = async (payload) => {
  const { data } = await api.patch("/admin/organizer", payload);
  return data;
};