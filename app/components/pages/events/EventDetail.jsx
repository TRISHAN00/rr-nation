"use client";

import { getRegFieldByEventId } from "@/services/regfield.service";
import { getEventBySlug } from "@/services/user.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import InnerBanner from "../../common/InnerBanner";
import CallUsCard from "../services/CallUsCard";
import EventContent from "./EventContent";
import EventInfoCard from "./EventInfoCard";
import SMFeatureEventCard from "./SMFeatureEventCard";

export default function EventDetail({ initialSlug }) {
  const [event, setEvent] = useState(null);
  const [regFields, setRegFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegFields = async (eventId) => {
    try {
      const res = await getRegFieldByEventId(eventId);
      setRegFields(res?.data || []);
    } catch (err) {
      console.error("Failed to load registration fields", err);
    }
  };

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await getEventBySlug(initialSlug);
      const eventData = res?.data?.data || null;

      setEvent(eventData);

      if (eventData?.id) {
        await fetchRegFields(eventData.id);
      }
    } catch (err) {
      console.error("Failed to load event", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialSlug) {
      fetchEvent();
    }
  }, [initialSlug]);

  if (loading) return <div className="py-20 text-center text-sm font-medium">Loading event details...</div>;

  return (
    <>
      <InnerBanner
        title={event?.name}
        background={"/dynamic/about/inner-banner.jpg"}
      />
      <div className="container mx-auto px-4 py-12 sm:py-20">
        {event?.bannerImage && (
          <div className="rounded-3xl overflow-hidden relative shadow-sm">
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
        <div>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <EventContent event={event} />
            </div>

            {/* Mobile Package Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 lg:hidden">
              {event?.packages?.map((pak, index) => (
                <div key={pak.id || index} className="w-full min-w-0">
                  <SMFeatureEventCard
                    bgImage="/dynamic/home/banner/banner-01.jpg"
                    bgColor="#003A3B"
                    overlayColor="#003A3B"
                    title={event.name}
                    price={pak.price}
                    pak={pak}
                    event={event}
                    regFields={regFields}
                  />
                </div>
              ))}
            </div>

            {/* Right Sidebar Desktop Container */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <EventInfoCard event={event} />
                <CallUsCard />
              </div>
            </div>
          </div>

          {/* Desktop Package Grid */}
          <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
            {event?.packages?.map((pak, index) => (
              <div key={pak.id || index} className="w-full min-w-0">
                <SMFeatureEventCard
                  bgImage="/dynamic/home/banner/banner-01.jpg"
                  bgColor="#003A3B"
                  overlayColor="#003A3B"
                  title={event.name}
                  price={pak.price}
                  pak={pak}
                  event={event}
                  regFields={regFields}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}