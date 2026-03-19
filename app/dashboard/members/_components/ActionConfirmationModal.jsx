"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, CheckCircle2, User } from "lucide-react";

export default function ActionConfirmationModal({
  isOpen = false,
  type = "approve", // "approve" | "reject"
  onClose,
  onConfirm,
  selectedMember,
}) {
  const isApprove = type === "approve";

  // Safeguard in case selectedMember is null while closing
  if (!selectedMember) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[450px]">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          {/* Status Icon */}
          <div
            className={`p-3 rounded-full mb-4 ${
              isApprove ? "bg-emerald-100" : "bg-rose-100"
            }`}
          >
            {isApprove ? (
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-rose-600" />
            )}
          </div>

          <AlertDialogTitle className="text-xl font-bold">
            {isApprove ? "Confirm Approval" : "Confirm Rejection"}
          </AlertDialogTitle>

          {/* Member Summary Card */}
          <div className="w-full bg-muted/30 border rounded-lg p-3 my-4 flex items-center gap-4 text-left">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={selectedMember.user?.image} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">
                {selectedMember.user?.firstName} {selectedMember.user?.lastName}
              </p>
              <p className="text-[11px] text-muted-foreground">
                ID: {selectedMember.registrationNumber} | {selectedMember.user?.email}
              </p>
              <p className="text-[10px] mt-1 text-primary font-medium">
                Type: {selectedMember.memberType.toUpperCase()}
              </p>
            </div>
          </div>

          <AlertDialogDescription className="text-sm">
            {isApprove
              ? "Approving this member will grant them full access and notify them via email. This action is tracked in the system logs."
              : "Rejecting this member will restrict their access. They will receive an automated notification regarding this decision."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-center gap-3 mt-4">
          <AlertDialogCancel className="w-full sm:w-auto border-dashed">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`w-full sm:w-auto shadow-lg transition-all ${
              isApprove
                ? "bg-emerald-600 hover:bg-emerald-700 text-dark"
                : "bg-rose-600 hover:bg-rose-700 text-white"
            }`}
          >
            {isApprove ? "Yes, Approve Member" : "Yes, Reject Member"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}