"use client";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/components/ui/button";
import { applyMemberCoupon } from "@/services/member.service";
import { useState } from "react";

export default function ApplyCouponMember({ onApply, onSetCoupon }) {
    const [coupon, setCoupon] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleApply = async () => {
        try {
            setLoading(true);
            setMessage("");
            setStatus("");

            const res = await applyMemberCoupon(coupon.trim());

            if (res?.statusCode === 200) {
                const discount = res?.data?.discountAmount || 0;
                const couponData = res?.data?.discountCoupon;

                onApply(discount);
                onSetCoupon(couponData);

                setMessage(`Coupon applied! Saved ৳${discount} 🎉`);
                setStatus("success");
            } else {
                setMessage(res?.message || "Invalid coupon ❌");
                setStatus("error");
                onApply(0);
                onSetCoupon(null);
            }

        } catch (error) {
            setMessage(error?.response?.data?.message || "Something went wrong ❌");
            setStatus("error");
            onApply(0);
            onSetCoupon(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2 p-3 border rounded-lg bg-white">

            <label className="text-sm font-semibold text-gray-700">
                Apply Coupon
            </label>

            <div className="flex gap-2 mt-2">
                <Input
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    disabled={loading}
                />

                <Button
                    variant="outline"
                    size="sm"
                    disabled={!coupon.trim() || loading}
                    onClick={handleApply}
                >
                    {loading ? "Checking..." : "Apply"}
                </Button>
            </div>

            {message && (
                <div
                    className={`text-xs px-2 py-1 rounded-md ${
                        status === "success"
                            ? "text-green-600 bg-green-50 border border-green-200"
                            : "text-red-600 bg-red-50 border border-red-200"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}