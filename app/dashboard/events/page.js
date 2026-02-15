"use client";

import { getAllDashbaordEvents } from "@/services/admin/admin.event.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import DashboardEventFooter from "./_components/DashboardEventFooter";
import DashboardEventList from "./_components/DashboardEventList";
import DashboardEventLoading from "./_components/DashboardEventLoading";
import DashboardEventPageHeader from "./_components/DashboardEventPageHeader";
import DashboardEventSearch from "./_components/DashboardEventSearch";
import DashboardEventTab from "./_components/DashboardEventTab";

export default function DashboardEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await getAllDashbaordEvents();
      setEvents(res?.data?.items || []);
    } catch (err) {
      toast.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardEventPageHeader />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <DashboardEventSearch />
        <DashboardEventTab />
      </div>

      {loading ? (
        <DashboardEventLoading />
      ) : events.length > 0 ? (
        <DashboardEventList
          events={events}
          fetchEvent={fetchEvent} // ✅ passed correctly
        />
      ) : (
        <DashboardEventFooter />
      )}
    </div>
  );
}
