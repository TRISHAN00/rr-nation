"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
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
import { getAdminOrders } from "@/services/admin/admin.order.service";
import { ChevronLeft, ChevronRight, Eye, Loader2, Search, ShoppingBag, X } from "lucide-react";
import OrderDetailSheet from "./_components/OrderDetailSheet";
import { toast } from "sonner";

const getOrderNumber = (order) =>
  order.orderNumber || order.orderCode || (order.id ? `#${order.id}` : "—");

const getCustomer = (order) => {
  const user = order.user || order.customer || {};
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.name ||
    order.userName ||
    order.customerName ||
    "—";
  return { name, email: user.email || order.email || "" };
};

const getItemCount = (order) => {
  const items = order.items || order.orderItems || order.products;
  if (Array.isArray(items)) return items.length;
  return order.itemCount ?? "—";
};

const getTotal = (order) =>
  order.totalAmount ??
  order.finalAmount ??
  order.afterDiscountAmount ??
  order.total ??
  order.grandTotal ??
  order.amount ??
  0;

const getStatus = (order) => order.status || order.orderStatus || "—";

const formatStatus = (value) =>
  String(value || "—")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const statusClass = (status) => {
  const value = String(status || "")
    .replaceAll("_", " ")
    .toLowerCase()
    .trim();
  if (["delivered", "completed", "paid", "success", "approved"].includes(value)) {
    return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  }
  if (
    ["pending", "pending payment", "processing", "shipped", "confirmed"].includes(value)
  ) {
    return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  }
  if (["cancelled", "failed", "refunded", "rejected"].includes(value)) {
    return "bg-destructive/10 text-destructive border-destructive/20";
  }
  return "";
};

const formatDate = (value, withTime = false) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : withTime
      ? date.toLocaleString()
      : date.toLocaleDateString();
};

const getOrderDate = (order) => {
  const raw = order.createdAt || order.orderDate || order.placedAt;
  if (raw) return formatDate(raw, true);
  const match = String(order.orderNumber || "").match(/^ORD-(\d{10,13})-/);
  if (match) {
    const stamp = Number(match[1]);
    const date = new Date(stamp.toString().length === 10 ? stamp * 1000 : stamp);
    if (!Number.isNaN(date.getTime())) return formatDate(date, true);
  }
  return "—";
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [detailOrderNumber, setDetailOrderNumber] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");

  const totalPages = Math.ceil(totalItems / limit);

  const openOrderDetails = (orderNumber) => {
    setDetailOrderNumber(orderNumber);
    setDetailOpen(true);
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAdminOrders(page, limit);
      setOrders(res?.data?.orders || []);
      setTotalItems(res?.data?.meta?.total || 0);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error(err?.response?.data?.message || err?.response?.data?.error || err?.message || "Something went wrong");
      setError("Failed to load orders. Please try again.");
      setOrders([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const hasFilters =
    search.trim() !== "" || orderStatusFilter !== "all" || paymentStatusFilter !== "all";

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      const customer = getCustomer(order);
      const status = String(getStatus(order) || "").toUpperCase();
      const paymentStatus = String(order.paymentStatus || "").toUpperCase();

      const matchesSearch =
        !query ||
        String(order.orderNumber || "").toLowerCase().includes(query) ||
        String(customer.name || "").toLowerCase().includes(query) ||
        String(customer.email || "").toLowerCase().includes(query);

      const matchesOrderStatus =
        orderStatusFilter === "all" || status === orderStatusFilter;
      const matchesPaymentStatus =
        paymentStatusFilter === "all" || paymentStatus === paymentStatusFilter;

      return matchesSearch && matchesOrderStatus && matchesPaymentStatus;
    });
  }, [orders, search, orderStatusFilter, paymentStatusFilter]);

  const clearFilters = () => {
    setSearch("");
    setOrderStatusFilter("all");
    setPaymentStatusFilter("all");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          View e-commerce orders placed in the shop
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order number, customer name or email..."
                className="pl-9"
              />
            </div>
            <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Order status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All order statuses</SelectItem>
                <SelectItem value="PENDING_PAYMENT">Pending Payment</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All payment statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
              </SelectContent>
            </Select>
            {hasFilters && (
              <Button variant="ghost" onClick={clearFilters} className="md:w-auto">
                <X className="mr-2 h-4 w-4" /> Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-muted p-4">
                        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {orders.length === 0
                            ? "No orders found"
                            : "No orders match your filters"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {orders.length === 0
                            ? "Orders will appear here once customers check out."
                            : "Try adjusting or clearing your search and filters."}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const customer = getCustomer(order);
                  const status = getStatus(order);

                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.orderNumber ? (
                          <button
                            type="button"
                            onClick={() => openOrderDetails(order.orderNumber)}
                            className="text-left hover:underline"
                          >
                            {getOrderNumber(order)}
                          </button>
                        ) : (
                          getOrderNumber(order)
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{customer.name}</span>
                          {customer.email && (
                            <span className="text-xs text-muted-foreground">
                              {customer.email}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getItemCount(order)}</TableCell>
                      <TableCell className="font-medium">৳{Number(getTotal(order)).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Badge variant="outline" className={statusClass(status)}>
                            Order: {formatStatus(status)}
                          </Badge>
                          {order.paymentStatus && (
                            <Badge variant="outline" className={statusClass(order.paymentStatus)}>
                              Payment: {formatStatus(order.paymentStatus)}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {getOrderDate(order)}
                      </TableCell>
                      <TableCell className="text-right">
                        {order.orderNumber ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openOrderDetails(order.orderNumber)}
                            aria-label={`View order ${order.orderNumber}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {!loading && totalItems > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card">
          <p className="text-xs text-muted-foreground">
            {hasFilters ? (
              <>
                Showing{" "}
                <span className="font-bold text-foreground">{filteredOrders.length}</span> of{" "}
                <span className="font-bold text-foreground">{totalItems}</span> orders
              </>
            ) : (
              <>
                Total <span className="font-bold text-foreground">{totalItems}</span> orders
              </>
            )}
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
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <OrderDetailSheet
        isOpen={detailOpen}
        onOpenChange={setDetailOpen}
        orderNumber={detailOrderNumber}
        onUpdated={fetchOrders}
      />
    </div>
  );
}
