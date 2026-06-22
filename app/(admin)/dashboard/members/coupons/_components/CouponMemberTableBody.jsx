"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
    TableBody,
    TableCell,
    TableRow,
} from "@/app/components/ui/table";
import { useState } from "react";

import { Pencil, Trash2 } from "lucide-react";
import { CouponListSkeleton } from "./CouponListSkeleton";
import DeleteCouponDialog from "./DeleteCouponDialog";
import UpdateCouponModal from "./UpdateCouponModal";

export default function CouponMemberTableBody({
    loading,
    coupons,
    onRefresh,
}) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const handleEdit = (coupon) => {
        setSelectedCoupon(coupon);
        setEditOpen(true);
    };

    const handleDeleteClick = (coupon) => {
        setSelectedCoupon(coupon);
        setDeleteOpen(true);
    };

    return (
        <>
            <TableBody>
                {loading ? (
                    <CouponListSkeleton rows={6} />
                ) : (
                    coupons?.map((coupon) => (
                        <TableRow key={coupon.id}>

                            <TableCell className="font-semibold">
                                {coupon.code}
                            </TableCell>

                            <TableCell className="capitalize">
                                {coupon.discountType}
                            </TableCell>

                            <TableCell>
                                {coupon.discountType === "percentage"
                                    ? `${coupon.value}%`
                                    : `৳${coupon.value}`}
                            </TableCell>

                            <TableCell>
                                {coupon.usedCount} / {coupon.usageLimit}
                            </TableCell>

                            <TableCell>
                                <div className="flex gap-2">
                                    <Badge variant={coupon.isActive ? "default" : "secondary"}>
                                        {coupon.isActive ? "Active" : "Inactive"}
                                    </Badge>

                                    {coupon.isArchived && (
                                        <Badge variant="destructive">Archived</Badge>
                                    )}
                                </div>
                            </TableCell>

                            <TableCell>
                                {new Date(coupon.createdAt).toLocaleDateString("en-BD")}
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {/* Edit */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(coupon)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    {/* Delete */}
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDeleteClick(coupon)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>

            {/* EDIT MODAL */}
            <UpdateCouponModal
                open={editOpen}
                setOpen={setEditOpen}
                coupon={selectedCoupon}
                onSuccess={onRefresh}
            />

            {/* DELETE DIALOG */}
            <DeleteCouponDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                coupon={selectedCoupon}
                onSuccess={onRefresh}
            />
        </>
    );
}