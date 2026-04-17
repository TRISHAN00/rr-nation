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
import { createMemberCoupons } from "@/services/admin/admin.coupon.service";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CreateCouponModal({ open, setOpen }) {
  const [coupons, setCoupons] = useState([
    {
      code: "",
      discountType: "fixed",
      value: "",
      usageLimit: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Handle change
  const handleChange = (index, field, value) => {
    const updated = [...coupons];
    updated[index][field] = value;
    setCoupons(updated);
  };

  // Add row
  const addCoupon = () => {
    setCoupons([
      ...coupons,
      {
        code: "",
        discountType: "fixed",
        value: "",
        usageLimit: "",
      },
    ]);
  };

  // Remove row
  const removeCoupon = (index) => {
    const updated = coupons.filter((_, i) => i !== index);
    setCoupons(updated);
  };

  // Reset when modal closes
  const resetForm = () => {
    setCoupons([
      {
        code: "",
        discountType: "fixed",
        value: "",
        usageLimit: "",
      },
    ]);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = coupons.map((c) => ({
        code: c.code.trim(),
        discountType: c.discountType,
        value: Number(c.value),
        usageLimit: Number(c.usageLimit),
      }));

      await createMemberCoupons(payload);

      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Coupon create failed:", error);
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Coupons</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="grid md:grid-cols-5 gap-3 border p-3 rounded-lg bg-muted/30"
            >
              {/* Code */}
              <Input
                placeholder="Coupon Code"
                value={coupon.code}
                onChange={(e) =>
                  handleChange(index, "code", e.target.value.toUpperCase())
                }
              />

              {/* Type */}
              <Select
                value={coupon.discountType}
                onValueChange={(value) =>
                  handleChange(index, "discountType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>

              {/* Value */}
              <Input
                type="number"
                placeholder="Value"
                value={coupon.value}
                onChange={(e) =>
                  handleChange(index, "value", e.target.value)
                }
              />

              {/* Usage */}
              <Input
                type="number"
                placeholder="Usage Limit"
                value={coupon.usageLimit}
                onChange={(e) =>
                  handleChange(index, "usageLimit", e.target.value)
                }
              />

              {/* Remove */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCoupon(index)}
                disabled={coupons.length === 1}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={addCoupon}>
            <Plus className="h-4 w-4 mr-1" /> Add More
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Coupons"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}