"use client";
import EventCard from "./EventCard";
import EventCardSkeleton from "./skeleton/EventCardSkeleton";

export default function EventFilter({
  events = [],
  loading,
  lastRef,
  page,
}) {
  return (
    <div className="w-full space-y-4">
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