"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateAdminBrand } from "@/services/admin/admin.brand.service";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

export default function EditBrandModal({ open, setOpen, brand, onRefresh }) {
  const [form, setForm] = useState({ name: "", slug: "", isActive: true });
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (brand && open) {
      setForm({
        name: brand.name || "",
        slug: brand.slug || "",
        isActive: brand.isActive ?? true,
      });
      setPreview(brand.logoUrl || null);
      setLogo(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [brand, open]);

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
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!brand?.id) return;
    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("slug", form.slug.trim());
      payload.append("isActive", String(form.isActive));
      if (logo) payload.append("logo", logo);
      else payload.append("logo", "");
      await updateAdminBrand(brand.id, payload);
      toast.success("Brand updated successfully");
      setOpen(false);
      onRefresh?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update brand",
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
        if (!val) {
          setLogo(null);
          if (fileRef.current) fileRef.current.value = "";
        }
      }}
    >
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
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
              <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Slug</Label>
              <Input value={form.slug} readOnly className="bg-muted/50" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <Label className="mb-0">Active</Label>
            <Switch checked={form.isActive} onCheckedChange={(val) => handleChange("isActive", val)} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...</> : "Update Brand"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
