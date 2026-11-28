"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import OrganizerTicketModal from "./OrganizerTicketModal";

export default function OrganizerTicketHeader({ eventId, onRefresh }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">Tickets / Packages</h2>
        <p className="text-sm text-muted-foreground">Manage registration tickets for this event.</p>
      </div>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" /> Create Ticket
      </Button>
      <OrganizerTicketModal open={open} setOpen={setOpen} eventId={eventId} onRefresh={onRefresh} />
    </div>
  );
}
