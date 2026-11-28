"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import OrganizerEventForm from "../../_components/OrganizerEventForm";
import { useDashboardOrganizerEvents } from "../../../context/OrganizerEventContext";

export default function OrganizerEventEditPage() {
  const { id } = useParams();
  const { event, loading, handleGetEventById } = useDashboardOrganizerEvents();

  useEffect(() => {
    if (id) handleGetEventById(id);
  }, [id, handleGetEventById]);

  if (loading) return <div className="py-16 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!event) return <div className="py-16 text-center text-muted-foreground">Event not found.</div>;
  return <OrganizerEventForm mode="edit" event={event} />;
}