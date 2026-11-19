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
import { getAdminOrderByNumber } from "@/services/admin/admin.order.service";
import OrderStatusUpdate from "../_components/OrderStatusUpdate";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const money = (value) => Number(value || 0).toLocaleString();

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

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderNumber = decodeURIComponent(String(params.orderNumber || ""));
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderNumber) return;
    let active = true;
    getAdminOrderByNumber(orderNumber)
      .then((res) => {
        if (!active) return;
        if (res?.data) {
          setOrder(res.data);
        } else {
          setError(res?.error || "Order not found");
        }
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.response?.data?.error || "Failed to load order details.");
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [orderNumber]);

  const user = order?.user || {};
  const address = order?.shippingAddressSnapshot || {};
  const method = order?.shippingMethodSnapshot || {};
  const addressParts = [
    address.streetAddress,
    address.city?.name,
    address.district?.name,
    address.division?.name,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-muted-foreground">{orderNumber}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/shop/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>
      </div>

      {loading ? (
        <Card className="border-border bg-card">
          <CardContent className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      ) : error || !order ? (
        <Card className="border-border bg-card">
          <CardContent className="p-10 text-center text-sm text-destructive">
            {error || "Order not found"}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-border bg-card">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Order</p>
                <p className="text-lg font-bold">{order.orderNumber}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={statusClass(order.orderStatus)}>
                  Order: {formatStatus(order.orderStatus)}
                </Badge>
                <Badge variant="outline" className={statusClass(order.paymentStatus)}>
                  Payment: {formatStatus(order.paymentStatus)}
                </Badge>
                {order.couponCode && (
                  <Badge variant="outline">Coupon: {order.couponCode}</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <OrderStatusUpdate
            order={order}
            onUpdated={(updated) => setOrder((prev) => ({ ...prev, ...updated }))}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="space-y-1 p-5 text-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Customer
                </p>
                <p className="font-semibold">
                  {[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
                </p>
                <p className="text-muted-foreground">{user.email || "—"}</p>
                {user.phone && <p className="text-muted-foreground">{user.phone}</p>}
                <p className="text-muted-foreground">{user.address || "—"}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="space-y-1 p-5 text-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Shipping Address
                </p>
                <p className="font-semibold">{address.fullName || "—"}</p>
                <p className="text-muted-foreground">{address.phone}</p>
                <p className="text-muted-foreground">{address.email}</p>
                <p className="text-muted-foreground">{addressParts.join(", ")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="space-y-1 p-5 text-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Shipping Method
                </p>
                <p className="font-semibold">{method.name || "—"}</p>
                <p className="text-muted-foreground">
                  {method.estimatedDeliveryDays
                    ? `${method.estimatedDeliveryDays} days delivery`
                    : method.description || "—"}
                </p>
                {method.estimatedDeliveryTime && (
                  <p className="text-muted-foreground">
                    Estimated time: {method.estimatedDeliveryTime}
                  </p>
                )}
                <p className="text-muted-foreground">
                  Charge: ৳ {money(method.baseFee || order.shippingCharge)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Variant</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(order.items || []).map((item) => {
                    const hasPriceDiscount =
                      Number(item.unitPrice) > Number(item.unitSalePrice || item.unitPrice);

                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.productName || "Product"}
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-md border border-border object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-md border border-border bg-muted" />
                            )}
                            <span className="font-medium">{item.productName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {[item.variantName, item.size, item.color].filter(Boolean).join(" · ") || "—"}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {hasPriceDiscount && (
                              <span className="text-xs text-muted-foreground line-through">
                                ৳ {money(item.unitPrice)}
                              </span>
                            )}
                            <span>৳ {money(item.unitSalePrice || item.unitPrice)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ৳ {money(item.totalAmount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="ml-auto w-full max-w-sm space-y-2 p-5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Product price</span>
                <span>৳ {money(order.productPrice)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Product discount</span>
                <span>- ৳ {money(order.productDiscountPrice)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Coupon discount</span>
                <span>- ৳ {money(order.couponDiscount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping charge</span>
                <span>৳ {money(order.shippingCharge)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Shipping discount</span>
                <span>- ৳ {money(order.shippingDiscount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery fee</span>
                <span>৳ {money(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-base font-bold">
                <span>Total</span>
                <span>৳ {money(order.totalAmount)}</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
