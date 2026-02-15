"use client";

import { getEventById } from "@/services/admin/admin.event.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardEventDetails from "./_component/DashboardEventDetails";
import DashboardEventDetailsSkeleton from "./_component/DashboardEventDetailsSkeleton";

export default function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const res = await getEventById(id);
      setEvent(res?.data?.data);
    } catch (err) {
      toast.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) {
    return <DashboardEventDetailsSkeleton />;
  }
  return <DashboardEventDetails event={event} eventId={id} />;
}
