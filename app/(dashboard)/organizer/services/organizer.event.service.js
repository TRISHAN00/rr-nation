import api from "@/lib/api";

// Admin Dashboard Event List
export const getAllDashboardOrganizerEvents = async (
  page,
  limit,
  isRunRiseNation,
  search,
  eventType,
  date,
) => {
  const { data } = await api.get(
    `/organizer/event/all?page=${page}&limit=${limit}&isRunRiseNation=${isRunRiseNation}&search=${search}&eventType=${eventType}&date=${date}`,
  );
  return data;
};

// Create Event
export const createOrganizerEvent = (data) => {
  return api.post("/organizer/event", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Event
export const updateOrganizerEvent = async (payload) => {
  // Use PATCH as shown in your screenshot
  const { data } = await api.patch(`/organizer/event`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Get Event By Id
export const getDashboardOrganizerEventById = (eventId) => {
  return api.get(`/organizer/event/${eventId}`);
};

// Delete Event
export const deleteDashboardOrganizerEvent = (eventId) => {
  return api.delete(`/organizer/event/${eventId}`);
};

// GET all events for dropdowns and filters
export const getAllOrganizerEvents = async () => {
  const { data } = await api.get(`/organizer/events`);
  return data;
};

// GET EVENT ORDERS
export const getAllOrganizerOrders = async (page = 1, limit = 10, searchQuery = "", eventId = "") => {
  console.log(limit);
  
  // Base URL string
  let url = `/organizer/order-history?page=${page}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`;
  
  // Only append eventId if it has a valid, truthy value (not null, undefined, or empty string)
  if (eventId) {
    url += `&eventId=${eventId}`;
  }

  const { data } = await api.get(url);
  return data;
};