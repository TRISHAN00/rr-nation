"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";
import { deleteOrganizerTicket } from "../../../services/organizer.ticket.service";

export default function OrganizerTicketDeleteDialog({ open, setOpen, ticket, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!ticket?.id) return;
    try {
      setLoading(true);
      await deleteOrganizerTicket(ticket.id);
      toast.success("Ticket deleted");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Ticket</DialogTitle>
          <DialogDescription>
            Delete <span className="font-semibold text-foreground">{ticket?.name || "this ticket"}</span>? This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Ticket"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
