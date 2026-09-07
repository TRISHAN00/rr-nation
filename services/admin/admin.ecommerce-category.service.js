import api from "@/lib/api";

/* ---------- GET CATEGORY LIST ---------- */
export const getCategories = async (page = 1, limit = 10, search) => {
  const { data } = await api.get(`/e-commerce/admin/ecommerce-categories`, {
    params: {
      page,
      limit,
      search: search || undefined,
    },
  });
  return data;
};

/* ---------- GET CATEGORY DETAIL ---------- */
export const getCategoryById = async (id) => {
  const { data } = await api.get(`/e-commerce/admin/ecommerce-categories/${id}`);
  return data;
};

/* ---------- CREATE CATEGORY (multipart) ---------- */
export const createCategory = async (payload) => {
  const { data } = await api.post("/e-commerce/admin/ecommerce-categories", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

/* ---------- UPDATE CATEGORY (multipart) ---------- */
export const updateCategory = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/admin/ecommerce-categories/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

/* ---------- DELETE CATEGORY ---------- */
export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/e-commerce/admin/ecommerce-categories/${id}`);
  return data;
};
