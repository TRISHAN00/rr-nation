"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { createProduct } from "@/services/admin/admin.product.service";
import { getCategories } from "@/services/admin/admin.ecommerce-category.service";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const initialForm = {
  name: "",
  slug: "",
  sku: "",
  description: "",
  shortDescription: "",
  basePrice: "",
  salePrice: "",
  discountPercent: "",
  stockQuantity: "",
  categoryId: "",
  isFeatured: false,
};

export default function CreateProductModal({ open, setOpen, onRefresh }) {
  const [form, setForm] = useState(initialForm);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const fetchCategories = async () => {
      try {
        const res = await getCategories(1, 100);
        setCategories(res?.data?.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
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
    setForm(initialForm);
    setThumbnail(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("slug", form.slug.trim());
      payload.append("sku", form.sku.trim());
      payload.append("description", form.description.trim());
      payload.append("shortDescription", form.shortDescription.trim());
      payload.append("basePrice", String(Number(form.basePrice)));
      payload.append("salePrice", String(Number(form.salePrice)));
      payload.append("discountPercent", String(Number(form.discountPercent) || 0));
      payload.append("stockQuantity", String(Number(form.stockQuantity) || 0));
      payload.append("categoryId", String(Number(form.categoryId) || 0));
      payload.append("isFeatured", String(form.isFeatured));
      payload.append("thumbnail", thumbnail || "");

      await createProduct(payload);

      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Product create failed:", error);
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
            <Label className="mb-2 block">Thumbnail</Label>
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

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                placeholder="Chocolate Cake"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Slug</Label>
              <Input
                placeholder="chocolate-cake"
                value={form.slug}
                readOnly
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-1">
              <Label>SKU</Label>
              <Input
                placeholder="CAKE-001"
                value={form.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                placeholder="20"
                value={form.stockQuantity}
                onChange={(e) => handleChange("stockQuantity", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                value={form.categoryId ? String(form.categoryId) : undefined}
                onValueChange={(value) => handleChange("categoryId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Base Price (৳)</Label>
              <Input
                type="number"
                placeholder="1200"
                value={form.basePrice}
                onChange={(e) => handleChange("basePrice", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Sale Price (৳)</Label>
              <Input
                type="number"
                placeholder="1000"
                value={form.salePrice}
                onChange={(e) => handleChange("salePrice", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Discount (%)</Label>
              <Input
                type="number"
                placeholder="16.67"
                value={form.discountPercent}
                onChange={(e) => handleChange("discountPercent", e.target.value)}
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Short Description</Label>
              <Input
                placeholder="Fresh chocolate cake"
                value={form.shortDescription}
                onChange={(e) => handleChange("shortDescription", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                rows={4}
                placeholder="Premium chocolate cake."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { key: "isFeatured", label: "Featured" },
            ].map(({ key, label }) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <Label className="mb-0">{label}</Label>
                <Switch
                  checked={form[key]}
                  onCheckedChange={(val) => handleChange(key, val)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
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
