"use client";

import { AspectRatio } from "@/app/components/ui/aspect-ratio";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// utils
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
};

export default function EventCard({ event }) {
  if (!event) return null;

  const { day, month } = formatDate(event.date);

  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="group relative rounded-4xl overflow-hidden w-full bg-[#E0F7F6]">
        {/* Card Hover BG */}
        <span className="absolute inset-0 bg-[#F39200]/70 scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />

        <div className="relative p-4 flex flex-col z-10">
          {/* Image */}
          <AspectRatio
            ratio={20 / 10}
            className="bg-muted rounded-t-4xl overflow-hidden"
          >
            <Image
              src={event.thumbImage || "/images/placeholder.jpg"}
              alt={event.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>

          {/* Content */}
          <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
            {/* Title with hover scroll */}
            <div className="overflow-hidden relative">
              <h5 className="text-dark group-hover:text-white text-lg sm:text-xl lg:text-2xl font-bold leading-snug whitespace-nowrap">
                <span className="inline-block group-hover:animate-marquee">
                  {event.name}
                </span>
              </h5>
            </div>

            <div className="bg-brand h-1 w-12"></div>

            {/* Date + Location */}
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Date */}
              <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                <span className="absolute inset-0 bg-brand scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />

                <div className="relative z-10 bg-[#090909] group-hover:bg-transparent h-full w-full flex flex-col items-center justify-center transition-colors duration-300">
                  <h4 className="text-[28px] font-bold text-white leading-none">
                    {day}
                  </h4>
                  <span className="text-white text-sm font-medium">
                    {month}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="text-gray group-hover:text-white transition-colors duration-300" />
                <p className="text-gray group-hover:text-white text-sm sm:text-[16px] font-medium transition-colors duration-300">
                  {event.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
