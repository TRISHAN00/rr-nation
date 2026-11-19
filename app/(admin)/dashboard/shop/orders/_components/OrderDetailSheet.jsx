"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { getAdminOrderByNumber } from "@/services/admin/admin.order.service";
import OrderStatusUpdate from "./OrderStatusUpdate";
import { ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

function SectionTitle({ children }) {
  return (
    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
      {children}
    </h4>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value, tone = "default", strong = false }) {
  const toneClass =
    tone === "discount"
      ? "text-emerald-600"
      : tone === "muted"
        ? "text-muted-foreground"
        : "text-foreground";

  return (
    <div className={`flex justify-between ${strong ? "text-base font-bold" : "text-sm"}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className={toneClass}>{value}</span>
    </div>
  );
}

export default function OrderDetailSheet({ isOpen, onOpenChange, orderNumber, onUpdated }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !orderNumber) return;
    let active = true;

    setLoading(true);
    setError("");
    setOrder(null);

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
  }, [isOpen, orderNumber]);

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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-full bg-card border-l border-border p-0 flex flex-col h-full shadow-2xl">
        <div className="border-b border-border px-6 py-5">
          <SheetHeader>
            <SheetTitle className="text-xl font-extrabold tracking-tight">
              Order Details
            </SheetTitle>
            <SheetDescription className="break-all">{orderNumber}</SheetDescription>
          </SheetHeader>
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error || !order ? (
          <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-destructive">
            {error || "Order not found"}
          </div>
        ) : (
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={statusClass(order.orderStatus)}>
                Order: {formatStatus(order.orderStatus)}
              </Badge>
              <Badge variant="outline" className={statusClass(order.paymentStatus)}>
                Payment: {formatStatus(order.paymentStatus)}
              </Badge>
              {order.couponCode && <Badge variant="outline">Coupon: {order.couponCode}</Badge>}
            </div>

            <OrderStatusUpdate
              order={order}
              onUpdated={(updated) => {
                setOrder((prev) => ({ ...prev, ...updated }));
                onUpdated?.(updated);
              }}
            />

            <section className="space-y-3">
              <SectionTitle>Customer &amp; Delivery</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Customer">
                  <p className="font-semibold">
                    {[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
                  </p>
                  <p className="text-muted-foreground">{user.email || "—"}</p>
                  {user.phone && <p className="text-muted-foreground">{user.phone}</p>}
                  <p className="text-muted-foreground">{user.address || "—"}</p>
                </InfoCard>

                <InfoCard title="Shipping Address">
                  <p className="font-semibold">{address.fullName || "—"}</p>
                  <p className="text-muted-foreground">{address.phone || "—"}</p>
                  <p className="text-muted-foreground">{address.email || "—"}</p>
                  <p className="text-muted-foreground">{addressParts.join(", ") || "—"}</p>
                </InfoCard>

                <InfoCard title="Shipping Method">
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
                </InfoCard>

                <InfoCard title="Order Reference">
                  <p className="font-semibold break-all">{order.orderNumber}</p>
                  <p className="text-muted-foreground">Order ID: {order.id}</p>
                  {order.couponCode && (
                    <p className="text-muted-foreground">Coupon: {order.couponCode}</p>
                  )}
                </InfoCard>
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle>Items</SectionTitle>
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(order.items || []).map((item) => {
                      const hasPriceDiscount =
                        Number(item.unitPrice) >
                        Number(item.unitSalePrice || item.unitPrice);

                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.productName || "Product"}
                                  width={44}
                                  height={44}
                                  className="h-11 w-11 rounded-md border border-border object-cover"
                                />
                              ) : (
                                <div className="h-11 w-11 rounded-md border border-border bg-muted" />
                              )}
                              <div className="min-w-0">
                                <p className="truncate font-medium">{item.productName}</p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {[item.variantName, item.size, item.color]
                                    .filter(Boolean)
                                    .join(" · ") || "Standard"}
                                </p>
                              </div>
                            </div>
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
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle>Payment Summary</SectionTitle>
              <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
                <SummaryRow label="Product price" value={`৳ ${money(order.productPrice)}`} />
                <SummaryRow
                  label="Product discount"
                  value={`- ৳ ${money(order.productDiscountPrice)}`}
                  tone="discount"
                />
                <SummaryRow
                  label="Coupon discount"
                  value={`- ৳ ${money(order.couponDiscount)}`}
                  tone="discount"
                />
                <Separator />
                <SummaryRow
                  label="Shipping charge"
                  value={`৳ ${money(order.shippingCharge)}`}
                />
                <SummaryRow
                  label="Shipping discount"
                  value={`- ৳ ${money(order.shippingDiscount)}`}
                  tone="discount"
                />
                <SummaryRow label="Delivery fee" value={`৳ ${money(order.deliveryFee)}`} />
                <Separator />
                <SummaryRow
                  label="Total"
                  value={`৳ ${money(order.totalAmount)}`}
                  strong
                />
              </div>
            </section>

            <Button asChild variant="outline" className="w-full">
              <Link href={`/dashboard/shop/orders/${encodeURIComponent(order.orderNumber)}`}>
                Open full page <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
