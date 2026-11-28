import api from "@/lib/api";

export const registerOrganizer = async (payload) => {
  const { data } = await api.post("/organizer/registration", payload);
  return data;
};

export const getMyOrganizerRegistration = async () => {
  const { data } = await api.get("/organizer/registration");
  return data;
};