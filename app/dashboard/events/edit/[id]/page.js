"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getEventById } from "@/services/admin/admin.event.service";
import EventInfoFormSkeleton from "../../create/_components/EventInfoFormSkeleton";
import EventTickets from "../../create/_components/EventTickets";
import EventTshirt from "../../create/_components/EventTshirt";
import UpdateEventForm from "../../create/_components/UpdateEventForm";

export default function DashboardEventEdit() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        setEvent(res?.data?.data);
      } catch {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <EventInfoFormSkeleton />;

  return (
    <div className="space-y-6">
      <UpdateEventForm event={event} />
      <EventTickets eventId={id} />
      <EventTshirt eventId={id} />
    </div>
  );
}
