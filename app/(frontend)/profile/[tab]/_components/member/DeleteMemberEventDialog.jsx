"use client";

import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { deleteMemberEventById } from "@/services/member.service"; // Adjust location based on your setup
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteMemberEventDialog({
  open,
  setOpen,
  eventId,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!eventId) {
      toast.error("Invalid Event ID record resource reference.");
      return;
    }

    try {
      setLoading(true);

      await deleteMemberEventById(eventId);

      toast.success("Member event deleted successfully.");
      onSuccess();
      setOpen(false);
    } catch (error) {
      console.error("Delete event entry failed:", error);
      toast.error(error?.response?.data?.message || "Failed to remove member event records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0">
          <div className="p-2 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <DialogTitle className="text-lg font-semibold">Delete Member Event</DialogTitle>
        </DialogHeader>

        <div className="mt-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to remove this running event log? This action will permanently drop this item from the member history timeline metrics and cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button 
            type="button"
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={loading}
            className="h-9 text-xs"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="h-9 text-xs px-4"
          >
            {loading ? "Deleting Record..." : "Confirm Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}