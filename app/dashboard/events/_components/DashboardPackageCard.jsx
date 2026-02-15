"use client";

import { Badge } from "@/app/components/ui/badge";

export default function DashboardPackageCard({ pkg }) {
  const progress =
    pkg.availableSlots > 0 ? Math.min((100 / pkg.availableSlots) * 100, 100) : 0;

  const remainingSlots = pkg.availableSlots - 10;

  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-bold text-lg text-primary">
          {pkg.distance}
        </span>

        <Badge variant="outline" className="font-semibold">
          BDT {pkg.price}
        </Badge>
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Registered</span>
          <span className="font-medium text-foreground">
            {10}/{pkg.availableSlots}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-xs text-muted-foreground text-right">
          {remainingSlots > 0
            ? `${remainingSlots} slots left`
            : "Fully booked"}
        </div>
      </div>
    </div>
  );
}
