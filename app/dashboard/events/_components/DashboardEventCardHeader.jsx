"use client";

import { Button } from "@/app/components/ui/button";
import { CardHeader, CardTitle } from "@/app/components/ui/card";
import { CollapsibleTrigger } from "@/app/components/ui/collapsible";
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
  Trash2,
} from "lucide-react";
import DashboardEventBadges from "./DashboardEventCardBadge";


export default function DashboardEventCardHeader({
  TypeIcon,
  typeConfig,
  expandedEvent,
  event,
  handleDelete,
}) {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          {/* ✅ Badges extracted */}
          <DashboardEventBadges
            TypeIcon={TypeIcon}
            typeConfig={typeConfig}
            event={event}
          />

          <CardTitle className="font-display text-xl">
            {event.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground line-clamp-1">
            {event.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              {expandedEvent === event.id ? (
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
                onClick={() => handleDelete(event.id)}
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
