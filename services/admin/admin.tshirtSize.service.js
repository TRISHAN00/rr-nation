import api from "@/lib/api";

export const getTShirtSizesByEvent = async (eventId) => {
  return api.get(`/admin/t-shirt-size/${eventId}`);
};

export const createTShirtSizes = async (payload) => {
  return api.post(`/admin/t-shirt-size`, payload);
};

export const updateTShirtSizes = async (eventId, payload) => {
  return api.patch(`/admin/t-shirt-size/${eventId}`, payload);
};

