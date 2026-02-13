"use client";
import DashboardEventFooter from "./_components/DashboardEventFooter";
import DashboardEventList from "./_components/DashboardEventList";
import DashboardEventPageHeader from "./_components/DashboardEventPageHeader";
import DashboardEventSearch from "./_components/DashboardEventSearch";
import DashboardEventTab from "./_components/DashboardEventTab";

export default function DashboardEventsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <DashboardEventPageHeader />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Event */}
        <DashboardEventSearch />

        {/* Event Filter Tab */}
        <DashboardEventTab />
      </div>

      {/* Events List */}
      <DashboardEventList />

      <DashboardEventFooter />
    </div>
  );
}
