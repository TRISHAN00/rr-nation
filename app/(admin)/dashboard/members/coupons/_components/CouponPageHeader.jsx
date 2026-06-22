"use client";

import { Button } from "@/app/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import CreateCouponModal from "./CreateCouponModal";

export default function CouponPageHeader({ onCoupons, coupons, onExportCSV }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Coupons</h2>

      <div className="flex items-center gap-2">
        {coupons?.length > 0 && (
          <Button variant="outline" size="sm" onClick={onExportCSV}>
            <Download className="h-4 w-4 mr-1.5" /> Export CSV
          </Button>
        )}
        <Button onClick={() => setOpen(true)}>
          + Create Coupon
        </Button>
      </div>

      <CreateCouponModal open={open} setOpen={setOpen} onCoupons={onCoupons} />
    </div>
  );
}