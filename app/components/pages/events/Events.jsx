"use client";
import Title from "@/app/components/common/Title";
import { getAllEvent } from "@/services/user.service";
import { useEffect, useState } from "react";
import EventFilter from "./EventFilter";
import EventSwitch from "./EventSwitch";

export default function Events({ hideTab }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchEvents = async () => {
    try {
      const res = await getAllEvent();
      setEvents(res?.data?.items || []);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
      <Title
        label="EVENTS"
        title="Explore Our Featured Running Programs"
        hideBtnArrow
        searchPlaceholder="Search event..."
        hideSearch
      />

      {!hideTab && (
        <div className="flex justify-center pt-8 sm:pt-12 lg:pt-20">
          <EventSwitch />
        </div>
      )}

      {/* Filter */}
      <div className="flex justify-center pt-6 sm:pt-10 lg:pt-16">
        <EventFilter events={events} loading={loading} />
      </div>
    </section>
  );
}
