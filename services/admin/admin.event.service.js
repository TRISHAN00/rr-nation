import api from "@/lib/api";

// Admin Dashboard Event List
export const getAllDashbaordEvents = async () => {
  const { data } = await api.get("/admin/event/all");
  return data;
};

// Create Event
export const createEvent = (data) => {
  return api.post("/admin/event", data);
};

// Update Event
export const updateEvent = (eventId, data) => {
  console.log(eventId, data)
  return api.patch(`/admin/event/${eventId}`, data); // safer than PATCH for multipart
};

// Get Event By Id
export const getEventById = (eventId) => {
  return api.get(`/admin/event/${eventId}`);
};

// Delete Event
export const deleteEvent = (eventId) => {
  return api.delete(`/admin/event/${eventId}`);
};
