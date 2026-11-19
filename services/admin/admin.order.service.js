import api from "@/lib/api";

/* ---------- GET E-COMMERCE ORDERS ---------- */
export const getAdminOrders = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/e-commerce/admin/orders`, {
    params: { limit, page },
  });
  return data;
};

/* ---------- GET E-COMMERCE ORDER DETAILS ---------- */
export const getAdminOrderByNumber = async (orderNumber) => {
  const { data } = await api.get(
    `/e-commerce/admin/orders/${encodeURIComponent(orderNumber)}`,
  );
  return data;
};

/* ---------- UPDATE E-COMMERCE ORDER STATUS ---------- */
export const updateAdminOrderStatus = async (orderNumber, status) => {
  const { data } = await api.put(
    `/e-commerce/admin/orders/${encodeURIComponent(orderNumber)}`,
    { status },
  );
  return data;
};
