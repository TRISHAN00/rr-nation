"use client";

import { Badge } from "@/app/components/ui/badge";

export default function DashboardPackageCard({ pkg }) {
  // 1. Correct Progress Logic: (used / available) * 100
  // Added a fallback to ensure we don't divide by zero
  const used = pkg?.usedSlots || 0;
  const total = pkg?.availableSlots || 0;
  
  const progress = total > 0 
    ? Math.min((used / total) * 100, 100) 
    : 0;

  const remainingSlots = total - used;

  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-bold text-lg text-primary">
          {/* 2. Formatting: Ensure 'KM' is shown if not in the string */}
          {pkg.distance.toString().includes("KM") ? pkg.distance : `${pkg.distance} KM`}
        </span>

        <Badge variant="outline" className="font-semibold">
          BDT {pkg.price.toLocaleString()}
        </Badge>
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Registered</span>
          <span className="font-medium text-foreground">
            {used}/{total}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-xs text-muted-foreground text-right italic">
          {remainingSlots > 0
            ? `${remainingSlots.toLocaleString()} slots left`
            : "Fully booked"}
        </div>
      </div>
    </div>
  );
}