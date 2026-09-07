import api from "@/lib/api";

/* ---------- GET PRODUCT LIST ---------- */
export const getProducts = async (page = 1, limit = 10, search) => {
  const { data } = await api.get(`/e-commerce/admin/products`, {
    params: {
      page,
      limit,
      search: search || undefined,
    },
  });
  return data;
};

/* ---------- GET PRODUCT DETAIL ---------- */
export const getProductById = async (id) => {
  const { data } = await api.get(`/e-commerce/admin/products/${id}`);
  return data;
};

/* ---------- UPDATE PRODUCT (multipart) ---------- */
export const updateProduct = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/admin/products/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

/* ---------- UPDATE PRODUCT STATUS ---------- */
export const updateProductStatus = async (id, payload) => {
  const { data } = await api.put(`/e-commerce/admin/products/${id}/status`, payload);
  return data;
};

/* ---------- DELETE PRODUCT ---------- */
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/e-commerce/admin/products/${id}`);
  return data;
};

/* ---------- CREATE PRODUCT (multipart) ---------- */
export const createProduct = async (payload) => {
  const { data } = await api.post("/e-commerce/admin/products", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
