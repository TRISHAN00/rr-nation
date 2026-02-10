import api from "@/lib/axios.interceptor";

export const updateProfile = async (payload) => {
  const { data } = await api.post("/auth/user/update-profile", payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/user");
  return data.data.userData;
};
