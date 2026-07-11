"use client";

import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    page,
    setPage,
    totalPages,
    totalItems,
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
        <EventListWithPagination />
      ) : (
        <DashboardEventFooter />
      )}
    </div>
  );

  function EventListWithPagination() {
    return (
      <>
        <DashboardEventList events={events} />
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border rounded-xl bg-card my-4">
            <p className="text-xs text-muted-foreground">
              Total <span className="font-bold text-foreground">{totalItems}</span> events
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-xs font-medium">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}
