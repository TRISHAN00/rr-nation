"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Hash,
  Loader2,
  Percent,
  Plus,
  Tag,
  Ticket,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Assuming sonner for consistency
import { useCoupons } from "../../context/CouponContext";

export default function EventCouponManager({ event }) {
  const {
    coupons,
    loading,
    isProcessing,
    fetchCoupons,
    handleCreateCoupon,
    handleDeleteCoupon,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
  } = useCoupons();

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    value: "",
    usageLimit: "",
  });

  // Sync when the component mounts or pagination changes
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons, currentPage, itemsPerPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!event?.id) {
      toast.error("Event ID missing");
      return;
    }

    const cleanCoupon = {
      eventId: Number(event.id),
      code: form.code.trim(),
      discountType: form.discountType,
      value: Number(form.value),
      usageLimit: Number(form.usageLimit),
    };

    const success = await handleCreateCoupon(cleanCoupon);

    if (success) {
      setForm({
        code: "",
        discountType: "percentage",
        value: "",
        usageLimit: "",
      });
    }
  };

  return (
    <Card className="shadow-sm border border-border/50 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-6 border-b">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Ticket className="h-5 w-5 text-primary" />
              Promotion Coupons (Event ID: {event?.id || "..."})
            </CardTitle>
            <CardDescription>
              Manage discount codes for this event.
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono">
            {coupons?.length || 0} Showing
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-6 bg-muted/10 border-b">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-end gap-4"
          >
            <div className="flex-[2] w-full space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Code
              </Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="SUMMER26"
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value.toUpperCase() })
                  }
                  className="pl-9 font-mono font-bold"
                  required
                />
              </div>
            </div>

            <div className="flex-1 w-full space-y-2 ">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Type
              </Label>
              <Select
         
                value={form.discountType}
                onValueChange={(val) => setForm({ ...form, discountType: val })}
              >
                <SelectTrigger className="bg-background mb-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-32 space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Value
              </Label>
              <div className="relative">
                {form.discountType === "percentage" ? (
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                ) : (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">
                    BDT
                  </span>
                )}
                <Input
                  type="number"
                  step="any"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="w-full md:w-32 space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Limit
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={form.usageLimit}
                  onChange={(e) =>
                    setForm({ ...form, usageLimit: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button disabled={isProcessing} className="w-full md:w-auto">
              {isProcessing ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Create
            </Button>
          </form>
        </div>

        <div className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="animate-spin text-primary h-8 w-8" />
              <p className="text-sm text-muted-foreground">
                Loading coupons...
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[200px] pl-6">Coupon Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Used Coupon</TableHead>
                    <TableHead>Usage Limit</TableHead>
                    <TableHead className="text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons?.length > 0 ? (
                    coupons.map((coupon) => (
                      <TableRow key={coupon.id} className="hover:bg-muted/5">
                        <TableCell className="pl-6">
                          <code className="rounded bg-primary/5 px-2 py-1 font-mono text-sm font-bold text-primary border border-primary/10">
                            {coupon.code}
                          </code>
                        </TableCell>
                        <TableCell className="capitalize text-muted-foreground">
                          {coupon.discountType}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              coupon.discountType === "percentage"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {coupon.discountType === "percentage"
                              ? `${coupon.value}%`
                              : `${coupon.value} BDT`}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {coupon.usedCount}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {coupon.usageLimit} uses
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isProcessing}
                            className="hover:text-destructive"
                            onClick={() => handleDeleteCoupon(coupon.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No coupons found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t bg-muted/20 gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Rows
                    </p>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(val) => {
                        setItemsPerPage(Number(val));
                        setCurrentPage(1); // Reset to first page on size change
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px] bg-background">
                        <SelectValue placeholder={itemsPerPage} />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 10, 20, 50].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Page {currentPage} of {totalPages || 1}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1 || loading}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages || loading}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage >= totalPages || loading}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}