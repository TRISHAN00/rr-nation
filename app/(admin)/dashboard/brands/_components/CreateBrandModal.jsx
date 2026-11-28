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
import { createAdminBrand } from "@/services/admin/admin.brand.service";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

const initialForm = { name: "", slug: "" };

export default function CreateBrandModal({ open, setOpen, onRefresh }) {
  const [form, setForm] = useState(initialForm);
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleChange = (field, value) => {
    if (field === "name") {
      setForm({
        name: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
      });
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    setForm(initialForm);
    setLogo(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.warning("Brand name is required");
      return;
    }
    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("slug", form.slug.trim());
      if (logo) payload.append("logo", logo);
      await createAdminBrand(payload);
      toast.success("Brand created successfully");
      reset();
      setOpen(false);
      onRefresh?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create brand",
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
        if (!val) reset();
      }}
    >
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Brand</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label className="mb-2 block">Logo</Label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            {preview ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border bg-muted">
                <img src={preview} alt="Logo preview" className="w-full h-full object-contain" />
                <button
                  type="button"
                  onClick={() => {
                    setLogo(null);
                    setPreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-brand hover:text-brand transition-colors"
              >
                <ImagePlus className="h-6 w-6" />
                <span className="text-xs font-medium">Upload Logo</span>
              </button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input placeholder="Brand name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Slug</Label>
              <Input placeholder="brand-slug" value={form.slug} readOnly className="bg-muted/50" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating...</> : "Create Brand"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
