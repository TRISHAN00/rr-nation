"use client";

import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { deleteTicket } from "@/services/admin/admin.ticket.service";
import { useState } from "react";

export default function DeleteEventTicketDialog({
  open,
  setOpen,
  ticketId,
  ticketName,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Assumes your service accepts the ticketId directly
      await deleteTicket(ticketId);

      if (onSuccess) onSuccess();
      setOpen(false);
    } catch (error) {
      console.error("Ticket deletion failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Event Ticket</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {ticketName || "this ticket"}
            </span>? 
            This action cannot be undone and will remove the ticket from the registration options.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Ticket"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}