"use client";

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
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "../_components/ConfirmModal"; // Path to your modal

export default function EventCouponManager({ event, loading }) {
  const eventId = event?.id;

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

 

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    value: "",
    usageLimit: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createCoupon(
      {
        ...form,
        eventId,
        value: Number(form.value),
        usageLimit: Number(form.usageLimit),
      },
      {
        onSuccess: () =>
          setForm({
            code: "",
            discountType: "percentage",
            value: "",
            usageLimit: "",
          }),
      },
    );
  };

  // --- DELETE LOGIC ---
  const openDeleteConfirm = (id) => {
    setSelectedCouponId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteCoupon(selectedCouponId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedCouponId(null);
      },
    });
  };

  return (
    <Card className="shadow-sm border border-border/50 overflow-hidden">
      {/* ... CardHeader remains same ... */}

      <CardContent className="p-0">
        {/* Creation Form Area */}
        <div className="p-6 bg-muted/10 border-b">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-end gap-4"
          >
            {/* ... Form inputs remain same ... */}
            <Button disabled={isCreating} className="w-full md:w-auto">
              {isCreating ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Create
            </Button>
          </form>
        </div>

        {/* List Section */}
        <div className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-6">Coupon Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage Limit</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons?.data?.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="pl-6">
                    <code className="rounded bg-primary/5 px-2 py-1 font-mono font-bold text-primary">
                      {coupon.code}
                    </code>
                  </TableCell>
                  <TableCell className="capitalize">
                    {coupon.discountType}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {coupon.discountType === "percentage"
                        ? `${coupon.value}%`
                        : `${coupon.value} BDT`}
                    </Badge>
                  </TableCell>
                  <TableCell>{coupon.usageLimit}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => openDeleteConfirm(coupon.id)} // Open Modal
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Confirmation Modal Integration */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        title="Delete Coupon"
        description="Are you sure you want to delete this discount code? This will prevent new users from applying this code to their tickets."
      />
    </Card>
  );
}
