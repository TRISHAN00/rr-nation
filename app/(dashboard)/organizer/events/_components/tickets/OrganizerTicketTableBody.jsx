"use client";

import { useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/app/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import OrganizerTicketModal from "./OrganizerTicketModal";
import OrganizerTicketDeleteDialog from "./OrganizerTicketDeleteDialog";

export default function OrganizerTicketTableBody({ tickets, loading, onRefresh, eventId }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">Loading tickets...</TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!tickets?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">No tickets yet.</TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {tickets.map((ticket, index) => (
          <TableRow key={ticket.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{ticket.name}</TableCell>
            <TableCell>{ticket.distance}</TableCell>
            <TableCell>৳{ticket.price}</TableCell>
            <TableCell>{ticket.availableSlots}</TableCell>
            <TableCell>{ticket.usedSlots ?? 0}</TableCell>
            <TableCell>
              <Badge variant={ticket.status === "active" ? "default" : "secondary"}>
                {ticket.status || "inactive"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => { setSelected(ticket); setEditOpen(true); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => { setSelected(ticket); setDeleteOpen(true); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <OrganizerTicketModal
        open={editOpen}
        setOpen={setEditOpen}
        eventId={eventId}
        ticket={selected}
        onRefresh={onRefresh}
      />
      <OrganizerTicketDeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        ticket={selected}
        onSuccess={onRefresh}
      />
    </>
  );
}
