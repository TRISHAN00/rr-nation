"use client";

import { Badge } from "@/app/components/ui/badge";

export default function DashboardPackageCard({ pkg }) {
  const used = pkg?.usedSlots || 0;
  const total = pkg?.availableSlots || 0;

  // Correct way: keep as number
  const totalSale = pkg?.revenue || 0;

  // Format as BDT currency with 2 decimals
  const formatted = totalSale.toLocaleString("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const progress = total > 0 ? Math.min((used / total) * 100, 100) : 0;
  const remainingSlots = Math.max(total - used, 0);

  const distanceLabel = pkg?.distance?.toString()?.includes("KM")
    ? pkg.distance
    : `${pkg?.distance || 0} KM`;

  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">

      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-bold text-lg text-primary">
          {distanceLabel}
        </span>

        {/* Optional Price */}
        {pkg?.price && (
          <Badge variant="outline" className="font-semibold">
            BDT {pkg.price.toLocaleString()}
          </Badge>
        )}
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Registered</span>
          <span className="font-medium text-foreground">
            {used.toLocaleString()} / {total.toLocaleString()}
          </span>
        </div>

        {/* Progress */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              remainingSlots === 0 ? "bg-red-500" : "bg-primary"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Revenue */}
        <div className="flex justify-between items-end pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Total Revenue
            </span>
            <h5 className="font-bold text-foreground">{formatted}</h5>
          </div>

          <div className="text-xs text-muted-foreground italic">
            {remainingSlots > 0
              ? `${remainingSlots.toLocaleString()} left`
              : "Fully booked"}
          </div>
        </div>
      </div>
    </div>
  );
}