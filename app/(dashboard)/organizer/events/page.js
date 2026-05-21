"use client";

import DashboardEventFooter from "@/app/(admin)/dashboard/events/_components/DashboardEventFooter";
import DashboardEventLoading from "@/app/(admin)/dashboard/events/_components/DashboardEventLoading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getAllDashboardOrganizerEvents } from "../services/organizer.event.service";
import OrgDashEventList from "./_components/OrgDashEventList";
import OrgDashEvSearch from "./_components/OrgDashEvSearch";
import OrgDashEvTab from "./_components/OrgDashEvTab";

export default function DashboardOrganizerEventsPage() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isRunRiseNation, setIsRunRiseNation] = useState(true);
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(null);

  const fetchEvents = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) return;

    try {
      setLoading(true);
      const formattedDateForAPI =
        date instanceof Date ? format(date, "MM/dd/yyyy") : "";
      const encodedDate = encodeURIComponent(formattedDateForAPI);

      const response = await getAllDashboardOrganizerEvents(
        page,
        limit,
        isRunRiseNation,
        search,
        eventType === "all" ? "" : eventType,
        encodedDate,
      );

      setEvents(response?.data?.items || response?.items || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [page, limit, isRunRiseNation, search, eventType, date]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <OrgDashEvSearch search={search} setSearch={setSearch} />

        <div className="flex flex-wrap items-center gap-4">
          <OrgDashEvTab
            eventType={eventType}
            setEventType={setEventType}
          />
          <Link href={"/organizer/events/create"}>
            <Button>Create Event</Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <DashboardEventLoading />
      ) : events?.length > 0 ? (
        <OrgDashEventList events={events} loading={loading} onRefresh={fetchEvents} setLoading={setLoading} />
      ) : (
        <DashboardEventFooter />
      )}

    </div>
  );
}
