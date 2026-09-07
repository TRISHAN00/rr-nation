import api from "@/lib/api";

/* ---------- GET PUBLIC CATEGORY LIST ---------- */
export const getPublicCategories = async (search) => {
  const { data } = await api.get(`/e-commerce/ecommerce-categories`, {
    params: {
      search: search || undefined,
    },
  });
  return data;
};

/* ---------- GET PUBLIC CATEGORY TREE ---------- */
export const getCategoryTree = async () => {
  const { data } = await api.get(`/e-commerce/ecommerce-categories/tree`);
  return data;
};
