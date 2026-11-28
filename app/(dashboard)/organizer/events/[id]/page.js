"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDashboardOrganizerEvents } from "../../context/OrganizerEventContext";
import OrganizerTicketList from "../_components/tickets/OrganizerTicketList";

const statusBadge = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "approved") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (s === "rejected") return "bg-rose-100 text-rose-700 border-rose-200";
  return "bg-amber-100 text-amber-700 border-amber-200";
};

export default function OrganizerEventDetailPage() {
  const { id } = useParams();
  const { event, loading, handleGetEventById } = useDashboardOrganizerEvents();

  useEffect(() => {
    if (id) handleGetEventById(id);
  }, [id, handleGetEventById]);

  if (loading) return <div className="py-16 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!event) return <div className="py-16 text-center text-muted-foreground">Event not found.</div>;



  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <p className="text-sm text-muted-foreground">{event.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`uppercase ${statusBadge(event.adminApproval)}`}>{event.adminApproval || ""}</Badge>
          <Button asChild><Link href={`/organizer/events/${event.id}/edit`}><Edit className="h-4 w-4 mr-2" />Edit</Link></Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Event Details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <Info label="Date" value={event.date ? new Date(event.date).toLocaleDateString() : "-"} />
          <Info label="Time" value={event.time} />
          <Info label="Address" value={event.address} />
          <Info label="Type" value={event.eventType} />
          <Info label="Stage" value={event.eventStage} />
          <Info label="Status" value={event.status} />
          <Info label="Package Type" value={event.packageType} />
          <Info label="Min Price" value={event.minPackagePrice} />
          <Info label="Organizer" value={event.organizerName} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
        <CardContent className="text-sm whitespace-pre-wrap">{event.description || "-"}</CardContent>
      </Card>

      <OrganizerTicketList eventId={event.id} />
    </div>
  );
}

function Info({ label, value }) {
  return <div><div className="text-muted-foreground">{label}</div><div className="font-medium break-words">{value ?? "-"}</div></div>;
}