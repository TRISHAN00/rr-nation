import api from "@/lib/api";

// Admin-like pattern: list/update return data, create/get/delete return axios response
export const getAllOrganizerEvents = async (page = 1, limit = 10) => {
  const { data } = await api.get("/organizer/event/all", {
    params: { page, limit },
  });
  return data;
};

export const createOrganizerEvent = (payload) => {
  return api.post("/organizer/event", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateOrganizerEvent = async (payload) => {
  const { data } = await api.patch("/organizer/event", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getOrganizerEventById = (eventId) => {
  return api.get(`/organizer/event/${eventId}`);
};

export const getOrganizerEventBySlug = (slug) => {
  return api.get(`/organizer/event/slug/${slug}`);
};

export const deleteOrganizerEvent = (eventId) => {
  return api.delete(`/organizer/event/${eventId}`);
};