"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { createProduct, getBrands } from "@/services/admin/admin.product.service";
import { getCategories } from "@/services/admin/admin.ecommerce-category.service";
import { buildProductFormData, initialProductForm } from "@/utils/productForm";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProductFormFields from "./ProductFormFields";
import { toast } from "sonner";

export default function CreateProductModal({ open, setOpen, onRefresh }) {
  const [form, setForm] = useState(initialProductForm);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const fetchOptions = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          getCategories(1, 100),
          getBrands(),
        ]);
        setCategories(categoriesRes?.data?.categories || []);
        setBrands(brandsRes?.data?.brands || []);
      } catch (err) {
        console.error("Failed to fetch product options:", err);
      toast.error(err?.response?.data?.message || err?.response?.data?.error || err?.message || "Something went wrong");
      }
    };
    fetchOptions();
  }, [open]);

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
    setForm(initialProductForm);
    setThumbnail(null);
    setPreview(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // Mirrors the exact multipart shape expected by the products API.
      const payload = buildProductFormData(form, thumbnail, {
        includeEmptyThumbnail: true,
      });

      await createProduct(payload);

      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Product create failed:", err);
      toast.error(err?.response?.data?.message || err?.response?.data?.error || err?.message || "Something went wrong");
      const message = err?.response?.data?.message;
      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to create product.",
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
          <DialogTitle>Create Product</DialogTitle>
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
                    setPreview(null);
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
          />
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
