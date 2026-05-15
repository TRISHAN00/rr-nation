"use client";

import { formatCurrency } from "@/lib/formatCurrency";
import { Users, Wallet } from "lucide-react";

export default function DashboardEventCardTotalReg({ event }) {
  return (
    <div className="flex items-center gap-8 ml-auto">
      {/* Registrations */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
          <Users className="h-4 w-4 text-primary" />
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-xs text-muted-foreground">Registrations</span>
          <span className="text-lg font-semibold text-foreground">
            {event?.registrationCount || 0}
          </span>
        </div>
      </div>

      {/* Revenue */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10">
          <Wallet className="h-4 w-4 text-emerald-600" />
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-xs text-muted-foreground">Revenue</span>
          <span className="text-lg font-semibold text-foreground">
            {formatCurrency(event?.totalRevenue)}
          </span>
        </div>
      </div>
    </div>
  );
}
