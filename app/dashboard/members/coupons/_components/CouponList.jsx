"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";

import { getMemberCoupons } from "@/services/admin/admin.coupon.service";
import { Pencil, Trash2 } from "lucide-react";
import { CouponListSkeleton } from "./CouponListSkeleton";

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await getMemberCoupons();
      setCoupons(res?.data?.items || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <Table>
          {/* HEADER */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Coupon Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
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
        </Table>

        {/* EMPTY STATE */}
        {!loading && coupons.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No coupons found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}