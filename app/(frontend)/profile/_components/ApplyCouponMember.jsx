"use client"
import { Input } from "@/app/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ApplyCouponMember() {
    const [coupon, setCoupon] = useState("");

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Apply Coupon</label>
            <div className="flex gap-2 mt-2">
                <Input
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <Button variant="outline" size="sm" disabled={!coupon}>
                    Apply
                </Button>
            </div>
        </div>
    )
}
