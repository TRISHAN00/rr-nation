"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Table } from "@/app/components/ui/table";
import { getEcommerceCoupons } from "@/services/admin/admin.ecommerce-coupon.service";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import CouponTableHeader from "./_components/CouponTableHeader";
import CouponTableBody from "./_components/CouponTableBody";
import CreateCouponModal from "./_components/CreateCouponModal";
import EditCouponModal from "./_components/EditCouponModal";
import DeleteCouponDialog from "./_components/DeleteCouponDialog";

export default function ShopCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const totalPages = Math.ceil(totalItems / limit);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getEcommerceCoupons(page, limit);
      setCoupons(res?.data?.coupons || []);
      setTotalItems(res?.data?.meta?.total || 0);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setEditOpen(true);
  };

  const handleDelete = (coupon) => {
    setSelectedCoupon(coupon);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shop Coupons</h1>
          <p className="text-sm text-muted-foreground">Manage e-commerce discount coupons</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Create Coupon
        </Button>
      </div>

      {/* Table */}
      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <CouponTableHeader />
            <CouponTableBody
              loading={loading}
              coupons={coupons}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchCoupons}
            />
          </Table>
          {!loading && coupons.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No coupons found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card">
          <p className="text-xs text-muted-foreground">
            Total <span className="font-bold text-foreground">{totalItems}</span> coupons
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-xs font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateCouponModal open={createOpen} setOpen={setCreateOpen} onRefresh={fetchCoupons} />
      <EditCouponModal open={editOpen} setOpen={setEditOpen} coupon={selectedCoupon} onRefresh={fetchCoupons} />
      <DeleteCouponDialog open={deleteOpen} setOpen={setDeleteOpen} coupon={selectedCoupon} onRefresh={fetchCoupons} />
    </div>
  );
}
