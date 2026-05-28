import api from "@/lib/api";

export const getGlobalData = () => {
  return api.get(`/auth/user/global`);
};
