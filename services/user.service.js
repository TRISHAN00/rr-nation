import api from "@/lib/api";

export const updateProfile = async (payload) => {
  const { data } = await api.post("/auth/user/update-profile", payload);
  return data;
};

export const getProfileData = async () => {
  const { data } = await api.get("/auth/user");
  return data.data.userData;
};

export const updateEmergencyContact = async (payload) => {
  const { data } = await api.post("/auth/user/emergency-contact", payload);
  return data;
};

export const getEmergencyContactData = async () => {
  const { data } = await api.get("/auth/user/emergency-contact");
  return data;
};

export const updatePassword = async (payload) => {
  const { data } = await api.post("/auth/user/change-password", payload);
  return data;
};

export const getAllEvent = async () => {
  const { data } = await api.get(`/auth/user/event/all`);
  return data;
};
