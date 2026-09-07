import api from "@/lib/api";

/* ---------- GET PUBLIC ACTIVE DELIVERY OPTIONS ---------- */
export const getActiveDeliveryOptions = async () => {
  const { data } = await api.get(`/e-commerce/delivery-options`);
  return data;
};
