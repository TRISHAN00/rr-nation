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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { updateEcommerceCoupon, toggleEcommerceCoupon } from "@/services/admin/admin.ecommerce-coupon.service";
import { Loader2 } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import { toast } from "sonner";

export default function EditCouponModal({ open, setOpen, coupon, onRefresh }) {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    value: "",
    usageLimit: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (coupon && open) {
      setForm({
        code: coupon.code || "",
        discountType: coupon.discountType || "percentage",
        value: coupon.value || "",
        usageLimit: coupon.usageLimit || "",
        isActive: coupon.isActive ?? true,
      });
    }
  }, [coupon, open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!coupon) return;
    try {
      setLoading(true);
      await updateEcommerceCoupon(coupon.id, {
        code: form.code.trim().toUpperCase(),
        discountType: form.discountType,
        value: Number(form.value),
        usageLimit: Number(form.usageLimit),
      });
      if (form.isActive !== coupon.isActive) {
        await toggleEcommerceCoupon(coupon.id);
      }
      toast.success("Coupon updated successfully!");
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Coupon</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Coupon Code</Label>
            <Input
              placeholder="e.g. SAVE10"
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Discount Type</Label>
            <Select value={form.discountType} onValueChange={(v) => handleChange("discountType", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>
              {form.discountType === "percentage" ? "Percentage (%)" : "Amount (৳)"}
            </Label>
            <Input
              type="number"
              placeholder="e.g. 10"
              value={form.value}
              onChange={(e) => handleChange("value", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Usage Limit</Label>
            <Input
              type="number"
              placeholder="e.g. 100"
              value={form.usageLimit}
              onChange={(e) => handleChange("usageLimit", e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between border rounded-md p-3">
            <Label className="mb-0">Active</Label>
            <Switch
              checked={form.isActive}
              onCheckedChange={(val) => handleChange("isActive", val)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...</> : "Update Coupon"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
