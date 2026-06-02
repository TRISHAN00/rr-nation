"use client";
import clsx from "clsx";
import EventCard from "./EventCard";
import EventCardSkeleton from "./skeleton/EventCardSkeleton";

const FILTERS_STAGE = [
  { key: "all", label: "All Stages" },
  { key: "ongoing", label: "Ongoing" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

const FILTERS_TYPE = [
  { key: "all", label: "All Types" },
  { key: "virtual", label: "Virtual" },
  { key: "live", label: "Live" },
];

export default function EventFilter({
  onChange,
  currentFilters,
  events = [],
  loading,
  lastRef,
  page,
}) {
  const handleSelect = (category, value) => {
    onChange?.({
      ...currentFilters,
      [category]: value,
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* 🔘 Filter Track Controls */}
      <div className="w-full overflow-x-auto pb-2 space-y-3">
        {/* Row 1: Event Stage Row */}
        <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
          {FILTERS_STAGE.map((item) => (
            <button
              key={item.key}
              onClick={() => handleSelect("eventStage", item.key)}
              className={clsx(
                "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-brand",
                currentFilters.eventStage === item.key
                  ? "bg-brand text-white shadow-md"
                  : "text-brand hover:bg-brand/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Row 2: Event Type Row */}
        <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
          {FILTERS_TYPE.map((item) => (
            <button
              key={item.key}
              onClick={() => handleSelect("eventType", item.key)}
              className={clsx(
                "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-brand",
                currentFilters.eventType === item.key
                  ? "bg-brand text-white shadow-md"
                  : "text-brand hover:bg-brand/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🧩 Grid Display Layout */}
      <div className="grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading && page === 1 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))
        ) : events.length > 0 ? (
          events.map((item, index) => {
            const isLast = index === events.length - 1;
            return (
              <div ref={isLast ? lastRef : null} key={item?.id || index}>
                <EventCard event={item} href={`/events/${item?.slug}`} />
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500 text-sm">
            No matching events found for the selected configurations.
          </div>
        )}
      </div>

      {/* Load More Loader Spinner */}
      {loading && page > 1 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          Loading more events...
        </div>
      )}
    </div>
  );
}