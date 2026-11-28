import api from "@/lib/api";

// GET Admin Brands
export const getAdminBrands = async (page = 1, limit = 10, search = "") => {
  const { data } = await api.get("/e-commerce/admin/brands", {
    params: {
      page,
      limit,
      search: search || undefined,
    },
  });
  return data;
};

// GET Admin Brand by ID
export const getAdminBrandById = async (id) => {
  const { data } = await api.get(`/e-commerce/admin/brands/${id}`);
  return data;
};

// POST Create Brand (multipart)
export const createAdminBrand = async (payload) => {
  const { data } = await api.post("/e-commerce/admin/brands", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// PUT Update Brand (multipart)
export const updateAdminBrand = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/admin/brands/${id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// DELETE Brand
export const deleteAdminBrand = async (id) => {
  const { data } = await api.delete(`/e-commerce/admin/brands/${id}`);
  return data;
};
