"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useDashboardOrganizerEvents } from "../context/OrganizerEventContext";
import OrgDashEventList from "./_components/OrgDashEventList";
import OrgDashEvSearch from "./_components/OrgDashEvSearch";
import OrgDashEvTab from "./_components/OrgDashEvTab";

export default function DashboardOrganizerEventsPage() {
  const {
    events,
    loading,
    search,
    setSearch,
    eventType,
    setEventType,
    fetchEvents,
  } = useDashboardOrganizerEvents();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (events || []).filter((e) => {
      const matchesSearch =
        !q ||
        [e.name, e.slug, e.address, e.organizerName].some((v) =>
          String(v || "").toLowerCase().includes(q),
        );
      const matchesType = !eventType || eventType === "all" || e.eventType === eventType;
      return matchesSearch && matchesType;
    });
  }, [events, search, eventType]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <OrgDashEvSearch search={search} setSearch={setSearch} />
        <div className="flex flex-wrap items-center gap-4">
          <OrgDashEvTab eventType={eventType} setEventType={setEventType} />
          <Button asChild>
            <Link href="/organizer/events/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Loading events...</div>
      ) : filtered.length > 0 ? (
        <OrgDashEventList events={filtered} onRefresh={fetchEvents} />
      ) : (
        <div className="py-16 text-center text-muted-foreground border rounded-xl bg-card">
          No events found.
        </div>
      )}
    </div>
  );
}
