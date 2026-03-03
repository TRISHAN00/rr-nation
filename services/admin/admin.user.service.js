import api from "@/lib/api";

export const getAllDashboardUsers = async (page, limit, search) => {
  const { data } = await api.get(
    `/admin/user/all?page=${page}&limit=${limit}&search=${search}`,
  );
  return data;
};
