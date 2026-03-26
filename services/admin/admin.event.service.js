import api from "@/lib/api";

// Admin Dashboard Event List
export const getAllDashbaordEvents = async (
  page,
  limit,
  isRunRiseNation,
  search,
  eventType,
  date,
) => {
  const { data } = await api.get(
    `/admin/event/all?page=${page}&limit=${limit}&isRunRiseNation=${isRunRiseNation}&search=${search}&eventType=${eventType}&date=${date}`,
  );
  return data;
};

// Create Event
export const createEvent = (data) => {
  return api.post("/admin/event", data);
};

// Update Event
export const updateEvent = (data) => {
  // Some APIs allow a header to override the method
  return api.patch(`/admin/event`, data);
};

// Get Event By Id
export const getDashboardEventById = (eventId) => {
  return api.get(`/admin/event/${eventId}`);
};

// Delete Event
export const deleteDashboardEvent = (eventId) => {
  return api.delete(`/admin/event/${eventId}`);
};

// GET EVENT ORDERS
export const getAllOrders = async (page = 1, limit = 10) => {
  const { data } = await api.get(
    `/admin/order-history?page=${page}&limit=${limit}`,
  );
  return data;
};
