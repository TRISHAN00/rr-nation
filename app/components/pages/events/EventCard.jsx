import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../../ui/aspect-ratio";

export default function EventCard({ event, href }) {
  if (!event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    };
  };

  const { day, month } = formatDate(event?.date);

  // If href exists, wrap in Link; otherwise, just a div
  const Container = href ? Link : "div";

  return (
    <Container
      // Only attach href attribute if href is truthy
      {...(href ? { href } : {})}
      className={`group relative rounded-4xl overflow-hidden w-full bg-[#E0F7F6] block transition-all ${
        href ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {/* Card Hover BG - Only show if clickable */}
      {href && (
        <span className="absolute inset-0 bg-[#F39200]/70 scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />
      )}

      <div className="relative p-4 flex flex-col z-10">
        {/* Image */}
        <AspectRatio
          ratio={20 / 10}
          className="bg-muted rounded-t-4xl overflow-hidden"
        >
          <Image
            src={event?.thumbImage || "/images/placeholder.jpg"}
            alt={event?.name || "Event Thumbnail"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </AspectRatio>

        {/* Content */}
        <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
          <div className="overflow-hidden relative">
            <h5
              className={`text-dark text-md sm:text-xl lg:text-1xl font-bold leading-snug truncate transition-colors duration-300 ${href ? "group-hover:text-white" : ""}`}
            >
              {event?.name}
            </h5>
          </div>

          <div
            className={`bg-brand h-1 w-12 transition-colors duration-300 ${href ? "group-hover:bg-white" : ""}`}
          ></div>

          <div className="flex items-start gap-4 sm:gap-6">
            {/* Date Box */}
            <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
              {/* Only show the date-box hover effect if clickable */}
              {href && (
                <span className="absolute inset-0 bg-brand scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />
              )}

              <div
                className={`relative z-10 bg-[#090909] h-full w-full flex flex-col items-center justify-center transition-colors duration-300 ${href ? "group-hover:bg-transparent" : ""}`}
              >
                <h4 className="text-[28px] font-bold text-white leading-none">
                  {day}
                </h4>
                <span className="text-white text-sm font-medium">{month}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 flex-1">
              <MapPin
                className={`text-gray transition-colors duration-300 shrink-0 ${href ? "group-hover:text-white" : ""}`}
              />
              <p
                className={`text-gray text-sm sm:text-[16px] font-medium transition-colors duration-300 line-clamp-2 ${href ? "group-hover:text-white" : ""}`}
              >
                {event?.address || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
