"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/table";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { CouponListSkeleton } from "../../../../../(admin)/dashboard/members/coupons/_components/CouponListSkeleton";
import DeleteMemberEventDialog from "./DeleteMemberEventDialog";
import UpdateMemberEventModal from "./UpdateMemberEventModal";

export default function MemberEventTableBody({
  events,
  loading,
  onRefresh
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
          events?.map((item) => (
            <TableRow key={item.id}>
              {/* 1. ID */}
              <TableCell className="font-mono text-xs">#{item.id}</TableCell>

              {/* 2. Event Name */}
              <TableCell className="font-semibold text-gray-900 dark:text-white">
                {item.eventName}
              </TableCell>

              {/* 3. Running Category */}
              <TableCell className="font-medium text-center">
                <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded text-xs">
                  {item.runningCategory}
                </span>
              </TableCell>

              {/* 4. Registration & Discount Verification Pricing */}
              <TableCell className="text-xs space-y-0.5">
                <div className="text-gray-400 line-through">৳{item?.member?.orginalAmount}</div>
                <div className="font-bold text-emerald-600">৳{item?.member?.afterDiscountAmount}</div>
              </TableCell>

              {/* 5. Registration Identifier / Member Info */}
              <TableCell className="text-xs">
                <div className="font-semibold text-gray-800 dark:text-gray-200">
                  {item?.member?.registrationNumber || "N/A"}
                </div>
                <div className="text-gray-400 truncate max-w-[140px]">
                  {item?.member?.user?.email}
                </div>
              </TableCell>

              {/* 6. Payment Processing Gateway State */}
              <TableCell className="text-xs font-mono capitalize">
                <div>{item?.member?.paymentGateway}</div>
                <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                  {item?.member?.transactionId}
                </div>
              </TableCell>

              {/* 7. Run Logs Verification Status */}
              <TableCell>
                <Badge variant={item.isCompleted ? "default" : "secondary"}>
                  {item.isCompleted ? "Completed" : "Pending"}
                </Badge>
              </TableCell>

              {/* 8. Event Date */}
              <TableCell className="text-xs">
                {new Date(item.eventDate).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </TableCell>

              {/* 9. Approval Visibility Badges */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge
                    className="w-fit text-[10px] uppercase font-bold tracking-wider"
                    variant={item?.member?.adminApproval === "approved" ? "default" : "destructive"}
                  >
                    {item?.member?.adminApproval || "Pending"}
                  </Badge>
                  {item.isArchived && (
                    <Badge className="w-fit text-[10px]" variant="destructive">Archived</Badge>
                  )}
                </div>
              </TableCell>

              {/* 10. Actions Grid Column Layout */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {/* Edit Row Option */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  {/* Delete Row Option */}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

      {/* Update Member Event Modal */}
      <UpdateMemberEventModal
        open={editOpen}
        setOpen={setEditOpen}
        event={selectedEvent}
        onRefresh={onRefresh}
        eventId={selectedEvent?.id}
      />

      {/* Delete Member Event Dialog */}
      <DeleteMemberEventDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        eventId={selectedEvent?.id}
        onSuccess={onRefresh}
      />

    </>
  );
}