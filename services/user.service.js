import api from "@/lib/api";

export const updateProfile = async (payload) => {
  const { data } = await api.post("/auth/user/update-profile", payload);
  return data;
};

export const getProfileData = async () => {
  const { data } = await api.get("/auth/user");
  return data.data.userData;
};


export const updateEmergencyContact = async () => {
  const { data } = await api.post("/auth/user/emergency-contact");
  return data.data.userData;
};