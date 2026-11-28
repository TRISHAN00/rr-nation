"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createOrganizerTicket, updateOrganizerTicket } from "../../../services/organizer.ticket.service";

const emptyTicket = (eventId) => ({
  eventId,
  name: "",
  distance: "",
  price: "",
  availableSlots: "",
  status: "active",
});

export default function OrganizerTicketModal({ open, setOpen, eventId, ticket, onRefresh }) {
  const isEdit = !!ticket?.id;
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([emptyTicket(eventId)]);

  useEffect(() => {
    if (!open) return;
    if (isEdit) {
      setRows([{
        ticketId: ticket.id,
        name: ticket.name || "",
        distance: ticket.distance || "",
        price: ticket.price ?? "",
        availableSlots: ticket.availableSlots ?? "",
        status: ticket.status || "active",
      }]);
    } else {
      setRows([emptyTicket(eventId)]);
    }
  }, [open, isEdit, ticket, eventId]);

  const setRow = (index, key, value) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
  };

  const addRow = () => setRows((prev) => [...prev, emptyTicket(eventId)]);
  const removeRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    const invalid = rows.some((r) => !r.name?.trim() || !r.distance?.trim() || r.price === "" || r.availableSlots === "");
    if (invalid) {
      toast.warning("Please fill all ticket fields");
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        const payload = rows.map((r) => ({
          ticketId: r.ticketId,
          name: r.name.trim(),
          distance: r.distance.trim(),
          price: Number(r.price),
          availableSlots: Number(r.availableSlots),
          status: r.status,
        }));
        await updateOrganizerTicket(eventId, payload);
        toast.success("Ticket updated");
      } else {
        const payload = rows.map((r) => ({
          eventId,
          name: r.name.trim(),
          distance: r.distance.trim(),
          price: Number(r.price),
          availableSlots: Number(r.availableSlots),
          status: r.status,
        }));
        await createOrganizerTicket(payload);
        toast.success("Ticket(s) created");
      }
      setOpen(false);
      onRefresh?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={isEdit ? "max-w-xl" : "max-w-4xl"}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Ticket" : "Create Event Tickets"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {rows.map((row, index) => (
            <div key={index} className={`grid gap-3 border p-3 rounded-lg bg-muted/30 items-end ${isEdit ? "md:grid-cols-2" : "md:grid-cols-6"}`}>
              <Field label="Name">
                <Input value={row.name} onChange={(e) => setRow(index, "name", e.target.value)} placeholder="Regular Ticket" />
              </Field>
              <Field label="Distance">
                <Input value={row.distance} onChange={(e) => setRow(index, "distance", e.target.value)} placeholder="10 Km" />
              </Field>
              <Field label="Price (৳)">
                <Input type="number" value={row.price} onChange={(e) => setRow(index, "price", e.target.value)} />
              </Field>
              <Field label="Slots">
                <Input type="number" value={row.availableSlots} onChange={(e) => setRow(index, "availableSlots", e.target.value)} />
              </Field>
              <Field label="Status">
                <Select value={row.status} onValueChange={(v) => setRow(index, "status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              {!isEdit && (
                <Button variant="ghost" size="icon" onClick={() => removeRow(index)} disabled={rows.length === 1}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t">
          {!isEdit ? (
            <Button variant="outline" onClick={addRow}><Plus className="h-4 w-4 mr-1" /> Add More</Button>
          ) : <div />}
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Save All Tickets"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
