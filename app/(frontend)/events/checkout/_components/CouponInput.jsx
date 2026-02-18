"use client";

import { useCart } from "@/context/CartContext"; // 1. Import useCart
import { applyCoupon } from "@/services/coupon.service";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CouponInput({ setDiscount, setCouponId }) {
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchCart } = useCart(); // 2. Grab the fetch function

  const handleApply = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return toast.error("Please enter a code");

    setLoading(true);
    try {
      const response = await applyCoupon({ coupon: couponCode });

      // Debugging: Check your console to see exactly what arrives
      console.log("Full API Response:", response);

      // According to your JSON structure:
      // response.data -> { data: { discountAmount: 12, ... }, statusCode: 200 }
      const responseData = response?.data?.data;
      const amount = responseData?.discountAmount;
      const id = responseData?.discountCoupon?.id;

      if (amount !== undefined && amount !== null) {
        setDiscount(amount);
        if (setCouponId) setCouponId(id); // If you are tracking ID for checkout

        toast.success(`Coupon "${couponCode}" applied! You saved ৳${amount}`);
        // Optional: setCouponCode(""); // Clear the input on success
      } else {
        // This triggers if the request succeeds but there's no discountAmount
        toast.error("Coupon code not recognized or no discount available.");
      }
    } catch (err) {
      // This triggers for 400, 401, 404, or 500 errors
      console.error("Coupon Error:", err);
      const msg = err?.response?.data?.message || "Invalid or expired coupon";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleApply} className="flex gap-2">
      <input
        type="text"
        placeholder="Coupon code"
        value={couponCode}
        disabled={loading}
        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-[#00a19a] outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="min-w-[80px] bg-[#001819] text-white rounded-lg px-4 py-2 text-sm font-semibold"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
      </button>
    </form>
  );
}
