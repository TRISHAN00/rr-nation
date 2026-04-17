"use client";

import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { updateMemberCoupon } from "@/services/admin/admin.coupon.service";
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
  });

  const [loading, setLoading] = useState(false);

  // Prefill data
  useEffect(() => {
    if (coupon) {
      setForm({
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value,
        usageLimit: coupon.usageLimit,
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

      onSuccess(); // refresh list
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
          <Input
            placeholder="Coupon Code"
            value={form.code}
            onChange={(e) =>
              handleChange("code", e.target.value.toUpperCase())
            }
          />

          <Select
            value={form.discountType}
            onValueChange={(val) => handleChange("discountType", val)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Value"
            value={form.value}
            onChange={(e) => handleChange("value", e.target.value)}
          />

          <Input
            type="number"
            placeholder="Usage Limit"
            value={form.usageLimit}
            onChange={(e) => handleChange("usageLimit", e.target.value)}
          />

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