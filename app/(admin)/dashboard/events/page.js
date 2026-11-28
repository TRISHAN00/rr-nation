"use client";

import { useMemo } from "react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ChevronLeft, ChevronRight, FilterX, Plus } from "lucide-react";
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
    adminApproval,
    setAdminApproval,
    isRunRiseNation,
    setIsRunRiseNation,
    page,
    setPage,
    totalPages,
    totalItems,
  } = useDashboardEvents();

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search?.trim()) count += 1;
    if (eventStage && eventStage !== "all") count += 1;
    if (eventType && eventType !== "all") count += 1;
    if (adminApproval && adminApproval !== "all") count += 1;
    if (String(isRunRiseNation) !== "all") count += 1;
    if (date) count += 1;
    return count;
  }, [search, eventStage, eventType, adminApproval, isRunRiseNation, date]);

  const clearFilters = () => {
    setSearch("");
    setEventStage("");
    setEventType("");
    setAdminApproval("");
    setIsRunRiseNation("all");
    setDate(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border bg-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight">Events</h1>
              {activeFilterCount > 0 && <Badge variant="secondary">{activeFilterCount} active filter{activeFilterCount > 1 ? "s" : ""}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">Search and filter admin events efficiently.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <DashboardEventSearch search={search} setSearch={setSearch} />
            <DashboardDateFilter date={date} setDate={setDate} />
            <Button asChild className="shrink-0">
              <Link href="/dashboard/events/create"><Plus className="mr-2 h-4 w-4" />Create Event</Link>
            </Button>
          </div>
        </div>

        <DashboardEventTab
          eventStage={eventStage}
          setEventStage={setEventStage}
          eventType={eventType}
          setEventType={setEventType}
          adminApproval={adminApproval}
          setAdminApproval={setAdminApproval}
          isRunRiseNation={isRunRiseNation}
          setIsRunRiseNation={setIsRunRiseNation}
        />

        {activeFilterCount > 0 && (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <FilterX className="mr-2 h-4 w-4" />Clear filters
            </Button>
          </div>
        )}
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
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-xs font-medium">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}
