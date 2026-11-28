import api from "@/lib/api";

export const getDashboardOverview = async () => {
  const { data } = await api.get("/admin/dashboard/overview");
  return data;
};

// Backward-compatible alias
export const getDashboardEventInfo = getDashboardOverview;

export const getDashboardEventById = async (eventId) => {
  const { data } = await api.get(`/admin/dashboard/overview/${eventId}`);
  return data;
};