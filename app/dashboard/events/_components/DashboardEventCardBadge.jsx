"use client";

import { Badge } from "@/app/components/ui/badge";
import { Package, Shirt } from "lucide-react";

export default function DashboardEventBadges({ TypeIcon, typeConfig, event }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Event Type Badge */}
      <Badge variant="outline">
        <TypeIcon className="h-3 w-3 mr-1" />
        {typeConfig.label}
      </Badge>

      {/* Package Badge */}
      <Badge variant="outline" className="gap-1">
        <Package className="h-3 w-3" />
        50 packages
      </Badge>

      {/* T-Shirt Badge */}
      {event.tshirtSettings?.enabled && (
        <Badge
          variant="outline"
          className={`gap-1 ${
            event.tshirtSettings.required
              ? "bg-primary/10 text-primary border-primary/20"
              : ""
          }`}
        >
          <Shirt className="h-3 w-3" />
          T-Shirt{" "}
          {event.tshirtSettings.required ? "(Required)" : "(Optional)"}
        </Badge>
      )}
    </div>
  );
}
