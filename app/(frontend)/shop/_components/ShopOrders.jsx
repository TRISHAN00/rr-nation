"use client";

import { cancelOrder, getUserOrders } from "@/services/checkout.service";
import { Loader2, MapPin, Package, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const money = (value) => Number(value || 0).toLocaleString();

const formatStatus = (value) =>
  String(value || "—")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const canCancelOrder = (order) => {
  const status = String(order?.orderStatus || "").toUpperCase();
  return status !== "CANCELLED" && status !== "COMPLETED" && status !== "DELIVERED";
};

const StatusBadge = ({ label, value }) => {
  const status = String(value || "").toUpperCase();
  const isSuccess = status === "PAID" || status === "COMPLETED" || status === "DELIVERED";
  const isProblem = ["CANCELLED", "FAILED", "REFUNDED"].includes(status);
  const tone = isSuccess
    ? "bg-green-100 text-green-700"
    : isProblem
      ? "bg-red-100 text-red-600"
      : "bg-amber-100 text-amber-700";
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${tone}`}>
      {label ? `${label}: ` : ""}
      {formatStatus(value)}
    </span>
  );
};

export default function ShopOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingOrder, setCancellingOrder] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await getUserOrders();
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.orders)
            ? res.data.orders
            : [];
        if (active) setOrders(list);
      } catch (err) {
        if (active) {
          setError(
            Array.isArray(err?.response?.data?.message)
              ? err.response.data.message.join(", ")
              : err?.response?.data?.message || "Failed to load your orders.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleCancel = async (order) => {
    if (!order.orderNumber) return;
    if (!window.confirm(`Cancel order ${order.orderNumber}?`)) return;
    try {
      setCancellingOrder(order.orderNumber);
      const res = await cancelOrder(order.orderNumber);
      setOrders((current) =>
        current.map((item) =>
          item.orderNumber === order.orderNumber
            ? {
                ...item,
                orderStatus: res?.data?.orderStatus || "CANCELLED",
                paymentStatus: res?.data?.paymentStatus || "CANCELLED",
              }
            : item,
        ),
      );
      toast.success("Order cancelled");
    } catch (err) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err.response.data.message.join(", ")
          : err?.response?.data?.message || "Failed to cancel order.",
      );
    } finally {
      setCancellingOrder("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#00a19a]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center">
        <ShoppingBag className="mx-auto mb-4 text-gray-300" size={48} />
        <p className="text-lg font-semibold text-[#001819]">No orders yet</p>
        <p className="mt-1 text-sm text-gray-500">Orders you place in the shop will appear here.</p>
        <Link
          href="/shop"
          className="mt-5 inline-block rounded-xl bg-[#00a19a] px-6 py-3 text-sm font-bold text-white hover:bg-[#008c86]"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => {
        const address = order.shippingAddressSnapshot || {};
        const method = order.shippingMethodSnapshot || {};
        const addressParts = [
          address.streetAddress,
          address.city?.name,
          address.district?.name,
          address.division?.name,
        ].filter(Boolean);

        return (
          <article
            key={order.id}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Order</p>
                <h2 className="text-lg font-bold text-[#001819]">
                  {order.orderNumber || `#${order.id}`}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge label="Order" value={order.orderStatus} />
                  <StatusBadge label="Payment" value={order.paymentStatus} />
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <Link
                    href={`/shop/orders/${encodeURIComponent(order.orderNumber || "")}`}
                    className="text-[#00a19a] hover:underline"
                  >
                    View details
                  </Link>
                  {canCancelOrder(order) && (
                    <button
                      type="button"
                      onClick={() => handleCancel(order)}
                      disabled={cancellingOrder === order.orderNumber}
                      className="text-red-500 hover:underline disabled:opacity-50"
                    >
                      {cancellingOrder === order.orderNumber ? "Cancelling..." : "Cancel order"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <MapPin className="h-4 w-4" /> Shipping Address
                  </p>
                  <p className="text-sm font-semibold text-[#001819]">{address.fullName}</p>
                  <p className="text-sm text-gray-600">{address.phone} · {address.email}</p>
                  <p className="text-sm text-gray-600">{addressParts.join(", ")}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <Truck className="h-4 w-4" /> Shipping Method
                  </p>
                  <p className="text-sm font-semibold text-[#001819]">{method.name || "—"}</p>
                  <p className="text-xs text-gray-500">
                    {method.estimatedDeliveryDays
                      ? `${method.estimatedDeliveryDays} days delivery`
                      : method.description || ""}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <Package className="h-4 w-4" /> Items
                </p>
                <div className="space-y-3">
                  {(order.items || []).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="h-14 w-14 rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-gray-100 text-gray-400">
                          <ShoppingBag size={20} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#001819]">
                          {item.productName}
                        </p>
                        {(item.variantName || item.size || item.color) && (
                          <p className="text-xs text-gray-500">
                            {[item.variantName, item.size, item.color].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          ৳ {money(item.unitSalePrice || item.unitPrice)} × {item.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-[#001819]">
                        ৳ {money(item.totalAmount)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t pt-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Product price</span>
                    <span>৳ {money(order.productPrice)}</span>
                  </div>
                  {Number(order.productDiscountPrice) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Product discount</span>
                      <span>- ৳ {money(order.productDiscountPrice)}</span>
                    </div>
                  )}
                  {Number(order.couponDiscount) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon {order.couponCode ? `(${order.couponCode})` : ""}</span>
                      <span>- ৳ {money(order.couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping charge</span>
                    <span>৳ {money(order.shippingCharge)}</span>
                  </div>
                  {Number(order.shippingDiscount) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Shipping discount</span>
                      <span>- ৳ {money(order.shippingDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery fee</span>
                    <span>৳ {money(order.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-base font-bold text-[#00a19a]">
                    <span>Total</span>
                    <span>৳ {money(order.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
