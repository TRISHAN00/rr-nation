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

import {
  toggleActiveInactive,
  updateMemberCoupon,
} from "@/services/admin/admin.coupon.service";

import { useEffect, useState } from "react";

export default function UpdateCouponModal({
  open,
  setOpen,
  coupon,
  onSuccess,
}) {
  const [form, setForm] = useState({
    code: "",
    discountType: "fixed",
    value: "",
    usageLimit: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // Prefill
  useEffect(() => {
    if (coupon) {
      setForm({
        code: coupon.code || "",
        discountType: coupon.discountType || "fixed",
        value: coupon.value || "",
        usageLimit: coupon.usageLimit || "",
        isActive: coupon.isActive ?? true,
      });
    }
  }, [coupon]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = [
        {
          discountCouponId: coupon.id,
          code: form.code.trim(),
          discountType: form.discountType,
          value: Number(form.value),
          usageLimit: Number(form.usageLimit),
        },
      ];

      await updateMemberCoupon(payload);

      // Only toggle if changed
      if (form.isActive !== coupon.isActive) {
        await toggleActiveInactive(coupon.id);
      }

      onSuccess();
      setOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
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

          {/* Coupon Code */}
          <div className="space-y-1.5">
            <Label>Coupon Code</Label>
            <Input
              placeholder="Enter coupon code"
              value={form.code}
              onChange={(e) =>
                handleChange("code", e.target.value.toUpperCase())
              }
            />
          </div>

          {/* Discount Type */}
          <div className="space-y-1.5">
            <Label>Discount Type</Label>
            <Select
              value={form.discountType}
              onValueChange={(val) => handleChange("discountType", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Value */}
          <div className="space-y-1.5">
            <Label>
              {form.discountType === "percentage"
                ? "Discount Percentage (%)"
                : "Discount Amount (৳)"}
            </Label>
            <Input
              type="number"
              placeholder={
                form.discountType === "percentage"
                  ? "Enter percentage (0-100)"
                  : "Enter amount"
              }
              value={form.value}
              onChange={(e) => handleChange("value", e.target.value)}
            />
          </div>

          {/* Usage Limit */}
          <div className="space-y-1.5">
            <Label>Usage Limit</Label>
            <Input
              type="number"
              placeholder="Enter usage limit"
              value={form.usageLimit}
              onChange={(e) => handleChange("usageLimit", e.target.value)}
            />
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between border rounded-md p-3">
            <Label>Active Status</Label>
            <Switch
              checked={form.isActive}
              onCheckedChange={(val) =>
                handleChange("isActive", val)
              }
            />
          </div>

          {/* Submit */}
          <Button
            className="w-full"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Coupon"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}