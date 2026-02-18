"use client";

import { useDashboardEvents } from "../context/EventContext";
import DashboardEventFooter from "./_components/DashboardEventFooter";
import DashboardEventList from "./_components/DashboardEventList";
import DashboardEventLoading from "./_components/DashboardEventLoading";
import DashboardEventPageHeader from "./_components/DashboardEventPageHeader";
import DashboardEventSearch from "./_components/DashboardEventSearch";
import DashboardEventTab from "./_components/DashboardEventTab";

export default function DashboardEventsPage() {
  const { events, loading } = useDashboardEvents();

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardEventPageHeader />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <DashboardEventSearch />
        <DashboardEventTab />
      </div>

      {loading ? (
        <DashboardEventLoading />
      ) : events?.length > 0 ? (
        <DashboardEventList events={events} />
      ) : (
        <DashboardEventFooter />
      )}
    </div>
  );
}
