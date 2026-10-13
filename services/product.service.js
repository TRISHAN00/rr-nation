import api from "@/lib/api";

// GET Public Products
export const getProducts = async (params = {}) => {
  const { data } = await api.get("/e-commerce/products", { params });
  return data;
};

// GET Public Product by ID
export const getProductById = async (id) => {
  const { data } = await api.get(`/e-commerce/products/${id}`);
  return data;
};

// GET Public Categories
export const getPublicCategories = async () => {
  try {
    const { data } = await api.get("/e-commerce/ecommerce-categories");
    return data;
  } catch {
    return { data: [] };
  }
};
