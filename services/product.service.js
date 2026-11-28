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

// GET Public Product by slug
export const getProductBySlug = async (slug) => {
  const { data } = await api.get(`/e-commerce/products/slug/${slug}`);
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

// GET Public Brands
export const getPublicBrands = async () => {
  try {
    const { data } = await api.get("/e-commerce/brands");
    return data;
  } catch {
    return { data: [] };
  }
};

// GET Home (categories + deals)
export const getHomeData = async () => {
  try {
    const { data } = await api.get("/e-commerce/home");
    return data;
  } catch {
    return { data: { categories: [], dealsForYou: [] } };
  }
};
