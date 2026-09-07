import api from "@/lib/api";

/* ---------- GET DELIVERY OPTIONS ---------- */
export const getDeliveryOptions = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/e-commerce/admin/delivery-options`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

/* ---------- CREATE DELIVERY OPTION ---------- */
export const createDeliveryOption = async (payload) => {
  const { data } = await api.post(`/e-commerce/admin/delivery-options`, payload);
  return data;
};

/* ---------- UPDATE DELIVERY OPTION ---------- */
export const updateDeliveryOption = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/admin/delivery-options/${id}`, payload);
  return data;
};

/* ---------- DELETE DELIVERY OPTION ---------- */
export const deleteDeliveryOption = async (id) => {
  const { data } = await api.delete(`/e-commerce/admin/delivery-options/${id}`);
  return data;
};
