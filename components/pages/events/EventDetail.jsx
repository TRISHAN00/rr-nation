import CallUsCard from "@/components/common/services/CallUsCard";
import Image from "next/image";
import EventContent from "./EventContent";
import EventInfoCard from "./EventInfoCard";
import FeaturedEventCard from "./FeaturedEventCard";

export default function EventDetail() {
  return (
    <div className="container m-auto px-7.5  sm:px-6 lg:px-0 py-30">
      {/* Banner */}
      <div className="rounded-4xl overflow-hidden relative">
        <Image
          src="/dynamic/event/event-banner.jpg"
          alt="run rise banner"
          height={610}
          width={1170}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="mt-12 grid grid-cols-4 gap-4">
        {/* Left Content */}
        <div className=" col-span-3">
          <EventContent />
        </div>

        {/* Right Sidebar */}
        <div className="relative w-full lg:w-full col-span-1">
          <div className="lg:sticky lg:top-24 max-w-full overflow-x-hidden space-y-6">
            <EventInfoCard />
            <CallUsCard />
          </div>
        </div>
      </div>

      {/* Event Tickets */}
      <div  className=" grid grid-cols-2 gap-7.5" >
        <FeaturedEventCard/>
        <FeaturedEventCard/>
        <FeaturedEventCard/>
        <FeaturedEventCard/>
      </div>
    </div>
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
