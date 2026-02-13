import api from "@/lib/api";

export const getAllEvents = async () => {
  const { data } = await api.get("/admin/event/all");
  return data;
};
