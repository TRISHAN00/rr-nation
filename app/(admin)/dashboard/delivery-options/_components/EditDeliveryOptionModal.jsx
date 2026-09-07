"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { updateDeliveryOption } from "@/services/admin/admin.delivery-option.service";
import { Loader2 } from "lucide-react";

export default function EditDeliveryOptionModal({ open, setOpen, option, onRefresh }) {
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    iconUrl: "",
    sortOrder: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (option && open) {
      setForm({
        title: option.title || "",
        code: option.code || "",
        description: option.description || "",
        iconUrl: option.iconUrl || "",
        sortOrder: option.sortOrder ?? "",
        isActive: option.isActive ?? true,
      });
    }
  }, [option, open]);

  const handleChange = (field, value) => {
    if (field === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        code: value
          .trim()
          .toUpperCase()
          .replace(/[^A-Z0-9\s]/g, "")
          .replace(/\s+/g, "_")
          .replace(/_+/g, "_"),
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () =>
    setForm({
      title: "",
      code: "",
      description: "",
      iconUrl: "",
      sortOrder: "",
      isActive: true,
    });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        title: form.title.trim(),
        code: form.code.trim(),
        description: form.description.trim(),
        iconUrl: form.iconUrl.trim(),
        sortOrder: Number(form.sortOrder) || 1,
        isActive: form.isActive,
      };

      await updateDeliveryOption(option.id, payload);

      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Delivery option update failed:", error);
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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Delivery Option</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                placeholder="Cash on Delivery"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Code</Label>
              <Input
                placeholder="CASH_ON_DELIVERY"
                value={form.code}
                readOnly
                className="bg-muted/50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              rows={3}
              placeholder="Pay after receiving product"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Icon URL</Label>
            <Input
              placeholder="https://example.com/cod.png"
              value={form.iconUrl}
              onChange={(e) => handleChange("iconUrl", e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <Label className="mb-0">Active</Label>
            <Switch
              checked={form.isActive}
              onCheckedChange={(val) => handleChange("isActive", val)}
            />
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
