"use client";
import { getEventById } from "@/services/user.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InnerBanner from "../../common/InnerBanner";
import CallUsCard from "../services/CallUsCard";
import EventContent from "./EventContent";
import EventInfoCard from "./EventInfoCard";
import SMFeatureEventCard from "./SMFeatureEventCard";

export default function EventDetail() {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEvent = async () => {
    try {
      const res = await getEventById(slug);

      setEvent(res?.data?.data || null);
    } catch (err) {
      console.error("Failed to load event", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchEvent();
  }, [slug]);

  return (
    <>
      <InnerBanner
        title={event?.name}
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[
          { label: "Events", href: "/events" },
          { label: event?.name },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-12 sm:py-20">
        {/* Banner */}
        {/* Banner */}
        {event?.bannerImage && (
          <div className="rounded-3xl overflow-hidden relative">
            <Image
              src={event.bannerImage}
              alt={event.name || "Event Banner"}
              height={610}
              width={1170}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Main Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-8">
            <EventContent event={event} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <EventInfoCard event={event} />
              <CallUsCard />
            </div>
          </div>
        </div>

        {/* Event Tickets / Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 xl:grid-cols-2 gap-6 mt-12">
          {event?.packages?.map((pak, index) => {
            console.log(pak); // logs each package
            return (
              <SMFeatureEventCard
                key={pak.id || index} // always provide a key
                bgImage="/dynamic/home/banner/banner-01.jpg"
                bgColor="#003A3B"
                overlayColor="#003A3B"
                title={event.name}
                price={pak.price}
                pak={pak}
                event={event}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

/* Helpers */
function Section({ title, children }) {
  return (
    <div className="mb-8 sm:mb-10">
      <h3 className="text-xl sm:text-2xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p className="text-gray-600 text-sm sm:text-base md:text-base mb-1">
      <strong className="text-dark">{label}:</strong> {value}
    </p>
  );
}
