"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { updateAdminOrderStatus } from "@/services/admin/admin.order.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BASE_STATUSES = [
  { value: "PENDING_PAYMENT", label: "Pending Payment" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

const formatStatus = (value) =>
  String(value || "—")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function OrderStatusUpdate({ order, onUpdated }) {
  const currentStatus = order?.orderStatus || "";
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const statusOptions =
    currentStatus && !BASE_STATUSES.some((item) => item.value === currentStatus)
      ? [{ value: currentStatus, label: formatStatus(currentStatus) }, ...BASE_STATUSES]
      : BASE_STATUSES;

  const handleUpdate = async () => {
    if (!order?.orderNumber || !status || status === currentStatus) return;

    try {
      setUpdating(true);
      const res = await updateAdminOrderStatus(order.orderNumber, status);

      if (res?.data) {
        toast.success("Order status updated");
        onUpdated?.(res.data);
      } else {
        toast.error(res?.error || "Failed to update order status");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Update Order Status
        </p>
        <p className="text-xs text-muted-foreground">
          Current: <span className="font-semibold">{formatStatus(currentStatus)}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:flex-1">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleUpdate}
          disabled={updating || !status || status === currentStatus}
        >
          {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Status
        </Button>
      </div>
    </div>
  );
}
