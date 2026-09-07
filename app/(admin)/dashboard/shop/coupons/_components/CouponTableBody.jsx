"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/app/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toggleEcommerceCoupon } from "@/services/admin/admin.ecommerce-coupon.service";
import { toast } from "sonner";

export default function CouponTableBody({ loading, coupons, onEdit, onDelete, onRefresh }) {
  const [toggling, setToggling] = useState(null);

  const handleToggle = async (coupon) => {
    try {
      setToggling(coupon.id);
      await toggleEcommerceCoupon(coupon.id);
      toast.success(`Coupon ${coupon.isActive ? "deactivated" : "activated"} successfully!`);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle coupon");
    } finally {
      setToggling(null);
    }
  };

  if (loading) {
    return (
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 7 }).map((_, j) => (
              <TableCell key={j}>
                <div className="h-4 bg-muted/50 rounded animate-pulse" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      {coupons?.map((coupon) => (
        <TableRow key={coupon.id}>
          <TableCell className="font-semibold font-mono">{coupon.code}</TableCell>
          <TableCell className="capitalize">{coupon.discountType}</TableCell>
          <TableCell>
            {coupon.discountType === "percentage" ? `${coupon.value}%` : `৳${coupon.value}`}
          </TableCell>
          <TableCell>
            {coupon.usedCount} / {coupon.usageLimit}
          </TableCell>
          <TableCell>
            <Badge
              variant={coupon.isActive ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => handleToggle(coupon)}
            >
              {toggling === coupon.id ? "..." : coupon.isActive ? "Active" : "Inactive"}
            </Badge>
          </TableCell>
          <TableCell className="text-muted-foreground text-sm">
            {new Date(coupon.createdAt).toLocaleDateString("en-BD")}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-1">
              <Button variant="ghost" size="icon" onClick={() => onEdit(coupon)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(coupon)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
