"use client";
import { getAllEvent } from "@/services/user.service";
import { useEffect, useState } from "react";
import FeaturedEventCard from "./FeaturedEventCard";

export default function FeatureEventList() {
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
    <section className="featured-event bg-[#E0F7F6] lg:py-35 py-20 ">
      <div className="container m-auto px-7.5">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-20 relative z-10 px-4">
          <span className="text-brand uppercase font-bold tracking-wide text-sm">
            EVENTS
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-dark">
            Our Events
          </h2>
        </div>

        {events?.map((event) => {
          return (
            <FeaturedEventCard
              key={event.id}
              bgColor="#003A3B"
              overlayColor="#003A3B"
              event={event}
            />
          );
        })}

        {/* <FeaturedEventCard
          bgColor="#004C0B"
          overlayColor="#004C0B"
          bgImage="/dynamic/home/banner/banner-01.jpg"
        />
        <FeaturedEventCard bgColor="#03726D" /> */}
      </div>
    </section>
  );
}
