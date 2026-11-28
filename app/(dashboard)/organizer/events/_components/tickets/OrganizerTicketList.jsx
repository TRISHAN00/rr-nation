"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Table } from "@/app/components/ui/table";
import { toast } from "sonner";
import { getOrganizerTicketsByEventId } from "../../../services/organizer.ticket.service";
import OrganizerTicketHeader from "./OrganizerTicketHeader";
import OrganizerTicketTableBody from "./OrganizerTicketTableBody";
import OrganizerTicketTableHeader from "./OrganizerTicketTableHeader";

export default function OrganizerTicketList({ eventId }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = useCallback(async () => {
    if (!eventId) return;
    try {
      setLoading(true);
      const res = await getOrganizerTicketsByEventId(eventId);
      setTickets(res?.data?.data || []);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="space-y-4">
      <OrganizerTicketHeader eventId={eventId} onRefresh={fetchTickets} />
      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <OrganizerTicketTableHeader />
            <OrganizerTicketTableBody
              tickets={tickets}
              loading={loading}
              onRefresh={fetchTickets}
              eventId={eventId}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
