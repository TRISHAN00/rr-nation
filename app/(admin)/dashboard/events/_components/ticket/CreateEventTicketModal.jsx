"use client";

import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { createEventTicket } from "@/services/admin/admin.event.ticket.service";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CreateEventTicketModal({ open, setOpen, onTickets, eventId }) {
  const [tickets, setTickets] = useState([
    {
      eventId: eventId,
      name: "",
      distance: "",
      price: "",
      availableSlots: "",
      status: "active",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Handle change
  const handleChange = (index, field, value) => {
    const updated = [...tickets];
    updated[index][field] = value;
    setTickets(updated);
  };

  // Add row
  const addTicket = () => {
    setTickets([
      ...tickets,
      {
        eventId: eventId,
        name: "",
        distance: "",
        price: "",
        availableSlots: "",
        status: "active",
      },
    ]);
  };

  // Remove row
  const removeTicket = (index) => {
    const updated = tickets.filter((_, i) => i !== index);
    setTickets(updated);
  };

  // Reset when modal closes
  const resetForm = () => {
    setTickets([
      {
        eventId: eventId,
        name: "",
        distance: "",
        price: "",
        availableSlots: "",
        status: "active",
      },
    ]);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Transform data structure to match API expectation
      const payload = tickets.map((t) => ({
        eventId: eventId,
        name: t.name.trim(),
        distance: t.distance.trim(),
        price: Number(t.price),
        availableSlots: Number(t.availableSlots),
        status: t.status,
      }));

      await createEventTicket(eventId, payload);

      resetForm();
      setOpen(false);
      if (onTickets) onTickets();
    } catch (error) {
      console.error("Ticket creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Event Tickets</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="grid md:grid-cols-6 gap-3 border p-3 rounded-lg bg-muted/30 items-end"
            >
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Name</label>
                <Input
                  placeholder="Regular Ticket"
                  value={ticket.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>

              {/* Distance */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Distance</label>
                <Input
                  placeholder="10 Km"
                  value={ticket.distance}
                  onChange={(e) => handleChange(index, "distance", e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Price (৳)</label>
                <Input
                  type="number"
                  placeholder="1500"
                  value={ticket.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
              </div>

              {/* Slots */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Slots</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={ticket.availableSlots}
                  onChange={(e) => handleChange(index, "availableSlots", e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Status</label>
                <Select
                  value={ticket.status}
                  onValueChange={(value) => handleChange(index, "status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remove Row */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTicket(index)}
                disabled={tickets.length === 1}
                className="mb-0.5"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={addTicket}>
            <Plus className="h-4 w-4 mr-1" /> Add More Tickets
          </Button>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Save All Tickets"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}