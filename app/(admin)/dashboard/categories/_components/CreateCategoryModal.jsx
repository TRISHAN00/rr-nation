"use client";

import { useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createCategory } from "@/services/admin/admin.ecommerce-category.service";
import { ImagePlus, Loader2, X } from "lucide-react";

const initialForm = {
  name: "",
  slug: "",
  parentId: "",
  sortOrder: "",
};

export default function CreateCategoryModal({ open, setOpen, onRefresh }) {
  const [form, setForm] = useState(initialForm);
  const [icon, setIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const iconInputRef = useRef(null);
  const imageInputRef = useRef(null);

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

  const handleIconFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIcon(file);
    setIconPreview(URL.createObjectURL(file));
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(initialForm);
    setIcon(null);
    setIconPreview(null);
    setImage(null);
    setImagePreview(null);
    if (iconInputRef.current) iconInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("slug", form.slug.trim());
      payload.append("parentId", form.parentId ? String(Number(form.parentId)) : "");
      payload.append("sortOrder", String(Number(form.sortOrder) || 1));
      payload.append("icon", icon || "");
      payload.append("image", image || "");

      await createCategory(payload);

      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Category create failed:", error);
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Icon + Image */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block">Icon</Label>
              <input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleIconFile}
              />
              {iconPreview ? (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border border-border bg-muted">
                  <img
                    src={iconPreview}
                    alt="Icon preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIcon(null);
                      setIconPreview(null);
                      if (iconInputRef.current) iconInputRef.current.value = "";
                    }}
                    className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => iconInputRef.current?.click()}
                  className="w-full h-28 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-brand hover:text-brand transition-colors"
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs font-medium">Upload Icon</span>
                </button>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Image</Label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageFile}
              />
              {imagePreview ? (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border border-border">
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                      if (imageInputRef.current) imageInputRef.current.value = "";
                    }}
                    className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full h-28 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-brand hover:text-brand transition-colors"
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs font-medium">Upload Image</span>
                </button>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                placeholder="Electronics"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Slug</Label>
              <Input
                placeholder="electronics"
                value={form.slug}
                readOnly
                className="bg-muted/50"
              />
            </div>
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
              "Create Category"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
