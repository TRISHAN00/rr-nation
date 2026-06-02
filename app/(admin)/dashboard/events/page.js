"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useDashboardEvents } from "../context/EventContext";
import { DashboardDateFilter } from "./_components/DashboardDateFilter";
import DashboardEventFooter from "./_components/DashboardEventFooter";
import DashboardEventList from "./_components/DashboardEventList";
import DashboardEventLoading from "./_components/DashboardEventLoading";
import DashboardEventSearch from "./_components/DashboardEventSearch";
import DashboardEventTab from "./_components/DashboardEventTab";

export default function DashboardEventsPage() {
  const {
    events,
    loading,
    search,
    setSearch,
    eventType,
    setEventType,
    date,
    setDate,
    eventStage,
    setEventStage,
  } = useDashboardEvents();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <DashboardEventSearch search={search} setSearch={setSearch} />

        <div className="flex flex-wrap items-center gap-4">
          <DashboardEventTab
            eventStage={eventStage}
            setEventStage={setEventStage}
            eventType={eventType}
            setEventType={setEventType}
          />
          <DashboardDateFilter date={date} setDate={setDate} />
          <Link href={"/dashboard/events/create"}>
            <Button>Create Event</Button>
          </Link>
        </div>
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
