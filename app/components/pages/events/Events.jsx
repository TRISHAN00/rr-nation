"use client";
import Title from "@/app/components/common/Title";
import { getAllEvent } from "@/services/user.service";
import { useEffect, useRef, useState } from "react";
import EventFilter from "./EventFilter";
import EventSwitch from "./EventSwitch";

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

  // Reset when filter matrix changes
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
    <section className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
      <Title
        label="EVENTS"
        title="Explore Our Featured Running Programs"
        hideBtnArrow
        searchPlaceholder="Search event..."
        hideSearch
      />

      {/* Switch Control */}
      <div className="flex justify-center pt-8 sm:pt-12 lg:pt-20">
        <EventSwitch
          active={isRunRiseNation ? "runrise" : "other"}
          onChange={(type) =>
            setIsRunRiseNation(type === "runrise")
          }
        />
      </div>

      {/* Multi-layered Filter + Grid System */}
      <div className="flex justify-center pt-6 sm:pt-10 lg:pt-16">
        <EventFilter
          events={events}
          loading={loading}
          currentFilters={filters}
          onChange={(updatedFilters) => setFilters(updatedFilters)}
          lastRef={lastElementRef}
          page={page}
        />
      </div>
    </section>
  );
}