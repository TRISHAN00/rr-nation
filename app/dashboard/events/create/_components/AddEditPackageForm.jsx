"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useState } from "react";

export default function AddEditPackageForm({
  modalOpen,
  setModalOpen,
  eventId,
  onTicketSubmit,
}) {
  const [ticket, setTicket] = useState({
    eventId,
    distance: "",
    price: "",
    availableSlots: "",
    status: "active",
  });

  /* ---------- HANDLE INPUT ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    onTicketSubmit({
      ...ticket,
      price: Number(ticket.price),
      availableSlots: Number(ticket.availableSlots),
    });

    setTicket({
      eventId,
      distance: "",
      price: "",
      availableSlots: "",
      status: "active",
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Distance</Label>
              <Input
                name="distance"
                value={ticket.distance}
                onChange={handleChange}
                placeholder="5 KM / 10 KM / Premium"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Price (BDT)</Label>
              <Input
                name="price"
                type="number"
                value={ticket.price}
                onChange={handleChange}
                placeholder="1200"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Available Slots</Label>
              <Input
                name="availableSlots"
                type="number"
                value={ticket.availableSlots}
                onChange={handleChange}
                placeholder="200"
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit">Add Package</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
