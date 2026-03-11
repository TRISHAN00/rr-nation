"use client";

import { Badge } from "@/app/components/ui/badge";

export default function DashboardPackageCard({ pkg }) {
  const used = pkg?.usedSlots || 0;
  const total = pkg?.availableSlots || 0;
  
  // Calculate total revenue for this specific package
  const totalSale = used * (pkg?.price || 0);
  
  const progress = total > 0 
    ? Math.min((used / total) * 100, 100) 
    : 0;

  const remainingSlots = total - used;

  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-bold text-lg text-primary">
          {pkg.distance.toString().includes("KM") ? pkg.distance : `${pkg.distance} KM`}
        </span>

        <Badge variant="outline" className="font-semibold">
          BDT {pkg.price.toLocaleString()}
        </Badge>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Registered</span>
          <span className="font-medium text-foreground">
            {used.toLocaleString()} / {total.toLocaleString()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Improved Revenue Display */}
        <div className="flex justify-between items-end pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Total Revenue
            </span>
            <h5 className="font-bold text-foreground">
              BDT {totalSale.toLocaleString()}
            </h5>
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