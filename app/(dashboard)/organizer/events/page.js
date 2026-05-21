"use client";

import DashboardEventFooter from "@/app/(admin)/dashboard/events/_components/DashboardEventFooter";
import DashboardEventLoading from "@/app/(admin)/dashboard/events/_components/DashboardEventLoading";
import { useCallback, useEffect, useState } from "react";
import { getAllDashboardOrganizerEvents } from "../services/organizer.event.service";
import OrgDashEventList from "./_components/OrgDashEventList";

export default function DashboardOrganizerEventsPage() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isRunRiseNation, setIsRunRiseNation] = useState(true);
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(null);

  console.log("events", events);

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
