"use client";
import clsx from "clsx";
import { useMemo, useState } from "react";
import EventCard from "./EventCard";
import EventCardSkeleton from "./skeleton/EventCardSkeleton";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "virtual", label: "Virtual" },
  { key: "upcoming", label: "Upcoming" },
  { key: "successful", label: "Successful" },
];

export default function EventFilter({ onChange, events = [], loading }) {
  const [active, setActive] = useState("all");

  // 🕒 Filter AND Sort events
  const filteredAndSortedEvents = useMemo(() => {
    // 1. Filter the events based on the active state
    let result = events;
    if (active !== "all") {
      result = events.filter((event) => event.eventType === active);
    }

    // 2. Sort the filtered events by date (Soonest first)
    return [...result].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, active]); // Re-run when events or active filter changes

  const handleChange = (key) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <div className="w-full">
      {/* 🔘 Filter Buttons */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleChange(item.key)}
              className={clsx(
                "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 border border-brand",
                active === item.key
                  ? "bg-brand text-white shadow-md"
                  : "text-brand hover:bg-brand/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🧩 Event Grid */}
      <div className="grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
        ) : filteredAndSortedEvents.length > 0 ? (
          filteredAndSortedEvents.map((item) => (
            <EventCard
              key={item?.id}
              event={item}
              href={`/events/${item?.slug}`}
            />
          ))
        ) : (
          /* ℹ️ Empty State */
          <div className="col-span-full text-center py-20 text-gray-500">
            No {active !== "all" ? active : ""} events found.
          </div>
        )}
      </div>
    </div>
  );
}