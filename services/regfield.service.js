import api from "@/lib/api";

export const getRegFieldByEventId = async (eventId) => {
  const { data } = await api.get(`/auth/user/registration-form-field/${eventId}`);
  return data;
};