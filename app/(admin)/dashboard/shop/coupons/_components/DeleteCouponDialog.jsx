"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { deleteEcommerceCoupon } from "@/services/admin/admin.ecommerce-coupon.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteCouponDialog({ open, setOpen, coupon, onRefresh }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!coupon) return;
    try {
      setLoading(true);
      await deleteEcommerceCoupon(coupon.id);
      toast.success("Coupon deleted successfully!");
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Coupon</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete coupon <span className="font-bold text-foreground">{coupon?.code}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Deleting...</> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
