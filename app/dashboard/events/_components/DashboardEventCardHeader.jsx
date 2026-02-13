import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { CardHeader, CardTitle } from "@/app/components/ui/card";
import {
    CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import {
    ChevronDown,
    ChevronUp,
    Edit,
    Eye,
    MoreHorizontal,
    Package,
    Shirt,
    Trash2,
} from "lucide-react";


import { CalendarClock, Monitor, Radio, Trophy } from "lucide-react";

export const eventTypes = {
  live: {
    label: "Live",
    icon: Radio,
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  virtual: {
    label: "Virtual",
    icon: Monitor,
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  upcoming: {
    label: "Upcoming",
    icon: CalendarClock,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  successful: {
    label: "Successful",
    icon: Trophy,
    className: "bg-success/10 text-success border-success/20",
  },
};


export default function DashboardEventCardHeader({
  event,
  expanded,
  onDelete,
}) {
  const typeConfig = eventTypes[event.type];
  const TypeIcon = typeConfig.icon;

  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}
        <div className="flex-1 space-y-2">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`gap-1 ${typeConfig.className}`}
            >
              <TypeIcon className="h-3 w-3" />
              {typeConfig.label}
            </Badge>

            <Badge variant="outline" className="gap-1">
              <Package className="h-3 w-3" />
              {event.packages.length} packages
            </Badge>

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
                {event.tshirtSettings.required
                  ? "(Required)"
                  : "(Optional)"}
              </Badge>
            )}
          </div>

          {/* Title */}
          <CardTitle className="font-display text-xl">
            {event.title}
          </CardTitle>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-1">
            {event.description}
          </p>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Hide Packages
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  View Packages
                </>
              )}
            </Button>
          </CollapsibleTrigger>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(event.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardHeader>
  );
}
