"use client";
import clsx from "clsx";
import { getAllEvent } from "@/services/user.service";
import { useEffect, useRef, useState } from "react";
import EventFilter from "./EventFilter";
import EventSwitch from "./EventSwitch";

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

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Unified State for Filters
  const [filters, setFilters] = useState({
    eventStage: "all",
    eventType: "all",
  });
  const [isRunRiseNation, setIsRunRiseNation] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();

  // Fetch function
  const fetchEvents = async (pageNumber = 1, reset = false) => {
    setLoading(true);
    try {
      const res = await getAllEvent(
        pageNumber,
        10,
        isRunRiseNation,
        "",
        filters.eventStage,
        filters.eventType
      );

      const newEvents = res?.data?.items || [];

      setEvents((prev) =>
        reset ? newEvents : [...prev, ...newEvents]
      );

      // If less than limit threshold -> no more pages
      setHasMore(newEvents.length === 10);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = (type) => {
    setPage(1);
    setIsRunRiseNation(type === "runrise");
  };

  const handleFilterChange = (category, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  // Reset + fetch when the filter matrix changes
  useEffect(() => {
    setPage(1);
    fetchEvents(1, true);
  }, [isRunRiseNation, filters]);

  // Load next index split when page increments
  useEffect(() => {
    if (page === 1) return;
    fetchEvents(page);
  }, [page]);

  // Intersection observer pipeline
  const lastElementRef = (node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-6 sm:py-20 lg:py-15">
      {/* Switch on the left, stage/type filters column-wise on the right */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="flex justify-center lg:justify-start lg:shrink-0">
          <EventSwitch
            active={isRunRiseNation ? "runrise" : "other"}
            onChange={handleSwitch}
          />
        </div>

        <div className="flex flex-col items-center lg:items-end gap-3 sm:gap-4 pt-4 lg:pt-1">
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-3">
            {FILTERS_STAGE.map((item) => (
              <button
                key={item.key}
                onClick={() => handleFilterChange("eventStage", item.key)}
                className={clsx(
                  "px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-brand whitespace-nowrap",
                  filters.eventStage === item.key
                    ? "bg-brand text-white shadow-md"
                    : "text-brand hover:bg-brand/10"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-3">
            {FILTERS_TYPE.map((item) => (
              <button
                key={item.key}
                onClick={() => handleFilterChange("eventType", item.key)}
                className={clsx(
                  "px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-brand whitespace-nowrap",
                  filters.eventType === item.key
                    ? "bg-brand text-white shadow-md"
                    : "text-brand hover:bg-brand/10"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-layered Filter + Grid System */}
      <div className="flex justify-center pt-3 sm:pt-10 lg:pt-16">
        <EventFilter
          events={events}
          loading={loading}
          lastRef={lastElementRef}
          page={page}
        />
      </div>
    </section>
  );
}