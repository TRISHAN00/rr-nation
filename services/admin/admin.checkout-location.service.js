import api from "@/lib/api";

// ── Divisions ──
export const getDivisions = async () => {
  const { data } = await api.get("/e-commerce/checkout/admin/divisions");
  return data;
};

export const createDivision = async (payload) => {
  const { data } = await api.post("/e-commerce/checkout/admin/divisions", payload);
  return data;
};

export const updateDivision = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/checkout/admin/divisions/${id}`, payload);
  return data;
};

export const deleteDivision = async (id) => {
  const { data } = await api.delete(`/e-commerce/checkout/admin/divisions/${id}`);
  return data;
};

export const toggleDivision = async (id) => {
  const { data } = await api.patch(`/e-commerce/checkout/admin/divisions/${id}/toggle`);
  return data;
};

// ── Districts ──
export const getDistrictsByDivision = async (divisionId) => {
  const { data } = await api.get(`/e-commerce/checkout/admin/districts/${divisionId}`);
  return data;
};

export const createDistrict = async (payload) => {
  const { data } = await api.post("/e-commerce/checkout/admin/districts", payload);
  return data;
};

export const updateDistrict = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/checkout/admin/districts/${id}`, payload);
  return data;
};

export const deleteDistrict = async (id) => {
  const { data } = await api.delete(`/e-commerce/checkout/admin/districts/${id}`);
  return data;
};

export const toggleDistrict = async (id) => {
  const { data } = await api.patch(`/e-commerce/checkout/admin/districts/${id}/toggle`);
  return data;
};

// ── Cities ──
export const getCitiesByDistrict = async (districtId) => {
  const { data } = await api.get(`/e-commerce/checkout/admin/cities/${districtId}`);
  return data;
};

export const createCity = async (payload) => {
  const { data } = await api.post("/e-commerce/checkout/admin/cities", payload);
  return data;
};

export const updateCity = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/checkout/admin/cities/${id}`, payload);
  return data;
};

export const deleteCity = async (id) => {
  const { data } = await api.delete(`/e-commerce/checkout/admin/cities/${id}`);
  return data;
};

export const toggleCity = async (id) => {
  const { data } = await api.patch(`/e-commerce/checkout/admin/cities/${id}/toggle`);
  return data;
};
