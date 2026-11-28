"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  assignProductDeliveryOptions,
  getBrands,
  getProductById,
  reorderProductImages,
  setProductImagePrimary,
  updateProduct,
  uploadProductImage,
  uploadProductImagesBulk,
} from "@/services/admin/admin.product.service";
import { getCategories } from "@/services/admin/admin.ecommerce-category.service";
import { getDeliveryOptions } from "@/services/admin/admin.delivery-option.service";
import { buildProductFormData, initialProductForm, productToForm } from "@/utils/productForm";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Star, Truck, Upload, X } from "lucide-react";
import { toast } from "sonner";
import ProductFormFields from "./ProductFormFields";

export default function EditProductModal({ open, setOpen, product, onRefresh }) {
  const [form, setForm] = useState({ ...initialProductForm, isActive: true });
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadingSingle, setUploadingSingle] = useState(false);
  const [uploadingBulk, setUploadingBulk] = useState(false);
  const [savingImageOrder, setSavingImageOrder] = useState(false);
  const [settingPrimaryId, setSettingPrimaryId] = useState(null);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDeliveryOptionIds, setSelectedDeliveryOptionIds] = useState([]);
  const [savingDeliveryOptions, setSavingDeliveryOptions] = useState(false);
  const fileInputRef = useRef(null);
  const singleImageRef = useRef(null);
  const bulkImagesRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const fetchOptions = async () => {
      try {
        const [categoriesRes, brandsRes, deliveryRes] = await Promise.all([
          getCategories(1, 100),
          getBrands(),
          getDeliveryOptions(1, 100),
        ]);
        setCategories(categoriesRes?.data?.categories || []);
        setBrands(brandsRes?.data?.brands || []);
        setDeliveryOptions(
          deliveryRes?.data?.deliveryOptions || deliveryRes?.data?.items || [],
        );
      } catch (err) {
        console.error("Failed to fetch product options:", err);
      }
    };
    fetchOptions();
  }, [open]);

  const sortImages = (images = []) =>
    [...images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const fetchProductImages = async (productId) => {
    if (!productId) return;
    try {
      setImageLoading(true);
      const res = await getProductById(productId);
      setProductImages(sortImages(res?.data?.images || []));
    } catch (err) {
      console.error("Failed to fetch product images:", err);
      setProductImages([]);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (product && open) {
      setForm({
        ...productToForm(product),
        isActive: product.isActive ?? true,
      });
      setPreview(product.thumbnailImage || null);
      setProductImages(sortImages(product.images || []));
      setSelectedDeliveryOptionIds(
        (product.deliveryOptions || []).map((o) => o.id).filter(Boolean),
      );
      setError("");
      fetchProductImages(product.id);
    }
  }, [product, open]);

  const handleChange = (field, value) => {
    if (field === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setThumbnail(null);
    setPreview(null);
    setError("");
    setProductImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (singleImageRef.current) singleImageRef.current.value = "";
    if (bulkImagesRef.current) bulkImagesRef.current.value = "";
  };

  const handleSingleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !product?.id) return;
    try {
      setUploadingSingle(true);
      await uploadProductImage(product.id, file);
      toast.success("Image uploaded");
      await fetchProductImages(product.id);
      onRefresh?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload image");
    } finally {
      setUploadingSingle(false);
      if (singleImageRef.current) singleImageRef.current.value = "";
    }
  };

  const handleBulkImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !product?.id) return;
    try {
      setUploadingBulk(true);
      await uploadProductImagesBulk(product.id, files);
      toast.success(`${files.length} image(s) uploaded`);
      await fetchProductImages(product.id);
      onRefresh?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload images");
    } finally {
      setUploadingBulk(false);
      if (bulkImagesRef.current) bulkImagesRef.current.value = "";
    }
  };

  const moveImage = (index, direction) => {
    setProductImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((img, i) => ({ ...img, sortOrder: i + 1 }));
    });
  };

  const handleSetPrimary = async (imageId) => {
    if (!imageId) return;
    try {
      setSettingPrimaryId(imageId);
      await setProductImagePrimary(imageId);
      toast.success("Primary image updated");
      await fetchProductImages(product.id);
      onRefresh?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to set primary image");
    } finally {
      setSettingPrimaryId(null);
    }
  };

  const handleSaveImageOrder = async () => {
    if (!product?.id || !productImages.length) return;
    try {
      setSavingImageOrder(true);
      const payload = productImages.map((img, i) => ({
        imageId: img.id,
        sortOrder: i + 1,
      }));
      await reorderProductImages(product.id, payload);
      toast.success("Image order saved");
      await fetchProductImages(product.id);
      onRefresh?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reorder images");
    } finally {
      setSavingImageOrder(false);
    }
  };

  const toggleDeliveryOption = (id) => {
    setSelectedDeliveryOptionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSaveDeliveryOptions = async () => {
    if (!product?.id) return;
    try {
      setSavingDeliveryOptions(true);
      await assignProductDeliveryOptions(product.id, selectedDeliveryOptionIds);
      toast.success("Delivery options updated");
      onRefresh?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update delivery options");
    } finally {
      setSavingDeliveryOptions(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // Same multipart shape as create, plus the update-only `isActive` field.
      const payload = buildProductFormData(form, thumbnail, {
        extraFields: ["isActive"],
      });

      await updateProduct(product.id, payload);

      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Product update failed:", err);
      const message = err?.response?.data?.message;
      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to update product.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="mb-2 block text-sm font-medium">Thumbnail</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            {preview ? (
              <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-border">
                <img
                  src={preview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnail(null);
                    setPreview(product?.thumbnailImage || null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-40 h-40 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-brand hover:text-brand transition-colors"
              >
                <ImagePlus className="h-8 w-8" />
                <span className="text-xs font-medium">Upload Image</span>
              </button>
            )}
          </div>

          <ProductFormFields
            form={form}
            handleChange={handleChange}
            categories={categories}
            brands={brands}
            includeActive
          />

          {/* Product Images */}
          <div className="border-t pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Product Images</h3>
                <p className="text-xs text-muted-foreground">
                  Upload single or multiple images for this product.
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  ref={singleImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSingleImageUpload}
                />
                <input
                  ref={bulkImagesRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleBulkImageUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingSingle || !product?.id}
                  onClick={() => singleImageRef.current?.click()}
                >
                  {uploadingSingle ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Single Upload
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingBulk || !product?.id}
                  onClick={() => bulkImagesRef.current?.click()}
                >
                  {uploadingBulk ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ImagePlus className="h-4 w-4 mr-2" />
                  )}
                  Bulk Upload
                </Button>
              </div>
            </div>

            {imageLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading images...
              </div>
            ) : productImages.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {productImages.map((img, i) => (
                    <div
                      key={img.id || img.imageUrl || i}
                      className="rounded-lg border bg-muted/20 overflow-hidden"
                    >
                      <div className="relative aspect-square bg-muted">
                        <img
                          src={img.imageUrl || img.full_path || img.path}
                          alt={`Product image ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {img.isPrimary && (
                          <span className="absolute top-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="p-2 flex items-center justify-between gap-1">
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            disabled={i === 0}
                            onClick={() => moveImage(i, -1)}
                            title="Move left/up"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            disabled={i === productImages.length - 1}
                            onClick={() => moveImage(i, 1)}
                            title="Move right/down"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant={img.isPrimary ? "secondary" : "outline"}
                          size="sm"
                          className="h-7 px-2 text-[11px]"
                          disabled={img.isPrimary || settingPrimaryId === img.id}
                          onClick={() => handleSetPrimary(img.id)}
                        >
                          {settingPrimaryId === img.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <>
                              <Star className="h-3 w-3 mr-1" />
                              {img.isPrimary ? "Primary" : "Set Primary"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={savingImageOrder}
                    onClick={handleSaveImageOrder}
                  >
                    {savingImageOrder && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Save Image Order
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                No product images uploaded yet.
              </p>
            )}
          </div>

          {/* Delivery Options */}
          <div className="border-t pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Delivery Options
                </h3>
                <p className="text-xs text-muted-foreground">
                  Assign delivery options to this product.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={savingDeliveryOptions || !product?.id}
                onClick={handleSaveDeliveryOptions}
              >
                {savingDeliveryOptions && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Delivery Options
              </Button>
            </div>
            {deliveryOptions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {deliveryOptions.map((opt) => {
                  const checked = selectedDeliveryOptionIds.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        checked ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDeliveryOption(opt.id)}
                        className="h-4 w-4 accent-primary"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{opt.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {opt.baseFee != null ? `৳ ${opt.baseFee}` : ""}
                          {opt.estimatedDeliveryDays ? ` · ${opt.estimatedDeliveryDays} days` : ""}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No delivery options available.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
