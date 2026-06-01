import api from "@/lib/api";

export const getDashboardEventInfo = async (selectedEventId) => {
  const { data } = await api.get("/admin/dashboard/overview", );
  return data;
};

export const getDashboardEventById = async (eventId) => {
  const { data } = await api.get(`/admin/dashboard/overview/${eventId}`);
  return data;
};