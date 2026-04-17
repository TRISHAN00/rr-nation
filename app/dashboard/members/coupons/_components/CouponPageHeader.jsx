"use client";

import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import CreateCouponModal from "./CreateCouponModal";

export default function CouponPageHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Coupons</h2>

      <Button onClick={() => setOpen(true)}>
        + Create Coupon
      </Button>

      <CreateCouponModal open={open} setOpen={setOpen} />
    </div>
  );
}