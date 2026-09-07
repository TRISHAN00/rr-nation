"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { createShippingMethod } from "@/services/admin/admin.shipping-method.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateShippingMethodModal({ open, setOpen, onRefresh }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    baseFee: "",
    discountAmount: "",
    estimatedDeliveryDays: "",
    estimatedDeliveryTime: "",
    sortOrder: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name") {
        updated.code = value.trim().toUpperCase().replace(/[^A-Z0-9\s]/g, "").replace(/\s+/g, "_");
      }
      return updated;
    });
  };

  const resetForm = () => setForm({
    name: "", code: "", description: "", baseFee: "", discountAmount: "",
    estimatedDeliveryDays: "", estimatedDeliveryTime: "", sortOrder: "",
  });

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.code.trim() || !form.baseFee) {
      toast.warning("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await createShippingMethod({
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        description: form.description.trim(),
        baseFee: Number(form.baseFee),
        discountAmount: Number(form.discountAmount) || 0,
        estimatedDeliveryDays: Number(form.estimatedDeliveryDays) || 0,
        estimatedDeliveryTime: form.estimatedDeliveryTime.trim(),
        sortOrder: Number(form.sortOrder) || 0,
      });
      toast.success("Shipping method created!");
      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add Shipping Method</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name *</Label>
              <Input placeholder="Normal Delivery" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Code *</Label>
              <Input placeholder="NORMAL_DELIVERY" value={form.code} onChange={(e) => handleChange("code", e.target.value.toUpperCase())} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={2} placeholder="Delivered by RunRise Nation" value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Base Fee (৳) *</Label>
              <Input type="number" placeholder="60" value={form.baseFee} onChange={(e) => handleChange("baseFee", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Discount (৳)</Label>
              <Input type="number" placeholder="0" value={form.discountAmount} onChange={(e) => handleChange("discountAmount", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Sort Order</Label>
              <Input type="number" placeholder="1" value={form.sortOrder} onChange={(e) => handleChange("sortOrder", e.target.value)} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Est. Delivery Days</Label>
              <Input type="number" placeholder="5" value={form.estimatedDeliveryDays} onChange={(e) => handleChange("estimatedDeliveryDays", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Est. Delivery Time</Label>
              <Input placeholder="5 days" value={form.estimatedDeliveryTime} onChange={(e) => handleChange("estimatedDeliveryTime", e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating...</> : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
