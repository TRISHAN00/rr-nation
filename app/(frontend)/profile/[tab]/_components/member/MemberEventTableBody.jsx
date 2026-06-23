"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { CouponListSkeleton } from "../../../../../(admin)/dashboard/members/coupons/_components/CouponListSkeleton";
import DeleteMemberEventDialog from "./DeleteMemberEventDialog";
import UpdateMemberEventModal from "./UpdateMemberEventModal";

export default function MemberEventTableBody({
  events,
  loading,
  onRefresh,
  page = 1,
  limit = 10,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEditOpen(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setDeleteOpen(true);
  };

  return (
    <TooltipProvider>
    <>
    <TableBody>
      {loading ? (
        <CouponListSkeleton rows={6} />
      ) : events?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} className="text-center py-8 text-muted-foreground">
            No marathon records found.
          </TableCell>
        </TableRow>
      ) : (
        events?.map((item, idx) => (
          <TableRow key={item.id}>
            <TableCell className="text-xs text-muted-foreground text-center">{(page - 1) * limit + idx + 1}</TableCell>

            <TableCell className="font-semibold text-gray-900 dark:text-white max-w-[200px] truncate">
              <Tooltip>
                <TooltipTrigger asChild><span className="cursor-default">{item.eventName}</span></TooltipTrigger>
                <TooltipContent side="top" className="text-xs">{item.eventName}</TooltipContent>
              </Tooltip>
            </TableCell>

            <TableCell className="text-xs whitespace-nowrap">
              {item.eventDate
                ? new Date(item.eventDate).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </TableCell>

            <TableCell className="text-xs">
              <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded">
                {item.runningCategory || "—"}
              </span>
            </TableCell>

            <TableCell className="text-xs max-w-[120px] truncate">
              <Tooltip>
                <TooltipTrigger asChild><span className="cursor-default">{item.organizerName || "—"}</span></TooltipTrigger>
                {item.organizerName && <TooltipContent side="top" className="text-xs">{item.organizerName}</TooltipContent>}
              </Tooltip>
            </TableCell>

            <TableCell className="text-xs font-medium">
              {item.registrationFee ? `৳${item.registrationFee}` : "—"}
            </TableCell>

            <TableCell className="text-xs max-w-[120px] truncate">
              <Tooltip>
                <TooltipTrigger asChild><span className="cursor-default">{item.eventVenue || "—"}</span></TooltipTrigger>
                {item.eventVenue && <TooltipContent side="top" className="text-xs">{item.eventVenue}</TooltipContent>}
              </Tooltip>
            </TableCell>

            <TableCell className="text-xs">
              <Badge variant="outline" className="uppercase text-[10px]">
                {item.eventType || "—"}
              </Badge>
            </TableCell>

            <TableCell>
              <Badge variant={item.isCompleted ? "default" : "secondary"} className="text-[10px]">
                {item.isCompleted ? "Completed" : "Pending"}
              </Badge>
            </TableCell>

            <TableCell className="text-xs max-w-[150px] truncate">
              {item.stravaLink ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={item.stravaLink} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1 cursor-default">
                      View <ExternalLink className="h-3 w-3" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs break-all max-w-[250px]">{item.stravaLink}</TooltipContent>
                </Tooltip>
              ) : "—"}
            </TableCell>

            <TableCell className="text-xs max-w-[150px] truncate">
              {item.eventLink ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={item.eventLink} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1 cursor-default">
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs break-all max-w-[250px]">{item.eventLink}</TooltipContent>
                </Tooltip>
              ) : "—"}
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteClick(item)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>

    <UpdateMemberEventModal
      open={editOpen}
      setOpen={setEditOpen}
      event={selectedEvent}
      onRefresh={onRefresh}
      eventId={selectedEvent?.id}
    />
    <DeleteMemberEventDialog
      open={deleteOpen}
      setOpen={setDeleteOpen}
      eventId={selectedEvent?.id}
      onSuccess={onRefresh}
    />
    </>
    </TooltipProvider>
  );
}
