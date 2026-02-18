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
  // Some APIs allow a header to override the method
  return api.post(`/admin/event/${eventId}`, data, {
    headers: {
      'X-HTTP-Method-Override': 'PATCH' 
    }
  });
};

// Get Event By Id
export const getDashboardEventById = (eventId) => {
  return api.get(`/admin/event/${eventId}`);
};

// Delete Event
export const deleteDashboardEvent = (eventId) => {
  return api.delete(`/admin/event/${eventId}`);
};
