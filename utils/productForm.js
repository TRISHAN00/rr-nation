/**
 * Multipart field order expected by POST/PUT /e-commerce/admin/products.
 * Keep this in sync with the API's form-data contract.
 */
export const PRODUCT_FORM_FIELDS = [
  "shortDescription",
  "stockQuantity",
  "gender",
  "salePrice",
  "brandId",
  "discountPercent",
  "eventName",
  "material",
  "model",
  "name",
  "slug",
  "thumbnail",
  "colors",
  "medalType",
  "sizes",
  "isDeal",
  "basePrice",
  "eventCategory",
  "tags",
  "categoryId",
  "type",
  "productCode",
  "description",
  "sku",
];

const BOOLEAN_FIELDS = new Set([
  "isDeal",
  "isActive",
]);

const LIST_FIELDS = new Set(["colors", "sizes", "tags"]);

export const initialProductForm = {
  shortDescription: "",
  stockQuantity: "",
  gender: "",
  salePrice: "",
  brandId: "",
  discountPercent: "",
  eventName: "",
  material: "",
  model: "",
  name: "",
  slug: "",
  colors: "",
  medalType: "",
  sizes: "",
  isDeal: false,
  basePrice: "",
  eventCategory: "",
  tags: "",
  categoryId: "",
  type: "",
  productCode: "",
  description: "",
  sku: "",
};

const toFormValue = (field, value) => {
  if (value === null || value === undefined) return "";
  if (BOOLEAN_FIELDS.has(field)) return value ? "true" : "false";
  if (LIST_FIELDS.has(field)) {
    return Array.isArray(value) ? value.join(",") : String(value);
  }
  return String(value);
};

/**
 * Builds the FormData payload in the exact shape the products API expects.
 * `thumbnail` is only sent as a file when one is selected; `includeEmptyThumbnail`
 * mirrors the API example where an empty thumbnail field is present.
 */
export const buildProductFormData = (
  form,
  thumbnail,
  { includeEmptyThumbnail = false, extraFields = [] } = {},
) => {
  const payload = new FormData();

  PRODUCT_FORM_FIELDS.forEach((field) => {
    if (field === "thumbnail") {
      if (thumbnail instanceof Blob) {
        payload.append("thumbnail", thumbnail);
      } else if (includeEmptyThumbnail) {
        payload.append("thumbnail", "");
      }
      return;
    }

    const value = toFormValue(field, form?.[field]);
    if (field === "brandId" && !String(value).trim()) return;
    payload.append(field, value);
  });

  extraFields.forEach((field) => {
    payload.append(field, toFormValue(field, form?.[field]));
  });

  return payload;
};

/** Maps an API product object back into the form state (arrays -> CSV strings). */
export const productToForm = (product = {}) => ({
  ...initialProductForm,
  ...PRODUCT_FORM_FIELDS.filter((field) => field !== "thumbnail").reduce(
    (values, field) => {
      const value = product[field];

      if (value === null || value === undefined) return values;
      values[field] = LIST_FIELDS.has(field) && Array.isArray(value)
        ? value.join(",")
        : value;
      return values;
    },
    {},
  ),
  categoryId: product.category?.id ? String(product.category.id) : "",
  brandId: product.brand?.id ? String(product.brand.id) : "",
});
