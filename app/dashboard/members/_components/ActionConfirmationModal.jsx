"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, CheckCircle2, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function ActionConfirmationModal({
  isOpen = false,
  type = "approve",
  onClose,
  onConfirm,
  selectedMember,
  isLoading,
}) {
  const [selectedType, setSelectedType] = useState("");
  const isApprove = type === "approve";

  // Sync internal state with the selected member when modal opens
  useEffect(() => {
    if (selectedMember) {
      setSelectedType(selectedMember.memberType);
    }
  }, [selectedMember, isOpen]);

  if (!selectedMember) return null;

    console.log(selectedMember)


  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[450px]">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className={`p-3 rounded-full mb-4 mx-auto ${isApprove ? "bg-emerald-100" : "bg-rose-100"}`}>
            {isApprove ? <CheckCircle2 className="h-8 w-8 text-emerald-600" /> : <AlertTriangle className="h-8 w-8 text-rose-600" />}
          </div>

          <AlertDialogTitle className="text-xl font-bold mx-auto">
            {isApprove ? "Confirm Approval" : "Confirm Rejection"}
          </AlertDialogTitle>

          {/* Member Card */}
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
                ID: {selectedMember.registrationNumber}
              </p>
            </div>
          </div>

          {/* Change Member Type Section (Only relevant for Approval) */}
          {isApprove && (
            <div className="w-full space-y-2 text-left mb-4">
              <label className="text-[12px] font-medium text-muted-foreground flex items-center gap-1 ml-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Assign to Role
              </label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="advisor">Advisor</SelectItem>
                  <SelectItem value="core_team">Core Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-center gap-3 mt-2">
          <AlertDialogCancel className="w-full sm:w-auto" disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); // Handle the click manually
              onConfirm(selectedType); // Pass the chosen type back
            }}
            disabled={isLoading}
            className={`w-full sm:w-auto shadow-lg ${
              isApprove ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-rose-600 hover:bg-rose-700 text-white"
            }`}
          >
            {isLoading ? "Updating..." : isApprove ? "Yes, Approve Member" : "Yes, Reject Member"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}