"use client";

import { processCheckout } from "@/services/cart.service"; // Adjust path
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import CouponInput from "./CouponInput";

export default function CheckoutSidebar({ cartData, discount, agree, setAgree, setDiscount, couponId, setCouponId }) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const subtotal = Number(cartData?.totalAmount || 0);
  const discountAmount = Number(discount || 0);
  const finalTotal = subtotal - discountAmount;

  const handleCheckout = async () => {
    if (!agree) return toast.error("Please agree to the terms and conditions");

    try {
      setIsRedirecting(true);
      
      const payload = {
        discountCouponId: couponId ? String(couponId) : null, // Captured from CouponInput
        paymentGateway: "sslcommerz"
      };

      const response = await processCheckout(payload);
      
      // Get the redirect URL from your JSON path: data.gateway.GatewayPageURL
      const paymentUrl = response?.data?.data?.gateway?.GatewayPageURL;

      if (paymentUrl) {
        toast.success("Redirecting to payment gateway...");
        window.location.replace(paymentUrl); // Redirects to SSLCommerz
      } else {
        throw new Error("Payment URL not found");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Checkout failed. Please try again.");
      setIsRedirecting(false);
    }
  };

  return (
    <div className="w-full lg:w-[380px] shrink-0">
      <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-md space-y-5">
        <h2 className="text-xl font-bold text-[#001819] border-b pb-3">Order Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">৳ {subtotal.toLocaleString()}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm animate-in fade-in duration-300">
              <span className="text-gray-600">Discount Applied</span>
              <span className="font-bold text-red-500">- ৳ {discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-[#00a19a] text-xl pt-2 border-t">
            <span>Total</span>
            <span>৳ {finalTotal.toLocaleString()}</span>
          </div>
        </div>

        <CouponInput setDiscount={setDiscount} setCouponId={setCouponId} />

        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              disabled={isRedirecting}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00a19a]"
            />
            <span className="text-xs text-gray-600 leading-tight">
              I have read and agree to the website{" "}
              <Link href="/privacy-policy" className="text-[#00a19a] font-bold underline">terms and conditions</Link>.
            </span>
          </label>
        </div>

        <button
          onClick={handleCheckout}
          disabled={cartData?.items?.length === 0 || !agree || isRedirecting}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center transition-all ${
            cartData?.items?.length === 0 || !agree || isRedirecting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#00a19a] hover:bg-[#008c86] active:scale-[0.98]"
          }`}
        >
          {isRedirecting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Confirm & Pay ৳ ${finalTotal.toLocaleString()}`
          )}
        </button>
      </div>
    </div>
  );
}