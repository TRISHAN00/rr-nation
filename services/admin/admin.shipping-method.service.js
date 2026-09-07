import api from "@/lib/api";

// GET All Shipping Methods
export const getShippingMethods = async () => {
  const { data } = await api.get("/e-commerce/checkout/admin/shipping-methods");
  return data;
};

// POST Create Shipping Method
export const createShippingMethod = async (payload) => {
  const { data } = await api.post("/e-commerce/checkout/admin/shipping-methods", payload);
  return data;
};

// PUT Update Shipping Method
export const updateShippingMethod = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/checkout/admin/shipping-methods/${id}`, payload);
  return data;
};

// DELETE Shipping Method
export const deleteShippingMethod = async (id) => {
  const { data } = await api.delete(`/e-commerce/checkout/admin/shipping-methods/${id}`);
  return data;
};
