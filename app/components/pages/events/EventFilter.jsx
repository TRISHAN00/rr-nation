"use client";
import clsx from "clsx";
import { useState } from "react";
import EventCard from "./EventCard";
import EventCardSkeleton from "./skeleton/EventCardSkeleton";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "virtual", label: "Virtual" },
  { key: "upcoming", label: "Upcoming" },
  { key: "successful", label: "Successful" },
];

export default function EventFilter({
  onChange,
  events = [],
  loading,
  lastRef,
  page,
}) {
  const [active, setActive] = useState("all");

  const handleChange = (key) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <div className="w-full">
      {/* 🔘 Filters */}
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

      {/* 🧩 Grid */}
      <div className="grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading && page === 1 ? (
          // 🔄 Initial load
          Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))
        ) : events.length > 0 ? (
          events.map((item, index) => {
            const isLast = index === events.length - 1;

            return (
              <div
                ref={isLast ? lastRef : null}
                key={item?.id}
              >
                <EventCard
                  event={item}
                  href={`/events/${item?.slug}`}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No {active !== "all" ? active : ""} events found.
          </div>
        )}
      </div>

      {/* 🔄 Load more loader */}
      {loading && page > 1 && (
        <div className="text-center py-6 text-gray-500">
          Loading more events...
        </div>
      )}
    </div>
  );
}