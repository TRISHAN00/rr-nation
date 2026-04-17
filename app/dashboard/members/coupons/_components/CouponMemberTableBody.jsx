

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
    TableBody,
    TableCell,
    TableRow
} from "@/app/components/ui/table";

import { Pencil, Trash2 } from "lucide-react";
import { CouponListSkeleton } from "./CouponListSkeleton";

export default function CouponMemberTableBody({loading, coupons}) {
  return (
    <TableBody>
            {loading ? (
                <CouponListSkeleton rows={6} />
            ) : (
              coupons?.map((coupon) => (
                <TableRow key={coupon.id}>
                  {/* ID */}
                  <TableCell>#{coupon.id}</TableCell>

                  {/* Code */}
                  <TableCell className="font-semibold">
                    {coupon.code}
                  </TableCell>

                  {/* Type */}
                  <TableCell className="capitalize">
                    {coupon.discountType}
                  </TableCell>

                  {/* Value */}
                  <TableCell>
                    {coupon.discountType === "percentage"
                      ? `${coupon.value}%`
                      : `৳${coupon.value}`}
                  </TableCell>

                  {/* Usage */}
                  <TableCell>
                    {coupon.usedCount} / {coupon.usageLimit}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <div className="flex gap-2">
                      <Badge
                        variant={coupon.isActive ? "default" : "secondary"}
                      >
                        {coupon.isActive ? "Active" : "Inactive"}
                      </Badge>

                      {coupon.isArchived && (
                        <Badge variant="destructive">Archived</Badge>
                      )}
                    </div>
                  </TableCell>

                  {/* Created */}
                  <TableCell>
                    {new Date(coupon.createdAt).toLocaleDateString("en-BD", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Edit */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => console.log("Edit", coupon)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {/* Delete */}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => console.log("Delete", coupon)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
  )
}
