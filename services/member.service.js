import api from "@/lib/api";

export const registerMember = async (payload) => {
  const { data } = await api.post("/member/registration", payload);
  return data;
};
