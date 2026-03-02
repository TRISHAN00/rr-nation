import api from "@/lib/api";

export const getDashboardEventInfo = async () => {
  const { data } = await api.get("/admin/dashboard/overview");
  return data;
};