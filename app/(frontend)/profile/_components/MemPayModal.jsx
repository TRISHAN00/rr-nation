"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createMemberPayment, getMemRegFee } from "@/services/member.service";
import { useEffect, useState } from "react";
import ApplyCouponMember from "./ApplyCouponMember";

export default function MemPayModal({ open, setOpen, memberId }) {
    const [fee, setFee] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [couponData, setCouponData] = useState(null);

    const [loading, setLoading] = useState(false);
    const [payLoading, setPayLoading] = useState(false);

    const total = Math.max(fee - discount, 0);

    // ---------------- FETCH FEE ----------------
    const fetchFee = async () => {
        try {
            setLoading(true);
            const res = await getMemRegFee();
            setFee(res?.data?.fee || 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchFee();
            setDiscount(0);
            setCouponData(null);
        }
    }, [open]);

    // ---------------- PAYMENT ----------------
    const handlePayment = async () => {
        try {
            setPayLoading(true);

            const payload = {
                discountCouponId: couponData?.id || null,
                paymentGateway: "sslcommerz",
            };

            const res = await createMemberPayment(payload);

            if (res?.statusCode === 200) {
                const gatewayUrl =
                    res?.data?.gateway?.GatewayPageURL ||
                    res?.data?.gateway?.redirectGatewayURL;

                const transactionId = res?.data?.gateway?.tran_id;

                if (!gatewayUrl) {
                    alert("Payment URL not found");
                    return;
                }

                // optional: store for tracking
                localStorage.setItem("transactionId", transactionId);

                // 🔥 REDIRECT TO SSL COMMERZ
                window.location.href = gatewayUrl;
            } else {
                alert(res?.message || "Payment failed");
            }

        } catch (error) {
            console.error(error);
            alert("Payment error occurred");
        } finally {
            setPayLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">

                <DialogHeader>
                    <DialogTitle>Complete Your Payment</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    {/* Fee */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Registration Fee</span>
                        <span className="font-semibold">
                            {loading ? "Loading..." : `৳${fee}`}
                        </span>
                    </div>

                    {/* Coupon */}
                    <ApplyCouponMember
                        onApply={setDiscount}
                        onSetCoupon={setCouponData}
                    />

                    {/* Applied Coupon */}
                    {couponData && (
                        <div className="flex justify-between text-xs bg-green-50 border border-green-200 p-2 rounded">
                            <span className="text-green-700">
                                Applied: <b>{couponData.code}</b>
                            </span>

                            <button
                                className="text-red-500"
                                onClick={() => {
                                    setDiscount(0);
                                    setCouponData(null);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    )}

                    {/* Total */}
                    <div className="border-t pt-3 space-y-1">
                        {discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount</span>
                                <span>-৳{discount}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-base font-semibold">
                            <span>Total</span>
                            <span>৳{loading ? "..." : total}</span>
                        </div>
                    </div>

                    {/* Pay */}
                    <Button
                        className="w-full"
                        disabled={loading || payLoading}
                        onClick={handlePayment}
                    >
                        {payLoading ? "Redirecting..." : "Pay Now"}
                    </Button>

                </div>

            </DialogContent>
        </Dialog>
    );
}