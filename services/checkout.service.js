import api from "@/lib/api";

/* ---------- LOCATIONS ---------- */
export const getCheckoutDivisions = async () => {
  const { data } = await api.get("/e-commerce/checkout/locations/divisions");
  return data;
};

export const getCheckoutDistricts = async (divisionId) => {
  const { data } = await api.get(
    `/e-commerce/checkout/locations/divisions/${divisionId}/districts`,
  );
  return data;
};

export const getCheckoutCities = async (districtId) => {
  const { data } = await api.get(
    `/e-commerce/checkout/locations/districts/${districtId}/cities`,
  );
  return data;
};

/* ---------- SHIPPING ADDRESSES ---------- */
export const getShippingAddresses = async () => {
  const { data } = await api.get("/e-commerce/checkout/shipping-addresses");
  return data;
};

export const createShippingAddress = async (payload) => {
  const { data } = await api.post("/e-commerce/checkout/shipping-addresses", payload);
  return data;
};

export const updateShippingAddress = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/checkout/shipping-addresses/${id}`, payload);
  return data;
};

export const deleteShippingAddress = async (id) => {
  const { data } = await api.delete(`/e-commerce/checkout/shipping-addresses/${id}`);
  return data;
};

export const setDefaultShippingAddress = async (id) => {
  const { data } = await api.put(`/e-commerce/checkout/shipping-addresses/${id}/default`);
  return data;
};

/* ---------- SHIPPING METHODS & SUMMARY ---------- */
export const getShippingMethods = async () => {
  const { data } = await api.get("/e-commerce/checkout/shipping-methods");
  return data;
};

export const getCheckoutSummary = async (addressId, shippingMethodId) => {
  const { data } = await api.get("/e-commerce/checkout/summary", {
    params: { addressId, shippingMethodId },
  });
  return data;
};

/* ---------- PLACE ORDER ---------- */
export const placeOrder = async (payload) => {
  const { data } = await api.post("/e-commerce/orders/place", payload);
  return data;
};

export const getUserOrders = async () => {
  const { data } = await api.get("/e-commerce/orders");
  return data;
};

export const checkPaymentStatus = async (payload) => {
  const { data } = await api.post(
    "/e-commerce/orders/check-payment-status",
    payload,
  );
  return data;
};

export const getOrderByNumber = async (orderNumber) => {
  const { data } = await api.get(
    `/e-commerce/orders/${encodeURIComponent(orderNumber)}`,
  );
  return data;
};

export const cancelOrder = async (orderNumber) => {
  const { data } = await api.post(
    `/e-commerce/orders/${encodeURIComponent(orderNumber)}/cancel`,
  );
  return data;
};
