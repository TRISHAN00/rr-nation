"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { updateShippingMethod } from "@/services/admin/admin.shipping-method.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditShippingMethodModal({ open, setOpen, method, onRefresh }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    baseFee: "",
    discountAmount: "",
    estimatedDeliveryDays: "",
    estimatedDeliveryTime: "",
    sortOrder: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (method && open) {
      setForm({
        name: method.name || "",
        code: method.code || "",
        description: method.description || "",
        baseFee: method.baseFee || "",
        discountAmount: method.discountAmount || "",
        estimatedDeliveryDays: method.estimatedDeliveryDays || "",
        estimatedDeliveryTime: method.estimatedDeliveryTime || "",
        sortOrder: method.sortOrder || "",
        isActive: method.isActive ?? true,
      });
    }
  }, [method, open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!method) return;
    try {
      setLoading(true);
      await updateShippingMethod(method.id, {
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        description: form.description.trim(),
        baseFee: Number(form.baseFee),
        discountAmount: Number(form.discountAmount) || 0,
        estimatedDeliveryDays: Number(form.estimatedDeliveryDays) || 0,
        estimatedDeliveryTime: form.estimatedDeliveryTime.trim(),
        sortOrder: Number(form.sortOrder) || 0,
        isActive: form.isActive,
      });
      toast.success("Shipping method updated!");
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit Shipping Method</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Code</Label>
              <Input value={form.code} onChange={(e) => handleChange("code", e.target.value.toUpperCase())} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={2} value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Base Fee (৳)</Label>
              <Input type="number" value={form.baseFee} onChange={(e) => handleChange("baseFee", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Discount (৳)</Label>
              <Input type="number" value={form.discountAmount} onChange={(e) => handleChange("discountAmount", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Sort Order</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => handleChange("sortOrder", e.target.value)} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Est. Delivery Days</Label>
              <Input type="number" value={form.estimatedDeliveryDays} onChange={(e) => handleChange("estimatedDeliveryDays", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Est. Delivery Time</Label>
              <Input value={form.estimatedDeliveryTime} onChange={(e) => handleChange("estimatedDeliveryTime", e.target.value)} />
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-md p-3">
            <Label className="mb-0">Active</Label>
            <Switch checked={form.isActive} onCheckedChange={(val) => handleChange("isActive", val)} />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...</> : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
