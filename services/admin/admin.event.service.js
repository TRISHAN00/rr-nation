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
  return api.post("/admin/event", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Event
export const updateEvent = async (payload) => {
  // Use PATCH as shown in your screenshot
  const { data } = await api.patch(`/admin/event`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
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
export const getAllOrders = async (page = 1, limit = 10, searchQuery = "") => {
  console.log(limit)
  const { data } = await api.get(
    `/admin/order-history?page=${page}&limit=${limit}&search=${searchQuery}`
  );
  return data;
};