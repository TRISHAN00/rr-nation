"use client";

import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import {
  createTicket,
  deleteTicket,
  getTicketsById,
} from "@/services/admin/admin.ticket.service";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddEditPackageForm from "./AddEditPackageForm";

export default function EventTickets({ eventId }) {
  const [tickets, setTickets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    const response = await getTicketsById(eventId);

    if (response?.status !== 200) {
      return null;
    } else {
      setTickets(response?.data?.data);
    }

    return tickets;
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------- RECEIVE DATA FROM MODAL ---------- */
  const handleTicketSubmit = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
    setModalOpen(false);
  };

  // Submit Tickets
  const handleSubmitTickets = async () => {
    try {
      if (tickets.length === 0) return alert("No tickets to submit");

      // Ensure numbers are numbers
      const payload = tickets.map((t) => ({
        ...t,
        name: t.name,
        price: Number(t.price),
        availableSlots: Number(t.availableSlots),
        eventId: Number(t.eventId) || Number(eventId),
      }));

      // Send one by one if API expects single objects
      // for (const ticket of payload) {
      const response = await createTicket(payload);
      console.log("Ticket created:", response);
      // }

      toast.success("All tickets submitted successfully!");
      setTickets([]); // clear local tickets
      fetchData(); // refresh list from API
    } catch (error) {
      console.error("Error submitting tickets:", error.response || error);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      toast.success("Ticket deleted successfully");
      await fetchData();
    } catch (err) {
      toast.error("Failed to delete ticket");
    }
  };

  return (
    <div className="space-y-4 border rounded-lg p-4 mt-4 mb-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <Label className="text-lg font-semibold">Event Tickets</Label>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Add Tickiet
        </Button>
      </div>

      {/* DYNAMIC LIST */}
      <div className="space-y-2">
        {tickets?.map((ticket, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-muted rounded-lg"
          >
            <div>
              <p className="font-medium">{ticket.name}</p>
              <p className="text-sm text-muted-foreground">
                BDT {ticket.price} | Slots {ticket.availableSlots} |{" "}
                {ticket?.distance}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => handleDeleteTicket(ticket?.id)}
                size="icon"
                variant="ghost"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}

        <Button onClick={handleSubmitTickets}>Submit Tickets</Button>
      </div>

      {/* MODAL */}
      <AddEditPackageForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        eventId={eventId}
        onTicketSubmit={handleTicketSubmit}
      />
    </div>
  );
}
