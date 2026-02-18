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
import Link from "next/link";
import { useState } from "react";
import DashboardEventBadges from "./DashboardEventCardBadge";

export default function DashboardEventCardHeader({
  TypeIcon,
  typeConfig,
  expandedEvent,
  event,
  onDelete,
  loading,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <DashboardEventBadges
            TypeIcon={TypeIcon}
            typeConfig={typeConfig}
            event={event}
          />
          <CardTitle className="font-display text-xl">{event.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {event.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              {expandedEvent === event.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {expandedEvent === event.id ? "Hide Packages" : "View Packages"}
            </Button>
          </CollapsibleTrigger>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${event?.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/edit/${event.id}`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive"
                onSelect={() => setShowDeleteModal(true)} // Open modal on select
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Confirmation Modal */}
      {/* <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDelete}
        title={`Delete ${event.name}?`}
        description="This will permanently remove the event and all associated ticket packages. This action cannot be undone."
        loading={loading}
      /> */}
    </CardHeader>
  );
}
