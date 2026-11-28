"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import { cancelOrder, getOrderByNumber, initiateOrderPayment } from "@/services/checkout.service";
import { ArrowLeft, CreditCard, Loader2, MapPin, Package, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const money = (value) => Number(value || 0).toLocaleString();

const formatStatus = (value) =>
  String(value || "—")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

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

export default function ShopOrderDetailPage() {
  const params = useParams();
  const orderNumber = decodeURIComponent(String(params.orderNumber || ""));
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!orderNumber) return;
    let active = true;
    getOrderByNumber(orderNumber)
      .then((res) => active && setOrder(res?.data || null))
      .catch((err) => {
        if (!active) return;
        setError(
          Array.isArray(err?.response?.data?.message)
            ? err.response.data.message.join(", ")
            : err?.response?.data?.message || "Failed to load order details.",
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [orderNumber]);

  const handleCancel = async () => {
    if (!window.confirm(`Cancel order ${orderNumber}?`)) return;
    try {
      setCancelling(true);
      const res = await cancelOrder(orderNumber);
      setOrder((current) => ({
        ...(current || {}),
        orderNumber,
        orderStatus: res?.data?.orderStatus || "CANCELLED",
        paymentStatus: res?.data?.paymentStatus || "CANCELLED",
      }));
      toast.success("Order cancelled");
    } catch (err) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err.response.data.message.join(", ")
          : err?.response?.data?.message || "Failed to cancel order.",
      );
    } finally {
      setCancelling(false);
    }
  };

  const handlePayNow = async () => {
    try {
      setPaying(true);
      const res = await initiateOrderPayment(orderNumber);
      const paymentUrl = res?.data?.paymentUrl || res?.data?.payment_url;
      if (paymentUrl) {
        sessionStorage.setItem(
          "lastShopOrder",
          JSON.stringify({ orderNumber, valId: "" }),
        );
        window.location.replace(paymentUrl);
        return;
      }
      toast.error("Payment URL not found. Please try again.");
    } catch (err) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err.response.data.message.join(", ")
          : err?.response?.data?.message || "Failed to initiate payment.",
      );
    } finally {
      setPaying(false);
    }
  };

  const address = order?.shippingAddressSnapshot || {};
  const method = order?.shippingMethodSnapshot || {};
  const addressParts = [
    address.streetAddress,
    address.city?.name,
    address.district?.name,
    address.division?.name,
  ].filter(Boolean);
  const status = String(order?.orderStatus || "").toUpperCase();
  const paymentStatus = String(order?.paymentStatus || "").toUpperCase();
  const canCancel =
    status !== "CANCELLED" && status !== "COMPLETED" && status !== "DELIVERED";
  const canPay = paymentStatus !== "PAID" && status !== "CANCELLED";

  return (
    <>
      <InnerBanner
        title="Order Details"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "My Orders", href: "/shop/orders" },
          { label: orderNumber },
        ]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <Link
            href="/shop/orders"
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#00a19a] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to My Orders
          </Link>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border bg-white">
              <Loader2 className="h-8 w-8 animate-spin text-[#00a19a]" />
            </div>
          ) : error ? (
            <div className="rounded-2xl border bg-white p-10 text-center text-red-500">
              {error}
            </div>
          ) : !order ? (
            <div className="rounded-2xl border bg-white p-10 text-center">
              <p className="text-lg font-semibold text-[#001819]">Order not found</p>
            </div>
          ) : (
            <article className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-gray-50 px-5 py-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Order</p>
                  <h1 className="text-xl font-bold text-[#001819]">
                    {order.orderNumber || orderNumber}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge label="Order" value={order.orderStatus} />
                  <StatusBadge label="Payment" value={order.paymentStatus} />
                  {canPay && (
                    <button
                      type="button"
                      onClick={handlePayNow}
                      disabled={paying}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#00a19a] px-4 py-2 text-xs font-bold text-white hover:bg-[#008c86] disabled:opacity-50"
                    >
                      {paying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CreditCard className="h-3.5 w-3.5" />}
                      {paying ? "Redirecting..." : "Checkout"}
                    </button>
                  )}
                  {canCancel && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="rounded-lg border border-red-200 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                      {cancelling ? "Cancelling..." : "Cancel order"}
                    </button>
                  )}
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
          )}
        </div>
      </div>
    </>
  );
}
