"use client"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateEventCouponModal from "./CreateEventCouponModal";

export default function CouponEventPageHeader({ onCoupons, eventId }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Coupons</h2>

            <Button className={` flex gap-x-1`} onClick={() => setOpen(true)}>
                <Plus />
                Create Coupon
            </Button>

            <CreateEventCouponModal open={open} setOpen={setOpen} onCoupons={onCoupons} eventId={eventId} />
        </div>
    )
}
