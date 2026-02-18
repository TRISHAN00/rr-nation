"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDashboardEvents } from "../../context/EventContext";
import DashboardEventDetails from "./_component/DashboardEventDetails";
import DashboardEventDetailsSkeleton from "./_component/DashboardEventDetailsSkeleton";

export default function EventDetailsPage() {
  const { eventId } = useParams();

  const { handleGetEventById, event, loading } = useDashboardEvents();

  useEffect(() => {
    if (eventId) {
      handleGetEventById(eventId);
    }
  }, [eventId, handleGetEventById]);

  if (loading) {
    return <DashboardEventDetailsSkeleton />;
  }

  if (!event) {
    return <p className="text-center mt-10">Event not found</p>;
  }

  return <DashboardEventDetails event={event} eventId={eventId} />;
}
