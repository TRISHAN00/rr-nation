import api from "@/lib/api";

// Admin Dashboard Event List
export const getAllOrgEv = async (
  page,
  limit,
  search,
  eventType,
  date,
) => {
  const { data } = await api.get(
    `/organizer/event/all?page=${page}&limit=${limit}&search=${search}&eventType=${eventType}&date=${date}`,
  );
  return data;
};