"use client";

import { CollapsibleContent } from "@/app/components/ui/collapsible";
import { Package } from "lucide-react";
import DashboardPackageCard from "./DashboardPackageCard";

export default function DashboardPackageContent({ event }) {
  if (!event.packages?.length) return null;

  return (
    <CollapsibleContent className="mt-4">
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          Registration Packages
        </h4>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {event.packages.map((pkg) => (
            <DashboardPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </CollapsibleContent>
  );
}
