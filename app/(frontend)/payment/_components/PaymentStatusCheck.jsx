"use client";

import { useCart } from "@/context/CartContext";
import { checkPaymentStatus } from "@/services/checkout.service";
import { CheckCircle2, Clock3, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const label = (value) =>
  String(value || "—")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function PaymentStatusCheck() {
  const { fetchCart } = useCart();
  const [state, setState] = useState({ loading: true, data: null, error: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let stored = {};
    try {
      stored = JSON.parse(sessionStorage.getItem("lastShopOrder") || "{}");
    } catch {
      stored = {};
    }

    const orderNumber =
      params.get("orderNumber") ||
      params.get("order_number") ||
      stored.orderNumber ||
      "";
    const valId = params.get("valId") || params.get("val_id") || stored.valId || "";

    if (!orderNumber || !valId) {
      setState({ loading: false, data: null, error: "" });
      return;
    }

    let active = true;
    checkPaymentStatus({ orderNumber, valId })
      .then((res) => {
        if (!active) return;
        setState({ loading: false, data: res?.data || null, error: "" });
        sessionStorage.removeItem("lastShopOrder");
        fetchCart?.();
      })
      .catch((err) => {
        if (!active) return;
        setState({
          loading: false,
          data: null,
          error:
            Array.isArray(err?.response?.data?.message)
              ? err.response.data.message.join(", ")
              : err?.response?.data?.message || "Could not verify payment automatically.",
        });
      });

    return () => {
      active = false;
    };
  }, [fetchCart]);

  if (state.loading) {
    return (
      <div className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Verifying payment status...
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
        {state.error}
      </div>
    );
  }

  if (!state.data) return null;

  const paymentStatus = String(state.data.paymentStatus || "").toUpperCase();
  const orderStatus = String(state.data.orderStatus || "").toUpperCase();
  const paid = paymentStatus === "PAID";
  const failed = paymentStatus === "FAILED";
  const paymentCancelled = paymentStatus === "CANCELLED";
  const orderCancelled = orderStatus === "CANCELLED";
  const problem = failed || paymentCancelled || orderCancelled;
  const tone = paid
    ? "border-green-200 bg-green-50 text-green-700"
    : problem
      ? "border-red-200 bg-red-50 text-red-600"
      : "border-amber-200 bg-amber-50 text-amber-700";
  const title = paid
    ? "Payment confirmed"
    : paymentCancelled
      ? "Payment cancelled"
      : failed
        ? "Payment failed"
        : orderCancelled
          ? "Order cancelled"
          : "Payment not completed yet";

  return (
    <div className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-left ${tone}`}>
      {paid ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
      ) : problem ? (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
      ) : (
        <Clock3 className="mt-0.5 h-5 w-5 shrink-0" />
      )}
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs">
          Order {state.data.orderNumber} · Order: {label(state.data.orderStatus)} · Payment: {label(state.data.paymentStatus)}
        </p>
      </div>
    </div>
  );
}
